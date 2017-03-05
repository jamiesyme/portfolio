import React from 'react';

import PrimaryHeadingAtom from '../atoms/primary-heading';
import ProjectListOrg from '../organisms/project-list';
import SectionAtom from '../atoms/section';


export class ProjectsEco extends React.Component {
	render() {
		return (
			<SectionAtom id={this.props.id}>
				<PrimaryHeadingAtom>{this.props.title}</PrimaryHeadingAtom>
				<ProjectListOrg projects={this.props.projects} />
			</SectionAtom>
		);
	}
};

export default ProjectsEco;


ProjectsEco.propTypes = {
	id: React.PropTypes.string,
	projects: ProjectListOrg.propTypes.projects,
	title: React.PropTypes.string
};
