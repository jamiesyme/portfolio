const Window = require('./window');

class WindowManager {
	constructor () {
		this.$desktop = $('body > .desktop');
		this.listeners = {
			'add-window': [],
			'remove-window': [],
		};
	}

	on (eventType, cb) {
		if (this.listeners[eventType]) {
			this.listeners[eventType].append(cb);
		}
	}

	_emit (eventType, data) {
		for (const cb of this.listeners[eventType] || []) {
			cb(data);
		}
	}

	addWindow (options) {
		const window = new Window(options);
		$desktop.append(window.getElem());

		const self = this;
		window.on('close', () => self.removeWindow(window));

		this._emit('add-window', window);
	}

	removeWindow (window) {
		this._emit('remove-window', window);

		window.getElem().remove();
	}
}

module.exports = WindowManager;
