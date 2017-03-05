import React from 'react';

import LinkAtom from '../atoms/link';
import ParagraphAtom from '../atoms/paragraph';
import PictureAtom from '../atoms/picture';
import PrimaryHeadingAtom from '../atoms/primary-heading';
import SectionAtom from '../atoms/section';

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
		display: 'flex',
		paddingTop: 0,
		marginTop: '64px' // Header size
	}
};


export class LandingEco extends React.Component {
	render() {
		const bodyElements = markdownToReact(this.props.body);

		return (
			<SectionAtom id={this.props.id}
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
			</SectionAtom>
		);
	}
};

export default LandingEco;


LandingEco.propTypes = {
	body: React.PropTypes.string,
	id: React.PropTypes.string,
	title: React.PropTypes.string
};
