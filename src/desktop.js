class Desktop {
	constructor () {
		const $desktop = $(require('./desktop.html'));
		$('body > .desktop').html($desktop.html());
	}
}

module.exports = Desktop;
