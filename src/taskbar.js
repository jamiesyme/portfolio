class AppsMenu {
	constructor ($taskbar, appManager) {
		this.$appsMenu = this.$taskbar.find('.apps-menu');
		this.appManager = appManager;
	}

	add (name, appName) {
		const self = this;
		function createAppElem () {
			const $li = $('<li />');
			const $button = $('<button />', { text: name });
			$button.click(e => self.appManager.launch(appName));
			$li.append($button);
			return $li;
		}

		const $app = createAppElem();
		this.$appsMenu.append($app);
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
}

module.exports = Taskbar;
