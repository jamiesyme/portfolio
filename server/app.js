import _ from 'underscore';
import BodyParser from 'body-parser';
import EmailJS from 'emailjs';
import EmailValidator from 'email-validator';
import Express from 'express';

const app = Express();

app.use('/f', Express.static('../client/public'));
app.use('/img', Express.static('../client/public/img'));

app.use(BodyParser.json());

app.get('/f/bundle.js', (request, response) => {
	response.sendFile('bundle.js', {
		root: __dirname
	});
});

app.get('/', (request, response) => {
	response.sendFile('index.html', {
		root: __dirname + '/../client/public'
	});
});



const contactEmail = process.env.CONTACT_EMAIL;
const contactEmailPassword = process.env.CONTACT_EMAIL_PASSWORD;
const contactEmailSender = process.env.CONTACT_EMAIL_SENDER;

if (!contactEmail || !contactEmailPassword || !contactEmailSender) {
	throw 'Failed to read contact email settings.';
}

const emailServer = EmailJS.server.connect({
	user: contactEmail,
	password: contactEmailPassword,
	host: 'mail.hover.com',
	ssl: true
});

app.post('/contact-me', (request, response) => {
	let from = request.body.from;
	let content = request.body.content;
	let subject = request.body.subject;

	if (!_.isString(from) || !EmailValidator.validate(from)) {
		response.status(400).send({
			error: 'invalid from address',
			from: from
		});
		return;
	}

	if (!_.isString(content) || content.length === 0) {
		response.status(400).send({
			error: 'invalid content',
			content: content
		});
		return;
	}

	if (!_.isString(subject)) {
		subject = '';
	}

	// We send the email from an email we own, to avoid being detected as spam
	// (sending from email addresses that aren't ours).
	content = 'Sender: ' + from + '\n\n' + content;

	emailServer.send({
		to: contactEmail,
		from: contactEmailSender,
		subject: subject,
		text: content
	}, (error, message) => {
		if (error) {
			console.log('Failed to send email:', error);
			response.status(500).send({ error: 'failed to send email' });
		} else {
			console.log('Email sent:', message);
			response.status(200).end();
		}
	});
});

app.listen(8080);
