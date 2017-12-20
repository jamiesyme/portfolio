const $appsListButton = $('.apps-list-button');
const $appsList = $('.apps-list');
const $desktop = $('.desktop');

$appsListButton.click(e => {
	$appsList.toggle();
});

$desktop.click(e => {
	if ($appsList.is(':visible')) {
		$appsList.hide();
	}
});


class Window {
	constructor () {
		this.$window = $('.window');
		this.$card = $('.card');
		this._geometry = {
			width:  this.$window.width(),
			height: this.$window.height(),
			top:    this.$window.position().top,
			left:   this.$window.position().left
		};
		this._savedGeometry = this._geometry;
		this._maximized = false;
		this._minimized = false;

		const self = this;
		function enableResizeHandle ($h, dn, de, ds, dw) {
			let oldPos = null;
			$h.mousedown(e => {
				oldPos = {
					x: e.clientX,
					y: e.clientY
				}
				// Drag events result in buggy dragging behaviour, so we disable
				// them by returning false
				return false;
			});
			$(document).mouseup(e => oldPos = null);
			$(document).mousemove(e => {
				if (!oldPos) {
					return;
				}
				const newPos = {
					x: e.clientX,
					y: e.clientY
				};
				if (dn && newPos.y != oldPos.y) {
					const diff = newPos.y - oldPos.y;
					self.top = self.top + diff;
					self.height = self.height - diff;
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
					self.left = self.left + diff;
					self.width = self.width - diff;
				}
				oldPos = newPos;
			});
		}
		enableResizeHandle(this.$window.children('.resize-handle-n'), true, false, false, false);
		enableResizeHandle(this.$window.children('.resize-handle-e'), false, true, false, false);
		enableResizeHandle(this.$window.children('.resize-handle-s'), false, false, true, false);
		enableResizeHandle(this.$window.children('.resize-handle-w'), false, false, false, true);
		enableResizeHandle(this.$window.children('.resize-handle-ne'), true, true, false, false);
		enableResizeHandle(this.$window.children('.resize-handle-se'), false, true, true, false);
		enableResizeHandle(this.$window.children('.resize-handle-sw'), false, false, true, true);
		enableResizeHandle(this.$window.children('.resize-handle-nw'), true, false, false, true);

		function enableMoveHandle ($h) {
			let oldPos = null;
			$h.mousedown(e => {
				oldPos = {
					x: e.clientX,
					y: e.clientY
				}
				// Drag events result in buggy dragging behaviour, so we disable
				// them by returning false
				return false;
			});
			$(document).mouseup(e => oldPos = null);
			$(document).mousemove(e => {
				if (!oldPos) {
					return;
				}
				const newPos = {
					x: e.clientX,
					y: e.clientY
				};
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
		enableMoveHandle(this.$window.children('.title-bar'));

		this.$window.find('.maximize-button').click(e => {
			this.maximized = !this.maximized;
		});

		this.$window.find('.minimize-button').click(e => {
			this.minimized = !this.minimized;
		});

		this.$card.click(e => {
			this.minimized = !this.minimized;
		});
	}

	_saveGeometry () {
		this._savedGeometry = Object.assign({}, this._geometry);
	}

	_loadSavedGeometry () {
		this._geometry = this._savedGeometry;
	}

	_applyGeometry () {
		this.$window.width(this._geometry.width);
		this.$window.height(this._geometry.height);
		this.$window.css({
			top: this._geometry.top,
			left: this._geometry.left
		});
	}

	get width () {
		return this._geometry.width;
	}
	get height () {
		return this._geometry.height;
	}
	set width (w) {
		this._geometry.width = w;
		this._applyGeometry();
	}
	set height (h) {
		this._geometry.height = h;
		this._applyGeometry();
	}

	get top () {
		return this._geometry.top;
	}
	get left () {
		return this._geometry.left;
	}
	get right () {
		return this._geometry.left + this._geometry.width - 1;
	}
	get bottom () {
		return this._geometry.top + this._geometry.height - 1;
	}
	set top (t) {
		this._geometry.top = t;
		this._applyGeometry();
	}
	set left (l) {
		this._geometry.left = l;
		this._applyGeometry();
	}
	set right (r) {
		this._geometry.left = r + 1 - this.width;
		this._applyGeometry();
	}
	set bottom (b) {
		this._geometry.top = b + 1 - this.height;
		this._applyGeometry();
	}

	set maximized (m) {
		if (m === this._maximized) {
			return;
		}
		this._maximized = m;
		if (m) {
			this._saveGeometry();
			this._geometry = {
				width: $desktop.width(),
				height: $desktop.height(),
				top: 0,
				left: 0
			};
			this.$window.addClass('maximized');
		} else {
			this._loadSavedGeometry();
			this.$window.removeClass('maximized');
		}
		this._applyGeometry();
	}

	get maximized () {
		return this._maximized;
	}

	set minimized (m) {
		if (m === this._minimized) {
			return;
		}
		this._minimized = m;
		if (m) {
			this.$window.hide();
			this.$card.addClass('closed-card');
		} else {
			this.$window.show();
			this.$card.removeClass('closed-card');
		}
	}

	get minimized () {
		return this._minimized;
	}

	center () {
		const dw = $desktop.width();
		const dh = $desktop.height();
		const top = (dh - this.height) / 2;
		const left = (dw - this.width) / 2;
		this.top = top;
		this.left = left;
	}
}

const window = new Window();
window.width = 600;
window.height = 400;
window.center();
