import React from 'react';


const baseStyles = {
	heading: {
		// TODO
	}
};

export class SecondaryHeadingAtom extends React.Component {
	render() {
		return (
			<h2 style={baseStyles.heading}>{this.props.children}</h2>
		);
	}
};

export default SecondaryHeadingAtom;
