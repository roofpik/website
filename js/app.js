var app = angular.module('roofpik', ['ngMaterial', 'ui.router']);

app.run(function($rootScope, $mdDialog, $timeout) {
    $rootScope.loginStatus = false;
    $rootScope.uid = null;
    firebase.auth().onAuthStateChanged(function(user) {
    	$timeout(function(){


        if (user) {
            console.log(user);

            $rootScope.uid = user.uid;
            $rootScope.loginStatus = true;
            console.log($rootScope.loginStatus);
            $mdDialog.hide();
            // User is signed in.
        } else {
            $rootScope.uid = null;
            $rootScope.loginStatus = false;
            console.log('No user is signed in');
            $mdDialog.hide();
            // No user is signed in.
        }
        }, 500);
    });
});
