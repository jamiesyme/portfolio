import React from 'react';
import ReactDOM from 'react-dom';

import AvatarAtom from '../atoms/avatar';
import LinkAtom from '../atoms/link';
import ParagraphAtom from '../atoms/paragraph';
import PrimaryHeadingAtom from '../atoms/primary-heading';


const fullStyle = {
	alignItems: 'center',
	display: 'flex',
	margin: 'auto',
	minHeight: '100vh',
	width: '80%'
};

const contentContainerStyle = {
	display: 'flex'
};

const picContainerStyle = {
	minWidth: '40%'
};

const introContainerStyle = {
	flexGrow: 1
};


export class LandingEco extends React.Component {
	render() {
		const lorem1 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacus libero, pulvinar quis imperdiet ut, tempus sed tortor. Suspendisse in pulvinar tortor. Donec feugiat at quam quis sodales. Cras tellus lorem, porttitor ac pretium sit amet, vestibulum in neque. Sed.';
		const lorem2 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt nibh sapien, nec molestie leo.';
		return (
			<div style={fullStyle}>
				<div style={contentContainerStyle}>
					<div style={picContainerStyle}>
						<AvatarAtom />
					</div>
					<div style={introContainerStyle}>
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
