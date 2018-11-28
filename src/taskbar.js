class Taskbar {
	constructor (windowManager, appManager) {
		const $taskbar = $(require('./taskbar.html'));

		this._appsMenu = new AppsMenu($taskbar, appManager);
		this._tasks = new Tasks($taskbar);
		this._clock = new Clock($taskbar);

		windowManager.on('add-window', window => {
			this._tasks.add(window);
		});
		windowManager.on('remove-window', window => {
			this._tasks.remove(window);
		});
		windowManager.on('focus-window', window => {
			this._tasks.focus(window);
		});

		$('body > .menus').prepend($taskbar);
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

		// Open and close the menu with the button
		this._$button.click(e => {
			this.toggle();
		});

		// Close the menu when the user clicks on anything else
		this._$button.on('focusout', e => {
			if ($('.apps-menu:hover').length == 0) {
				this.hide();
			} else {
				this._$button.focus();
			}
		});

		// Close the menu when the user hits ESC
		this._$button.on('keydown', e => {
			if (e.which === 27) {
				this.hide();
				e.preventDefault();
			}
		});
	}

	addApp (name, id) {
		const $li = $('<li />');
		const $button = $('<button />', { text: name });
		$button.click(e => {
			this._appManager.launch(id)
			this.hide();
		});
		$li.append($button);

		this._$menu.append($li);
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
		const windowManager = window.windowManager;

		this.window = window;
		this.$task = (() => {
			const $li = $('<li />', { 'class': 'task' });
			const $button = $('<button />', { text: window.title });
			$li.append($button);
			return $li;
		})();

		this.window.on('minimize', m => {
			if (m) {
				this.$task.addClass('minimized');
			} else {
				this.$task.removeClass('minimized');
			}
		});

		this.$task.click(e => {
			if (this.window.focused) {
				windowManager.minimizeWindow(this.window);
			} else {
				windowManager.unminimizeWindow(this.window);
				windowManager.focusWindow(this.window);
			}
		});
	}

	remove () {
		this.$task.remove();
		this.$task = null;
	}

	addFocus () {
		return this.$task.addClass('focused');
	}

	removeFocus () {
		return this.$task.removeClass('focused');
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

	focus (window) {
		for (const task of this._tasks) {
			if (task.window === window) {
				task.addFocus();
			} else {
				task.removeFocus();
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
		setTimeout(() => this._update(), waitMs);
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
