import React from 'react';

import PrimaryHeadingAtom from '../atoms/primary-heading';
import ProjectListOrg from '../organisms/project-list';


const baseStyles = {
	container: {
		margin: 'auto',
		minHeight: '100vh',
		width: '80%'
	}
}


export class ProjectsEco extends React.Component {
	render() {
		return (
			<div style={baseStyles.container}>
				<PrimaryHeadingAtom>Projects</PrimaryHeadingAtom>
				<ProjectListOrg />
			</div>
		);
	}
};

export default ProjectsEco;
