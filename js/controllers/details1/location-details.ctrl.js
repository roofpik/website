app.controller('locationDetailsCtrl', ['$scope', '$stateParams', '$rootScope', '$timeout', '$http', '$state', function($scope, $stateParams, $rootScope, $timeout, $http, $state) {
    console.log($stateParams.p);
    var parameters = decodeParams($stateParams.p);
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    $scope.loading = true;
    console.log(parameters)
    $scope.locId = parameters.id;
    $scope.type = parameters.category;
    $scope.allReviews = {};
    $scope.relatedProjects = {};
    $scope.path = ["Gurgaon", $scope.type]
    if (parameters.category == 'locality') {
        $scope.category = 'locality';
    } else {
        $scope.category = 'location';
    }


    if (parameters.category == 'locations') {
        db.ref('locations/' + $scope.cityId + '/' + $scope.locId).once('value', function(response) {
            console.log(response.val());
            $timeout(function() {
                $scope.name = response.val().locationName;
                $scope.id = response.val().locationId;
                $scope.loading = false;
                $scope.path.push($scope.name);
                document.title = $scope.name;
            }, 0);
        })
    } else {
        db.ref('locality/' + $scope.cityId + '/' + $scope.locId).once('value', function(response) {
            $timeout(function() {
                $scope.name = response.val().localityName;
                $scope.id = response.val().localityId;
                $scope.loading = false;
                $scope.path.push($scope.name)
                document.title = $scope.name;
                // $scope.coverImage = "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/cghs/-KbT8haHPqV7gTy55f-x/images/coverPhoto/' + $scope.location.images.coverPhoto.url + '-m.jpg';
                // generateImageList($scope.location.images);
            }, 0);
        })
    }

    $scope.provideDetails = function(data) {
        // loading(true);
        db.ref('queries/' + $scope.cityId + '/' + $scope.category + '/' + $scope.projectId).push(data).then(function() {
            // loading(false);
            swal('Request Logged', 'You will receive the details in your mail', 'success');
            $timeout(function() {
                $scope.query = {};
                $scope.contactForm.$setPristine();
                $scope.contactForm.$setUntouched();
            }, 1000);
        })
    }

    $scope.goToWriteReview = function() {
        $state.go('write-review', { id: $scope.id, n: btoa(encodeURIComponent(document.title)), t: btoa($scope.category) });
    }
}])


