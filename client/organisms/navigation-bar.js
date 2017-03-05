import React from 'react';

import NavigationLinkAtom from '../atoms/navigation-link';


export class NavigationBarOrg extends React.Component {
	render() {
		const linkElements = this.props.links.map((link, index) => {
			const key = index.toString();
			return (
				<NavigationLinkAtom key={key} {...link} />
			);
		});

		return (
			<nav>
				{linkElements}
			</nav>
		);
	}
};

export default NavigationBarOrg;


NavigationBarOrg.propTypes = {
	links: React.PropTypes.arrayOf(
		React.PropTypes.shape(NavigationLinkAtom.propTypes)
	)
};
