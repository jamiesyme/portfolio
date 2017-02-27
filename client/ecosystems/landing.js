import React from 'react';

import AvatarAtom from '../atoms/avatar';
import LinkAtom from '../atoms/link';
import ParagraphAtom from '../atoms/paragraph';
import PrimaryHeadingAtom from '../atoms/primary-heading';

import { markdownToReact } from '../utils/react';


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
		const bodyElements = markdownToReact(this.props.body);

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
