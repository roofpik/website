app.controller('writeReviewCtrl', function($scope, $timeout, $stateParams, $rootScope) {
   $scope.data = {};
    $scope.data.textlength = 0;
    $scope.data.text = '';
    $scope.textcount = false;
    $('select').material_select();
    $scope.reviewText = function() {
        if ($scope.review.reviewText) {
            $scope.data.textlength = $scope.review.reviewText.length;

            if ($scope.data.textlength >= 100) {
                $scope.textcount = true;

                $("#textarea1").removeClass("validate")
                $("#textcount").removeClass("validate")
            } else {
                $scope.textcount = false;
                $("#textarea1").addClass("validate")
                $("#textcount").addClass("validate")
            }
        } else {
            $scope.textcount = false;
            $scope.data.textlength = 0;
        }
    }

    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    $scope.countryId = '-K_43TEI8cBodNbwlKqJ';
    $scope.user = {};
    $scope.review = {
        ratings: {}
    }
    ratingTxtVal = ['Click to rate', 'Terrible', 'Poor', 'Average', 'Good', 'Excellent']
    $scope.ratingParams = [{
        name: 'Security',
        id: 2,
        rtxt: ratingTxtVal[0]
    }, {
        name: 'Amenities',
        id: 3,
        rtxt: ratingTxtVal[0]
    }, {
        name: 'Open and green areas',
        id: 4,
        rtxt: ratingTxtVal[0]
    }, {
        name: 'Convenience of parking',
        id: 5,
        rtxt: ratingTxtVal[0]
    }, {
        name: 'Infrastructure',
        id: 6,
        rtxt: ratingTxtVal[0]
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
            $scope.review.overallRating = rating;
            $scope.ratingTxt.overall = ratingTxtVal[rating];
        } else if (index == 2) {
            $scope.review.ratings.security = rating;
            $scope.ratingParams[index - 2].rtxt = ratingTxtVal[rating];
        } else if (index == 3) {
            $scope.review.ratings.amenities = rating;
            $scope.ratingParams[index - 2].rtxt = ratingTxtVal[rating];
        } else if (index == 4) {
            $scope.review.ratings.green = rating;
            $scope.ratingParams[index - 2].rtxt = ratingTxtVal[rating];
        } else if (index == 5) {
            $scope.review.ratings.parking = rating;
            $scope.ratingParams[index - 2].rtxt = ratingTxtVal[rating];
        } else if (index == 6) {
            $scope.review.ratings.infrastructure = rating;
            $scope.ratingParams[index - 2].rtxt = ratingTxtVal[rating];
        }
    };


    $scope.submitReview = function() {
        var reviewPath = '';
        var userReviewPath = '';
        var newKey = '';
        $scope.review.userName = $scope.user.displayName;
        $scope.review.userId = $scope.user.uid;
        $scope.review.blocked = false;
        $scope.review.created = new Date().getTime();
        $scope.review.updated = $scope.review.created;
        $scope.review.wordCount = ($scope.review.reviewText).length;
        $scope.review.source = 'website';
        $scope.review.status = 'uploaded';
        var updates = {};

        newKey = db.ref('reviews/country/' + $scope.countryId + '/city/' + $scope.cityId + '/residential/' + $scope.selectedProject.id).push().key;
        $scope.userReviewData.id = $scope.selectedProject.id;
        $scope.userReviewData.name = $scope.selectedProject.name;
        reviewPath = 'reviews/country/' + $scope.countryId + '/city/' + $scope.cityId + '/residential/' + $scope.selectedProject.id + '/' + newKey;
        userReviewPath = 'userReviews/' + $scope.review.userId + '/residential/' + newKey;


        if (Object.keys($scope.review.ratings).length == 0) {
            delete $scope.review.ratings;
        }

        updates[reviewPath] = $scope.review;
        updates[userReviewPath] = $scope.userReviewData;
        console.log(updates);
        return;
        db.ref().update(updates).then(function() {
            $timeout(function() {
                swal("Review Submitted", "Your review has been successfully submitted", "success");
            }, 0);
        })
    }

});
