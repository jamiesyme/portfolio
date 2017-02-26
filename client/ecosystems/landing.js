import React from 'react';

import AvatarAtom from '../atoms/avatar';
import LinkAtom from '../atoms/link';
import ParagraphAtom from '../atoms/paragraph';
import PrimaryHeadingAtom from '../atoms/primary-heading';

import { parseMarkdown } from '../utils/markdown';


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
		const bodyTree = parseMarkdown(this.props.body);
		const bodyElements = bodyTree.map((paragraph, index) => {
			const paragraphElements = paragraph.map((element, index) => {
				if (element.type === 'text') {
					return element.content;
				} else {
					return (
						<LinkAtom key={index.toString()}
											href={element.url}>
							{element.content}
						</LinkAtom>
					);
				}
			});
			return (
				<ParagraphAtom key={index.toString()}>
					{paragraphElements}
				</ParagraphAtom>
			);
		});

		return (
			<div style={baseStyles.page}>
				<div style={baseStyles.container}>
					<div style={baseStyles.picContainer}>
						<AvatarAtom />
					</div>
					<div style={baseStyles.introContainer}>
						<PrimaryHeadingAtom>{this.props.title}</PrimaryHeadingAtom>
						{bodyElements}
					</div>
				</div>
			</div>
		);
	}
};

export default LandingEco;


LandingEco.propTypes = {
	body: React.PropTypes.string,
	title: React.PropTypes.string
};