app.controller('locationReviewRatingCtrl', ['$scope', '$timeout', '$stateParams', '$rootScope', '$http', '$state', function($scope, $timeout, $stateParams, $rootScope, $http, $state) {
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    var parameters = decodeParams($stateParams.p);
    console.log(parameters);
    $scope.locationId = parameters.id;
    $scope.reviews = [];
    $scope.reviewsAvailable = false;
    var selectedRating = 0;
    $scope.reviews = [];
    var reviewsFetchedNum = 0;
    var totalReviews = 0;
    var page_start = 0;
    var page_size = 5;
    $scope.reviewsFetched = false;
    var customerType = null;
    $scope.hasMoreReviews = true;
    $scope.hasReviews = false;
    $scope.reviewAvailable = false;
    $scope.ratingSummaryParams = [
        { id: 'security', id1: 'security1', name: 'Security' },
        { id: 'amenities', id1: 'amenities1', name: 'Amenities' },
        { id: 'openAndGreenAreas', id1: 'openAndGreenAreas1', name: 'Open and Green Areas' },
        { id: 'convenienceOfParking', id1: 'convenienceOfParking1', name: 'Convenience of Parking' },
        { id: 'infrastructure', id1: 'infrastructure1', name: 'Infrastructure' }
    ];

    if (parameters.category == 'locality') {
        $scope.category = 'locality';
    } else {
        $scope.category = 'location';
    }

    // getRelatedProjects();

    function getRelatedProjects() {
        console.log($scope.locId);
        var data = {
            locationId: $scope.locId,
            category: 'all',
            vertical: 'residential',
            page_size: 100
        }
        console.log(encodeParams(data));
        $http({
            url: 'http://35.154.60.19/api/GetListing_1.0',
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

    // $scope.test=function(){
    //     alert(1);
    // }
    // $scope.getRedirectionString = function(id, type) {
    //     console.log(id, type);
    //     var data = {
    //         projectId: id,
    //         category: type
    //     }
    //     return '../#/project-details/' + encodeParams(data);
    // }


    // $scope.goToProjectsPage = function(key) {
    //     alert(key);
    //     return;
    //     console.log(key)
    //     if (key.type == 'residential') {
    //         param = {
    //             projectId: key.id
    //         }
    //         $state.go('project-details', { p: encodeParams(param) });
    //     } else if (key.type == 'cghs') {
    //         param = {
    //             projectId: key.id,
    //             category: 'cghs'
    //         }
    //         $state.go('project-details', { p: encodeParams(param) });
    //     }
    // }


    $http({
        url: 'http://35.154.60.19/api/GetReviewSummary_1.0',
        method: 'GET',
        params: {
            id: $scope.locationId,
            type: $scope.category
        }
    }).then(function mySucces(response) {
        console.log(response);
        if (response.status == 200) {
            if (response.data[$scope.locationId]) {
                if (response.data[$scope.locationId] != 'not found') {
                    $rootScope.allRatings = response.data;
                    $scope.reviewsAvailable = true;
                    if (response.data.numberOfReviews > 0) {
                        $scope.reviewAvailable = true;
                    }
                    $scope.reviewObject = response.data;
                    createProgressBars();
                    // console.log($scope.reviewObject);
                }
            } else if (response.data.numbers.numberOfReviews != 0) {
                $rootScope.allRatings = response.data;
                $scope.reviewsAvailable = true;
                if (response.data.numberOfReviews > 0) {
                    $scope.reviewAvailable = true;
                }
                $scope.reviewObject = response.data;
                createProgressBars();
            }
        }
    }, function myError(err) {
        // console.log(err);
    })

    function createProgressBars() {
        console.log($scope.reviewObject);
        for (key in $scope.reviewObject.numbers) {
            $scope.reviewObject.numbers[key + '1'] = Math.round($scope.reviewObject.numbers[key]);
        }
        $("#excellentStar").css("width", ($scope.reviewObject.numbers.fiveStar / $scope.reviewObject.numbers.numberOfReviews) * 100 + '%');
        $("#veryGoodStar").css("width", ($scope.reviewObject.numbers.fourStar / $scope.reviewObject.numbers.numberOfReviews) * 100 + '%');
        $("#goodStar").css("width", ($scope.reviewObject.numbers.threeStar / $scope.reviewObject.numbers.numberOfReviews) * 100 + '%');
        $("#averageStar").css("width", ($scope.reviewObject.numbers.twoStar / $scope.reviewObject.numbers.numberOfReviews) * 100 + '%');
        $("#badStar").css("width", ($scope.reviewObject.numbers.oneStar / $scope.reviewObject.numbers.numberOfReviews) * 100 + '%');

        $scope.gsp = parseFloat(($scope.reviewObject.yes_no.goodSchools.yes / ($scope.reviewObject.yes_no.goodSchools.yes + $scope.reviewObject.yes_no.goodSchools.no + $scope.reviewObject.yes_no.goodSchools['not sure'])) * 100).toFixed(2) + '%';
        $scope.gmp = parseFloat(($scope.reviewObject.yes_no.markets.yes / ($scope.reviewObject.yes_no.markets.yes + $scope.reviewObject.yes_no.markets.no + $scope.reviewObject.yes_no.markets['not sure'])) * 100).toFixed(2) + '%';
        $scope.rhp = parseFloat(($scope.reviewObject.yes_no.goodHospitals.yes / ($scope.reviewObject.yes_no.goodHospitals.yes + $scope.reviewObject.yes_no.goodHospitals.no + $scope.reviewObject.yes_no.goodSchools['not sure'])) * 100).toFixed(2) + '%';
        $scope.dnip = parseFloat(($scope.reviewObject.yes_no.dailyNeedItems.yes / ($scope.reviewObject.yes_no.dailyNeedItems.yes + $scope.reviewObject.yes_no.dailyNeedItems.no + $scope.reviewObject.yes_no.goodSchools['not sure'])) * 100).toFixed(2) + '%';
        $scope.ptp = parseFloat(($scope.reviewObject.yes_no.easyAccessToPublicTransport.yes / ($scope.reviewObject.yes_no.easyAccessToPublicTransport.yes + $scope.reviewObject.yes_no.easyAccessToPublicTransport.no + $scope.reviewObject.yes_no.goodSchools['not sure'])) * 100).toFixed(2) + '%';
        $scope.alep = parseFloat(($scope.reviewObject.yes_no.apartmentLayoutEfficient.yes / ($scope.reviewObject.yes_no.apartmentLayoutEfficient.yes + $scope.reviewObject.yes_no.apartmentLayoutEfficient.no + $scope.reviewObject.yes_no.goodSchools['not sure'])) * 100).toFixed(2) + '%';
        $scope.epp = parseFloat(($scope.reviewObject.yes_no['24x7electricity'].yes / ($scope.reviewObject.yes_no['24x7electricity'].yes + $scope.reviewObject.yes_no['24x7electricity'].no + $scope.reviewObject.yes_no.goodSchools['not sure'])) * 100).toFixed(2) + '%';
        $scope.rcwsp = parseFloat(($scope.reviewObject.yes_no.regularCleanWaterSupply.yes / ($scope.reviewObject.yes_no.regularCleanWaterSupply.yes + $scope.reviewObject.yes_no.regularCleanWaterSupply.no + $scope.reviewObject.yes_no.goodSchools['not sure'])) * 100).toFixed(2) + '%';

        $('#gs').css("width", ($scope.reviewObject.yes_no.goodSchools.yes / ($scope.reviewObject.yes_no.goodSchools.yes + $scope.reviewObject.yes_no.goodSchools.no + $scope.reviewObject.yes_no.goodSchools['not sure'])) * 100 + '%');
        $('#gm').css("width", ($scope.reviewObject.yes_no.markets.yes / ($scope.reviewObject.yes_no.markets.yes + $scope.reviewObject.yes_no.markets.no + $scope.reviewObject.yes_no.markets['not sure'])) * 100 + '%');
        $('#rh').css("width", ($scope.reviewObject.yes_no.goodHospitals.yes / ($scope.reviewObject.yes_no.goodHospitals.yes + $scope.reviewObject.yes_no.goodHospitals.no + $scope.reviewObject.yes_no.goodHospitals['not sure'])) * 100 + '%');
        $('#dni').css("width", ($scope.reviewObject.yes_no.dailyNeedItems.yes / ($scope.reviewObject.yes_no.dailyNeedItems.yes + $scope.reviewObject.yes_no.dailyNeedItems.no + $scope.reviewObject.yes_no.dailyNeedItems['not sure'])) * 100 + '%');
        $('#pt').css("width", ($scope.reviewObject.yes_no.easyAccessToPublicTransport.yes / ($scope.reviewObject.yes_no.easyAccessToPublicTransport.yes + $scope.reviewObject.yes_no.easyAccessToPublicTransport.no + $scope.reviewObject.yes_no.easyAccessToPublicTransport['not sure'])) * 100 + '%');
        $('#ale').css("width", ($scope.reviewObject.yes_no.apartmentLayoutEfficient.yes / ($scope.reviewObject.yes_no.apartmentLayoutEfficient.yes + $scope.reviewObject.yes_no.apartmentLayoutEfficient.no + $scope.reviewObject.yes_no.apartmentLayoutEfficient['not sure'])) * 100 + '%');
        $('#24e').css("width", ($scope.reviewObject.yes_no['24x7electricity'].yes / ($scope.reviewObject.yes_no['24x7electricity'].yes + $scope.reviewObject.yes_no['24x7electricity'].no + $scope.reviewObject.yes_no['24x7electricity']['not sure'])) * 100 + '%');
        $('#rcws').css("width", ($scope.reviewObject.yes_no.regularCleanWaterSupply.yes / ($scope.reviewObject.yes_no.regularCleanWaterSupply.yes + $scope.reviewObject.yes_no.regularCleanWaterSupply.no + $scope.reviewObject.yes_no.regularCleanWaterSupply['not sure'])) * 100 + '%');
    }


    getReviews();

    function getReviews() {
        $scope.fetchingReviews = true;
        if (page_start == 0) {
            $scope.firstLoading = true;
        } else {
            $scope.firstLoading = false;
        }
        console.log(page_size, page_start)
        $http({
            url: 'http://35.154.60.19/api/GetProjectReviews_1.0',
            method: 'GET',
            params: {
                pid: $scope.locationId,
                overallRating: selectedRating,
                userType: customerType,
                page_size: page_size,
                page_start: page_start,
                type: $scope.category
            }
        }).then(function mySucces(response) {
            console.log(response);
            if (response.data) {
                totalReviews = response.data.hits;
                reviewsFetchedNum += Object.keys(response.data.details).length;
                if (reviewsFetchedNum == totalReviews) {
                    $scope.hasMoreReviews = false;
                }
                for (key in response.data.details) {
                    if (response.data.details[key].reviewText.length < response.data.details[key].wordCount) {
                        response.data.details[key].showMore = true;
                    } else {
                        response.data.details[key].showMore = false;
                    }
                    $scope.reviews.push(response.data.details[key]);
                }
                if ($scope.reviews.length > 0) {
                    $scope.hasReviews = true;
                }
            } else {
                $scope.hasMoreReviews = false;
            }
            if ($scope.projectDataFetched) {
                // loading(false);    
            }
            $timeout(function() {
                $scope.fetchingReviews = false;
            }, 1000);
        }, function myError(err) {
            $timeout(function() {
                $scope.fetchingReviews = false;
            }, 1000);
            // console.log(err);
        })
    }

    $scope.showReviewText = function(index) {
        // console.log($scope.reviews[index]);
        // loading(true);
        $http({
            url: 'http://35.154.60.19/api/GetReviewDetails_1.0',
            method: 'GET',
            params: {
                id: $scope.reviews[index].reviewId,
                type: parameters.category
            }
        }).then(function mySucces(response) {
            // console.log(response);
            if (response.status == 200) {
                $scope.reviews[index].reviewText = response.data.reviewText;
                $scope.reviews[index].showMore = false;
            }
            // loading(false, 1000);
        }, function myError(err) {
            // console.log(err);
        })
    }

    $scope.allRatings = {
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5
    };
    $scope.ratingIndex = ['one', 'two', 'three', 'four', 'five'];

    $scope.filterReview = function(index) {
        var count = 0;
        count = $scope.allRatings[index];
        if ($scope.ratingSelected[index]) {
            for (var i = count - 1; i < 5; i++) {
                $scope.ratingSelected[$scope.ratingIndex[i]] = true;
            }
            selectedRating = count;
        } else {
            // console.log(count);
            for (var i = 4; i > count - 1; i--) {
                $scope.ratingSelected[$scope.ratingIndex[i]] = false;
            }
            selectedRating = count - 1;
        }
        $scope.reviews = [];
        reviewsFetchedNum = 0;
        totalReviews = 0;
        page_start = 0;
        page_size = 5;
        $scope.reviewsFetched = false;
        $scope.hasMoreReviews = true;
        $scope.hasReviews = false;
        $scope.reviewAvailable = false;
        getReviews();
    }

    $scope.filterReviewByCustomerType = function(index) {
        if ($scope.selectedCustomerType[index]) {
            if (index == 'tenant') {
                customerType = 'tenant';
                $scope.selectedCustomerType.owner = false;
            } else {
                customerType = 'owner';
                $scope.selectedCustomerType.tenant = false;
            }
        } else {
            customerType = null;
        }
        $scope.reviews = [];
        reviewsFetchedNum = 0;
        totalReviews = 0;
        page_start = 0;
        page_size = 5;
        $scope.reviewsFetched = false;
        $scope.hasMoreReviews = true;
        $scope.hasReviews = false;
        $scope.reviewAvailable = false;
        getReviews();
    }

    $scope.showMoreReviews = function() {
        // loading(true);
        page_start = reviewsFetchedNum;
        // console.log(page_start);
        if (totalReviews - reviewsFetchedNum < 5) {
            page_size = totalReviews - reviewsFetchedNum
        }
        getReviews();
    }

    $scope.takeToWriteReview = function() {
        $state.go('write-review', { id: $scope.locationId, n: btoa(encodeURIComponent(document.title)), t: btoa($scope.category) });
    }
}]);


// app.controller('relatedProjectsCtrl', ['$scope', '$http', '$timeout', '$stateParams', function($scope, $http, $timeout, $stateParams) {
//     console.log('called');
//     var parameters = decodeParams($stateParams.p);
//     $scope.cityId = '-KYJONgh0P98xoyPPYm9';
//     $scope.locId = parameters.id;
//     $scope.type = parameters.category;
//     if (parameters.category == 'locality') {
//         $scope.category = 'locality';
//     } else {
//         $scope.category = 'location';
//     }

//     getRelatedProjects();

//     function getRelatedProjects() {
//         console.log($scope.locId);
//         var data = {
//             locationId: $scope.locId,
//             category: 'all',
//             vertical: 'residential',
//             page_size: 100
//         }
//         console.log(encodeParams(data));
//         $http({
//             url: 'http://35.154.60.19/api/GetListing_1.0',
//             method: 'GET',
//             params: {
//                 args: encodeParams(data)
//             }
//         }).then(function mySucces(response) {
//             console.log(response);
//             var i = 0;
//             for (key in response.data.details) {
//                 $scope.relatedProjects[i] = {};
//                 $scope.relatedProjects[i].name = response.data.details[key].name;
//                 $scope.relatedProjects[i].id = response.data.details[key].id;
//                 $scope.relatedProjects[i].address = response.data.details[key].address;
//                 $scope.relatedProjects[i].overallRating = response.data.details[key].rating;
//                 $scope.relatedProjects[i].type = response.data.details[key].type;
//                 $scope.relatedProjects[i].coverImage = "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/' + $scope.relatedProjects[i].type + '/' + $scope.relatedProjects[i].id + '/images/coverPhoto/' + response.data.details[key].cover + '-s.jpg';
//                 i++;
//             }
//             console.log($scope.relatedProjects);
//         })
//         $scope.loading = false;
//         if (Object.keys($scope.relatedProjects).length == 0) {
//             $scope.hideList = false;
//         }
//         // $scope.loading = false;
//     }

//     $scope.goToProjectsPage = function(key) {
//         console.log(key)
//         if (key.type == 'residential') {
//             param = {
//                 projectId: key.id
//             }
//             $state.go('project-details', { p: encodeParams(param) });
//         } else if (key.type == 'cghs') {
//             param = {
//                 projectId: key.id,
//                 category: 'cghs'
//             }
//             $state.go('project-details', { p: encodeParams(param) });
//         }
//     }
// }]);
