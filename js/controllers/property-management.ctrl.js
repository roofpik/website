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



var windowWidth = $(window).width();

$("#nav-toggle-prop").click(function () {
    $("#nav-prop ul").slideToggle();
    $("#nav-prop ul").toggleClass("open");
});

$(window).resize(function () {
    windowWidth = $(window).width();
    if (windowWidth > 767) {
        if ($("#nav-prop ul").is(":hidden")) {
            $("#nav-prop ul").css("display","block");
        }
    }
    else {
        $("#nav-prop ul").css("display","none");
    }
})

});
