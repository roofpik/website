var app = angular.module('roofpikWeb', ['ui.router']);

var config = {
    apiKey: "AIzaSyBSSYFQ2ZhbF7d0fwTIiHVOL1GTHAWpilA",
    authDomain: "roofpik-new.firebaseapp.com",
    databaseURL: "https://roofpik-new.firebaseio.com",
    storageBucket: "roofpik-new.appspot.com",
    messagingSenderId: "362004565118"
};
firebase.initializeApp(config);
var db = firebase.database();

app.run(function($rootScope, $timeout) {
    $rootScope.loginStatus = false;
    $rootScope.uid = null;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user && $rootScope.uid == null) {
            $rootScope.uid = user.uid;
            $rootScope.loginStatus = true;
            $rootScope.$emit("loggedIn");
            localStorage.setItem('loginStatus', true);
            localStorage.setItem('uid', JSON.stringify(user.uid));
            $('.modal').modal('close');
            $rootScope.photoURL = user.photoURL;
            $rootScope.displayName = user.displayName;
        } else {
            $rootScope.uid = null;
            $rootScope.loginStatus = false;
            localStorage.setItem('loginStatus', false);
            deleteLocalStorage('uid');
        }
    });
});
