class ContactApp {
	constructor (windowManager) {
		this.window = windowManager.addWindow({
			title:        'Contact',
			content:      require('./contact-app.html'),
			contentClass: 'contact-app',
			initialSize:  { width: 640, height: 480 },
			minSize:      { width: 350, height: 380 },
		});

		const self = this;
		this.window.$element.find('form').submit(e => {
			e.preventDefault();
			self._send();
		});
	}

	_lockForm () {
		const $window = this.window.$element;
		$window.find('form').prop('disabled', true);
		$window.find('input').prop('disabled', true);
		$window.find('textarea').prop('disabled', true);
		$window.find('button').prop('disabled', true);
	}

	_unlockForm () {
		const $window = this.window.$element;
		$window.find('form').prop('disabled', false);
		$window.find('input').prop('disabled', false);
		$window.find('textarea').prop('disabled', false);
		$window.find('button').prop('disabled', false);
	}

	_clearForm () {
		const $window = this.window.$element;
		$window.find('.from').val('');
		$window.find('.subject').val('');
		$window.find('.message').val('');
	}

	_clearResult () {
		const $result = this.window.$element.find('.result');
		$result.text('');
		$result.removeClass('failure');
		$result.removeClass('success');
	}

	_setResult (success) {
		this._clearResult();
		const $result = this.window.$element.find('.result');
		if (success) {
			$result.addClass('success');
			$result.text('Email sent.');
		} else {
			$result.addClass('failure');
			$result.text('Send failed.');
		}
	}

	_send () {
		const $window = this.window.$element;
		const from = $window.find('.from').val();
		const subject = $window.find('.subject').val();
		const message = $window.find('.message').val();

		this._clearResult();
		this._lockForm();
		const req = $.post({
			url: '/api/contact',
			contentType: 'application/json',
			data: JSON.stringify({ from, subject, message }),
		});

		const self = this;
		req.done(() => {
			self._clearForm();
			self._unlockForm();
			self._setResult(true);
		});
		req.fail(jqXHR => {
			console.log('Failed request:', jqXHR);
			self._unlockForm();
			self._setResult(false);
		});
	}
}

module.exports = ContactApp;
