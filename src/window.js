const Template = require('./template');

class Window {
	/**
	 * @param {object} params
	 * @param {object} params.windowManager
	 * @param {number} params.x
	 * @param {number} params.y
	 * @param {number} params.width
	 * @param {number} params.height
	 * @param {string} params.title
	 * @param {string} params.content
	 * @param {string} params.contentClass
	 * @param {object} params.minSize
	 * @param {number} params.minSize.width
	 * @param {number} params.minSize.height
	 */
	constructor (params) {
		this.windowManager = params.windowManager;
		this.x             = params.x;
		this.y             = params.y;
		this.width         = params.width;
		this.height        = params.height;
		this.minSize       = Object.assign({}, params.minSize);
		this.title         = params.title;
		this.minimized     = false;
		this.maximized     = false;
		this.focused       = false;

		this.$elem = (() => {
			const windowTmpl = require('./window.html');
			const windowHtml = Template.render(windowTmpl, {
				title:        params.title,
				content:      params.content,
				contentClass: params.contentClass,
			});
			const $window = $(windowHtml);
			return $window;
		})();
		this.$canvas = this.$elem.find('.canvas-outer > .canvas');

		this._listeners = {
			'close': [],
			'maximize': [],
			'minimize': [],
			'move': [],
			'resize': [],
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

module.exports = Window;
