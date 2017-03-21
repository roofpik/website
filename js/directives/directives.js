app.directive('header', function() {
    return {
        restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: false,
        scope: { user: '=' }, // This is one of the cool things :). Will be explained in post.
        templateUrl: "templates/directives/header.html"
        // controller: 'headerCtrl'
    }
});

app.directive('footer', function() {
    return {
        restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: false,
        scope: { user: '=?' }, // This is one of the cool things :). Will be explained in post
        templateUrl: "templates/directives/footer.html"
        // controller: 'footerCtrl'
    }
});

app.directive('login', function() {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: "templates/directives/login.html",
        controller: 'loginCtrl'
    }
});

app.controller('loginCtrl', function() {
})