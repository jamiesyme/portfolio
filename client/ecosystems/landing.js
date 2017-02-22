import React from 'react';

import AvatarAtom from '../atoms/avatar';
import LinkAtom from '../atoms/link';
import ParagraphAtom from '../atoms/paragraph';
import PrimaryHeadingAtom from '../atoms/primary-heading';


const baseStyles = {
	page: {
		alignItems: 'center',
		display: 'flex',
		margin: 'auto',
		minHeight: '100vh',
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
		const lorem1 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacus libero, pulvinar quis imperdiet ut, tempus sed tortor. Suspendisse in pulvinar tortor. Donec feugiat at quam quis sodales. Cras tellus lorem, porttitor ac pretium sit amet, vestibulum in neque. Sed.';
		const lorem2 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt nibh sapien, nec molestie leo.';
		return (
			<div style={baseStyles.page}>
				<div style={baseStyles.container}>
					<div style={baseStyles.picContainer}>
						<AvatarAtom />
					</div>
					<div style={baseStyles.introContainer}>
						<PrimaryHeadingAtom>Welcome</PrimaryHeadingAtom>
						<ParagraphAtom>{lorem1}</ParagraphAtom>
						<ParagraphAtom>{lorem2}</ParagraphAtom>
						<ParagraphAtom>
							<LinkAtom href="https://github.com/jamiesyme">Github</LinkAtom>
						</ParagraphAtom>
						<ParagraphAtom>
							<LinkAtom href="#">Contact Me</LinkAtom>
						</ParagraphAtom>
					</div>
				</div>
			</div>
		);
	}
};

export default LandingEco;
