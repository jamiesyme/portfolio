class AboutApp {
	constructor (windowManager, appManager) {
		function launchApp (id) {
			// Launching an app from within a click handler will keep the current
			// window focused instead of giving it to the launched app. To avoid
			// this, we can use setTimeout().
			setTimeout(() => appManager.launch(id), 0);
		}

		this.window = windowManager.openWindow({
			title:        'About',
			content:      require('./about-app.html'),
			contentClass: 'about-app',
			size:         { width: 760, height: 870 },
			minSize:      { width: 350, height: 380 },
		});

		const $canvas = this.window.$canvas;
		$canvas.find('.app-projects-link').click(e => {
			e.preventDefault();
			launchApp('projects');
		});
		$canvas.find('.app-contact-link').click(e => {
			e.preventDefault();
			launchApp('contact');
		});
	}
}

module.exports = AboutApp;
