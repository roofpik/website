app.controller('propertymanagementCtrl', function($scope, $state, $timeout) {
    // ga('send', 'home');
    $('.modal').modal('close');
    $('.parallax').parallax();
    $timeout(function() {
        $('.carousel-slider').carousel({
            full_width: true
        });

        $timeout(function(){

         $('.carousel-slider').height(350);
        }, 1500);

    }, 500)


});
