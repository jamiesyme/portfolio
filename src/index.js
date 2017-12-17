const $appsListButton = $('.apps-list-button');
const $appsList = $('.apps-list');
const $desktop = $('.desktop');

$appsListButton.click(e => {
	$appsList.toggle();
});

$desktop.click(e => {
	if ($appsList.is(':visible')) {
		$appsList.hide();
	}
});
