var app = angular.module('roofpik', ['ngMaterial', 'ui.router']);

app.run(function($rootScope, $mdDialog, $timeout, UserTokenService) {
    $rootScope.loginStatus = false;
    $rootScope.uid = null;
    $rootScope.localStorageCount = 2;
    cityId = '-KYJONgh0P98xoyPPYm9';
    var searchList = [];
    var projectList = [];

    firebase.auth().onAuthStateChanged(function(user) {
        if (user && $rootScope.uid == null) {
            $rootScope.uid = user.uid;
            var timestamp = new Date().getTime();
            UserTokenService.checkToken($rootScope.uid, timestamp, 4);
            $rootScope.loginStatus = true;
            localStorage.setItem('loginStatus', true);
            $mdDialog.hide();
            $rootScope.photoURL = user.photoURL;
            $rootScope.displayName = user.displayName;
            // User is signed in.
        } else {
            $rootScope.uid = null;
            $rootScope.loginStatus = false;
            localStorage.setItem('loginStatus', false);
            // No user is signed in.
        }
    });
});
