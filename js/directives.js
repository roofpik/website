app.directive('header', function() {
    return {
        restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        scope: { user: '=' }, // This is one of the cool things :). Will be explained in post.
        templateUrl: "/js/directives/header.html",
        controller: 'headerCtrl'
    }
});

app.directive('footer', function() {
    return {
        restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        templateUrl: "/js/directives/footer.html",
        controller: ['$scope', function($scope) {
            // Your behaviour goes here :)
        }]
    }
});


app.directive('loading', function() {
    return {
        restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        templateUrl: "/js/directives/loading.html",
        controller: ['$scope', '$timeout', function($scope, $timeout) {
            $timeout(function() {
                $('.loading').animate({
                    opacity: 0,
                    bottom: "+=50",
                    height: "toggle"
                }, 2000);
                $('header').fadeIn();
                $('footer').fadeIn();
                $('md-content').fadeIn();
            }, 2000);
        }]
    }
});

app.directive('shortlistedProject', function() {
    return {
        restrict: 'EA', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        templateUrl: "/js/directives/shortlistedProjects.html"
    }
});

app.directive('userMenu', function() {
    return {
        restrict: 'EA', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        templateUrl: "/js/directives/userMenu.html"
    }
});

app.directive('infobox', function() {
    return {
        restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        templateUrl: "/js/directives/home/infoBox.html"
    }
});

app.directive('writeReviews', function() {
    return {
        restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        templateUrl: "/js/directives/home/writeReviews.html"
    }
});


app.directive('mainCategory', function() {
    return {
        restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        templateUrl: "/js/directives/home/mainCategory.html"
    }
});

app.directive('topProjects', function() {
    return {
        restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        templateUrl: "/js/directives/home/topProjects.html"
    }
});

app.directive('searchBox', function() {
    return {
        restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        templateUrl: "/js/directives/home/searchBox.html"
    }
});

app.directive('coverStories', function() {
    return {
        restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        templateUrl: "/js/directives/home/coverStories.html"
    }
});


app.directive('blogs', function() {
    return {
        restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        templateUrl: "/js/directives/home/blogs.html"
    }
});

