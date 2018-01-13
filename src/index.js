const $cards = $('.cards');
const $desktop = $('.desktop');

class AppsList {
	constructor () {
		this.$button = $('.apps-list-button');
		this.$list = $('.apps-list');
		this.visible = false;

		const self = this;

		// Open and close the app list with the button
		this.$button.click(e => {
			self.toggle();
		});

		// Close the list when the user clicks on anything except for the list
		this.$button.on('focusout', e => {
			if ($('.apps-list:hover').length == 0) {
				self.hide();
			} else {
				this.$button.focus();
			}
		});

		// Close the list when the user hits ESC
		this.$button.on('keydown', e => {
			if (e.which === 27) {
				self.hide();
				e.preventDefault();
			}
		});

		// Close the list when the user launches an app
		this.$list.find('button').click(e => self.hide());

		// Register apps with buttons
		this.$list.find('.launch-about').click(e => launchApp('about'));
		this.$list.find('.launch-contact').click(e => launchApp('contact'));
		this.$list.find('.launch-projects').click(e => launchApp('projects'));
	}

	show () {
		if (!this.visible) {
			this.visible = true;
			this.$list.show();
			this.$button.addClass('active');
		}
	}

	hide () {
		if (this.visible) {
			this.visible = false;
			this.$list.hide();
			this.$button.removeClass('active');
		}
	}

	toggle () {
		if (this.visible) {
			this.hide();
		} else {
			this.show();
		}
	}
}
const appsList = new AppsList();


function renderTemplate (template, data) {
	// Regex: /{{.+?}}/
	// - the dot matches any character
	// - the plus requires at least one character within {{...}}
	// - the question mark makes the regex non-greedy
	return template.replace(/{{(.+?)}}/g, (m, key) => data[key]);
}


class Window {
	/**
	 * @param {object} windowInfo
	 * @param {string} windowInfo.title
	 * @param {string} windowInfo.content
	 * @param {string} windowInfo.contentClass
	 * @param {object} windowInfo.initialSize
	 * @param {number} windowInfo.initialSize.width
	 * @param {number} windowInfo.initialSize.height
	 * @param {object} windowInfo.minSize
	 * @param {number} windowInfo.minSize.width
	 * @param {number} windowInfo.minSize.height
	 */
	constructor (windowInfo) {
		function createWindowElement (windowInfo) {
			const windowTmpl = require('./window.html');
			const windowHtml = renderTemplate(windowTmpl, windowInfo);
			const $window = $(windowHtml);
			$desktop.append($window);
			return $window;
		}

		function createCardElement (windowInfo) {
			const $li = $('<li />', { 'class': 'card active-card' });
			const $button = $('<button />', { text: windowInfo.title });
			$li.append($button);
			$cards.append($li);
			return $li;
		}

		this.$window = createWindowElement(windowInfo);
		this.$card = createCardElement(windowInfo);
		this._geometry = {
			width:  this.$window.width(),
			height: this.$window.height(),
			top:    this.$window.position().top,
			left:   this.$window.position().left
		};
		this._savedGeometry = this._geometry;
		this._maximized = false;
		this._minimized = false;
		this._eventHandlers = { resize: [] };

		const self = this;
		function enableResizeHandle ($h, dn, de, ds, dw) {
			let oldPos = null;
			$h.mousedown(e => {
				oldPos = { x: e.clientX, y: e.clientY }
				// Drag events result in buggy dragging behaviour, so we disable
				// them by returning false
				return false;
			});
			$(document).mouseup(e => oldPos = null);
			$(document).mousemove(e => {
				if (!oldPos) {
					return;
				}
				const newPos = { x: e.clientX, y: e.clientY };
				if (dn && newPos.y != oldPos.y) {
					const diff = newPos.y - oldPos.y;
					const newHeight = self.height - diff;
					if (newHeight >= self.minHeight) {
						self.top = self.top + diff;
						self.height = newHeight;
					}
				}
				if (de && newPos.x != oldPos.x) {
					const diff = newPos.x - oldPos.x;
					self.width = self.width + diff;
				}
				if (ds && newPos.y != oldPos.y) {
					const diff = newPos.y - oldPos.y;
					self.height = self.height + diff;
				}
				if (dw && newPos.x != oldPos.x) {
					const diff = newPos.x - oldPos.x;
					const newWidth = self.width - diff;
					if (newWidth >= self.minWidth) {
						self.left = self.left + diff;
						self.width = newWidth;
					}
				}
				oldPos = newPos;
			});
		}
		enableResizeHandle(this.$window.children('.resize-handle-n'), true, false, false, false);
		enableResizeHandle(this.$window.children('.resize-handle-e'), false, true, false, false);
		enableResizeHandle(this.$window.children('.resize-handle-s'), false, false, true, false);
		enableResizeHandle(this.$window.children('.resize-handle-w'), false, false, false, true);
		enableResizeHandle(this.$window.children('.resize-handle-ne'), true, true, false, false);
		enableResizeHandle(this.$window.children('.resize-handle-se'), false, true, true, false);
		enableResizeHandle(this.$window.children('.resize-handle-sw'), false, false, true, true);
		enableResizeHandle(this.$window.children('.resize-handle-nw'), true, false, false, true);

		function enableMoveHandle ($h) {
			let oldPos = null;
			$h.mousedown(e => {
				oldPos = { x: e.clientX, y: e.clientY }
				// Drag events result in buggy dragging behaviour, so we disable
				// them by returning false
				return false;
			});
			$(document).mouseup(e => oldPos = null);
			$(document).mousemove(e => {
				if (!oldPos) {
					return;
				}
				const newPos = { x: e.clientX, y: e.clientY };
				if (newPos.x != oldPos.x) {
					const diff = newPos.x - oldPos.x;
					self.left = self.left + diff;
				}
				if (newPos.y != oldPos.y) {
					const diff = newPos.y - oldPos.y;
					self.top = self.top + diff;
				}
				oldPos = newPos;
			});
		}
		enableMoveHandle(this.$window.children('.title-bar'));

		this.$window.find('.maximize-button').click(e => {
			this.maximized = !this.maximized;
		});

		this.$window.find('.minimize-button').click(e => {
			this.minimized = !this.minimized;
		});

		this.$window.find('.close-button').click(e => {
			this.remove();
		});

		this.$card.click(e => {
			this.minimized = !this.minimized;
		});

		this.minWidth = windowInfo.minSize.width;
		this.minHeight = windowInfo.minSize.height;
		this.width = windowInfo.initialSize.width;
		this.height = windowInfo.initialSize.height;
	}

