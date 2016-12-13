var app = angular.module('roofpik', ['ngMaterial', 'ui.router','720kb.socialshare']);

app.run(function($rootScope) {
	$rootScope.loginStatus = false;
});