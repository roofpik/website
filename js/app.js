var app = angular.module('roofpik', ['ngMaterial', 'ui.router']);

app.run(function($rootScope) {
	$rootScope.loginStatus = false;
	$rootScope.uid = null;
});


 firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
              console.log(user);
              $rootScope.uid = user.uid;
              $rootScope.loginStatus = true;
              // User is signed in.
          } else {
              $rootScope.uid = null;
              $rootScope.loginStatus = true;
              console.log('No user is signed in');
              // No user is signed in.
          }
      });
