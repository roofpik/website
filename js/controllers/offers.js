app.controller('OffersCtrl', function($scope, $state, $timeout) {

    $('.modal').modal();

    $('#offer_modal_popup').modal();

    db.ref('/partner/city/-KYJONgh0P98xoyPPYm9/coupon').once('value', function(snapshot) {
        $timeout(function() {

            $scope.allCoupon = snapshot.val();
            console.log($scope.allCoupon);
            // for (key in allCoupon) {
            //     for (img in allCoupon[key]) {
            //         db.ref('images/' + img).once('value', function(snapshot) {

            //         });
            //     }
            // }
        }, 200)
    });


});
