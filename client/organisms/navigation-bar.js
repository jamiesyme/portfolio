import React from 'react';

import NavigationLinkAtom from '../atoms/navigation-link';


export class NavigationBarOrg extends React.Component {
	render() {
		const linkElements = this.props.links.map((link, index) => {
			const key = index.toString();
			return (
				<NavigationLinkAtom key={key}
														accent={link.active}
														href={link.url}
														smoothScroll={true}
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
		text: React.PropTypes.string,
		url: React.PropTypes.string
	}))
};
