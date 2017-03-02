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
My name's Jamie, and I'm a developer of things. While my experience generally lies in desktop applications and backend web development, my passion is more general: I like exploiting a computer's ability to do things for me.

I'm a third-year CIS student at UFV. Todo: more personal hook. If interested, there's a whole section [about me](#) below.

[Projects](#) - Check out some of my recent projects.

[Github](https://github.com/jamiesyme) - Browse all of my public projects.

[Contact](#) - Let's chat!
					`} />

				<ProjectsEco
					title="Projects"
					projects={[
						{
							details: `
I developed Minfo because I was tired of my default, ugly status bar sitting at the bottom of my desktop. I tried customizing it, but it never felt like it belonged. I tried Conky as well, which was a lot more flexible, but it still didn't behave how I wanted. So I decided to write something custom.

My old status bar was always visible and always consuming space, but I only needed it periodically. Minfo, however, is hidden about 95% of the time, which means all of my apps can run fullscreen without distractions. When I need to see the time or some other info, I can press a key (configured in my i3 configuration file) to toggle the window on or off.

To achieve this, I split Minfo into two separate apps: the server (minfo) and the client (minfo-msg). The server is launched on startup, and then the client can be used either from a terminal, or it can be bound to keys in your window manager configuration. The IPC is done over a TCP socket; I could change this to a UNIX domain socket, but TCP works fine for now.

The code was split into a few different components:
+ Surface - wraps all of the Xlib functionality
+ Radio - wraps all of the socket functionality
+ Hub - manages modules and any drawing that's done, as well as manages the Surface
+ Module - a unit of info to be rendered (examples: time module, audio module, etc.)

The goal behind the design of the code was to make it as easy as possible to implement new types of modules. As an example, here are the [header](https://github.com/jamiesyme/minfo/blob/master/src/audio-module.h) and [source](https://github.com/jamiesyme/minfo/blob/master/src/audio-module.c) files for the audio module. The header contains a single function declaration, and the source file is a little over 100 lines long. While LoC isn't the best metric for complexity, it gives a rough idea.
`,
							languages: ['C', 'Xlib', 'Cairo/Pango', 'Make'],
							screenshots: ['', ''],
							summary: "Minfo is a lightweight status hub the X Window System. It's goal is to provide easy access to basic info like the time and date, while remaining as unintrusive as possible.",
							title: 'Minfo',
							when: "Jan '17 - Present",
							where: [{
								text: 'Github',
								url: 'https://github.com/jamiesyme/minfo'
							}]

						}, {
							details: `TODO: write description.`,
							languages: ['JavaScript', 'React', 'Node.js', 'Yarn', 'Babel'],
							screenshots: ['', ''],
							summary: "[jamiesyme.com](localhost:8080) is my online portfolio. It's goal is to showcase my recent work, to tell employers a little about who I am, and to provide a means of contact.",
							title: 'jamiesyme.com',
							when: "Feb '17 - Present",
							where: [{
								text: 'jamiesyme.com',
								url: 'localhost:8080'
							}, {
								text: 'Github',
								url: 'https://github.com/jamiesyme/portfolio'
							}]

						}, {
							details: `TODO: write description. Based on Doom, more analagous to Wolfenstein 3D.`,
							languages: ['JavaScript'],
							screenshots: ['', ''],
							summary: "JDoom is a 3D ray casting rendering demo. It uses the player's horizontal position and angle within a 2D grid of walls to simulate a 3D environment.",
							title: 'JDoom',
							when: "Oct '15 - Nov '15",
							where: [{
								text: 'Github',
								url: 'https://github.com/jamiesyme/JDoom'
							}]
						}
					]} />

				<AboutEco
					title="About"
					body={[
						{
							content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sapien nunc, ultricies eget turpis sed, dapibus tempus libero. Vestibulum in sem velit. Donec sed urna quis tellus rhoncus imperdiet. Integer interdum pretium purus at molestie. Cras et nibh quis mauris scelerisque mollis quis quis risus. Curabitur porta, nulla sed molestie volutpat, nisi arcu varius ipsum, semper ullamcorper ipsum libero vel leo. Mauris sit amet condimentum mauris. Etiam ut sapien ut urna ultricies ultrices."
						},
						{
							content: "Duis eget imperdiet lorem. Nullam a tortor lacinia, maximus sapien finibus, lobortis mauris. Vivamus efficitur tincidunt mi ac lacinia. Nulla convallis, neque eu pharetra consectetur, purus nisl rhoncus quam, vel interdum risus nisi vitae leo. Etiam a dui nec orci finibus viverra sit amet in urna. Donec dapibus ligula felis, vel posuere arcu ultricies eu. In fermentum aliquet cursus. Maecenas consequat mauris nec velit molestie elementum. Aliquam sodales enim pharetra quam tincidunt condimentum id vitae enim."
						},
						{
							content: "Aliquam at nunc venenatis, aliquam nisl at, dictum lorem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec ante justo, pulvinar nec faucibus a, porta eu sapien. Mauris consectetur vehicula ipsum, nec rutrum ligula fermentum vel. Morbi risus dui, elementum ut feugiat sit amet, suscipit sit amet nulla. Vestibulum eu tincidunt sapien, vitae lobortis felis."
						}
					]}/>

				<ContactEco
					title="Contact"
					body={`
Whether you have a question about one of my projects, or you'd like to offer an employment opportunity for this summer, I'd love to hear from you!

You can contact me at [jamie@jamiesyme.com](mailto:jamie@jamiesyme.com).

Alternatively, feel free to use the contact form below.
					`}/>
			</div>
		);
	}
};

export default LoremEnv;
