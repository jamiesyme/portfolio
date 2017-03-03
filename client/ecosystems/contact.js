import React from 'react';

import ContactForm from '../molecules/contact-form';
import PrimaryHeadingAtom from '../atoms/primary-heading';

import { markdownToReact } from '../utils/react';


const baseStyles = {
	form: {
		marginTop: '50px'
	},
	section: {
		boxSizing: 'border-box',
		margin: 'auto',
		minHeight: 'calc(100vh - 64px)',
		paddingTop: '50px',
		//paddingBottom: '100px',
		width: '80%'
	}
};


export class ContactEco extends React.Component {
	render() {
		const bodyElements = markdownToReact(this.props.body);

		return (
			<section id={this.props.id}
							 style={baseStyles.section}>
				<PrimaryHeadingAtom>{this.props.title}</PrimaryHeadingAtom>
				{bodyElements}
				<ContactForm style={baseStyles.form} />
			</section>
		);
	}
};

export default ContactEco;


ContactEco.propTypes = {
	body: React.PropTypes.string,
	id: React.PropTypes.string,
	title: React.PropTypes.string
};
