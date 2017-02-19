import { About } from '../ecosystems/about';
import { Contact } from '../ecosystems/contact';
import { Header } from '../ecosystems/header';
import { Landing } from '../ecosystems/landing';
import { Projects } from '../ecosystems/projects';
import React from 'react';
import ReactDOM from 'react-dom';

export class Normal extends React.Component {
	render() {
		return (
			<div>
				<Header />
				<Landing />
				<Projects />
				<About />
				<Contact />
			</div>
		);
	}
};
