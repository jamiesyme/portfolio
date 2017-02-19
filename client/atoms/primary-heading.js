import { ColorPalette } from './color-palette';
import { FontPalette } from './font-palette';
import React from 'react';
import ReactDOM from 'react-dom';

const style = {
	color: ColorPalette.heavy,
  fontFamily: FontPalette.heavy,
  fontSize: 64,
  fontWeight: 500,
  marginTop: 0,
  marginBottom: 60
};

export class PrimaryHeading extends React.Component {
	render() {
		return (
				<h1 style={style}>{this.props.children}</h1>
		);
	}
};
