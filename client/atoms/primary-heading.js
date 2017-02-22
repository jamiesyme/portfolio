import React from 'react';

import ColorPaletteAtom from './color-palette';
import FontPaletteAtom from './font-palette';


const baseStyles = {
	heading: {
		borderBottom: '1px solid ' + ColorPaletteAtom.heavy,
		color: ColorPaletteAtom.heavy,
		fontFamily: FontPaletteAtom.heavy,
		fontSize: 64,
		fontWeight: 'bold',
		marginTop: 0,
		marginBottom: 52,
		paddingBottom: 8
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
