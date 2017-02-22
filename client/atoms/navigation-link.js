import Radium from 'radium';
import React from 'react';

import ColorPaletteAtom from './color-palette';
import FontPaletteAtom from './font-palette';


const baseStyles = {
	normal: {
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
	}
};
baseStyles.accent = Object.assign(
	{},
	baseStyles.normal,
	{ color: ColorPaletteAtom.accent }
);


export class NavigationLinkAtom extends React.Component {
	render() {
		if (this.props.accent) {
			return (
				<a href={this.props.href} style={baseStyles.accent}>{this.props.text}</a>
			);
		} else {
			return (
				<a href={this.props.href} style={baseStyles.normal}>{this.props.text}</a>
			);
		}
	}
};
NavigationLinkAtom = Radium(NavigationLinkAtom);

export default NavigationLinkAtom;


NavigationLinkAtom.propTypes = {
	accent: React.PropTypes.bool,
	href: React.PropTypes.string,
	text: React.PropTypes.string
};

NavigationLinkAtom.defaultProps = {
	accent: false,
	href: '#',
	text: 'NavLink'
};
