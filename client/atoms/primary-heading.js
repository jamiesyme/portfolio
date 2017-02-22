import React from 'react';

import ColorPaletteAtom from './color-palette';
import FontPaletteAtom from './font-palette';


const baseStyles = {
	heading: {
		color: ColorPaletteAtom.heavy,
		fontFamily: FontPaletteAtom.heavy,
		fontSize: 64,
		fontWeight: 'bold',
		marginTop: 0,
		marginBottom: 60
	}
};


export class PrimaryHeadingAtom extends React.Component {
	render() {
		const headingStyle = Object.assign(
			{},
			baseStyles.heading,
			this.props.style
		);

		return (
				<h1 style={headingStyle}>{this.props.children}</h1>
		);
	}
};

export default PrimaryHeadingAtom;
