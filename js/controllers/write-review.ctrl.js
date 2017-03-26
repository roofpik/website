app.controller('writeReviewCtrl', function($scope, $timeout, $stateParams, $rootScope) {

    $('.modal').modal();
    $('ul.tabs').tabs();
    Materialize.updateTextFields();

    $('.button-collapse').sideNav({
        menuWidth: 300, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true // Choose whether you can drag to open on touch screens
    });
    $('select').material_select();
    $('.slider').slider();
    $('.dropdown-button').dropdown();
    $('.carousel').carousel();
    // Configure/customize these variables.
    var showChar = 100; // How many characters are shown by default
    var ellipsestext = "...";
    var moretext = "Show more >";
    var lesstext = "Show less";


    $('.more').each(function() {
        var content = $(this).html();

        if (content.length > showChar) {

            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);

            var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';

            $(this).html(html);
        }

    });

    $(".morelink").click(function() {
        if ($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });

    $scope.idPresent = false;
    if ($stateParams.id) {
        $scope.idPresent = true;
    }
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    $scope.countryId = '-K_43TEI8cBodNbwlKqJ';
    $scope.user = {};
    $scope.review = {
            ratings: {}
        }
        // $scope.selectedProject = {};
    $scope.selectedProject = {
        name: 'Vipul Greens',
        type: 'residential',
        id: '1234'
    }

    $scope.ratingParams = [{
        name: 'Security',
        id: 2
    }, {
        name: 'Amenities',
        id: 3
    }, {
        name: 'Open and green areas',
        id: 4
    }, {
        name: 'Convenience of parking',
        id: 5
    }, {
        name: 'Infrastructure',
        id: 6
    }];
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
        } else if (index == 2) {
            $scope.review.ratings.security = rating;
        } else if (index == 3) {
            $scope.review.ratings.amenities = rating;
        } else if (index == 4) {
            $scope.review.ratings.openAndGreenAreas = rating;
        } else if (index == 5) {
            $scope.review.ratings.convenienceOfParking = rating;
        } else if (index == 6) {
            $scope.review.ratings.infrastructure = rating;
        }
    };
    $rootScope.$watch('loginStatus', function() {
            $timeout(function() {
                if ($rootScope.loginStatus) {
                    $scope.loginStatus = true;
                    $scope.user = firebase.auth().currentUser;
                } else {
                    $scope.loginStatus = false;
                }
            }, 0)
        })
        // console.log(checkLocalStorage('loginStatus'));
    if (checkLocalStorage('loginStatus')) {
        $timeout(function() {
            $scope.loginStatus = JSON.parse(localStorage.getItem('loginStatus'));
            // console.log($scope.loginStatus);
            if (JSON.parse(localStorage.getItem('loginStatus'))) {
                $scope.user = firebase.auth().currentUser;
            } else {
                $rootScope.$emit("callShowLogin");
            }
        },0);
    } else {
        $rootScope.$emit("callShowLogin");
    }

    $scope.submitReview = function() {
        var reviewPath = '';
        var userReviewPath = '';
        var newKey = '';
        $scope.review.userName = $scope.user.displayName;
        // $scope.review.userName = 'Anu Porwal';
        $scope.review.userId = $scope.user.uid;
        // $scope.review.userId = '2cQ2XQ7w7pdT9WGq2nyGJhrPSOo2';
        $scope.review.blocked = false;
        $scope.review.createdDate = new Date().getTime();
        $scope.review.dataFormat = 1;
        $scope.review.wordCount = ($scope.review.reviewText).length;
        $scope.review.source = 'website';
        $scope.review.status = 'uploaded';
        var updates = {};
        $scope.userReviewData = {
            cityId: $scope.cityId,
            cityName: 'Gurgaon',
            countryId: $scope.countryId,
            reviewTitle: $scope.review.reviewTitle,
            status: $scope.review.status,
            createdDate: $scope.review.createdDate
        }
        if ($scope.selectedProject.type == 'residential') {
            newKey = db.ref('reviews/country/' + $scope.countryId + '/city/' + $scope.cityId + '/residential/' + $scope.selectedProject.id).push().key;
            $scope.userReviewData.id = $scope.selectedProject.id;
            $scope.userReviewData.name = $scope.selectedProject.name;
            reviewPath = 'reviews/country/' + $scope.countryId + '/city/' + $scope.cityId + '/residential/' + $scope.selectedProject.id + '/' + newKey;
            userReviewPath = 'userReviews/' + $scope.review.userId + '/residential/' + newKey;
        } else if ($scope.selectedProject.type == 'location') {
            newKey = db.ref('reviews/country/' + $scope.countryId + '/city/' + $scope.cityId + '/location/' + $scope.selectedProject.id).push().key;
            $scope.userReviewData.id = $scope.selectedProject.id;
            $scope.userReviewData.name = $scope.selectedProject.name;
            reviewPath = 'reviews/country/' + $scope.countryId + '/city/' + $scope.cityId + '/location/' + $scope.selectedProject.id + '/' + newKey;
            userReviewPath = 'userReviews/' + $scope.review.userId + '/location/' + newKey;
        } else if ($scope.selectedProject.type == 'locality') {
            newKey = db.ref('reviews/country/' + $scope.countryId + '/city/' + $scope.cityId + '/locality/' + $scope.selectedProject.id).push().key;
            $scope.userReviewData.id = $scope.selectedProject.id;
            $scope.userReviewData.name = $scope.selectedProject.name;
            reviewPath = 'reviews/country/' + $scope.countryId + '/city/' + $scope.cityId + '/locality/' + $scope.selectedProject.id + '/' + newKey;
            userReviewPath = 'userReviews/' + $scope.review.userId + '/locality/' + newKey;
        } else if ($scope.selectedProject.type == 'cghs') {
            newKey = db.ref('reviews/country/' + $scope.countryId + '/city/' + $scope.cityId + '/cghs/' + $scope.selectedProject.id).push().key;
            $scope.userReviewData.id = $scope.selectedProject.id;
            $scope.userReviewData.name = $scope.selectedProject.name;
            reviewPath = 'reviews/country/' + $scope.countryId + '/city/' + $scope.cityId + '/cghs/' + $scope.selectedProject.id + '/' + newKey;
            userReviewPath = 'userReviews/' + $scope.review.userId + '/cghs/' + newKey;
        }

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
})
