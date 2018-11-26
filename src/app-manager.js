class AppManager {
	constructor (windowManager) {
		this._windowManager = windowManager;
		this._appStore = {};
	}

	addApp (id, appClass) {
		this._appStore[id] = appClass;
	}

	launch (id) {
		if (this._appStore[id]) {
			return new this._appStore[id](this._windowManager, this);
		} else {
			throw new Error('no app with id: ' + id);
		}
	}
}

module.exports = AppManager;
