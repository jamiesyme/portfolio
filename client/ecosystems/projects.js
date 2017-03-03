import React from 'react';

import PrimaryHeadingAtom from '../atoms/primary-heading';
import ProjectListOrg from '../organisms/project-list';


const baseStyles = {
	section: {
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
			<section id={this.props.id}
							 style={baseStyles.section}>
				<PrimaryHeadingAtom>{this.props.title}</PrimaryHeadingAtom>
				<ProjectListOrg projects={this.props.projects} />
			</section>
		);
	}
};

export default ProjectsEco;


ProjectsEco.propTypes = {
	projects: ProjectListOrg.propTypes.projects,
	id: React.PropTypes.string,
	title: React.PropTypes.string
};
