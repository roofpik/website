app.controller('offersCtrl', function($scope, $state, $timeout, $rootScope) {

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
                    var url = $state.href('offer-details', { 'key': key });
                    window.open(url, '_blank');
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

app.controller('offerDetailsCtrl', function($scope, $location, $timeout) {

    $timeout(function() {
        user = firebase.auth().currentUser;
    }, 3000);

    $scope.userData = {}
    $timeout(function() {

        db.ref('couponUsed/' + user.uid + '/' + $scope.offer.key).once('value', function(snapshot) {
            $timeout(function() {


                if (snapshot.val() == null) {

                    $scope.userData.created = new Date().getTime();
                    $scope.userData.security = Math.floor((Math.random() * 100000000) + 10000);
                    $scope.userData.user = user.uid;
                    $scope.userData.offer = $scope.offer.key;
                    db.ref('couponUsed/' + user.uid + '/' + $scope.offer.key).update($scope.userData)

                } else {

                    $scope.userData = snapshot.val();
                }
            }, 500);
        })

    }, 5000);


    firebase.auth().onAuthStateChanged(function(data) {
        if (data) {
            // data is signed in.
            user = data;
        }
    });


    db.ref('/partner/city/-KYJONgh0P98xoyPPYm9/coupon/' + $location.search().key).once('value', function(snapshot) {
        $timeout(function() {

            $scope.offer = snapshot.val();
            console.log($scope.offer);
            $('#offerDetails').html($scope.offer.details)
        }, 200);

        db.ref('images/' + snapshot.val()['cover-image']).once('value', function(snapshot) {
            $timeout(function() {

                $scope.cover = 'http://139.162.9.71/images/' + snapshot.val()['imgName'] + '.jpg';
                $('.materialboxed').materialbox();
            }, 500)
        })
    });

});
