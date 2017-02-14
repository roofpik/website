app.controller('writeReviewCtrl', function($scope, $timeout, $rootScope, $location, $stateParams, $http) {
    document.title = "Write Review";
    var timestamp = new Date().getTime();
    var urlInfo = {
        url: $location.path()
    }
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    loading(true);
    $scope.projects1 = {};
    $scope.projects2 = {};
    $scope.selectedProject = {};
    $scope.review = {
        ratings: {}
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
        name: 'Electricity and water supply',
        id: 5
    }, {
        name: 'Convenience of housemaids',
        id: 6
    }, {
        name: 'Convenience of parking',
        id: 7
    }, {
        name: 'Infrastructure',
        id: 8
    }, {
        name: 'Layout of the apartment',
        id: 9
    }];
    var user;
    if ($stateParams.id) {
        $scope.showSearch = false;
    } else {
        $scope.showSearch = true;
    }

    $rootScope.$watch('loginStatus', function() {
        if ($rootScope.loginStatus) {
            $scope.loginStatus = true;
            user = firebase.auth().currentUser;
        } else {
            $scope.loginStatus = false;
        }
    });

    if (checkLocalStorage('loginStatus')) {
        $scope.loginStatus = JSON.parse(localStorage.getItem('loginStatus'));
        if (JSON.parse(localStorage.getItem('loginStatus'))) {
            user = firebase.auth().currentUser;
        } else {
            loading(false);
            $rootScope.$emit("callShowLogin", {});
        }
    } else {
        loading(false);
        $rootScope.$emit("callShowLogin", {});
    }

    $scope.ratingsObject = {
        iconOnColor: 'rgb(45, 182, 214)', //Optional
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
            $scope.review.ratings.electricityAndWaterSupply = rating;
        } else if (index == 6) {
            $scope.review.ratings.convenienceOfHouseMaids = rating;
        } else if (index == 7) {
            $scope.review.ratings.convenienceOfParking = rating;
        } else if (index == 8) {
            $scope.review.ratings.infrastructure = rating;
        } else if (index == 9) {
            $scope.review.ratings.layoutOfApartment = rating;
        }
    };
    $scope.projectLocality = [];
    $scope.selectedItem = '';
    $scope.showMore = false;
    $scope.showMoreLess = 'Show More +';
    $scope.projectSelected = false;

    $('#textarea1').trigger('autoresize');

    if ($stateParams.id) {
        loading(true);
        $scope.showList = false;
        $scope.showSearch = false;
        $http({
            url: 'http://35.154.60.19/api/GetResidential_1.0',
            method: 'GET',
            params: {
                details_name: $scope.selectedItem,
                page_size: 92
            }
        }).then(function mySucces(response) {
            $timeout(function() {
                for (key in response.data.details) {
                    if (response.data.details[key].id == $stateParams.id) {
                        $scope.selectedProject = response.data.details[key];
                        $scope.selectedItem = $scope.selectedProject.name;
                        $scope.projectSelected = true;
                    }
                }
                loading(false);
            }, 100)
        }, function myError(err) {})
    } else {
        $timeout(function(){
            loading(false);
        },1000);
    }

    $scope.nameEntered = function() {
        if ($scope.selectedItem) {
            if ($scope.selectedItem.length >= 2) {
                $scope.showLoading = true;
                // $scope.showList = true;
                $http({
                    url: 'http://35.154.60.19/api/GetResidential_1.0',
                    method: 'GET',
                    params: {
                        details_name: $scope.selectedItem
                    }
                }).then(function mySucces(response) {
                    $timeout(function() {
                        if (response.data.details) {
                            $scope.projectList = response.data.details;
                            // $scope.showList = true;
                            for (key in $scope.projectList) {
                                $scope.projects1[$scope.projectList[key].name.toString()] = $scope.projectList[key].id;
                                $scope.projects2[$scope.projectList[key].name.toString()] = null;
                            }
                        }
                        bindList();
                    }, 500)
                }, function myError(err) {})
            }
        }
    }

    function bindList() {
        // console.log('bindValues called')
        $('#select_project').autocomplete({
            data: $scope.projects2,
            limit: 10,
            onAutocomplete: function(value, data) {
                $scope.selectedItem = value;
                $scope.projectSelected = true;
                $scope.selectedProject.name = $scope.selectedItem;
                $scope.selectedProject.id = $scope.projects1[$scope.selectedItem];

            }
        });
        $timeout(function(){
            $scope.showLoading = false;
        }, 200);
    }

    $scope.showMoreFn = function() {
        $scope.showMore = !$scope.showMore;
        if ($scope.showMore) {
            $scope.showMoreLess = 'Show Less -';
        } else {
            $scope.showMoreLess = 'Show More +';
        }
    }

    $("#select_project").focusout(function() {
        $timeout(function() {
            $scope.showList = false;
        }, 100);
    });

    $scope.submitReview = function() {
        swal({
            title: "Submitting Review",
            text: "Please wait...",
            imageUrl: "https://d1ow200m9i3wyh.cloudfront.net/img/assets/common/images/loader.gif",
            showConfirmButton: false
        });
        var reviewPath = '';
        var userReviewPath = '';
        var key = '';
        $scope.review.userName = user.displayName;
        $scope.review.userId = user.uid;
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
            reviewTitle: $scope.review.reviewTitle,
            status: $scope.review.status,
            createdDate: $scope.review.createdDate
        }
        newKey = db.ref('websiteReviews/' + $scope.cityId + '/residential/' + $scope.selectedProject.id).push().key;
        $scope.userReviewData.projectId = $scope.selectedProject.id;
        $scope.userReviewData.projectName = $scope.selectedProject.name;
        reviewPath = 'websiteReviews/' + $scope.cityId + '/residential/' + $scope.selectedProject.id + '/' + newKey;
        userReviewPath = 'userReviews/' + $scope.review.userId + '/residential/' + newKey;

        if (Object.keys($scope.review.ratings).length == 0) {
            delete $scope.review.ratings;
        }
        updates[reviewPath] = $scope.review;
        updates[userReviewPath] = $scope.userReviewData;
        db.ref().update(updates).then(function() {
            $timeout(function() {
                swal({
                    title: "Done",
                    text: "Your review was successfully submitted!",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#AEDEF4",
                    confirmButtonText: "OK",
                    closeOnConfirm: false
                }, function() {
                    window.location.reload(true);
                });
            }, 500);
        })
    }
})
