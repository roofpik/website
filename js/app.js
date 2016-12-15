var app = angular.module('roofpik', ['ngMaterial', 'ui.router']);

app.run(function($rootScope, $mdDialog, $timeout) {
    $rootScope.loginStatus = false;
    $rootScope.uid = null;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log(user);

            $rootScope.uid = user.uid;
            $rootScope.loginStatus = true;
            localStorage.setItem('loginStatus', true);
            console.log($rootScope.loginStatus);
            $mdDialog.hide();
            // User is signed in.
        } else {
            $rootScope.uid = null;
            $rootScope.loginStatus = false;
            localStorage.setItem('loginStatus', false);
            console.log('No user is signed in');
            $mdDialog.hide();
            // No user is signed in.
        }
    });
});
