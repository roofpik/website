app.controller('writeReviewCtrl', function($scope, $timeout, $stateParams, $rootScope, $http, $location, $state) {
    var user;


    function initialize() {
        $scope.review = {};
        $scope.review.main = {};
        $scope.review.user = {};
    }

    initialize();


    $scope.$on('gmPlacesAutocomplete::placeChanged', function() {
        $scope.data = $scope.autocomplete.getPlace();
        $scope.data.query = $('#place_name').val()
        $scope.$apply();
        var location = $scope.data.geometry.location
        delete $scope.data['geometry'];
        $scope.data.lat = location.lat();
        $scope.data.lng = location.lng();

        // console.log($scope.data.photos.length)
        try {
            for (i = 0; i < $scope.data.photos.length; i++) {
                delete $scope.data['photos'][i]['getUrl'];
            }
        }
        catch(err){

        }
        jdata = JSON.stringify($scope.data);
        db.ref('test/search/' + $scope.data.place_id).set($scope.data);
        // $state.go('project')
    });

    firebase.auth().onAuthStateChanged(function(data) {
        if (data) {
            // data is signed in.
            user = data;

        } else {
            // No user is signed in.
            $timeout(function() {
                $('#login_signup_popup').modal({
                    dismissible: false
                });

                $('#login_signup_popup').modal('open');
                $('.modal-close').hide()
            }, 2000)

        }
    });





    ratingTxtVal = ['Click to rate', 'Terrible', 'Poor', 'Average', 'Good', 'Excellent']
    $scope.ratingParams = [{
        name: 'Security',
        id: 2,
        rtxt: ratingTxtVal[0],
        val: 'security'
    }, {
        name: 'Amenities',
        id: 3,
        rtxt: ratingTxtVal[0],
        val: 'amenities'
    }, {
        name: 'Open and green areas',
        id: 4,
        rtxt: ratingTxtVal[0],
        val: 'greenry'
    }, {
        name: 'Convenience of parking',
        id: 5,
        rtxt: ratingTxtVal[0],
        val: 'parking'
    }, {
        name: 'Infrastructure',
        id: 6,
        rtxt: ratingTxtVal[0],
        val: 'infrastructure'
    }];



    $scope.ratingTxt = {
        overall: ratingTxtVal[0],
        security: ratingTxtVal[0],
        amenities: ratingTxtVal[0],
        green: ratingTxtVal[0],
        parking: ratingTxtVal[0],
        infrastructure: ratingTxtVal[0]
    }
    $scope.ratingsObject = {
        iconOnColor: 'rgb(43, 187, 173)', //Optional
        iconOffColor: 'rgb(140, 140, 140)', //Optional
        rating: 0, //Optional
        minRating: 0, //Optional
        readOnly: false, //Optional
        callback: function(rating, index) { //Mandatory    
            $scope.ratingsCallback(rating, index);
        }
    };
    $scope.ratingsCallback = function(rating, index) {
        if (index == 1) {
            $scope.review.main.rating = rating;
            $scope.ratingTxt.overall = ratingTxtVal[rating];
        }
    };


    $scope.submitReview = function() {

        $scope.review.user.uid = user.uid;
        $scope.review.main.place_id = $scope.data.place_id;

        var x = $scope.data.place_id;

        $scope.disbtn = true;


        db.ref('test/new/reviews/' + $scope.data.place_id + '/' + user.uid).set($scope.review);
        db.ref('test/new/users/' + user.uid + '/' + $scope.data.place_id).set({
            x: true
        }).then(function(){
            firebase.auth().signOut();
            swal('It matters a lot', 'Thank you for contributing', 'success');
            $scope.disbtn = false;
            $state.go('home');
            $timeout(function(){
                $('#login_signup_popup').modal('close');
            }, 1000);
            
        });

    };

});


app.filter('iif', function() {
    return function(input, trueValue, falseValue) {
        return input ? trueValue : falseValue;
    };
});
