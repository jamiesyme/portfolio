import React from 'react';

import ParagraphAtom from '../atoms/paragraph';
import ProjectOutlineOrg from '../organisms/project-outline';
import ProjectScreenshotListOrg from '../organisms/project-screenshot-list';
import SecondaryHeadingAtom from '../atoms/secondary-heading';


const baseStyles = {
	project: {
		backgroundColor: 'white',
		border: '1px solid #CCC',
		overflow: 'auto',
		padding: 30
	},
	screenshots: {
		float: 'right'
	}
};


export class ProjectOrg extends React.Component {
	render() {
		return (
			<div style={baseStyles.project}>
				<SecondaryHeadingAtom>{this.props.title}</SecondaryHeadingAtom>

				<ProjectScreenshotListOrg
					style={baseStyles.screenshots}
					sources={this.props.screenshots} />

				<ParagraphAtom>{this.props.summary}</ParagraphAtom>

				<ProjectOutlineOrg
					languages={this.props.languages}
					when={this.props.when}
					where={this.props.where} />

				<ParagraphAtom>{this.props.details}</ParagraphAtom>
			</div>
		);
	}
};

export default ProjectOrg;


ProjectOrg.propTypes = {
	details: React.PropTypes.arrayOf(React.PropTypes.string),
	languages: React.PropTypes.arrayOf(React.PropTypes.string),
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
	details: ['Details.'],
	languages: ['lang1', 'lang2'],
	screenshots: ['', ''],
	summary: 'Summary.',
	title: 'Title',
	when: 'When',
	where: [{
		text: 'Link',
		url: '#'
	}]
};
