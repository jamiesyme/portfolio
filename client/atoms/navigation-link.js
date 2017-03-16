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
baseStyles.active = Object.assign(
	{},
	baseStyles.normal,
	{
		color: ColorPaletteAtom.accent
	}
);


export class NavigationLinkAtom extends React.Component {
	smoothScroll(e) {
		e.preventDefault();
		ReactScroll.scroller.scrollTo(this.props.targetId, {
			duration: 500,
			offset: -64,
			smooth: true
		});
	}

	render() {
		let aStyle = this.props.active ? baseStyles.active : baseStyles.normal;
		let onClick = !this.props.url ? this.smoothScroll.bind(this) : null;
		let href = this.props.url || '#' + this.props.targetId;

		return (
				<a style={aStyle}
					 href={href}
					 onClick={onClick}>
					{this.props.text}
				</a>
		);
	}
};
NavigationLinkAtom = Radium(NavigationLinkAtom);

export default NavigationLinkAtom;


NavigationLinkAtom.propTypes = {
	active: React.PropTypes.bool,
	targetId: React.PropTypes.string, // Used if url is not specified
	text: React.PropTypes.string,
	url: React.PropTypes.string
};

NavigationLinkAtom.defaultProps = {
	active: false,
	targetId: ''
};