	remove () {
		this.$window.remove();
		this.$card.remove();
	}

	_saveGeometry () {
		this._savedGeometry = Object.assign({}, this._geometry);
	}

	_loadSavedGeometry () {
		this._geometry = this._savedGeometry;
	}

	_applyGeometry () {
		this.$window.width(this._geometry.width);
		this.$window.height(this._geometry.height);
		this.$window.css({
			top: this._geometry.top,
			left: this._geometry.left
		});
	}

	get width () {
		return this._geometry.width;
	}
	get height () {
		return this._geometry.height;
	}
	set width (w) {
		if (w < this.minWidth) {
			w = this.minWidth;
		}
		if (this._geometry.width !== w) {
			this._geometry.width = w;
			this._applyGeometry();
			for (const eh of this._eventHandlers.resize) {
				eh({
					type: 'resize',
					width: this._geometry.width,
					height: this._geometry.height,
				});
			}
		}
	}
	set height (h) {
		if (h < this.minHeight) {
			h = this.minHeight;
		}
		if (this._geometry.height !== h) {
			this._geometry.height = h;
			this._applyGeometry();
			for (const eh of this._eventHandlers.resize) {
				eh({
					type: 'resize',
					width: this._geometry.width,
					height: this._geometry.height,
				});
			}
		}
	}

	get top () {
		return this._geometry.top;
	}
	get left () {
		return this._geometry.left;
	}
	get right () {
		return this._geometry.left + this._geometry.width - 1;
	}
	get bottom () {
		return this._geometry.top + this._geometry.height - 1;
	}
	set top (t) {
		if (t < 0) {
			t = 0;
		}
		if (t >= $desktop.height()) {
			t = $desktop.height() - 1;
		}
		this._geometry.top = t;
		this._applyGeometry();
	}
	set left (l) {
		this._geometry.left = l;
		this._applyGeometry();
	}
	set right (r) {
		this._geometry.left = r + 1 - this.width;
		this._applyGeometry();
	}
	set bottom (b) {
		this._geometry.top = b + 1 - this.height;
		this._applyGeometry();
	}

