var app = angular.module('roofpik', ['ngMaterial', 'ui.router']);

app.run(function($rootScope) {
	$rootScope.loginStatus = false;
});