import React from 'react';
import ReactDOM from 'react-dom';

import ProjectOutlineOrg from '../organisms/project-outline';
import SecondaryHeadingAtom from '../atoms/secondary-heading';
import ScreenshotAtom from '../atoms/screenshot';


const styles = {
	container: {
		display: 'flex'
	},
	outline: {
		flexGrow: 1
	}
};


export class ProjectOrg extends React.Component {
	render() {
		return (
			<div>
				<SecondaryHeadingAtom>Minfo</SecondaryHeadingAtom>
				<div style={styles.container}>
					<ProjectOutlineOrg style={styles.outline} />
					<div>
						<ScreenshotAtom />
					</div>
				</div>
			</div>
		);
	}
};

export default ProjectOrg;
