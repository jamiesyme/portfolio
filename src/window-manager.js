const Window = require('./window');

class WindowManager {
	constructor () {
		this._$desktop = $('body > .desktop');
		this._windows = [];
		this._listeners = {
			'add-window': [],
			'remove-window': [],
		};
	}

	on (eventType, cb) {
		if (this._listeners[eventType]) {
			this._listeners[eventType].push(cb);
		}
	}

	_emit (eventType, data) {
		for (const cb of this._listeners[eventType] || []) {
			cb(data);
		}
	}

	addWindow (options) {
		const window = new Window(this, options);
		this._$desktop.append(window.$element);
		this._windows.push(window);

		const self = this;
		window.on('close', () => self.removeWindow(window));

		window.$element.click(e => self.focusWindow(window));
		this.focusWindow(window);

		this._emit('add-window', window);
		return window;
	}

	removeWindow (window) {
		this._emit('remove-window', window);

		window.$element.remove();

		const index = this._windows.indexOf(window);
		this._windows.splice(index, 1);
	}

	focusWindow (window) {
		const index = this._windows.indexOf(window);
		if (index <= 0) {
			return;
		}

		this._windows.splice(index, 1);
		this._windows.unshift(window);

		for (let i = 0; i < this._windows.length; ++i) {
			this._windows[i].zIndex = -i;
		}
	}

	get bounds () {
		return {
			xMin:    0,
			xMax:    this._$desktop.width() - 1,
			xCenter: this._$desktop.width() / 2,
			yMin:    0,
			yMax:    this._$desktop.height() - 1,
			yCenter: this._$desktop.height() / 2,
		};
	}

	get minWindowSize () {
		return {
			width: 250,
			height: 250,
		};
	}
}

module.exports = WindowManager;
