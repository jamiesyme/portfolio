import React from 'react';


const baseStyles = {
	section: {
		boxSizing: 'border-box',
		margin: 'auto',
		minHeight: 'calc(100vh - 64px)',
		paddingTop: '50px',
		paddingBottom: '100px',
		width: '80%',
		maxWidth: '1024px'
	}
};


export class SectionAtom extends React.Component {
	render() {
		const sectionStyle = Object.assign(
			{},
			baseStyles.section,
			this.props.style
		);

		return (
			<section id={this.props.id}
							 style={sectionStyle}>
				{this.props.children}
			</section>
		);
	}
};

export default SectionAtom;


SectionAtom.propTypes = {
	id: React.PropTypes.string
};
