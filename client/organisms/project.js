import React from 'react';

import ProjectOutlineOrg from '../organisms/project-outline';
import ProjectScreenshotListOrg from '../organisms/project-screenshot-list';
import SecondaryHeadingAtom from '../atoms/secondary-heading';

import { markdownToReact } from '../utils/react';


const baseStyles = {
	project: {
		backgroundColor: 'white',
		border: '1px solid #CCC',
		overflow: 'auto',
		padding: 30
	},
	screenshots: {
		float: 'right',
		marginLeft: 30,
		marginBottom: 30
	}
};


export class ProjectOrg extends React.Component {
	render() {
		const summaryElements = markdownToReact(this.props.summary);
		const detailsElements = markdownToReact(this.props.details);

		return (
			<div style={baseStyles.project}>
				<SecondaryHeadingAtom>{this.props.title}</SecondaryHeadingAtom>

				<ProjectScreenshotListOrg
					style={baseStyles.screenshots}
					sources={this.props.screenshots} />

				{summaryElements}

				<ProjectOutlineOrg
					stack={this.props.stack}
					when={this.props.when}
					where={this.props.where} />

				{detailsElements}
			</div>
		);
	}
};

export default ProjectOrg;


ProjectOrg.propTypes = {
	details: React.PropTypes.string,
	stack: React.PropTypes.arrayOf(React.PropTypes.string),
	screenshots: React.PropTypes.arrayOf(React.PropTypes.string),
	summary: React.PropTypes.string,
	title: React.PropTypes.string,
	when: React.PropTypes.string,
	where: React.PropTypes.arrayOf(React.PropTypes.shape({
		text: React.PropTypes.string,
		url: React.PropTypes.string
	}))
};

ProjectOrg.defaultProps = {
	languages: [],
	screenshots: [],
	where: []
};
