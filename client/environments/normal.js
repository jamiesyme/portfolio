import $ from 'jquery';
import React from 'react';
import Toml from 'toml';

import AboutEco from '../ecosystems/about';
import ContactEco from '../ecosystems/contact';
import HeaderEco from '../ecosystems/header';
import LandingEco from '../ecosystems/landing';
import ProjectsEco from '../ecosystems/projects';


export class NormalEnv extends React.Component {
	constructor() {
		super();
		const self = this;
		$.get('f/content.toml', (data) => {
			self.setState({
				content: Toml.parse(data)
			});
		});
	}

	render() {
		if (!this.state || !this.state.content) {
			return null;
		}

		const landingInfo = Object.assign({}, this.state.content.landing);

		const projectsInfo = Object.assign(
			{},
			this.state.content.projects,
			{ projects: [] }
		);
		for (let i = 0; !!this.state.content.projects[i.toString()]; ++i) {
			projectsInfo.projects.push(this.state.content.projects[i.toString()]);
		}

		const contactInfo = Object.assign({}, this.state.content.contact);

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
