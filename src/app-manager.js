class AppManager {
	constructor (windowManager) {
		this._windowManager = windowManager;
		this._appStore = {};
	}

	addApp (appName, appClass) {
		this._appStore[appName] = appClass;
	}

	launch (appName) {
		if (this._appStore[appName]) {
			new this._appStore[appName](this._windowManager, this);
		} else {
			throw new Error('no app called: ' + appName);
		}
	}
}

module.exports = AppManager;
