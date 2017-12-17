const $appsButton = $('.apps-button');
const $appsList = $('.apps-list');
const $desktop = $('.desktop');

$appsButton.click(e => {
	$appsList.toggle();
});

$desktop.click(e => {
	if ($appsList.is(':visible')) {
		$appsList.hide();
	}
});
