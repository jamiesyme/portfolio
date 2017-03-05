import React from 'react';

import ContactFormMole from '../molecules/contact-form';
import PrimaryHeadingAtom from '../atoms/primary-heading';
import SectionAtom from '../atoms/section';

import { markdownToReact } from '../utils/react';


const baseStyles = {
	form: {
		marginTop: '50px'
	},
	section: {
		paddingBottom: 0
	}
};


export class ContactEco extends React.Component {
	render() {
		const bodyElements = markdownToReact(this.props.body);

		return (
			<SectionAtom id={this.props.id}
									 style={baseStyles.section}>
				<PrimaryHeadingAtom>{this.props.title}</PrimaryHeadingAtom>
				{bodyElements}
				<ContactFormMole style={baseStyles.form} />
			</SectionAtom>
		);
	}
};

export default ContactEco;


ContactEco.propTypes = {
	body: React.PropTypes.string,
	id: React.PropTypes.string,
	title: React.PropTypes.string
};
