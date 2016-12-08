var app = angular.module('roofpik', ['ngMaterial', 'ui.router']);


app.run(function($rootScope) {
	$rootScope.loginStatus = false;
});

var db = firebase.database();

var versions = {
    searchVersion: 1,
    topRatedVersion: 1,
    kidsVersion: 1,
    petFriendlyVersion: 1,
    oldAgeFriendlyVersion: 1,
    bachelorsVersion: 1,
    justMarriedVersion: 1,
    familyVersion: 1,
    numProjectsVersion: 1
};
