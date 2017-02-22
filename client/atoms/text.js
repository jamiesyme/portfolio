import React from 'react';

import ColorPaletteAtom from './color-palette';
import FontPaletteAtom from './font-palette';


const baseStyles = {
	text: {
		color: ColorPaletteAtom.body,
		fontFamily: FontPaletteAtom.body,
		fontSize: 18,
		letterSpacing: 0.5,
		lineHeight: 1.6
	}
};


export class TextAtom extends React.Component {
	render() {
		return (
			<span style={baseStyles.text}>{this.props.children}</span>
		);
	}
};

export default TextAtom;
