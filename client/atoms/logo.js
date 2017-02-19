import { ColorPalette } from './color-palette';
import { FontPalette } from './font-palette';
import React from 'react';
import ReactDOM from 'react-dom';

const style = {
	color: ColorPalette.heavy,
	display: 'inline-block',
	fontFamily: FontPalette.heavy,
	fontSize: 24,
	fontWeight: 500,
	height: 64,
	lineHeight: '64px',
	textDecoration: 'none'
};

export class Logo extends React.Component {
	render() {
		return (
			<a href="#" style={style}>jamiesyme.com</a>
		);
	}
};
