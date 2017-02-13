var app = angular.module('roofpikWeb', ['ui.router']);

app.run(function($rootScope, $timeout) {
    $rootScope.loginStatus = false;
    $rootScope.uid = null;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user && $rootScope.uid == null) {
            $rootScope.uid = user.uid;
            var timestamp = new Date().getTime();
            // UserTokenService.checkToken($rootScope.uid, timestamp, 4);
            $rootScope.loginStatus = true;
            localStorage.setItem('loginStatus', true);
            $('.modal').modal('close');
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