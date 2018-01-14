class AboutApp {
	constructor (windowManager, appManager) {
		this.window = windowManager.addWindow({
			title:        'About',
			content:      require('./about-app.html'),
			contentClass: 'about-app',
			initialSize:  { width: 760, height: 800 },
			minSize:      { width: 350, height: 380 },
		});

		const $canvas = this.window.$canvas;
		$canvas.find('.app-projects-link').click(e => {
			e.preventDefault();
			appManager.launch('projects');
		});
		$canvas.find('.app-contact-link').click(e => {
			e.preventDefault();
			appManager.launch('contact');
		});
	}
}

module.exports = AboutApp;
