import React from 'react';

import ContactForm from '../molecules/contact-form';
import ParagraphAtom from '../atoms/paragraph';
import PrimaryHeadingAtom from '../atoms/primary-heading';


const baseStyles = {
	container: {
		boxSizing: 'border-box',
		margin: 'auto',
		minHeight: 'calc(100vh - 64px)',
		//paddingBottom: '150px',
		width: '80%'
	},
	form: {
		marginTop: '50px'
	}
};


export class ContactEco extends React.Component {
	render() {
		const bodyElements = this.props.body.map((pBody, index) => (
			<ParagraphAtom key={index.toString()}>
				{pBody}
			</ParagraphAtom>
		));

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
	body: React.PropTypes.arrayOf(React.PropTypes.string),
	title: React.PropTypes.string
};

ContactEco.defaultProps = {
	body: []
};
