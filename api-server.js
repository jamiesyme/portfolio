const _              = require('underscore');
const BodyParser     = require('body-parser');
const EmailJS        = require('emailjs');
const EmailValidator = require('email-validator');
const Express        = require('express');


const contactEmail = process.env.CONTACT_EMAIL;
const contactEmailPassword = process.env.CONTACT_EMAIL_PASSWORD;
const contactEmailSender = process.env.CONTACT_EMAIL_SENDER;

if (!contactEmail || !contactEmailPassword || !contactEmailSender) {
	throw 'Failed to read email settings.';
}

const emailServer = EmailJS.server.connect({
	user: contactEmail,
	password: contactEmailPassword,
	host: 'mail.hover.com',
	ssl: true
});


const app = Express();

app.use(BodyParser.json());
app.post('/api/contact', (request, response) => {

	let from = request.body.from;
	let subject = request.body.subject;
	let message = request.body.message;

	if (!_.isString(from) || !EmailValidator.validate(from)) {
		response.status(400).send({
			error: 'invalid from address',
			from: from
		});
		return;
	}

	if (!_.isString(subject) || subject.length === 0) {
		response.status(400).send({
			error: 'invalid subject',
			subject: subject
		});
		return;
	}

	if (!_.isString(message) || message.length === 0) {
		response.status(400).send({
			error: 'invalid message',
			message: message
		});
		return;
	}

	// We send the email from an email we own, to avoid being detected as spam
	// (sending from email addresses that aren't ours).
	message = 'Sender: ' + from + '\n\n' + message;

	emailServer.send({
		to:      contactEmail,
		from:    contactEmailSender,
		subject: subject,
		text:    message
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
