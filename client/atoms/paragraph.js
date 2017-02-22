import React from 'react';

import ColorPaletteAtom from './color-palette';
import FontPaletteAtom from './font-palette';


const baseStyles = {
	p: {
		color: ColorPaletteAtom.body,
		fontFamily: FontPaletteAtom.body,
		fontSize: 18,
		letterSpacing: 0.5,
		lineHeight: 1.6
	}
};


export class ParagraphAtom extends React.Component {
	render() {
		const pStyle = Object.assign(
			{},
			baseStyles.p,
			this.props.style
		);

		return (
			<p style={pStyle}>{this.props.children}</p>
		);
	}
};

export default ParagraphAtom;
