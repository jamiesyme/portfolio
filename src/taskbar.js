class AppsMenu {
	constructor ($taskbar, appManager) {
		this.$button = this.$taskbar.find('.apps-menu-button');
		this.$menu = this.$taskbar.find('.apps-menu');
		this.appManager = appManager;

		const self = this;

		// Open and close the menu with the button
		this.$button.click(e => {
			self.toggle();
		});

		// Close the menu when the user clicks on anything else
		this.$button.on('focusout', e => {
			if ($('.apps-menu:hover').length == 0) {
				self.hide();
			} else {
				this.$button.focus();
			}
		});

		// Close the menu when the user hits ESC
		this.$button.on('keydown', e => {
			if (e.which === 27) {
				self.hide();
				e.preventDefault();
			}
		});

		// Close the menu when the user launches an app
		this.$menu.find('button').click(e => self.hide());
	}

	addApp (name, appName) {
		const self = this;
		function createAppElem () {
			const $li = $('<li />');
			const $button = $('<button />', { text: name });
			$button.click(e => self.appManager.launch(appName));
			$li.append($button);
			return $li;
		}

		const $app = createAppElem();
		this.$menu.append($app);
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

class Task {
	constructor (window) {
		function createTaskElem () {
			const $li = $('<li />', { 'class': 'task active' });
			const $button = $('<button />', { text: window.title });
			$li.append($button);
			return $li;
		}

		this.window = window;
		this.$task = createTaskElem();

		const self = this;
		this.window.on('minimize', m => {
			if (m) {
				self.$task.addClass('closed');
			} else {
				self.$task.removeClass('closed');
			}
		});
		this.$task.click(e => {
			self.window.minimize = !self.window.minimize;
		});
	}

	remove () {
		this.$task.remove();
		this.$task = null;
	}
}

class Tasks {
	constructor ($taskbar) {
		this.$tasks = $taskbar.find('.tasks');
		this.tasks = [];
	}

	add (window) {
		const task = new Task(window);
		this.tasks.push(task);
		this.$tasks.append(task.$task);
	}

	remove (window) {
		for (let i = 0; i < this.tasks.length; ++i) {
			if (this.tasks[i].window === window) {
				this.tasks[i].remove();
				this.tasks.remove(i);
				--i;
			}
		}
	}
}

class Taskbar {
	constructor (windowManager, appManager) {
		function createTaskbarElem () {
			const html = require('./taskbar.html');
			return $(html);
		}

		this.$taskbar = createTaskbarElem();
		this.appMenu = new AppMenu(this.$taskbar, appManager);
		this.tasks = new Tasks(this.$taskbar);

		const self = this;
		windowManager.on('add-window', window => {
			self.tasks.add(window);
		});
		windowManager.on('remove-window', window => {
			self.tasks.remove(window);
		});
		$('body > .desktop').prepend(this.$taskbar);
	}

	addApp (name, appName) {
		this.appMenu.addApp(name, appName);
	}
}

module.exports = Taskbar;
