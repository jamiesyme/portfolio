import { NavLink } from '../atoms/nav-link';
import React from 'react';
import ReactDOM from 'react-dom';

export class NavBar extends React.Component {
	render() {
		return (
			<nav>
				<NavLink href="#" text="Home" accent="true" />
				<NavLink href="#" text="Projects" />
				<NavLink href="#" text="About" />
				<NavLink href="#" text="Contact" />
			</nav>
		);
	}
};
