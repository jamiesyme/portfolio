const Window = require('./window');

const taskbarHeight = 36; // 36px
const titlebarHeight = 32; // 32px

function clamp (min, max, value) {
	return Math.min(max, Math.max(min, value));
}

class WindowManager {
	constructor () {
		this._$body = $('body');
		this._$windows = $('body > .windows');
		this._windows = [];
		this._listeners = {
			'add-window': [],
			'remove-window': [],
			'focus-window': [],
		};
	}

	openWindow (params) {

		// Center the window by default
		const width = params.size.width;
		const height = params.size.height;
		const x = this.bounds.xCenter - width / 2;
		const y = this.bounds.yCenter - height / 2;

		// Create the window
		const window = new Window({
			windowManager: this,
			x,
			y,
			width,
			height,
			title:        params.title,
			content:      params.content,
			contentClass: params.contentClass,
			minSize:      params.minSize,
		});
		this._$windows.append(window.$elem);
		this._windows.push(window);

		// Initialize the CSS
		window.$elem.css({
			top:    window.y,
			left:   window.x,
			width:  window.width,
			height: window.height,
		});

		{ // Bind the control buttons
			const $bar = window.$elem.children('.title-bar');
			const $btns = $bar.find('.control-buttons');

			$btns.find('.close').click(e => {
				this.closeWindow(window);
			});
			$btns.find('.maximize').click(e => {
				if (window.maximized) {
					this.unmaximizeWindow(window);
				} else {
					this.maximizeWindow(window);
				}
			});
			$btns.find('.minimize').click(e => {
				this.minimizeWindow(window);
			});
		}

		{ // Bind the titlebar to move the window
			const $bar = window.$elem.children('.title-bar');

			let startWindowPos = null;
			let startMousePos = null;
			$bar.mousedown(e => {
				startWindowPos = {
					x: window.x,
					y: window.y,
				};
				startMousePos = {
					x: e.clientX,
					y: e.clientY,
				};
				// Drag events result in buggy dragging behaviour, so we disable
				// them by returning false
				return false;
			});
			$(document).mouseup(e => {
				startWindowPos = null;
				startMousePos = null;
			});
			$(document).mousemove(e => {
				if (!startWindowPos || !startMousePos) {
					return;
				}
				if (window.maximized || window.minimized) {
					return;
				}
				const newMousePos = {
					x: e.clientX,
					y: e.clientY,
				};
				const newWindowPos = {
					x: startWindowPos.x + newMousePos.x - startMousePos.x,
					y: startWindowPos.y + newMousePos.y - startMousePos.y,
				};
				this.setWindowPosition(window, newWindowPos.x, newWindowPos.y);
			});
		}

		{ // Bind the resize handles
			const bindHandle = side => {
				const moveNorth = side.includes('n');
				const moveEast  = side.includes('e');
				const moveSouth = side.includes('s');
				const moveWest  = side.includes('w');
				const $elem     = window.$elem.children(`.resize-handle-${side}`);

				let startWindowSize = null;
				let startWindowPos = null;
				let startMousePos = null;
				$elem.mousedown(e => {
					startWindowSize = {
						width: window.width,
						height: window.height,
					};
					startWindowPos = {
						x: window.x,
						y: window.y,
					};
					startMousePos = {
						x: e.clientX,
						y: e.clientY,
					};
					// Drag events result in buggy dragging behaviour, so we
					// disable them by returning false
					return false;
				});
				$(document).mouseup(e => {
					startWindowSize = null;
					startWindowPos = null;
					startMousePos = null;
				});
				const onMouseMove = newMousePos => {
					if (!startWindowSize || !startWindowPos || !startMousePos) {
						return;
					}
					if (window.maximized || window.minimized) {
						return;
					}
					const newWindowSize = Object.assign({}, startWindowSize);
					const newWindowPos = Object.assign({}, startWindowPos);
					if (moveNorth) {
						const diff = startMousePos.y - newMousePos.y;
						newWindowSize.height += diff;
						newWindowPos.y -= diff;
					}
					if (moveEast) {
						const diff = newMousePos.x - startMousePos.x;
						newWindowSize.width += diff;
					}
					if (moveSouth) {
						const diff = newMousePos.y - startMousePos.y;
						newWindowSize.height += diff;
					}
					if (moveWest) {
						const diff = startMousePos.x - newMousePos.x;
						newWindowSize.width += diff;
						newWindowPos.x -= diff;
					}
					this.setWindowPosition(
						window,
						newWindowPos.x,
						newWindowPos.y
					);
					this.setWindowSize(
						window,
						newWindowSize.width,
						newWindowSize.height
					);

					// Under certain conditions, the setWindowPosition() can
					// succeed while the setWindowSize() fails (due to clamping),
					// and vice versa. If we detect this, move the mouse position
					// back and try again.
					{
						const diffX = Math.max(
							Math.abs(window.x - newWindowPos.x),
							Math.abs(window.width - newWindowSize.width),
						);
						const diffY = Math.max(
							Math.abs(window.y - newWindowPos.y),
							Math.abs(window.height - newWindowSize.height),
						);
						if (diffX || diffY) {
							if (newMousePos.x < startMousePos.x) {
								newMousePos.x += diffX;
							} else {
								newMousePos.x -= diffX;
							}
							if (newMousePos.y < startMousePos.y) {
								newMousePos.y += diffY;
							} else {
								newMousePos.y -= diffY;
							}
							onMouseMove(newMousePos);
						}
					}
				};
				$(document).mousemove(e => {
					const newMousePos = {
						x: e.clientX,
						y: e.clientY,
					};
					onMouseMove(newMousePos);
				});
			};

			['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'].forEach(bindHandle);
		}

		// Focus the window when clicked
		window.$elem[0].addEventListener('click', e => {
			this.focusWindow(window);
		}, true);

		this.emit('add-window', window);
		this.focusWindow(window);
		return window;
	}

