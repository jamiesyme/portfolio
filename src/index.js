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
	constructor ($e) {
		this.$element = $e;
		this._width = $e.width();
		this._height = $e.height();
		this._top = $e.position().top;
		this._left = $e.position().left;

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
		enableResizeHandle($e.children('.resize-handle-n'), true, false, false, false);
		enableResizeHandle($e.children('.resize-handle-e'), false, true, false, false);
		enableResizeHandle($e.children('.resize-handle-s'), false, false, true, false);
		enableResizeHandle($e.children('.resize-handle-w'), false, false, false, true);
		enableResizeHandle($e.children('.resize-handle-ne'), true, true, false, false);
		enableResizeHandle($e.children('.resize-handle-se'), false, true, true, false);
		enableResizeHandle($e.children('.resize-handle-sw'), false, false, true, true);
		enableResizeHandle($e.children('.resize-handle-nw'), true, false, false, true);

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
		enableMoveHandle($e.children('.title-bar'));
	}

	get width () {
		return this._width;
	}
	get height () {
		return this._height;
	}
	set width (w) {
		this.$element.width(w);
		this._width = w;
	}
	set height (h) {
		this.$element.height(h);
		this._height = h;
	}

	get top () {
		return this._top;
	}
	get left () {
		return this._left;
	}
	get right () {
		return this._left + this._width - 1;
	}
	get bottom () {
		return this._top + this._height - 1;
	}
	set top (t) {
		this._top = t;
		this.$element.offset({
			top: this.top,
			left: this.left
		});
	}
	set left (l) {
		this._left = l;
		this.$element.offset({
			top: this.top,
			left: this.left
		});
	}
	set right (r) {
		this._left = r + 1 - this._width;
		this.$element.offset({
			top: this.top,
			left: this.left
		});
	}
	set bottom (b) {
		this._top = b + 1 - this._height;
		this.$element.offset({
			top: this.top,
			left: this.left
		});
	}
	center () {
		const dw = $desktop.width();
		const dh = $desktop.height();
		const top = (dh - this.height) / 2;
		const left = (dw - this.width) / 2;
		this.$element.offset({ top, left });
		this._top = top;
		this._left = left;
	}
}

const window = new Window($('.window'));
window.width = 600;
window.height = 400;
window.center();
