class AppManager {
	constructor (windowManager) {
		this.windowManager = windowManager;
		this.appStore = {};
	}

	addApp (appName, appClass) {
		this.appStore[appName] = appClass;
	}

	launch (appName) {
		if (this.appStore[appName]) {
			new this.appStore[appName](this.windowManager, this);
		} else {
			throw new Error('no app called: ' + appName);
		}
	}
}

module.exports = AppManager;
