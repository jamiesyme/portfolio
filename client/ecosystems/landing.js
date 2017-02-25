import React from 'react';

import AvatarAtom from '../atoms/avatar';
import LinkAtom from '../atoms/link';
import ParagraphAtom from '../atoms/paragraph';
import PrimaryHeadingAtom from '../atoms/primary-heading';


const baseStyles = {
	page: {
		alignItems: 'center',
		boxSizing: 'border-box',
		display: 'flex',
		margin: 'auto',
		minHeight: 'calc(100vh - 64px)',
		paddingBottom: '150px',
		marginTop: '64px', // Header size
		width: '80%'
	},
	container: {
		display: 'flex'
	},
	picContainer: {
		minWidth: '40%'
	},
	introContainer: {
		flexGrow: 1
	}
};


export class LandingEco extends React.Component {
	render() {
		const bodyElements = this.props.body.map(pBody => (
			<ParagraphAtom>{pBody}</ParagraphAtom>
		));

		const linkElements = this.props.links.map(link => (
			<ParagraphAtom>
				<LinkAtom href={link.url}>{link.text}</LinkAtom>
			</ParagraphAtom>
		));

		return (
			<div style={baseStyles.page}>
				<div style={baseStyles.container}>
					<div style={baseStyles.picContainer}>
						<AvatarAtom />
					</div>
					<div style={baseStyles.introContainer}>
						<PrimaryHeadingAtom>{this.props.title}</PrimaryHeadingAtom>
						{bodyElements}
						{linkElements}
					</div>
				</div>
			</div>
		);
	}
};

export default LandingEco;


LandingEco.propTypes = {
	title: React.PropTypes.string,
	body: React.PropTypes.arrayOf(React.PropTypes.string),
	links: React.PropTypes.arrayOf(React.PropTypes.shape({
		text: React.PropTypes.string,
		url: React.PropTypes.string
	}))
};

LandingEco.defaultProps = {
	title: 'Landing',
	body: ['paragraph1', 'paragraph2'],
	links: [
		{
			text: 'url1',
			url: '#'
		},
		{
			text: 'url2',
			url: '#'
		}
	]
};
