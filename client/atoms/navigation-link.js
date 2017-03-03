import Radium from 'radium';
import React from 'react';
import ReactScroll from 'react-scroll';

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
	smoothScroll(e) {
		e.preventDefault();
		ReactScroll.scroller.scrollTo(this.props.href.substr(1), {
			duration: 500,
			offset: -64,
			smooth: true
		});
	}

	render() {
		const aStyle = this.props.accent ? baseStyles.accent : baseStyles.normal;
		return (
				<a style={aStyle}
					 href={this.props.href}
					 onClick={this.smoothScroll.bind(this)}>
					{this.props.text}
				</a>
		);
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
