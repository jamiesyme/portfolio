import React from 'react';

import PaddedListOrg from '../organisms/padded-list';
import ScreenshotAtom from '../atoms/screenshot';


const screenshotPadding = 20;

const baseStyles = {
	list: {},
	img: {
		height: 'auto',
		margin: 0,
		width: 250
	}
};


export class ProjectScreenshotListOrg extends React.Component {
	render() {
		const listStyles = {
			list: Object.assign(
				{},
				baseStyles.list.list,
				this.props.style
			),
			item: baseStyles.list.item
		};

		const items = this.props.sources.map((src) => (
			<ScreenshotAtom style={baseStyles.img} src={src} />
		));

		return (
			<PaddedListOrg
				styles={listStyles}
				padding={screenshotPadding}
				items={items} />
		);
	}
};

export default ProjectScreenshotListOrg;


ProjectScreenshotListOrg.propTypes = {
	sources: React.PropTypes.arrayOf(React.PropTypes.string)
};

ProjectScreenshotListOrg.defaultProps = {
	sources: []
};
