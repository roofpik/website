app.controller('ownerpropertydetails', function($scope, $state, $timeout) {
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
$('select').material_select();

 $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });

  $('.gallery').each(function() { // the containers for all your galleries
                    $(this).magnificPopup({
                        delegate: 'a', // the selector for gallery item
                        type: 'image',
                        gallery: {
                            enabled: true
                        }
                    });
                });

});
