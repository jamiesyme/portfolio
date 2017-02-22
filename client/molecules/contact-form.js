import React from 'react';

import SubmitButton from '../atoms/submit-button';
import TextInput from '../atoms/text-input';
import TextInputArea from '../atoms/text-input-area';


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
	}
};


export class ContactForm extends React.Component {
	render() {
		const formStyle = Object.assign(
			{},
			baseStyles.form,
			this.props.style
		);

		return (
			<form style={formStyle}>
				<TextInput style={baseStyles.input} />
				<TextInput style={baseStyles.input} />
				<TextInputArea style={baseStyles.inputArea} minRows={6} />
				<SubmitButton style={baseStyles.submit} />
			</form>
		);
	}
};

export default ContactForm;
