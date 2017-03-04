import React from 'react';

import NavigationLinkAtom from '../atoms/navigation-link';


export class NavigationBarOrg extends React.Component {
	render() {
		const linkElements = this.props.links.map((link, index) => {
			const key = index.toString();
			return (
				<NavigationLinkAtom key={key}
														active={link.active}
														externalUrl={link.externalUrl}
														targetId={link.targetId}
														text={link.text} />
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
	links: React.PropTypes.arrayOf(React.PropTypes.shape({
		active: React.PropTypes.bool,
		externalUrl: React.PropTypes.string,
		targetId: React.PropTypes.string, // If externalUrl is not specified
		text: React.PropTypes.string
	}))
};
