import { PrimaryHeading } from '../atoms/primary-heading';
import { ProjectList } from '../organisms/project-list';
import React from 'react';
import ReactDOM from 'react-dom';

const fullStyle = {
	margin: 'auto',
	minHeight: '100vh',
	width: '80%'
};

export class Projects extends React.Component {
	render() {
		return (
			<div style={fullStyle}>
				<PrimaryHeading>Projects</PrimaryHeading>
				<ProjectList />
			</div>
		);
	}
};
