import { Logo } from '../atoms/logo';
import { NavBar } from '../molecules/nav-bar';
import React from 'react';
import ReactDOM from 'react-dom';

const style = {
	height: 64,
	margin: 'auto',
	width: 960
};

const rightStyle = {
	float: 'right'
};

export class Header extends React.Component {
	render() {
		return (
			<header style={style}>
				<Logo />
				<div style={rightStyle}>
					<NavBar />
				</div>
			</header>
		);
	}
};
