class Taskbar {
	constructor (windowManager, appManager) {
		function createTaskbarElem () {
			const html = require('./taskbar.html');
			return $(html);
		}
		const $taskbar = createTaskbarElem();

		this._appsMenu = new AppsMenu($taskbar, appManager);
		this._tasks = new Tasks($taskbar);
		this._clock = new Clock($taskbar);

		const self = this;
		windowManager.on('add-window', window => {
			self._tasks.add(window);
		});
		windowManager.on('remove-window', window => {
			self._tasks.remove(window);
		});
		$('body').prepend($taskbar);
	}

	addApp (name, id) {
		this._appsMenu.addApp(name, id);
	}
}

class AppsMenu {
	constructor ($taskbar, appManager) {
		this._$button = $taskbar.find('.apps-menu-button');
		this._$menu = $taskbar.find('.apps-menu');
		this._appManager = appManager;
		this._visible = false;

		const self = this;

		// Open and close the menu with the button
		this._$button.click(e => {
			self.toggle();
		});

		// Close the menu when the user clicks on anything else
		this._$button.on('focusout', e => {
			if ($('.apps-menu:hover').length == 0) {
				self.hide();
			} else {
				self._$button.focus();
			}
		});

		// Close the menu when the user hits ESC
		this._$button.on('keydown', e => {
			if (e.which === 27) {
				self.hide();
				e.preventDefault();
			}
		});
	}

	addApp (name, id) {
		const self = this;
		function createAppElem () {
			const $li = $('<li />');
			const $button = $('<button />', { text: name });
			$button.click(e => {
				self._appManager.launch(id)
				self.hide();
			});
			$li.append($button);
			return $li;
		}

		const $app = createAppElem();
		this._$menu.append($app);
	}

	show () {
		if (!this._visible) {
			this._visible = true;
			this._$menu.show();
			this._$button.addClass('active');
		}
	}

	hide () {
		if (this._visible) {
			this._visible = false;
			this._$menu.hide();
			this._$button.removeClass('active');
		}
	}

	toggle () {
		if (this._visible) {
			this.hide();
		} else {
			this.show();
		}
	}
}

class Task {
	constructor (window) {
		function createTaskElem () {
			const $li = $('<li />', { 'class': 'task' });
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
				window.focus();
			}
		});
		this.$task.click(e => {
			self.window.minimized = !self.window.minimized;
		});
	}

	remove () {
		this.$task.remove();
		this.$task = null;
	}
}

class Tasks {
	constructor ($taskbar) {
		this._$tasks = $taskbar.find('.tasks');
		this._tasks = [];
	}

	add (window) {
		const task = new Task(window);
		this._tasks.push(task);
		this._$tasks.append(task.$task);
	}

	remove (window) {
		for (let i = 0; i < this._tasks.length; ++i) {
			if (this._tasks[i].window === window) {
				this._tasks[i].remove();
				this._tasks.splice(i, 1);
				--i;
			}
		}
	}
}

class Clock {
	constructor ($taskbar) {
		this._$clock = $taskbar.find('.clock');
		this._update();
	}

	_update () {
		const time = new Date();
		const timeStr = this._formatTime(time);
		this._$clock.text(timeStr);

		const waitMs = (60 - time.getSeconds()) * 1000;
		const self = this;
		setTimeout(() => self._update(), waitMs);
	}

	_formatTime (date) {
		// Shamelessly stolen:
		//   https://stackoverflow.com/a/8888498/1422864
		let hours = date.getHours();
		let minutes = date.getMinutes();
		let ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12;
		hours = hours ? hours : 12; // hour '0' is really '12'
		minutes = minutes < 10 ? '0' + minutes : minutes;
		return hours + ':' + minutes + ' ' + ampm;
	}
}

module.exports = Taskbar;
