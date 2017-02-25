import React from 'react';

import ParagraphAtom from '../atoms/paragraph';
import PrimaryHeadingAtom from '../atoms/primary-heading';


const baseStyles = {
	container: {
		boxSizing: 'border-box',
		margin: 'auto',
		minHeight: 'calc(100vh - 64px)',
		paddingBottom: '150px',
		width: '80%'
	}
};


export class AboutEco extends React.Component {
	render() {
		const bodyElements = this.props.body.map((bObj, index) => {
			return (
				<ParagraphAtom key={index.toString()}>
					{bObj.content}
				</ParagraphAtom>
			);
		});

		return (
			<div style={baseStyles.container}>
				<PrimaryHeadingAtom>{this.props.title}</PrimaryHeadingAtom>
				{bodyElements}
			</div>
		);
	}
};

export default AboutEco;


AboutEco.propTypes = {
	body: React.PropTypes.arrayOf(React.PropTypes.shape({
		imgSrc: React.PropTypes.string,
		content: React.PropTypes.string
	}))
};
