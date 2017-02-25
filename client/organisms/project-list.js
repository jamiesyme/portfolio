import React from 'react';

import PaddedListOrg from '../organisms/padded-list';
import ProjectOrg from '../organisms/project';


const projectPadding = 20;

const baseStyles = {
	list: {
		list: {
			padding: projectPadding
		}
	}
};


export class ProjectListOrg extends React.Component {
	render() {
		const items = this.props.projects.map((project, index) => (
			<ProjectOrg key={index.toString()} {...project} />
		));

		return (
			<PaddedListOrg
				styles={baseStyles.list}
				padding={projectPadding}
				items={items} />
		);
	}
};

export default ProjectListOrg;


ProjectListOrg.propTypes = {
	projects: React.PropTypes.arrayOf(
		React.PropTypes.shape(ProjectOrg.propTypes)
	)
};
