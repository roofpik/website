app.directive('contentLoading', function() {
    return {
        restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        template: '<div class="loader-modal"><div class="loader-cont">' +
            '<div class="loader"></div></div></div>'
    }
});