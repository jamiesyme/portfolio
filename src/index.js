const $appsListButton = $('.apps-list-button');
const $appsList = $('.apps-list');
const $cards = $('.cards');
const $desktop = $('.desktop');

$appsListButton.click(e => {
	$appsList.toggle();
});

$desktop.click(e => {
	if ($appsList.is(':visible')) {
		$appsList.hide();
	}
});


const WindowInfo = {
	about: {
		title: 'About',
		content: require('./about.html'),
		contentClass: 'app-about',
		initialSize: {
			width: 1280,
			height: 800,
		},
		minSize: {
			width: 350,
			height: 380
		},
	},
	contact: {
		title: 'Contact',
		content: require('./contact.html'),
		contentClass: 'app-contact',
		initialSize: {
			width: 640,
			height: 480,
		},
		minSize: {
			width: 350,
			height: 380
		},
	},
	projects: {
		title: 'Projects',
		content: require('./projects.html'),
		contentClass: 'app-projects',
		initialSize: {
			width: 870,
			height: 720,
		},
		minSize: {
			width: 350,
			height: 380
		},
	},
};


function renderTemplate (template, data) {
	// Regex: /{{.+?}}/
	// - the dot matches any character
	// - the plus requires at least one character within {{...}}
	// - the question mark makes the regex non-greedy
	return template.replace(/{{(.+?)}}/g, (m, key) => data[key]);
}


class Window {
	constructor (windowInfo) {
		function createWindowElement (windowInfo) {
			const windowTmpl = require('./window.html');
			const windowHtml = renderTemplate(windowTmpl, windowInfo);
			const $window = $(windowHtml);
			$desktop.append($window);
			return $window;
		}

		function createCardElement (windowInfo) {
			const $li = $('<li />', {
				'class': 'card active-card',
				content: windowInfo.title,
			});
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
		this.window = new Window(WindowInfo.about);
	}
}

class ContactApp {
	constructor () {
		this.window = new Window(WindowInfo.contact);
	}
}

class ProjectsApp {
	constructor () {
		this.window = new Window(WindowInfo.projects);
		this.projects = [
			{ title: 'project-1' },
			{ title: 'project-2' },
			{ title: 'project-3' },
			{ title: 'project-4' },
			{ title: 'project-5' },
			{ title: 'project-6' },
			{ title: 'project-7' },
		];

		// Load the project tiles
		const $ul = this.window.$window.find('.project-tiles');
		const projectTileTmpl = require('./project-tile.html');
		for (const project of this.projects) {
			const tileHtml = renderTemplate(projectTileTmpl, project);
			const $li = $('<li />');
			const $project = $(tileHtml);
			$li.append($project);
			$ul.append($li);
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

$appsList.find('.launch-about').click(e => launchApp('about'));
$appsList.find('.launch-contact').click(e => launchApp('contact'));
$appsList.find('.launch-projects').click(e => launchApp('projects'));

launchApp('projects');
