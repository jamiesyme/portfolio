import React from 'react';
import ReactDOM from 'react-dom';

import ColorPaletteAtom from './color-palette';
import FontPaletteAtom from './font-palette';


const style = {
	color: ColorPaletteAtom.body,
	fontFamily: FontPaletteAtom.body,
	fontSize: 18,
	letterSpacing: 0.5,
	lineHeight: 1.6
};

export class ParagraphAtom extends React.Component {
	render() {
		const combinedStyle = Object.assign(
			{},
			style,
			this.props.style
		);
		return (
			<p style={combinedStyle}>{this.props.children}</p>
		);
	}
};

export default ParagraphAtom;
