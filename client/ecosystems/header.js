import { ColorPalette } from '../atoms/color-palette';
import { Header as HeaderOrganism } from '../organisms/header';
import Radium from 'radium';
import React from 'react';
import ReactDOM from 'react-dom';

const style = {
	backgroundColor: ColorPalette.bg,
	position: 'fixed',
	width: '100%'
};

export class Header extends React.Component {
	render() {
		return (
			<div style={style}>
				<HeaderOrganism />
			</div>
		);
	}
};
