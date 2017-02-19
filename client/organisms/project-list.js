import { Project } from '../molecules/project';
import React from 'react';
import ReactDOM from 'react-dom';

const ulStyle = {
	listStyle: 'none',
	padding: 0,
	margin: 0
};

const liStyle = {};

export class ProjectList extends React.Component {
	render() {
		return (
			<ul style={ulStyle}>
				<li style={liStyle}>
					<Project />
				</li>
				<li style={liStyle}>
					<Project />
				</li>
				<li style={liStyle}>
					<Project />
				</li>
			</ul>
		);
	}
};
