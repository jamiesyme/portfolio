import Radium from 'radium';
import React from 'react';

import ColorPaletteAtom from './color-palette';
import FontPaletteAtom from './font-palette';


const baseStyles = {
	a: {
		border: '1px solid ' + ColorPaletteAtom.accent,
		borderRadius: 3,
		color: ColorPaletteAtom.accent,
		fontFamily: FontPaletteAtom.body,
		fontSize: 18,
		letterSpacing: 0.5,
		lineHeight: 1.6,
		margin: '5 0 5 0',
		padding: 10,
		textDecoration: 'none',
		':hover': {
			backgroundColor: '#d9534f',
			color: 'white'
		}
	}
};


export class ButtonLinkAtom extends React.Component {
	render() {
		return (
			<a style={baseStyles.a} href={this.props.href}>{this.props.children}</a>
		);
	}
};
ButtonLinkAtom = Radium(ButtonLinkAtom);

export default ButtonLinkAtom;


ButtonLinkAtom.propTypes = {
	// Switch to url & targetId like other links
	href: React.PropTypes.string
};

ButtonLinkAtom.defaultProps = {
	href: '#'
};
