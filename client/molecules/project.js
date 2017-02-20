import React from 'react';
import ReactDOM from 'react-dom';

import LinkAtom from '../atoms/link';
import ParagraphAtom from '../atoms/paragraph';
import SecondaryHeadingAtom from '../atoms/secondary-heading';
import ScreenshotAtom from '../atoms/screenshot';


const flexStyle = {
	display: 'flex'
};

const growStyle = {
	flexGrow: 1
};


export class ProjectMole extends React.Component {
	render() {
		return (
			<div>
				<SecondaryHeadingAtom>Minfo</SecondaryHeadingAtom>
				<div style={flexStyle}>
					<div style={growStyle}>
						<ParagraphAtom>
							<strong>Overview:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus ultricies elit eu laoreet. Sed id urna faucibus, interdum turpis.
						</ParagraphAtom>
						<ParagraphAtom>
							<strong>Languages:</strong> C, Xlib, Cairo/Pango, Make
						</ParagraphAtom>
						<ParagraphAtom>
							<strong>When:</strong> Jan '17 - Present
						</ParagraphAtom>
						<ParagraphAtom>
							<strong>Where:</strong> <LinkAtom href="https://github.com/jamiesyme/minfo">Github</LinkAtom>
						</ParagraphAtom>
						<ParagraphAtom>
							<strong>Details:</strong>
						</ParagraphAtom>
					</div>
					<div>
						<ScreenshotAtom />
					</div>
				</div>
			</div>
		);
	}
};

export default ProjectMole;
