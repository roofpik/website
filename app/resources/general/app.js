var app = angular.module('roofpikWeb', ['ui.router', 'firebase']);

var config = {
  apiKey: "AIzaSyBNZqun4Ti9zhd5ClUh_Ax2V59jYPYGK_4",
  authDomain: "roofpikweb.firebaseapp.com",
  databaseURL: "https://roofpikweb.firebaseio.com",
  storageBucket: "roofpikweb.appspot.com",
  messagingSenderId: "877889560997"
};
firebase.initializeApp(config);
var db = firebase.database();

app.run(['$rootScope', '$timeout', 'Config', function($rootScope, $timeout, Config) {
  $rootScope.domain = Config.domain;
  $rootScope.cdn = Config.cdn;
  $rootScope.loginStatus = false;
  $rootScope.uid = null;
  firebase.auth().onAuthStateChanged(function(user) {
    if (user && $rootScope.uid == null) {
      $rootScope.uid = user.uid;
      $rootScope.loginStatus = true;
      $rootScope.$emit("loggedIn");
      localStorage.setItem('loginStatus', true);
      localStorage.setItem('uid', JSON.stringify(user.uid));
      // $('.modal').modal('close');
      $rootScope.photoURL = user.photoURL;
      $rootScope.displayName = user.displayName;
    } else {
      $rootScope.uid = null;
      $rootScope.loginStatus = false;
      localStorage.setItem('loginStatus', false);
      deleteLocalStorage('uid');
    }
  });

  $rootScope.$on('$stateChangeStart',
    function() {
      // do something
      // hideLoading();
    })
}]);



// function hideLoading() {
//     clearInterval(lint);
//     $('#page-load').fadeOut(500, function() {
//         $('.main-content').fadeIn(500);
//         $('.parallax').parallax();
//     });




// }
// var lint;

// function showLoading(type) {
//     if (type == "stext") {
//         var text = ["<b class='redt'>Roofpik</b> Power Your Property Search with Genuine User Reviews", "World's<b class='redt'> First</b> Property Reviewing Website", "Reviews are becoming the digital version of <b class='redt'>word-of-mouth</b> - Huffingtonpost"]
//     } else {
//         var text = []
//     }
//     count = 0;
//     setInterval(function() {
//         if (count == 2) {
//             count = 0
//         };

//         $("#load-text").fadeOut(500, function() {
//             $('#load-text').html(text[count]);
//             $("#load-text").fadeIn(1000);
//             count = count + 1;
//         });

//     }, 4000);


//     $('#load-text').html(text[count]);
//     count = count + 1;

//     $('#page-load').fadeIn(200, function() {
//         $('.main-content').hide();
//     });

//     setTimeout(function() {
//         hideLoading();
//     }, 8000)
// }
