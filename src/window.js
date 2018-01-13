class Window {
	/**
	 * @param {object} options
	 * @param {string} options.title
	 * @param {string} options.content
	 * @param {string} options.contentClass
	 * @param {object} options.initialSize
	 * @param {number} options.initialSize.width
	 * @param {number} options.initialSize.height
	 * @param {object} options.minSize
	 * @param {number} options.minSize.width
	 * @param {number} options.minSize.height
	 */
	constructor (windowManager, options) {
		const self = this;
		function createWindowElement (options) {
			const windowTmpl = require('./window.html');
			const windowHtml = renderTemplate(windowTmpl, options);
			const $window = $(windowHtml);
			return $window;
		}
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
					//if (newHeight >= self.minHeight) {
						self.top = self.top + diff;
						self.height = newHeight;
					//}
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
					//if (newWidth >= self.minWidth) {
						self.left = self.left + diff;
						self.width = newWidth;
					//}
				}
				oldPos = newPos;
			});
		}
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

		this._windowManager = windowManager;
		this._$window = createWindowElement(options);
		this._geometry = {
			width:  this._$window.width(),
			height: this._$window.height(),
			top:    this._$window.position().top,
			left:   this._$window.position().left
		};
		this._listeners = {
			'close': [],
			'maximize': [],
			'minimize': [],
		};

		enableResizeHandle(this._$window.children('.resize-handle-n'), true, false, false, false);
		enableResizeHandle(this._$window.children('.resize-handle-e'), false, true, false, false);
		enableResizeHandle(this._$window.children('.resize-handle-s'), false, false, true, false);
		enableResizeHandle(this._$window.children('.resize-handle-w'), false, false, false, true);
		enableResizeHandle(this._$window.children('.resize-handle-ne'), true, true, false, false);
		enableResizeHandle(this._$window.children('.resize-handle-se'), false, true, true, false);
		enableResizeHandle(this._$window.children('.resize-handle-sw'), false, false, true, true);
		enableResizeHandle(this._$window.children('.resize-handle-nw'), true, false, false, true);
		enableMoveHandle(this._$window.children('.title-bar'));

		this._$window.find('button.maximize').click(e => {
			this.maximized = !this.maximized;
		});
		this._$window.find('button.minimize').click(e => {
			this.minimized = !this.minimized;
		});
		this._$window.find('button.close').click(e => {
			this.close();
		});

		// Set the initial size
		this.width = options.initialSize.width;
		this.height = options.initialSize.height;
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

	_removeExplicitGeometry () {
		const style = this._$window.prop('style');
		style.removeProperty('width');
		style.removeProperty('height');
		style.removeProperty('top');
		style.removeProperty('left');
	}

	_applyExplicitGeometry () {
		this._$window.width(this._geometry.width);
		this._$window.height(this._geometry.height);
		this._$window.css({
			top: this._geometry.top,
			left: this._geometry.left
		});
	}

	get $element () {
		return this._$window;
	}

	get $canvas () {
		return this._$window.find('.canvas');
	}

	close () {
		this._emit('close');
	}

	get width () {
		return this._$window.width();
	}

	get height () {
		return this._$window.height();
	}

	set width (w) {
		this._geometry.width = w;
		if (!this.maximized) {
			this._$window.width(w);
		}
	}

	set height (h) {
		this._geometry.height = w;
		if (!this.maximized) {
			this._$window.height(w);
		}
	}

	get top () {
		return this._$window.position().top;
	}

	get left () {
		return this._$window.position().left;
	}

	get right () {
		return this.left + this.width - 1;
	}

	get bottom () {
		return this.top + this.height - 1;
	}

	set top (t) {
		const tMin = this._windowManager.bounds.yMin;
		const tMax = this._windowManager.bounds.yMax;
		t = min(tMax, max(tMin, t));
		this._geometry.top = t;
		if (!this.maximized) {
			this._$window.css({ top: t });
		}
	}

	set left (l) {
		this._geometry.left = l;
		if (!this.maximized) {
			this._$window.css({ left: l });
		}
	}

	set right (r) {
		const l = r + 1 - this.width;
		this.left = l;
	}

	set bottom (b) {
		const t = b + 1 - this.height;
		this.top = t;
	}

	set maximized (m) {
		if (m) {
			this._$window.addClass('maximized');
			this._removeExplicitGeometry();
		} else {
			this._applyExplicitGeometry();
			this._$window.removeClass('maximized');
		}
		this._emit('maximized', m);
	}

	get maximized () {
		return this._$window.hasClass('maximized');
	}

	set minimized (m) {
		if (m) {
			this._$window.addClass('minimized');
		} else {
			this._$window.removeClass('minimized');
		}
		this._emit('minimized', m);
	}

	get minimized () {
		return this._$window.hasClass('minimized');
	}

	center () {
		const bounds = this._windowManager.bounds;
		this.top = bounds.yCenter - this.height / 2;
		this.left = bounds.xCenter - this.width / 2;
	}
}

module.exports = Window;
