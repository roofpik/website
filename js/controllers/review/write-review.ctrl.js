app.controller('writeReviewCtrl', ['$scope', '$timeout', '$rootScope', '$location', '$stateParams', '$http', function($scope, $timeout, $rootScope, $location, $stateParams, $http) {
    document.title = "Write Review";
    // console.log($stateParams.id);
    var timestamp = new Date().getTime();
    var urlInfo = {
        url: $location.path()
    }
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    $scope.showLoading = false;
    $scope.review = {
            ratings: {}
        }
        // console.log($stateParams);
    if ($stateParams.id) {
        var params = $stateParams.id;
    }
    console.log(params);
    // $scope.projectId = params.projectId;
    $scope.projects1 = {}; //bind project name with project ID
    $scope.projects2 = {}; //bind project name with null for autocomplete
    $scope.projects3 = {}; //bind project name with project type
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
    if (params) {
            $scope.showSearch = false;
    } else {
        console.log('called');
        $scope.showSearch = true;
    }
    $rootScope.$watch('loginStatus', function() {
        if ($rootScope.loginStatus) {
            $scope.loginStatus = true;
            user = firebase.auth().currentUser;
        } else {
            $scope.loginStatus = false;
        }
    })

    if (checkLocalStorage('loginStatus')) {
        $scope.loginStatus = JSON.parse(localStorage.getItem('loginStatus'));
        if (JSON.parse(localStorage.getItem('loginStatus'))) {
            user = firebase.auth().currentUser;
        } else {

            $rootScope.$emit("callShowLogin", {});
        }
    } else {

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

    if (params) {
        if (params.name) {
            $scope.selectedItem = params.name;
        }
    }

    if (params) {
        $scope.showLoading = true;
        $scope.showList = false;
        $scope.showSearch = false;
        $http({
            url: 'http://107.23.243.89/api/GetResidential_1.0',
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
                        console.log($scope.selectedItem);
                    }
                }
                $scope.showLoading = false;
            }, 500)
        }, function myError(err) {})

    }
    $scope.nameEntered = function() {
        $scope.showLoading = true;
        if ($scope.selectedItem) {
            if ($scope.selectedItem.length = 2) {
                var data = {
                    name: $scope.selectedItem
                }
                var args = encodeParams(data);
                console.log(args);
                $http({

                    url: 'http://107.23.243.89/api/GetByName_1.0',
                    method: 'GET',
                    params: {
                        args: args
                    }
                }).then(function mySucces(response) {
                    $timeout(function() {
                        console.log(response)
                        if (response.data) {
                            $scope.projectList = response.data;
                        }
                        for (key in $scope.projectList) {
                            $scope.projects1[$scope.projectList[key].name.toString()] = $scope.projectList[key].id;
                            $scope.projects2[$scope.projectList[key].name.toString()] = null;
                            $scope.projects3[$scope.projectList[key].name.toString()] = $scope.projectList[key].type;
                            $scope.projects4[$scope.projectList[key].id] = $scope.projectList[key].name;
                        }
                        $scope.showLoading = false;
                        bindList();
                    }, 500)
                }, function myError(err) {})
            }
        }
    }

    function bindList() {
        $('#select_project').autocomplete({
            data: $scope.projects2,
            limit: 10,
            onAutocomplete: function(value, data) {
                $scope.selectedItem = value;
                $scope.projectSelected = true;
                $scope.selectedProject.name = $scope.selectedItem;
                $scope.selectedProject.id = $scope.projects1[$scope.selectedItem];
                $scope.selectedProject.type = $scope.projects3[$scope.selectedItem];
                console.log($scope.selectedProject);
            }
        });
        $timeout(function() {
            $scope.showLoading = false;
        }, 200);
    }


    // $scope.selectProject = function(val) {
    //     $scope.selectedItem = val.name;
    //     $scope.selectedProject = val;
    //     $scope.showList = false;
    //     $scope.projectSelected = true;
    // }

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
        // $scope.review.userName = 'Anu Porwal';
        $scope.review.userId = user.uid;
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
            reviewTitle: $scope.review.reviewTitle,
            status: $scope.review.status,
            createdDate: $scope.review.createdDate
        }
        if ($scope.selectedProject.type == 'residential') {
            newKey = db.ref('websiteReviews/' + $scope.cityId + '/residential/' + $scope.selectedProject.id).push().key;
            $scope.userReviewData.projectId = $scope.selectedProject.id;
            $scope.userReviewData.projectName = $scope.selectedProject.name;
            reviewPath = 'websiteReviews/' + $scope.cityId + '/residential/' + $scope.selectedProject.id + '/' + newKey;
            userReviewPath = 'userReviews/' + $scope.review.userId + '/residential/' + newKey;
        }

        if ($scope.selectedProject.type == 'location') {
            newKey = db.ref('websiteReviews/' + $scope.cityId + '/location/' + $scope.selectedProject.id).push().key;
            $scope.userReviewData.projectId = $scope.selectedProject.id;
            $scope.userReviewData.projectName = $scope.selectedProject.name;
            reviewPath = 'websiteReviews/' + $scope.cityId + '/location/' + $scope.selectedProject.id + '/' + newKey;
            userReviewPath = 'userReviews/' + $scope.review.userId + '/location/' + newKey;
        }

        if ($scope.selectedProject.type == 'locality') {
            newKey = db.ref('websiteReviews/' + $scope.cityId + '/locality/' + $scope.selectedProject.id).push().key;
            $scope.userReviewData.projectId = $scope.selectedProject.id;
            $scope.userReviewData.projectName = $scope.selectedProject.name;
            reviewPath = 'websiteReviews/' + $scope.cityId + '/locality/' + $scope.selectedProject.id + '/' + newKey;
            userReviewPath = 'userReviews/' + $scope.review.userId + '/locality/' + newKey;
        }

        if (Object.keys($scope.review.ratings).length == 0) {
            delete $scope.review.ratings;
        }
        updates[reviewPath] = $scope.review;
        updates[userReviewPath] = $scope.userReviewData;
        console.log(updates);
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
}])
