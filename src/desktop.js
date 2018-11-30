class Desktop {
	constructor (appManager) {
		this.$elem = $('body > .desktop');

		const $desktop = $(require('./desktop.html'));
		this.$elem.html($desktop.html());

		this.$elem.find('.launcher').click(e => {
			const appId = $(e.currentTarget).data('app');
			appManager.launch(appId);
			e.currentTarget.blur();
		});
	}
}

module.exports = Desktop;
