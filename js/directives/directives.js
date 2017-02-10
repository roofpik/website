app.directive('contentLoading', function() {
    return {
        restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        template: '<div class="loader-modal"><div class="loader-cont">' +
            '<div class="loader"></div></div></div>'
    }
});

app.directive('gallery', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/projects/gallery.html',
        controller: 'galleryCtrl',
        scope: {
            galleryResponse: '='
        }
    }
});

app.directive('header', function() {
    return {
        restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        scope: { user: '=' }, // This is one of the cool things :). Will be explained in post.
        templateUrl: "/js/directives/header.html",
        controller: 'headerCtrl'
    }
});