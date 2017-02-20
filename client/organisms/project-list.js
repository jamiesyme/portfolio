import React from 'react';
import ReactDOM from 'react-dom';

import ProjectOrg from '../organisms/project';


const styles = {
	list: {
		listStyle: 'none',
		padding: 0,
		margin: 0
	},
	item: {}
};


export class ProjectListOrg extends React.Component {
	render() {
		return (
			<ul style={styles.list}>
				<li style={styles.item}>
					<ProjectOrg />
				</li>
				<li style={styles.item}>
					<ProjectOrg />
				</li>
				<li style={styles.item}>
					<ProjectOrg />
				</li>
			</ul>
		);
	}
};

export default ProjectListOrg;
