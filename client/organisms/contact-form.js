import _ from 'underscore';
import $ from 'jquery';
import EmailValidator from 'email-validator';
import React from 'react';

import SubmitButtonAtom from '../atoms/submit-button';
import TextInputMole from '../molecules/text-input';
import TextInputAreaMole from '../molecules/text-input-area';


const baseStyles = {
	submit: {
		float: 'right'
	},
	form: {
		border: '1px solid #CCC',
		margin: 'auto',
		overflow: 'auto',
		padding: 20,
		width: '75%'
	},
	input: {
		marginBottom: 20,
		width: '75%'
	},
	inputArea: {
		marginBottom: 20,
		maxWidth: '100%'
	},
	label: {
		success: {
			fontStyle: 'italic'
		},
		failure: {
			color: '#FF3B3F',
			fontStyle: 'italic'
		}
	}
};


export class ContactFormOrg extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		const formStyle = Object.assign(
			{},
			baseStyles.form,
			this.props.style
		);

		let resultElement = null;
		if (this.state.lastResult) {
			if (this.state.lastResult.status) {
				resultElement = (
					<label style={baseStyles.label.success}>
						{this.state.lastResult.message}
					</label>
				);
			} else {
				resultElement = (
					<label style={baseStyles.label.failure}>
						{this.state.lastResult.message}
					</label>
				);
			}
		}

		return (
			<form style={formStyle} id="contact-form">
				<TextInputMole
					style={baseStyles.input}
					id="from"
					placeholder="Your email address"
					error={this.state.emailError}
					onFocus={() => this.setState({ emailError: null })}/>

				<TextInputMole
					style={baseStyles.input}
					id="subject"
					placeholder="Subject (optional)" />

				<TextInputAreaMole
					style={baseStyles.inputArea}
					id="content"
					minRows={6}
					placeholder="Say hello"
					error={this.state.contentError}
					onFocus={() => this.setState({ contentError: null })}/>

				<SubmitButtonAtom
					style={baseStyles.submit}
					id="submit"
					onClick={this.onSubmit.bind(this)} />

				{resultElement}
			</form>
		);
	}

	onSubmit() {
		const $from = $('#from');
		const $subject = $('#subject');
		const $content = $('#content');
		const $submit = $('#submit');

		const lockForm = () => {
			$from.prop('disabled', true);
			$subject.prop('disabled', true);
			$content.prop('disabled', true);
			$submit.prop('disabled', true);
		};
		const unlockForm = () => {
			$from.prop('disabled', false);
			$subject.prop('disabled', false);
			$content.prop('disabled', false);
			$submit.prop('disabled', false);
		};

		const from = $from.val();
		const subject = $subject.val();
		const content = $content.val();

		// Perform validation
		let emailError = null,
				contentError = null;
		if (!_.isString(from) || !EmailValidator.validate(from)) {
			emailError = 'Invalid email address.';
		}
		if (!_.isString(content) || content.length === 0) {
			contentError = 'Required field.';
		}

		if (emailError || contentError) {
			this.setState({
				emailError,
				contentError
			});
			return;
		}

		// Validation is done; lock the form and reset the last result
		this.setState({ lastResult: null });
		lockForm();

		// Make request
		$.post({
			url: '/contact-me',
			contentType: 'application/json',
			data: JSON.stringify({
				from,
				subject,
				content
			})
		})
			.done(() => {
				this.setState({
					lastResult: {
						status: true,
						message: 'Email sent.'
					}
				});
				$('#contact-form').trigger('reset');
				unlockForm();
			})
			.fail((jqxhr) => {
				let message = 'Unknown error occured.';

				if (jqxhr.status === 400) {
					const responseBody = JSON.parse(jqxhr.responseText);

					if (responseBody.error === 'invalid from address') {
						message = 'Invalid return address specified.';
					} else if (responseBody.error === 'invalid content') {
						message = 'Invalid email body.';
					} else {
						console.log('Unknown error while sending email:', responseBody.error);
					}
				}

				this.setState({
					lastResult: {
						status: false,
						message: message
					}
				});
				unlockForm();
			});
	}
};

export default ContactFormOrg;
