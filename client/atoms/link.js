import Radium from 'radium';
import React from 'react';
import ReactDOM from 'react-dom';

import ColorPaletteAtom from './color-palette';
import FontPaletteAtom from './font-palette';


const style = {
	color: ColorPaletteAtom.accent,
	fontFamily: FontPaletteAtom.body,
	fontSize: 18,
	letterSpacing: 0.5,
	lineHeight: 1.6,
	textDecoration: 'none',
	':hover': {
		textDecoration: 'underline'
	}
};

export class LinkAtom extends React.Component {
	render() {
		return (
			<a style={style} href={this.props.href}>{this.props.children}</a>
		);
	}
};
LinkAtom = Radium(LinkAtom);

export default LinkAtom;
