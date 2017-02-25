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
					title="Projects"
					projects={[
						exampleProj,
						exampleProj,
						exampleProj
					]} />

				<AboutEco
					title="About"
					body={[
						{
							content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut erat vitae turpis fringilla ornare non id leo. Phasellus lacinia turpis non velit lobortis dictum. Integer tempor, mauris sit amet consequat maximus, felis justo sollicitudin turpis, a cursus nulla massa in turpis. Maecenas nibh quam, finibus ornare malesuada ut, tincidunt eget dui. Pellentesque lacinia faucibus nibh, quis ornare nunc venenatis id. Maecenas eget nulla vel lorem hendrerit scelerisque sed in nisi. Curabitur pulvinar felis non purus iaculis viverra. Nulla euismod turpis non lacinia tincidunt. Nam eget scelerisque quam. Fusce a sodales lacus. Nam iaculis eget sapien vitae ornare. Donec ullamcorper eros eleifend eleifend ultrices.'
						}, {
							content: 'Quisque fringilla sapien odio, et pretium arcu fermentum sit amet. Phasellus purus arcu, porta ultricies luctus quis, condimentum vitae ipsum. Ut id urna eget nisi varius cursus. Praesent varius finibus vehicula. Nunc vitae augue in ipsum cursus vulputate. Nulla feugiat nulla ut mauris vulputate, eget posuere lectus rhoncus. Praesent imperdiet mauris eu urna consequat scelerisque sed ut tortor. Aliquam suscipit purus ac lectus egestas, at imperdiet ipsum consectetur. Aenean quam ex, vehicula quis risus id, congue accumsan sapien. Sed ante augue, commodo ut faucibus id, consequat nec ex. Vestibulum eu velit malesuada, vulputate velit sed, fermentum lectus. Suspendisse tincidunt justo non leo viverra maximus. Aliquam feugiat lacus vitae est condimentum, vel dignissim dolor dictum.'
						}
					]}/>

				<ContactEco
					title="Contact"
					body={[
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut erat vitae turpis fringilla ornare non id leo. Phasellus lacinia turpis non velit lobortis dictum. Integer tempor, mauris sit amet consequat maximus, felis justo sollicitudin turpis, a cursus nulla massa in turpis. Maecenas nibh quam, finibus ornare malesuada ut, tincidunt eget dui. Pellentesque lacinia faucibus nibh, quis ornare nunc venenatis id. Maecenas eget nulla vel lorem hendrerit scelerisque sed in nisi. Curabitur pulvinar felis non purus iaculis viverra. Nulla euismod turpis non lacinia tincidunt. Nam eget scelerisque quam. Fusce a sodales lacus. Nam iaculis eget sapien vitae ornare. Donec ullamcorper eros eleifend eleifend ultrices.',
						'Quisque fringilla sapien odio, et pretium arcu fermentum sit amet. Phasellus purus arcu, porta ultricies luctus quis, condimentum vitae ipsum. Ut id urna eget nisi varius cursus. Praesent varius finibus vehicula. Nunc vitae augue in ipsum cursus vulputate. Nulla feugiat nulla ut mauris vulputate, eget posuere lectus rhoncus. Praesent imperdiet mauris eu urna consequat scelerisque sed ut tortor. Aliquam suscipit purus ac lectus egestas, at imperdiet ipsum consectetur. Aenean quam ex, vehicula quis risus id, congue accumsan sapien. Sed ante augue, commodo ut faucibus id, consequat nec ex. Vestibulum eu velit malesuada, vulputate velit sed, fermentum lectus. Suspendisse tincidunt justo non leo viverra maximus. Aliquam feugiat lacus vitae est condimentum, vel dignissim dolor dictum.'
					]}/>
			</div>
		);
	}
};

export default LoremEnv;
