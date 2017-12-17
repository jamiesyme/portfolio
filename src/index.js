const $appsButton = $('.apps-button');
const $appsList = $('.apps-list');

$appsButton.click(e => {
	$appsList.toggle();
});
