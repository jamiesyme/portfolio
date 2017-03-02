import React from 'react';

import PrimaryHeadingAtom from '../atoms/primary-heading';
import ProjectListOrg from '../organisms/project-list';


const baseStyles = {
	container: {
		boxSizing: 'border-box',
		margin: 'auto',
		minHeight: 'calc(100vh - 64px)',
		paddingTop: '50px',
		paddingBottom: '100px',
		width: '80%'
	}
};


export class ProjectsEco extends React.Component {
	render() {
		return (
			<div style={baseStyles.container}>
				<PrimaryHeadingAtom>{this.props.title}</PrimaryHeadingAtom>
				<ProjectListOrg projects={this.props.projects} />
			</div>
		);
	}
};

export default ProjectsEco;


ProjectsEco.propTypes = {
	projects: ProjectListOrg.propTypes.projects,
	title: React.PropTypes.string
};
