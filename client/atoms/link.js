import Radium from 'radium';
import React from 'react';
import ReactScroll from 'react-scroll';

import ColorPaletteAtom from './color-palette';
import FontPaletteAtom from './font-palette';


const baseStyles = {
	a: {
		color: ColorPaletteAtom.accent,
		fontFamily: FontPaletteAtom.body,
		fontSize: 18,
		letterSpacing: 0.5,
		lineHeight: 1.6,
		textDecoration: 'none',
		':hover': {
			textDecoration: 'underline'
		}
	}
};


export class LinkAtom extends React.Component {
	smoothScroll(e) {
		e.preventDefault();
		ReactScroll.scroller.scrollTo(this.props.targetId, {
			duration: 500,
			offset: -64,
			smooth: true
		});
	}

	render() {
		const onClick = !this.props.url ? this.smoothScroll.bind(this) : null;
		const href = this.props.url || '#' + this.props.targetId;

		return (
			<a style={baseStyles.a}
				 href={href}
				 onClick={onClick}>
				{this.props.children}
			</a>
		);
	}
};
LinkAtom = Radium(LinkAtom);

export default LinkAtom;


LinkAtom.propTypes = {
	targetId: React.PropTypes.string, // Used if url is not specified
	url: React.PropTypes.string
};

LinkAtom.defaultProps = {
	targetId: ''
};
