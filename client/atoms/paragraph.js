import { ColorPalette } from './color-palette';
import { FontPalette } from './font-palette';
import React from 'react';
import ReactDOM from 'react-dom';

const style = {
	color: ColorPalette.body,
	fontFamily: FontPalette.body,
	fontSize: 18,
	letterSpacing: 0.5,
	lineHeight: 1.6
};

export class Paragraph extends React.Component {
	render() {
		return (
			<p style={style}>{this.props.children}</p>
		);
	}
};
