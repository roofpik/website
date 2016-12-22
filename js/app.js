var app = angular.module('roofpik', ['ngMaterial', 'ui.router']);

app.run(function($rootScope, $mdDialog, $timeout, UserTokenService) {
    $rootScope.loginStatus = false;
    $rootScope.uid = null;
    firebase.auth().onAuthStateChanged(function(user) {

        if (user && $rootScope.loginSuccess) {
            // var storageLoginStatus = localStorage.getItem(loginStatus);
            $rootScope.uid = user.uid;
            var timestamp = new Date().getTime();
            UserTokenService.checkToken($rootScope.uid, timestamp, 4);
            $rootScope.loginStatus = true;

            localStorage.setItem('loginStatus', true);

            $mdDialog.hide();
            var name = user.displayName.split(" ");
            var uname = name[0].charAt(0).toUpperCase() + name[0].slice(1);
            sweetAlert("Welcome " + uname, "You have successfully logged in!", "success");
            // User is signed in.
        } else if ($rootScope.logoutSuccess) {
            $rootScope.uid = null;
            $rootScope.loginStatus = false;
            localStorage.setItem('loginStatus', false);
            $mdDialog.hide();
            sweetAlert("Logout Successful", "You have successfully logged out!", "success");
            // No user is signed in.
        }
        else if(user){
            var timestamp = new Date().getTime();
            UserTokenService.checkToken($rootScope.uid, timestamp, 4);
            $rootScope.loginStatus = true;
            localStorage.setItem('loginStatus', true);
        }
    });
});

function loading(status) {

    if (status) {

        $('.loader-modal').fadeIn();
    } else {
        $('.loader-modal').fadeOut();
    }
}
