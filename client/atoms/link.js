import { ColorPalette } from './color-palette';
import { FontPalette } from './font-palette';
import Radium from 'radium';
import React from 'react';
import ReactDOM from 'react-dom';

const style = {
	color: ColorPalette.accent,
	fontFamily: FontPalette.body,
	fontSize: 18,
	letterSpacing: 0.5,
	lineHeight: 1.6,
	textDecoration: 'none',
	':hover': {
		textDecoration: 'underline'
	}
};

class Link extends React.Component {
	render() {
		return (
			<a style={style} href={this.props.href}>{this.props.children}</a>
		);
	}
};
Link = Radium(Link);

export { Link };
