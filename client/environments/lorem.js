import React from 'react';

import AboutEco from '../ecosystems/about';
import ContactEco from '../ecosystems/contact';
import HeaderEco from '../ecosystems/header';
import LandingEco from '../ecosystems/landing';
import ProjectsEco from '../ecosystems/projects';


export class LoremEnv extends React.Component {
	render() {
		const exampleProj = {
			details: ['Details.'],
			languages: ['lang1', 'lang2'],
			screenshots: ['', ''],
			summary: 'Summary.',
			title: 'Title',
			when: 'When',
			where: [{
				text: 'Link',
				url: '#'
			}]
		};

		return (
			<div>
				<HeaderEco
					links={[
						{
							active: true,
							text: 'Home',
							url: '#'
						}, {
							active: false,
							text: 'Projects',
							url: '#'
						}, {
							active: false,
							text: 'About',
							url: '#'
						}, {
							active: false,
							text: 'Contact',
							url: '#'
						},
					]} />

				<LandingEco
					title="Welcome"
					body={[
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacus libero, pulvinar quis imperdiet ut, tempus sed tortor. Suspendisse in pulvinar tortor. Donec feugiat at quam quis sodales. Cras tellus lorem, porttitor ac pretium sit amet, vestibulum in neque. Sed',
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt nibh sapien, nec molestie leo.'
					]} />

				<ProjectsEco
					projects={[
						exampleProj,
						exampleProj,
						exampleProj
					]} />

				<AboutEco />

				<ContactEco />
			</div>
		);
	}
};

export default LoremEnv;
