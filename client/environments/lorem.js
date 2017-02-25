import React from 'react';

import AboutEco from '../ecosystems/about';
import ContactEco from '../ecosystems/contact';
import HeaderEco from '../ecosystems/header';
import LandingEco from '../ecosystems/landing';
import ProjectsEco from '../ecosystems/projects';


export class LoremEnv extends React.Component {
	render() {
		return (
			<div>
				<HeaderEco />
				<LandingEco
					title="Welcome"
					body={[
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacus libero, pulvinar quis imperdiet ut, tempus sed tortor. Suspendisse in pulvinar tortor. Donec feugiat at quam quis sodales. Cras tellus lorem, porttitor ac pretium sit amet, vestibulum in neque. Sed',
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt nibh sapien, nec molestie leo.'
					]} />
				<ProjectsEco />
				<AboutEco />
				<ContactEco />
			</div>
		);
	}
};

export default LoremEnv;
