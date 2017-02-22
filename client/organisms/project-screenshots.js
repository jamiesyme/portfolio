import React from 'react';
import ReactDOM from 'react-dom';

import PaddedListOrg from '../organisms/padded-list';
import ScreenshotAtom from '../atoms/screenshot';


const styles = {
	paddedList: {
		styles: {
			list: {
				padding: 20
			}
		},
		padding: 20 // Between screenshots
	},
	img: {
		width: 250,
		height: 250
	}
};


export class ProjectScreenshotsOrg extends React.Component {
	render() {
		const paddedListStyles = {
			list: Object.assign(
				{},
				styles.paddedList.styles.list,
				this.props.style
			),
			item: styles.paddedList.styles.item
		};

		const items = this.props.sources.map((src) => (
			<ScreenshotAtom style={styles.img} src={src} />
		));

		return (
			<PaddedListOrg
				styles={paddedListStyles}
				padding={styles.paddedList.padding}
				items={items} />
		);
	}
};

export default ProjectScreenshotsOrg;


ProjectScreenshotsOrg.propTypes = {
	sources: React.PropTypes.arrayOf(React.PropTypes.string)
};

ProjectScreenshotsOrg.defaultProps = {
	sources: []
};
