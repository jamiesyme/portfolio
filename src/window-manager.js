const Window = require('./window');

class WindowManager {
	constructor () {
		this._$desktop = $('body > .desktop');
		this._windows = [];
		this._listeners = {
			'add-window': [],
			'remove-window': [],
			'focus-window': [],
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
		// Optimize initial size for smaller screens
		if ((options.initialSize || {}).width) {
			const max = this._$desktop.width() - 20 * 2;
			options.initialSize.width = Math.min(max, options.initialSize.width);
		}
		if ((options.initialSize || {}).height) {
			const max = this._$desktop.height() - 20 * 2;
			options.initialSize.height = Math.min(max, options.initialSize.height);
		}

		// Create window
		const window = new Window(this, options);
		this._$desktop.append(window.$element);
		this._windows.push(window);

		// Remove window (later)
		window.on('close', () => this.removeWindow(window));

		// Focus window (later)
		window.$element.click(e => this.focusWindow(window));

		this._emit('add-window', window);
		this.focusWindow(window);
		return window;
	}

	removeWindow (window) {
		this._emit('remove-window', window);

		window.$element.remove();

		const index = this._windows.indexOf(window);
		this._windows.splice(index, 1);

		if (this._windows.length > 0) {
			this.focusWindow(this._windows[0]);
		}
	}

	focusWindow (window) {
		const index = this._windows.indexOf(window);
		if (index < 0) {
			return;
		}

		this._windows.splice(index, 1);
		this._windows.unshift(window);

		for (let i = 0; i < this._windows.length; ++i) {
			this._windows[i].zIndex = -i;
		}

		this._emit('focus-window', window);
	}

	get bounds () {
		return {
			xMin:    20, // 20 = arbitrary buffer
			xMax:    this._$desktop.width() - 1 - 20, // 20 = arbitrary buffer
			xCenter: this._$desktop.width() / 2,
			yMin:    0,
			yMax:    this._$desktop.height() - 1 - 32, // 32 = size of title bar
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
