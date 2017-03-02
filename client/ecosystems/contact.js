import React from 'react';

import ContactForm from '../molecules/contact-form';
import PrimaryHeadingAtom from '../atoms/primary-heading';

import { markdownToReact } from '../utils/react';


const baseStyles = {
	container: {
		boxSizing: 'border-box',
		margin: 'auto',
		minHeight: 'calc(100vh - 64px)',
		paddingTop: '50px',
		//paddingBottom: '100px',
		width: '80%'
	},
	form: {
		marginTop: '50px'
	}
};


export class ContactEco extends React.Component {
	render() {
		const bodyElements = markdownToReact(this.props.body);

		return (
			<div style={baseStyles.container}>
				<PrimaryHeadingAtom>{this.props.title}</PrimaryHeadingAtom>
				{bodyElements}
				<ContactForm style={baseStyles.form} />
			</div>
		);
	}
};

export default ContactEco;


ContactEco.propTypes = {
	body: React.PropTypes.string,
	title: React.PropTypes.string
};