	set maximized (m) {
		if (m === this._maximized) {
			return;
		}
		this._maximized = m;
		if (m) {
			this._saveGeometry();
			this._geometry = {
				width: $desktop.width(),
				height: $desktop.height(),
				top: 0,
				left: 0
			};
			this.$window.addClass('maximized');
		} else {
			this._loadSavedGeometry();
			this.$window.removeClass('maximized');
		}
		this._applyGeometry();
	}

	get maximized () {
		return this._maximized;
	}

	set minimized (m) {
		if (m === this._minimized) {
			return;
		}
		this._minimized = m;
		if (m) {
			this.$window.hide();
			this.$card.addClass('closed-card');
		} else {
			this.$window.show();
			this.$card.removeClass('closed-card');
		}
	}

	get minimized () {
		return this._minimized;
	}

	center () {
		const dw = $desktop.width();
		const dh = $desktop.height();
		const top = (dh - this.height) / 2;
		const left = (dw - this.width) / 2;
		this.top = top;
		this.left = left;
	}
}


class AboutApp {
	constructor () {
		this.window = new Window({
			title:        'About',
			content:      require('./about.html'),
			contentClass: 'app-about',
			initialSize:  { width: 760, height: 800 },
			minSize:      { width: 350, height: 380 },
		});

		this.window.$window.find('.app-projects-link').click(e => {
			launchApp('projects');
			return false;
		});
		this.window.$window.find('.app-contact-link').click(e => {
			launchApp('contact');
			return false;
		});
	}
}

class ContactApp {
	constructor () {
		this.window = new Window({
			title:        'Contact',
			content:      require('./contact.html'),
			contentClass: 'app-contact',
			initialSize:  { width: 640, height: 480 },
			minSize:      { width: 350, height: 380 },
		});
	}
}

class ProjectsApp {
	constructor () {
		this.window = new Window({
			title:        'Projects',
			content:      require('./projects.html'),
			contentClass: 'app-projects',
			initialSize:  { width: 870, height: 720 },
			minSize:      { width: 350, height: 380 },
		});

		this.projects = [
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
						name: 'namemyvar.com',
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
						name: 'videoso.ca',
						link: 'http://videoso.ca',
					},
					{
						name: 'Github',
						link: 'https://github.com/jamiesyme/videoso',
					},
				],
			},
		];

		// Connect the back button on the project viewer
		const $projectViewer = this.window.$window.find('.project-viewer');
		const $projectHeader = this.window.$window.find('.app-projects').children('h1');
		const $projectTiles = this.window.$window.find('.project-tiles');
		const $back = $projectViewer.find('.back-button');
		$back.click(e => {
			$projectViewer.find('.project').remove();
			$projectViewer.hide();
			$projectHeader.show();
			$projectTiles.show();
		});

		// Render the project tiles
		for (const project of this.projects) {
			const tileTmpl = require('./project-tile.html');
			const tileHtml = renderTemplate(tileTmpl, project);
			const $li = $('<li />');
			const $tile = $(tileHtml);
			$li.append($tile);
			$projectTiles.append($li);

			// When a tile is clicked, render the project and switch to the
			// project viewer
			$tile.click(e => {
				const projectTmpl = require('./project.html');
				const projectHtml = renderTemplate(projectTmpl, project);
				const $project = $(projectHtml);
				for (const screenshot of project.screenshots) {
					const $li = $('<li />');
					const $img = $('<img />', {
						'class': 'screenshot',
						src: screenshot,
					});
					$li.append($img);
					$project.find('.screenshots').append($li);
				}
				for (const resource of project.where) {
					const $li = $('<li />');
					const $a = $('<a />', {
						text: resource.name,
						href: resource.link,
					});
					$li.append($a);
					$project.find('.links').append($li);
				}
				$projectViewer.find('.project').remove();
				$projectViewer.append($project);
				$projectHeader.hide();
				$projectTiles.hide();
				$projectViewer.show();
			});
		}
	}
}


function launchApp (appName) {
	let app;
	switch (appName) {
	case 'about':
		app = new AboutApp();
		break;
	case 'contact':
		app = new ContactApp();
		break;
	case 'projects':
		app = new ProjectsApp();
		break;
	}
	app.window.center();
}

launchApp('projects');
