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
            hideLoading()
        })
});



function hideLoading() {
    clearInterval(lint);
    $('#page-load').fadeOut(1000, function() {
        $('header').fadeIn(200);
        $('footer').fadeIn(200);
        $('.main-content').fadeIn(1000);
    });




}
var lint;

function showLoading(type) {
    if (type == "stext") {
        var text = ["<b class='redt'>Roofpik</b> Power Your Property Search with Genuine User Reviews", "World's<b class='redt'> First</b> Property Reviewing Website", "Reviews are becoming the digital version of <b class='redt'>word-of-mouth</b> - Huffingtonpost"]
    } else {
        var text = []
    }
    count = 0;
    setInterval(function() {
        if (count == 2) {
            count = 0
        };

        $("#load-text").fadeOut(500, function() {
            $('#load-text').html(text[count]);
            $("#load-text").fadeIn(1000);
            count = count + 1;
        });

    }, 4000);


    $('#load-text').html(text[count]);
    count = count + 1;

    $('#page-load').fadeIn(200, function() {
        $('header').hide();
        $('footer').hide();
        $('.main-content').hide();
    });

    setTimeout(function() {
        hideLoading();
    }, 8000)
}
