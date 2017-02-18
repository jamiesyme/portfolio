import Radium from 'radium';
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
	heavy: 'Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif',
	//heading: 'Tahoma, Geneva, sans-serif',
	body: 'Georgia, Serif'
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


class NavLink extends React.Component {
	render() {
		const style = Object.assign({}, headingFontStyle, {
			fontSize: 20,
			textDecoration: 'none',
			paddingLeft: 20,
			paddingRight: 20,
			marginLeft: 2,
			marginRight: 2,
			display: 'inline-block',
			height: this.props.height,
			lineHeight: this.props.height.toString() + 'px',
			':hover': {
				height: this.props.height - 3,
				borderBottom: '3px solid ' + colorScheme.accent,
				color: colorScheme.body
			}
		});
		const accentStyle = Object.assign({}, style, {
			color: colorScheme.accent
		});
		if (this.props.accent) {
			return (<a href="{this.props.href}" style={accentStyle}>{this.props.text}</a>);
		} else {
			return (<a href="{this.props.href}" style={style}>{this.props.text}</a>);
		}
	}
}
NavLink = Radium(NavLink);


class Header extends React.Component {
	constructor(props) {
		super(props);
		this.height = 64;
	}
	render() {
		const outerStyle = {
			width: '100%',
			position: 'fixed',
			backgroundColor: colorScheme.bg
		};
		const innerStyle = {
			width: 960,
			margin: 'auto',
			height: this.height
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
			height: this.height,
			lineHeight: this.height.toString() + 'px'
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
		return (
			<nav style={navStyle}>
				<NavLink height={this.height} href="#" text="Home" accent="true" />
				<NavLink height={this.height} href="#" text="Projects" />
				<NavLink height={this.height} href="#" text="About" />
				<NavLink height={this.height} href="#" text="Contact" />
			</nav>
		);
	}
}


class Page extends React.Component {
	render() {
		//const outerStyle = {
			//minHeight: '100vh',
			//display: 'flex',
			//alignItems: 'center'
		//};
		//const innerStyle = {
			//width: '100%'
		//};
		//const hStyle = Object.assign({}, headingFontStyle, {
			//fontSize: 64,
			////paddingTop: 60,
			//paddingBottom: 60,
			//margin: 0,
			//textAlign: 'center'
		//});
		const style = Object.assign({
			minHeight: '100vh'
		}, this.props.style);

		return (
			<div style={style}>
				{this.props.children}
			</div>
		);
	}
}


class GithubProfileLink extends React.Component {
	render() {
		const aStyle = Object.assign({}, bodyFontStyle, {
			color: colorScheme.accent,
			textDecoration: 'none',
			':hover': {
				textDecoration: 'underline'
			}
		});
		return (
			<div>
				{/* <iframe src="https://ghbtns.com/github-btn.html?user=jamiesyme&type=follow&count=true&size=large" frameborder="0" scrolling="0" width="220px" height="30px"></iframe> */}
				<a style={aStyle} href="#">Github</a>
			</div>
		);
	}
}
GithubProfileLink = Radium(GithubProfileLink);


class ContactLink extends React.Component {
	render() {
		const aStyle = Object.assign({}, bodyFontStyle, {
			color: colorScheme.accent,
			textDecoration: 'none',
			':hover': {
				textDecoration: 'underline'
			}
		});
		return (
			<div>
				<a style={aStyle} href="#">Contact Me</a>
			</div>
		);
	}
}
ContactLink = Radium(ContactLink);


class HomePage extends React.Component {
	render() {
		const pageStyle = {
			display: 'flex',
			alignItems: 'center'
		};
		const pageInnerStyle = {
			display: 'flex',
			//width: '100%'
		};
		const picContainerStyle = {
			minWidth: '45%'
		};
		const picStyle = {
			width: 250,
			height: 250,
			margin: 'auto',
			borderRadius: '50%',
			backgroundColor: 'rgb(200, 200, 200)'
		};
		const introContainerStyle = {
			flexGrow: 1
		};
		const hStyle = Object.assign({}, headingFontStyle, {
			fontSize: 64,
			paddingBottom: 60
		});
		const pStyle = Object.assign({}, bodyFontStyle, {
			paddingRight: 100,
			paddingBottom: 30
		});
		return (
			<Page style={pageStyle}>
				<div style={pageInnerStyle}>
					<div style={picContainerStyle}>
						<div style={picStyle}></div>
					</div>
					<div style={introContainerStyle}>
						<h1 style={hStyle}>Welcome</h1>
						<p style={pStyle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacus libero, pulvinar quis imperdiet ut, tempus sed tortor. Suspendisse in pulvinar tortor. Donec feugiat at quam quis sodales. Cras tellus lorem, porttitor ac pretium sit amet, vestibulum in neque. Sed.</p>
						<p style={pStyle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt nibh sapien, nec molestie leo.</p>
						<GithubProfileLink />
						<ContactLink />
					</div>
				</div>
			</Page>
		);
	}
}
HomePage = Radium(HomePage);


class ProjectPreview extends React.Component {
	render() {
		const picStyle = {
			width: 250,
			height: 250,
			display: 'flex',
			backgroundColor: '#9A9A9A'
		};
		const titleStyle = {
			fontSize: 24,
			padding: 10,
			width: '100%',
			color: colorScheme.body,
			backgroundColor: 'rgba(255, 255, 255, 0.5)',
			textAlign: 'center',
			alignSelf: 'flex-end'
		};
		return (
			<div>
				<div style={picStyle}>
					<div style={titleStyle}>Project</div>
				</div>
			</div>
		);
	}
}
ProjectPreview = Radium(ProjectPreview)


class ProjectDetails extends React.Component {
	render() {
	}
}



class ProjectsPage extends React.Component {
	render() {
		const ulStyle = {
			width: '80%',
			margin: 'auto',
			marginTop: 50,
			listStyle: 'none',
			display: 'flex',
			flexFlow: 'row wrap',
			justifyContent: 'space-between'
		};
		const liStyle = {};

		return (
			<Page heading="Projects">
				<ul style={ulStyle}>
					<li style={liStyle}>
						<ProjectPreview />
					</li>
					<li style={liStyle}>
						<ProjectPreview />
					</li>
					<li style={liStyle}>
						<ProjectPreview />
					</li>
				</ul>
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
