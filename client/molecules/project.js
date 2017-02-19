import { Link } from '../atoms/link';
import { Paragraph } from '../atoms/paragraph';
import { SecondaryHeading } from '../atoms/secondary-heading';
import { Screenshot } from '../atoms/screenshot';
import React from 'react';
import ReactDOM from 'react-dom';

const flexStyle = {
	display: 'flex'
};

const growStyle = {
	flexGrow: 1
};

export class Project extends React.Component {
	render() {
		return (
			<div>
				<SecondaryHeading>Minfo</SecondaryHeading>
				<div style={flexStyle}>
					<div style={growStyle}>
						<Paragraph>
							<strong>Overview:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus ultricies elit eu laoreet. Sed id urna faucibus, interdum turpis.
						</Paragraph>
						<Paragraph>
							<strong>Languages:</strong> C, Xlib, Cairo/Pango, Make
						</Paragraph>
						<Paragraph>
							<strong>When:</strong> Jan '17 - Present
						</Paragraph>
						<Paragraph>
							<strong>Where:</strong> <Link href="https://github.com/jamiesyme/minfo">Github</Link>
						</Paragraph>
						<Paragraph>
							<strong>Details:</strong>
						</Paragraph>
					</div>
					<div>
						<Screenshot />
					</div>
				</div>
			</div>
		);
	}
};
