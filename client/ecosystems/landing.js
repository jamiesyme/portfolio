import { Avatar } from '../atoms/avatar';
import { Link } from '../atoms/link';
import { Paragraph } from '../atoms/paragraph';
import { PrimaryHeading } from '../atoms/primary-heading';
import React from 'react';
import ReactDOM from 'react-dom';

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

export class Landing extends React.Component {
	render() {
		return (
			<div style={fullStyle}>
				<div style={contentContainerStyle}>
					<div style={picContainerStyle}>
						<Avatar />
					</div>
					<div style={introContainerStyle}>
						<PrimaryHeading>Welcome</PrimaryHeading>
						<Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacus libero, pulvinar quis imperdiet ut, tempus sed tortor. Suspendisse in pulvinar tortor. Donec feugiat at quam quis sodales. Cras tellus lorem, porttitor ac pretium sit amet, vestibulum in neque. Sed.</Paragraph>
						<Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt nibh sapien, nec molestie leo.</Paragraph>
						<Paragraph>
							<Link href="https://github.com/jamiesyme">Github</Link>
						</Paragraph>
						<Paragraph>
							<Link href="#">Contact Me</Link>
						</Paragraph>
					</div>
				</div>
			</div>
		);
	}
};
