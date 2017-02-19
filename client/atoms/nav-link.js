import { ColorPalette } from './color-palette';
import { FontPalette } from './font-palette';
import Radium from 'radium';
import React from 'react';
import ReactDOM from 'react-dom';

const style = {
	color: ColorPalette.heavy,
	display: 'inline-block',
	fontFamily: FontPalette.heavy,
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
		borderBottom: '3px solid ' + ColorPalette.accent,
		color: ColorPalette.body,
		height: 64 - 3
	}
};

const accentStyle = Object.assign({}, style, {
	color: ColorPalette.accent
});

class NavLink extends React.Component {
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
NavLink = Radium(NavLink);

export { NavLink };
