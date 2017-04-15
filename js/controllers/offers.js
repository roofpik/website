app.controller('OffersCtrl', function($scope, $state, $timeout, $rootScope) {

    $('.modal').modal();

    $('#offer_modal_popup').modal();

    db.ref('/partner/city/-KYJONgh0P98xoyPPYm9/coupon').once('value', function(snapshot) {
        $timeout(function() {

            $scope.allCoupon = snapshot.val();
            console.log($scope.allCoupon);
            for (key in $scope.allCoupon) {
                db.ref('images/' + $scope.allCoupon[key]['cover-image']).once('value', function(snapshot) {
                    $timeout(function() {
                        $scope.allCoupon[snapshot.val()['parentkey']]['img'] = 'http://139.162.9.71/images/' + snapshot.val()['imgName'] + '.jpg';
                    }, 100)
                });
            }
        }, 200)
    });

    var user;

    $timeout(function() {
        user = firebase.auth().currentUser;
    }, 3000);


    firebase.auth().onAuthStateChanged(function(data) {
        if (data) {
            // data is signed in.
            user = data;
        }
    });


    $scope.checkReview = function(key) {
        // data is signed in.
        if (user) {
            console.log(user.uid)

            db.ref('allreviews/users/' + user.uid).once('value', function(snapshot) {
                console.log(snapshot.val())
                if (snapshot.val() != null) {
                    console.log('Take to the new page')
                } else {
                    $('#offer_modal_popup').modal('open');
                }
            });



        } else {
            $('#offer_modal2_popup').modal('open');
            // No user is signed in.

        }

    };
});