	closeWindow (window) {
		window.$elem.remove();
		this._windows = this._windows.filter(w => w !== window);
		this.emit('remove-window', window);
		this._focusAnyWindow();
	}

	focusWindow (window) {
		if (window.focused) {
			return;
		}
		this._windows = [window].concat(
			this._windows.filter(w => w !== window)
		);
		this._windows.forEach((w, i) => {
			w.$elem.css('z-index', -i);
			w.focused = w === window;
			if (w.focused) {
				w.$elem.addClass('focused');
			} else {
				w.$elem.removeClass('focused');
			}
		});

		this.emit('focus-window', window);
	}

	_focusAnyWindow () {
		const nextWindow = this._windows.find(window => {
			return !window.minimized;
		});
		if (nextWindow) {
			this.focusWindow(nextWindow);
		} else {
			this._windows.forEach(w => w.focused = false);
			this.emit('focus-window', null);
		}
	}

	setWindowPosition (window, x, y) {
		if (window.maximized) {
			return;
		}
		let changed = false;
		if (typeof x === 'number') {
			const xMin = this.bounds.xMin - window.width;
			const xMax = this.bounds.xMax;
			const xNew = clamp(xMin, xMax, x);
			if (window.x !== xNew) {
				window.x = xNew;
				window.$elem.css({ left: xNew });
				changed = true;
			}
		}
		if (typeof y === 'number') {
			const yMin = this.bounds.yMin;
			const yMax = this.bounds.yMax;
			const yNew = clamp(yMin, yMax, y);
			if (window.y !== yNew) {
				window.y = yNew;
				window.$elem.css({ top: yNew });
				changed = true;
			}
		}
		if (changed) {
			window.emit('move');
		}
	}

	setWindowSize (window, w, h) {
		if (window.maximized) {
			return;
		}
		let changed = false;
		if (typeof w === 'number') {
			const wMin = window.minSize.width || this.minWindowSize.width;
			const wMax = this.maxWindowSize.width;
			const wNew = clamp(wMin, wMax, w);
			if (window.width !== wNew) {
				window.width = wNew;
				window.$elem.css({ width: wNew });
				changed = true;
			}
		}
		if (typeof h === 'number') {
			const hMin = window.minSize.height || this.minWindowSize.height;
			const hMax = this.maxWindowSize.height;
			const hNew = clamp(hMin, hMax, h);
			if (window.height !== hNew) {
				window.height = hNew;
				window.$elem.css({ height: hNew });
				changed = true;
			}
		}
		if (changed) {
			window.emit('resize');
		}
	}

	minimizeWindow (window) {
		if (window.minimized) {
			return;
		}
		window.$elem.addClass('minimized');
		window.minimized = true;
		window.emit('minimize', true);
		this._focusAnyWindow();
	}

	unminimizeWindow (window) {
		if (!window.minimized) {
			return;
		}
		window.$elem.removeClass('minimized');
		window.minimized = false;
		window.emit('minimize', false);
	}

	maximizeWindow (window) {
		if (window.maximized) {
			return;
		}
		window.$elem.addClass('maximized');
		window.$elem.css({
			top:    titlebarHeight,
			left:   0,
			right:  0,
			bottom: 0,
			width:  '',
			height: '',
		});
		window.maximized = true;
		window.emit('maximize', true);
	}

	unmaximizeWindow (window) {
		if (!window.maximized) {
			return;
		}
		window.$elem.removeClass('maximized');
		window.$elem.css({
			top:    window.y,
			left:   window.x,
			right:  '',
			bottom: '',
			width:  window.width,
			height: window.height,
		});
		window.maximized = false;
		window.emit('maximize', false);
	}

	get bounds () {
		const topBuffer = taskbarHeight;
		const leftBuffer = 20;
		const rightBuffer = 20;
		const bottomBuffer = titlebarHeight;
		return {
			xMin:    leftBuffer,
			xMax:    this._$body.width() - 1 - rightBuffer,
			xCenter: this._$body.width() / 2,
			yMin:    topBuffer,
			yMax:    this._$body.height() - 1 - bottomBuffer,
			yCenter: this._$body.height() / 2,
		};
	}

	get minWindowSize () {
		return {
			width: 250,
			height: 250,
		};
	}

	get maxWindowSize () {
		return {
			width: this._$body.width(),
			height: this._$body.height() - taskbarHeight,
		};
	}

	on (eventType, cb) {
		if (this._listeners[eventType]) {
			this._listeners[eventType].push(cb);
		}
	}

	emit (eventType, data) {
		for (const cb of this._listeners[eventType] || []) {
			cb(data);
		}
	}
}

module.exports = WindowManager;
