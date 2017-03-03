import React from 'react';

import LinkAtom from '../atoms/link';
import ParagraphAtom from '../atoms/paragraph';
import PictureAtom from '../atoms/picture';
import PrimaryHeadingAtom from '../atoms/primary-heading';

import { markdownToReact } from '../utils/react';


const baseStyles = {
	container: {
		display: 'flex'
	},
	introContainer: {
		flexGrow: 1
	},
	pictureContainer: {
		minWidth: '40%'
	},
	picture: {
		size: 250
	},
	section: {
		alignItems: 'center',
		boxSizing: 'border-box',
		display: 'flex',
		margin: 'auto',
		minHeight: 'calc(100vh - 64px)',
		paddingBottom: '100px',
		marginTop: '64px', // Header size
		width: '80%'
	}
};


export class LandingEco extends React.Component {
	render() {
		const bodyElements = markdownToReact(this.props.body);

		return (
			<section id={this.props.id}
							 style={baseStyles.section}>
				<div style={baseStyles.container}>
					<div style={baseStyles.pictureContainer}>
						<PictureAtom size={baseStyles.picture.size} />
					</div>
					<div style={baseStyles.introContainer}>
						<PrimaryHeadingAtom>{this.props.title}</PrimaryHeadingAtom>
						{bodyElements}
					</div>
				</div>
			</section>
		);
	}
};

export default LandingEco;


LandingEco.propTypes = {
	body: React.PropTypes.string,
	id: React.PropTypes.string,
	title: React.PropTypes.string
};
