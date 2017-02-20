import React from 'react';
import ReactDOM from 'react-dom';

import ProjectMole from '../molecules/project';


const ulStyle = {
	listStyle: 'none',
	padding: 0,
	margin: 0
};

const liStyle = {};

export class ProjectListOrg extends React.Component {
	render() {
		return (
			<ul style={ulStyle}>
				<li style={liStyle}>
					<ProjectMole />
				</li>
				<li style={liStyle}>
					<ProjectMole />
				</li>
				<li style={liStyle}>
					<ProjectMole />
				</li>
			</ul>
		);
	}
};

export default ProjectListOrg;
