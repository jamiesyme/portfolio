import React from 'react';
import ReactDOM from 'react-dom';

class Header extends React.Component {
	render() {
		const headerStyle = {
			width: 960,
			margin: 'auto',
			paddingTop: 20,
			paddingBottom: 20
		};
		return (
			<header style={headerStyle}>
				{this.renderLogo()}
				{this.renderNav()}
			</header>
		);
	}
	renderLogo() {
		const logoStyle = {
			fontFamily: ['Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', 'Tahoma', 'sans-serif'],
			fontSize: 24,
			fontWeight: 500,
			textDecoration: 'none',
			color: 'black',
			display: 'inline-block'
		};
		return (
			<a href="#" style={logoStyle}>
				jamiesyme.com
			</a>
		);
	}
	renderNav() {
		const navStyle = {
			float: 'right'
		};
		const aStyle = {
			fontFamily: ['Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', 'Tahoma', 'sans-serif'],
			fontSize: 20,
			fontWeight: 500,
			textDecoration: 'none',
			color: 'black',
			padding: 2,
			marginLeft: 20,
			marginRight: 20,
			display: 'inline-block'
		};
		return (
			<nav style={navStyle}>
				<a href="#" style={aStyle}>Home</a>
				<a href="#" style={aStyle}>Projects</a>
				<a href="#" style={aStyle}>About</a>
				<a href="#" style={aStyle}>Contact</a>
			</nav>
		);
	}
}

class HomePage extends React.Component {
	render() {
		return (
			<div>
				<Header/>
				{this.renderGreeting()}
			</div>
		);
	}
	renderGreeting() {
		return (
			<div>
			</div>
		);
	}
}

ReactDOM.render(
	<HomePage/>,
	document.getElementById('root')
);
