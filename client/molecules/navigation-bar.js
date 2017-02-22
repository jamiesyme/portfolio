import React from 'react';

import NavigationLinkAtom from '../atoms/navigation-link';


export class NavigationBarMole extends React.Component {
	render() {
		return (
			<nav>
				<NavigationLinkAtom href="#" text="Home" accent={true}/>
				<NavigationLinkAtom href="#" text="Projects" />
				<NavigationLinkAtom href="#" text="About" />
				<NavigationLinkAtom href="#" text="Contact" />
			</nav>
		);
	}
};

export default NavigationBarMole;
