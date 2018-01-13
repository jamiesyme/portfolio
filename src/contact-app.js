class ContactApp {
	constructor (windowManager) {
		this.window = windowManager.addWindow({
			title:        'Contact',
			content:      require('./contact-app.html'),
			contentClass: 'contact-app',
			initialSize:  { width: 640, height: 480 },
			minSize:      { width: 350, height: 380 },
		});
	}
}

module.exports = ContactApp;
