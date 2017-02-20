import Radium from 'radium';
import React from 'react';
import ReactDOM from 'react-dom';

import ColorPaletteAtom from './color-palette';
import FontPaletteAtom from './font-palette';


const style = {
	color: ColorPaletteAtom.heavy,
	display: 'inline-block',
	fontFamily: FontPaletteAtom.heavy,
	fontSize: 20,
	fontWeight: 500,
	height: 64,
	lineHeight: '64px',
	marginLeft: 2,
	marginRight: 2,
	paddingLeft: 20,
	paddingRight: 20,
	textDecoration: 'none',
	':hover': {
		borderBottom: '3px solid ' + ColorPaletteAtom.accent,
		color: ColorPaletteAtom.body,
		height: 64 - 3
	}
};

const accentStyle = Object.assign({}, style, {
	color: ColorPaletteAtom.accent
});


export class NavigationLinkAtom extends React.Component {
	render() {
		if (this.props.accent) {
			return (
				<a href={this.props.href} style={accentStyle}>{this.props.text}</a>
			);
		} else {
			return (
				<a href={this.props.href} style={style}>{this.props.text}</a>
			);
		}
	}
};
NavigationLinkAtom = Radium(NavigationLinkAtom);

export default NavigationLinkAtom;
