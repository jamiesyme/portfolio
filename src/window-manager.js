const Window = require('./window');

class WindowManager {
	constructor () {
		this._$desktop = $('body > .desktop');
		this._listeners = {
			'add-window': [],
			'remove-window': [],
		};
	}

	on (eventType, cb) {
		if (this._listeners[eventType]) {
			this._listeners[eventType].append(cb);
		}
	}

	_emit (eventType, data) {
		for (const cb of this._listeners[eventType] || []) {
			cb(data);
		}
	}

	addWindow (options) {
		const window = new Window(options);
		this._$desktop.append(window.$element);

		const self = this;
		window.on('close', () => self.removeWindow(window));

		this._emit('add-window', window);
	}

	removeWindow (window) {
		this._emit('remove-window', window);

		window.$element.remove();
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
}

module.exports = WindowManager;
