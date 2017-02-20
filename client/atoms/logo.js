import React from 'react';
import ReactDOM from 'react-dom';

import ColorPaletteAtom from './color-palette';
import FontPaletteAtom from './font-palette';


const style = {
	color: ColorPaletteAtom.heavy,
	display: 'inline-block',
	fontFamily: FontPaletteAtom.heavy,
	fontSize: 24,
	fontWeight: 500,
	height: 64,
	lineHeight: '64px',
	textDecoration: 'none'
};

export class LogoAtom extends React.Component {
	render() {
		return (
			<a href="#" style={style}>jamiesyme.com</a>
		);
	}
};

export default LogoAtom;
