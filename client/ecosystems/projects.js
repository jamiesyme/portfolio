import React from 'react';
import ReactDOM from 'react-dom';

import PrimaryHeadingAtom from '../atoms/primary-heading';
import ProjectListOrg from '../organisms/project-list';

const style = {
	margin: 'auto',
	minHeight: '100vh',
	width: '80%'
};

export class ProjectsEco extends React.Component {
	render() {
		return (
			<div style={style}>
				<PrimaryHeadingAtom>Projects</PrimaryHeadingAtom>
				<ProjectListOrg />
			</div>
		);
	}
};

export default ProjectsEco;
