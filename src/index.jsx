import React from 'react';
import ReactDOM from 'react-dom';


const colorScheme = {
	body:     '#494949',
	accent:   '#FF3B3F',
	heavy:    '#A9A9A9',
	bg:       '#EFEFEF',
	bgAccent: '#CAEBF2'
};

const fontScheme = {
	heavy: ['Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', 'Tahoma', 'sans-serif'],
	//heading: ['Tahoma', 'Geneva', 'sans-serif'],
	body: ['Georgia', 'Serif']
};

const headingFontStyle = {
	fontFamily: fontScheme.heavy,
	fontWeight: 500,
	color: colorScheme.heavy
};

const bodyFontStyle = {
	fontFamily: fontScheme.body,
	fontSize: 18,
	lineHeight: 1.6,
	letterSpacing: 0.5,
	color: colorScheme.body
};


class Header extends React.Component {
	render() {
		const padding = 20;
		const outerStyle = {
			width: '100%',
			position: 'fixed',
			backgroundColor: colorScheme.bg
		};
		const innerStyle = {
			width: 960,
			margin: 'auto',
			height: 64
		};
		return (
			<header style={outerStyle}>
				<div style={innerStyle}>
					{this.renderLogo()}
					{this.renderNav()}
				</div>
			</header>
		);
	}
	renderLogo() {
		const logoStyle = Object.assign({}, headingFontStyle, {
			fontSize: 24,
			textDecoration: 'none',
			display: 'inline-block',
			height: '100%',
			
		});
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
		const aStyle = Object.assign({}, headingFontStyle, {
			fontSize: 20,
			textDecoration: 'none',
			padding: 2,
			marginLeft: 20,
			marginRight: 20,
			display: 'inline-block'
		});
		const aStyleAccent = Object.assign({}, aStyle, {
			color: colorScheme.accent
		});
		return (
			<nav style={navStyle}>
				<a href="#" style={aStyleAccent}>Home</a>
				<a href="#" style={aStyle}>Projects</a>
				<a href="#" style={aStyle}>About</a>
				<a href="#" style={aStyle}>Contact</a>
			</nav>
		);
	}
}


class Page extends React.Component {
	render() {
		const outerStyle = {
			width: '100vw',
			height: '100vh',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
		};
		const hStyle = Object.assign({}, headingFontStyle, {
			fontSize: 64,
			//paddingTop: 60,
			paddingBottom: 60,
			margin: 0,
			textAlign: 'center'
		});
		return (
			<div style={outerStyle}>
				<div>
					<h1 style={hStyle}>{this.props.heading}</h1>
					<div>{this.props.children}</div>
				</div>
			</div>
		);
	}
}


class HomePage extends React.Component {
	render() {
		const pStyle = Object.assign({}, bodyFontStyle, {
			width: 450,
			margin: 'auto',
			textAlign: 'center'
		});
		return (
			<Page heading="Welcome">
				<p style={pStyle}>I'm a backend web developer who is blah blah here are some more words to make this the right length. Let's add a little bit more and see if we can get a couple more lines.</p>
			</Page>
		);
	}
}


class ProjectsPage extends React.Component {
	render() {
		return (
			<Page heading="Projects">
				<p style={bodyFontStyle}>I need some projects here</p>
			</Page>
		);
	}
}


class AboutPage extends React.Component {
	render() {
		return (
			<Page heading="About">
				<p style={bodyFontStyle}>I need to write some stuff about me here</p>
			</Page>
		);
	}
}


class ContactPage extends React.Component {
	render() {
		return (
			<Page heading="Contact">
				<p style={bodyFontStyle}>I need to write contact info here</p>
			</Page>
		);
	}
}


class Website extends React.Component {
	render() {
		return (
			<div>
				<Header/>
				<HomePage/>
				<ProjectsPage/>
				<AboutPage/>
				<ContactPage/>
			</div>
		);
	}
}


ReactDOM.render(
	<Website/>,
	document.getElementById('root')
);
