import React from 'react';
import ReactDOM from 'react-dom';

import ParagraphAtom from '../atoms/paragraph';
import ProjectOutlineOrg from '../organisms/project-outline';
import ProjectScreenshotsOrg from '../organisms/project-screenshots';
import SecondaryHeadingAtom from '../atoms/secondary-heading';


const styles = {
	project: {
		backgroundColor: 'white',
		overflow: 'auto',
		padding: 20
	},
	screenshots: {
		float: 'right'
	}
};


export class ProjectOrg extends React.Component {
	render() {
		return (
			<div style={styles.project}>
				<SecondaryHeadingAtom>{this.props.title}</SecondaryHeadingAtom>

				<ProjectScreenshotsOrg
					style={styles.screenshots}
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
