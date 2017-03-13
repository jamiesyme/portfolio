import React from 'react';

import ColorPaletteAtom from './color-palette';
import FontPaletteAtom from './font-palette';


const baseStyles = {
	heading: {
		color: ColorPaletteAtom.medium,
		fontFamily: FontPaletteAtom.heavy,
		fontSize: 48,
		fontWeight: 'bold',
		marginTop: 0,
		marginBottom: 30
	}
};


export class SecondaryHeadingAtom extends React.Component {
	render() {
		const headingStyle = Object.assign(
			{},
			baseStyles.heading,
			this.props.style
		);

		return (
			<h2 style={headingStyle}>{this.props.children}</h2>
		);
	}
};

export default SecondaryHeadingAtom;
