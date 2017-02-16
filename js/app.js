var app = angular.module('roofpikWeb', ['ui.router']);

app.run(function($rootScope, $timeout) {
    $rootScope.loginStatus = false;
    $rootScope.uid = null;
    firebase.auth().onAuthStateChanged(function(user) {
        // console.log(user);
        if (user && $rootScope.uid == null) {
            // console.log('2');
            $rootScope.uid = user.uid;
            var timestamp = new Date().getTime();
            // UserTokenService.checkToken($rootScope.uid, timestamp, 4);
            $rootScope.loginStatus = true;
            localStorage.setItem('loginStatus', true);
            // console.log('here');
            localStorage.setItem('uid', JSON.stringify(user.uid));
            $('.modal').modal('close');
            $rootScope.photoURL = user.photoURL;
            $rootScope.displayName = user.displayName;
            // User is signed in.
        } else {
            $rootScope.uid = null;
            $rootScope.loginStatus = false;
            localStorage.setItem('loginStatus', false);
            deleteLocalStorage('uid');
            // No user is signed in.
        }
    });
});