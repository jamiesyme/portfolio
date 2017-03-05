import $ from 'jquery';
import React from 'react';
import Toml from 'toml';

import AboutEco from '../ecosystems/about';
import ContactEco from '../ecosystems/contact';
import HeaderEco from '../ecosystems/header';
import LandingEco from '../ecosystems/landing';
import ProjectsEco from '../ecosystems/projects';


const ContentRaw = require('../public/content.toml');
const Content = Toml.parse(ContentRaw);


export class NormalEnv extends React.Component {
	render() {
		const landingInfo = Object.assign({}, Content.landing);

		const projectsInfo = Object.assign(
			{},
			Content.projects,
			{ projects: [] }
		);
		for (let i = 0; !!Content.projects[i.toString()]; ++i) {
			projectsInfo.projects.push(Content.projects[i.toString()]);
		}

		const contactInfo = Object.assign({}, Content.contact);

		return (
			<div>
				<HeaderEco
					links={[
						{
							targetId: landingInfo.id,
							text: 'Home'
						}, {
							targetId: projectsInfo.id,
							text: 'Projects'
						}, /*{
							targetId: aboutInfo.id,
							text: 'About'
						},*/ {
							targetId: contactInfo.id,
							text: 'Contact'
						}, {
							url: 'f/resume.pdf',
							text: 'Resume'
						}
					]} />

				<LandingEco {...landingInfo} />

				<ProjectsEco {...projectsInfo} />

				{/*<AboutEco {...aboutInfo} />*/}

				<ContactEco {...contactInfo} />
			</div>
		);
	}
};

export default NormalEnv;
