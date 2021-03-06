const Template = require('./template');

class ProjectsApp {
	constructor (windowManager) {
		this.window = windowManager.openWindow({
			title:        'Projects',
			content:      require('./projects-app.html'),
			contentClass: 'projects-app',
			size:         { width: 880, height: 680 },
			minSize:      { width: 350, height: 420 },
		});

		const $canvas = this.window.$canvas;
		const $viewer = $canvas.find('.project-viewer');
		const $back   = $viewer.find('.back-button');
		const $header = $canvas.find('.app-title');
		const $tiles  = $canvas.find('.project-tiles');

		// Connect the back button on the project viewer
		$back.click(e => history.back());
		window.onpopstate = function () {
			$viewer.find('.project').remove();
			$viewer.hide();
			$header.show();
			$tiles.show();
		};

		// Render the project tiles
		for (const project of ProjectsApp.projects) {
			const tileTmpl = require('./project-tile.html');
			const tileHtml = Template.render(tileTmpl, project);
			const $li = $('<li />');
			const $tile = $(tileHtml);
			$li.append($tile);
			$tiles.append($li);

			// When a tile is clicked, render the project and switch to the
			// project viewer
			$tile.click(e => {
				const projectTmpl = require('./project.html');
				const projectHtml = Template.render(projectTmpl, project);
				const $project = $(projectHtml);
				for (const screenshot of project.screenshots) {
					const $li = $('<li />');
					const $a = $('<a />', {
						href: screenshot,
						target: '_blank',
					});
					const $img = $('<img />', {
						'class': 'screenshot',
						src: screenshot,
					});
					$a.append($img);
					$li.append($a);
					$project.find('.screenshots').append($li);
				}
				for (const resource of project.where) {
					const $li = $('<li />');
					const $a = $('<a />', {
						text: resource.name,
						href: resource.link,
						target: '_blank',
					});
					$li.append($a);
					$project.find('.links').append($li);
				}
				history.pushState({}, '');
				$viewer.find('.project').remove();
				$viewer.append($project);
				$header.hide();
				$tiles.hide();
				$viewer.show();
			});
		}

		// Adjust projects grid upon window resize
		this.window.on('resize', () => {
			let cols = (() => {
				if (this.window.width < 550) {
					return '1fr';
				}
				if (this.window.width < 900) {
					return '1fr 1fr';
				}
				return '1fr 1fr 1fr';
			})();
			$tiles.css('grid-template-columns', cols);
		});
	}

	static get projects () {
		return [
			{
				name: 'Portfolio',
				screenshots: [
					'/f/portfolio-about.png',
					'/f/portfolio-project.png',
				],
				cover: '/f/portfolio-cover.png',
				professional: false,
				what: 'This website is a portfolio of my recent projects. It features a dynamic window manager, and was primarily designed to mimic a desktop environment.',
				why: 'When thinking about what I wanted my portfolio to look like, I was torn: I wanted it to be beautiful and original, but I didn\'t want to put too much emphasis on my front end work; I wanted to get creative and convey that I enjoy challenging problems, yet I needed the website to be useable by the average person. In the end, I think I found a happy medium with this design.',
				when: 'December 2017 &ndash; January 2018',
				how: 'This design uses JavaScript for just about everything, including launching apps using the apps menu, resizing windows with the invisible handles, and updating the clock every minute. It also required some clever CSS to implement the fluid app designs, as breakpoints are only available to the page as a whole, and not for individual containers. I would have liked to put each app in it\'s own iframe, but unfortunately, that would have killed the performance.',
				where: [
					{
						name: 'Website',
						link: 'https://jamiesyme.com',
					},
					{
						name: 'Github',
						link: 'https://github.com/jamiesyme/portfolio',
					},
				],
			},
			{
				name: 'Taffy',
				screenshots: [
					'/f/taffy-help.png',
					'/f/taffy-use.png',
				],
				cover: '/f/taffy-cover.png',
				professional: false,
				what: 'Taffy is an experiment in tag-based file systems. It supports file organization and search through use of tags.',
				why: 'I think tags provide a far more flexible approach to file organization than the traditional hierarchical systems, for both end-users and developers. This project was an attempt to explore the concept a bit more (and it allowed me to play with bloom filters).',
				when: 'December 2017 &ndash; January 2018',
				how: 'Since this was only prototype, I went with JavaScript/Node as my language of choice, and used Yarn to manage dependencies. The file system info is stored in a (fairly) flat directory structure in "~/.taffy". Hard links are created using the original files, so Taffy doesn\'t have to worry about file storage, and bloom filters are used to speed up large queries involving multiple tags.',
				where: [
					{
						name: 'Github',
						link: 'https://github.com/jamiesyme/taffy',
					},
				],
			},
			{
				name: 'Name My Var',
				screenshots: [
					'/f/nmv-home.png',
					'/f/nmv-search.png',
				],
				cover: '/f/nmv-cover.png',
				professional: false,
				what: 'Name My Var is intended to be a search engine for variable, function, and class names. Given an input name, such as "error", the website will provide suggestions for alternative and related names, common uses, etc. At this point in time, only the front end is implemented.',
				why: 'Most programmers will agree that a key element to writing clean code is picking simple and succinct names. In most cases, the "right" name is the most obvious one. However, sometimes the right name isn\'t immediately obvious, either because the name you want to use is already taken, or the name isn\'t yet in your lexicon. I think having a website that you could use during such cases to explore a namespace of related/standard names would be very convenient.',
				when: 'October 2017 &ndash; November 2017',
				how: 'The front end is mostly custom, building only from jQuery and Milligram, and was designed to stay out of the user\'s way as much as possible. The temporary api server was put together with Node and Hapi.js, and serves results from a static JSON file. NGINX is used to serve the front end.',
				where: [
					{
						name: 'Website',
						link: 'https://namemyvar.com',
					},
					{
						name: 'Github',
						link: 'https://github.com/jamiesyme/name-my-var',
					},
				],
			},
			{
				name: 'Videoso',
				screenshots: [
					'/f/videoso-1.png',
					'/f/videoso-2.png',
				],
				cover: '/f/videoso-cover.png',
				professional: false,
				what: 'Videoso is an early prototype of a video sharing platform.',
				why: 'I\'ve been watching YouTube for over 10 years now, and while I love the website, their subscription system is anything but flexible. I thought it\'d be interesting to experiment with a tag-based system that would allow users to subscribe to a specific series of videos published by a creator. I also figured that in this day and age, it wouldn\'t hurt to learn a little bit about video streaming.',
				when: 'July 2017 &ndash; August 2017',
				how: 'The front end is pretty basic, using only Bootstrap and Video.js. The back end is written in Go, and uses FFmpeg and MP4Box to process videos. After processing, the MPEG-DASH files are uploaded to S3, and video metadata is stored in Postgres.',
				where: [
					{
						name: 'Website',
						link: 'http://videoso.ca',
					},
					{
						name: 'Github',
						link: 'https://github.com/jamiesyme/videoso',
					},
				],
			},
		];
	}
}

module.exports = ProjectsApp;
