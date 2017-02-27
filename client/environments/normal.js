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
					body={`
My name's Jamie and I'm a developer of things. While my experience generally lies in desktop applications and backend web development, my passion is more general: I like bending computers to my will.

I'm currently in my third-year at UFV. If interested, there's a whole section [about me](#) below.

Perhaps you'd like to peruse my [recent projects](#)?

Or you can find all of my projects on [Github](https://github.com/jamiesyme).`
					} />

				<ProjectsEco
					title="Projects"
					projects={[
						{
							details: `
I developed Minfo because I was tired of my default, ugly status bar sitting at the bottom of my desktop. I tried customizing it, but it never felt like it belonged. I tried Conky as well, which was a lot more flexible, but it still didn't behave how I wanted. So I decided to write something custom.

Minfo is hidden 95% of the time, unlike my status bar was, which means all of my apps can run fullscreen without distractions. When I need to see the time or some other info, I can press a key (configured in my i3 configuration) to toggle the window on or off.

To achieve this, I split Minfo into two apps: the server (minfo) and the client (minfo-msg). The server is launched on startup, and then the client can be used either from a terminal, or it can be bound to keys in your window manager configuration. The IPC is done over a TCP socket; I could change this to a UNIX domain socket, but TCP works fine for now.

The code was split into a few different components:
+ Surface - wraps all of the Xlib functionality
+ Radio - wraps all of the socket functionality
+ Hub - manages modules and any drawing that's done, as well as manages the Surface
+ Module - a unit of info to be rendered (examples: time module, audio module, etc.)

The goal behind the design of the code was to make it as easy as possible to implement new types of modules. As an example, here are the [header](https://github.com/jamiesyme/minfo/blob/master/src/audio-module.h) and [source](https://github.com/jamiesyme/minfo/blob/master/src/audio-module.c) files for the audio module. The header contains a single function declaration, and the source file is a little over 100 lines long.
`,
							languages: ['C', 'Xlib', 'Cairo/Pango', 'Make'],
							screenshots: ['', ''],
							summary: "Minfo is a lightweight status hub the X Window System. It's goal is to provide easy access to basic info like the time and date, while remaining as unintrusive as possible.",
							title: 'Minfo',
							when: 'Jan \'17 - Present',
							where: [{
								text: 'Github',
								url: 'https://github.com/jamiesyme/minfo'
							}]
						}
					]} />

				<AboutEco
					title="About"
					body={[
					]}/>

				<ContactEco
					title="Contact"
					body={[
					]}/>
			</div>
		);
	}
};

export default LoremEnv;
