import React from 'react';

import AboutEco from '../ecosystems/about';
import ContactEco from '../ecosystems/contact';
import HeaderEco from '../ecosystems/header';
import LandingEco from '../ecosystems/landing';
import ProjectsEco from '../ecosystems/projects';


export class NormalEnv extends React.Component {
	render() {
		return (
			<div>
				<HeaderEco />
				<LandingEco />
				<ProjectsEco />
				<AboutEco />
				<ContactEco />
			</div>
		);
	}
};

export default NormalEnv;
