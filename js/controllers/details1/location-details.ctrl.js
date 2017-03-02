app.controller('locationDetailsCtrl', ['$scope', '$stateParams', '$rootScope', '$timeout', '$http', '$state', function($scope, $stateParams, $rootScope, $timeout, $http, $state) {
    console.log($stateParams.p);
    var parameters = decodeParams($stateParams.p);
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    $scope.loading = true;
    $scope.reviewsAvailable = false;
    $scope.hasRatings = false;
    $scope.hasReviews = false;
    $scope.i = 0;
    console.log(parameters)
    $scope.locId = parameters.id;
    $scope.type = parameters.category;
    $scope.allReviews = {};
    $scope.relatedProjects = {};
    console.log($scope.locId);
    $scope.ratingSummaryParams = [
        { id: 'security', id1: 'security1', name: 'Security' },
        { id: 'amenities', id1: 'amenities1', name: 'Amenities' },
        { id: 'openAndGreenAreas', id1: 'openAndGreenAreas1', name: 'Open and Green Areas' },
        { id: 'convenienceOfParking', id1: 'convenienceOfParking1', name: 'Convenience of Parking' },
        { id: 'infrastructure', id1: 'infrastructure1', name: 'Infrastructure' }
    ];
    if (parameters.category == 'locations') {
        db.ref('locations/' + $scope.cityId + '/' + $scope.locId).once('value', function(response) {
            $timeout(function() {
                console.log(response.val());
                $scope.name = response.val().locationName;
                $scope.id = response.val().locationId;
                document.title = $scope.name;
            }, 0);
        })
        getRelatedProjects();
        getReviews();
    } else {
        db.ref('locality/' + $scope.cityId + '/' + $scope.locId).once('value', function(response) {
            $timeout(function() {
                console.log(response.val());
                $scope.name = response.val().localityName;
                $scope.id = response.val().localityId;
                document.title = $scope.name;
                // $scope.coverImage = "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/cghs/-KbT8haHPqV7gTy55f-x/images/coverPhoto/' + $scope.location.images.coverPhoto.url + '-m.jpg';
                // generateImageList($scope.location.images);
            }, 0);
        })
        getRelatedProjects();
        getReviews();
        // getNearBy();
        // getRelatedServices();
    }

    function getReviews() {

        $http({
            url: 'http://107.23.243.89/api/GetReviewSummary_1.0',
            method: 'GET',
            params: {
                id: $scope.locId,
                type: $scope.type
            }
        }).then(function mySucces(response) {
            console.log(response);
            if (response.status == 200) {
                if (response.data) {
                    if (response.data.numbers) {
                        if (response.data.numbers.numberOfReviews != 0) {
                            $rootScope.allRatings = response.data.numbers;
                            $scope.reviewsAvailable = true;
                            if (response.data.numbers.numberOfReviews > 0) {
                                $scope.reviewAvailable = true;
                            }
                            $scope.reviewObject = response.data;
                            for (key in $scope.reviewObject.numbers) {
                                $scope.reviewObject.numbers[key + '1'] = Math.round($scope.reviewObject.numbers[key]);
                            }
                            // $("#excellentStar").css("width", ($scope.reviewObject.numbers.fiveStar / $scope.reviewObject.numbers.numberOfReviews) * 100 + '%');
                            // $("#veryGoodStar").css("width", ($scope.reviewObject.numbers.fourStar / $scope.reviewObject.numbers.numberOfReviews) * 100 + '%');
                            // $("#goodStar").css("width", ($scope.reviewObject.numbers.threeStar / $scope.reviewObject.numbers.numberOfReviews) * 100 + '%');
                            // $("#averageStar").css("width", ($scope.reviewObject.numbers.twoStar / $scope.reviewObject.numbers.numberOfReviews) * 100 + '%');
                            // $("#badStar").css("width", ($scope.reviewObject.numbers.oneStar / $scope.reviewObject.numbers.numberOfReviews) * 100 + '%');
                            // // console.log($scope.reviewObject);
                            showHideRatings();
                        }
                    }
                }
            }
        }, function myError(err) {
            // console.log(err);
        })
        $http({
            url: 'http://107.23.243.89/api/GetProjectReviews_1.0',
            method: 'GET',
            params: {
                pid: $scope.locId,
                type: $scope.type,
                page_size: '20'
            }
        }).then(function mySucces(response) {
            console.log(response);
            $timeout(function() {
                    if (response.status == 200) {
                        if (response.data.details) {
                            for (key in response.data.details) {
                                $scope.allReviews[key] = {};
                                $scope.allReviews[key].reviewTitle = response.data.details[key].reviewTitle;
                                $scope.allReviews[key].reviewText = response.data.details[key].reviewText;
                                $scope.allReviews[key].overallRating = response.data.details[key].overallRating;
                                $scope.allReviews[key].userName = response.data.details[key].userName;
                                $scope.allReviews[key].createdDate = response.data.details[key].createdDate;
                                $scope.allReviews[key].reviewId = response.data.details[key].reviewId;
                                if (response.data.details[key].reviewText.length < response.data.details[key].wordCount) {
                                    $scope.allReviews[key].showMore = true;
                                } else {
                                    $scope.allReviews[key].showMore = false;
                                }
                                $scope.i++
                            }
                        }
                        showHideReviews();
                    }
                    console.log($scope.allReviews)
                },
                function myError(err) {
                    // console.log(err);
                }, 100)
        })

    }

    function showHideRatings() {
        if ($rootScope.allRatings) {
            $scope.hasRatings = true;
        } else {
            $scope.hasRatings = false;
        }
    }

    function showHideReviews() {
        if ($scope.i == 0) {
            console.log('hello')
            $scope.hasReviews = false;
        } else {
            console.log('hello')
            $scope.hasReviews = true;
        }
    }
    $scope.showReviewText = function(index) {
        // console.log($scope.reviews[index]);
        console.log(index);
        console.log($scope.allReviews[index].reviewId);
        console.log($scope.type)
            // loading(true);
        $http({
            url: 'http://107.23.243.89/api/GetReviewDetails_1.0',
            method: 'GET',
            params: {
                id: $scope.allReviews[index].reviewId,
                type: $scope.type
            }
        }).then(function mySucces(response) {
            console.log(response);
            if (response.status == 200) {
                $scope.allReviews[index].reviewText = response.data.reviewText;
                $scope.allReviews[index].showMore = false;
            }
            // loading(false, 1000);
        }, function myError(err) {
            // console.log(err);
        })
    }

    // function getNearBy() {
    //     // if (parameters.category == 'locations') {
    //     //     var data = {
    //     //         locationId: $scope.locId
    //     //     }
    //     // } else {
    //     //     var data = {
    //     //         localityId: $scope.locId
    //     //     }
    //     // }
    //     var data = {
    //         locationId: '-Kc2BjFK-YABXahO8OnL'
    //     }
    //     console.log(encodeParams(data));
    //     $http({
    //         url: 'http://107.23.243.89/api/GetNearby_1.0',
    //         method: 'GET',
    //         params: {
    //             args: encodeParams(data)
    //         }
    //     }).then(function mySucces(response) {
    //         if (response.data) {
    //             $scope.nearby = {}
    //             for (key in response.data) {
    //                 $scope.nearby[key] = {};
    //                 $scope.nearby[key].type = response.data[key].nearby;
    //                 $scope.nearby[key].name = response.data[key].details.details.name;
    //                 $scope.nearby[key].website = response.data[key].details.details.website;
    //                 $scope.nearby[key].address = response.data[key].details.address.addressLine1;
    //             }
    //         }
    //         // console.log($scope.nearby);
    //         // $scope.loading = false;

    //     })
    // }

    // function getRelatedServices() {
    //     var data = {
    //         locationId: '-KZzbkeqpCyCV8cZ33wi'
    //     }

    //     $http({
    //         url: 'http://107.23.243.89/api/GetRelatedServices_1.0',
    //         method: 'GET',
    //         params: {
    //             args: encodeParams(data)
    //         }
    //     }).then(function mySucces(response) {
    //         console.log(response);
    //         if (response.data) {
    //             $scope.relatedServices = {}
    //             for (key in response.data) {
    //                 $scope.relatedServices[key] = {};
    //                 $scope.relatedServices[key].type = response.data[key].nearby;
    //                 $scope.relatedServices[key].name = response.data[key].details.details.name;
    //                 $scope.relatedServices[key].website = response.data[key].details.details.website;
    //                 $scope.relatedServices[key].address = response.data[key].details.address.addressLine1;
    //             }
    //         }
    //         console.log($scope.relatedServices);
    //         // $scope.loading = false;

    //     })

    // }

    function getRelatedProjects() {
        // console.log($scope.locId);
        if (parameters.category == 'locations') {
            var data = {
                locationId: $scope.locId,
                vertical: 'residential',
                category: 'all',
                page_size: 100
            }
        } else {
            var data = {
                locationId: $scope.locId,
                category: 'all',
                vertical: 'residential',
                page_size: 100
            }
        }
        console.log(encodeParams(data));
        $http({
            url: 'http://107.23.243.89/api/GetListing_1.0',
            method: 'GET',
            params: {
                args: encodeParams(data)
            }
        }).then(function mySucces(response) {
            console.log(response);
            var i = 0;
            for (key in response.data.details) {
                $scope.relatedProjects[i] = {};
                $scope.relatedProjects[i].name = response.data.details[key].name;
                $scope.relatedProjects[i].id = response.data.details[key].id;
                $scope.relatedProjects[i].address = response.data.details[key].address;
                $scope.relatedProjects[i].overallRating = response.data.details[key].rating;
                $scope.relatedProjects[i].type = response.data.details[key].type;
                $scope.relatedProjects[i].coverImage = "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/' + $scope.relatedProjects[i].type + '/' + $scope.relatedProjects[i].id + '/images/coverPhoto/' + response.data.details[key].cover + '-s.jpg';
                i++;
            }
            console.log($scope.relatedProjects);
        })
        $scope.loading = false;
        if (Object.keys($scope.relatedProjects).length == 0) {
            $scope.hideList = false;
        }
        // $scope.loading = false;
    }

    $scope.goToProjectsPage = function(key) {
        console.log(key)
        if (key.type == 'residential') {
            param = {
                projectId: key.id
            }
            $state.go('project-details', { p: encodeParams(param) });
        } else if (key.type == 'cghs') {
            param = {
                projectId: key.id,
                category: 'cghs'
            }
            $state.go('project-details', { p: encodeParams(param) });
        }
    }

    $scope.takeToWriteReview = function() {
        $state.go('write-review', { id: $scope.locId });
    }
}])
