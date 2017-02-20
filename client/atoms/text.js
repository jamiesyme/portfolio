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

export class TextAtom extends React.Component {
	render() {
		return (
			<span style={style}>{this.props.children}</span>
		);
	}
};

export default TextAtom;
