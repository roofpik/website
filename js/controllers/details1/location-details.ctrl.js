app.controller('locationDetailsCtrl', ['$scope', '$stateParams', '$rootScope', '$timeout', '$http', '$state', function($scope, $stateParams, $rootScope, $timeout, $http, $state) {
    $('ul.tabs').tabs();
    var parameters = decodeParams($stateParams.p);
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    $scope.loading = true;
    $scope.locId = parameters.id;
    $scope.type = parameters.category;
    $scope.path = ["Gurgaon"];
    if (parameters.category == 'locality') {
        $scope.category = 'locality';
    } else {
        $scope.category = 'location';
    }


    if (parameters.category == 'locations') {
        db.ref('locations/' + $scope.cityId + '/' + $scope.locId).once('value', function(response) {
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

    $scope.scrollToDiv = function(value) {
        $('html,body').animate({
                scrollTop: $("." + value).offset().top - 80
            },
            'slow');
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

    $scope.hasLiked = false;
    $scope.hasDisliked = false;
    $scope.hasBookmarked = false;

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            // console.log(user);
            $scope.userId = user.uid;
            $scope.userName = user.displayName;
            if (user.uid) {
                checkLiked($scope.userId);
                checkBookmarked($scope.userId);
            }
        } else {
            // $state.go('home');
            // $scope.userId = 'random';
        }
    });

    function checkLiked(id) {
        db.ref('userActivity/likes')
            .orderByChild('userId')
            .equalTo(id)
            .once('value', function(response) {
                $timeout(function() {
                    if (response.val()) {
                        for (key in response.val()) {
                            if (response.val()[key]) {
                                // console.log(response.val())
                                if (response.val()[key].id == $scope.projectId && response.val()[key].isLiked == 'true' && response.val()[key].isDisliked == 'false') {
                                    $scope.showLike = true;
                                    $scope.pushIdLiked = key;
                                    // console.log($scope.pushIdLiked);
                                } else if (response.val()[key].id == $scope.projectId) {
                                    $scope.pushIdLiked = key;
                                }
                            }
                        }
                    }
                }, 0)
            })

    }

    function checkBookmarked(id) {
        db.ref('userActivity/bookmarks')
            .orderByChild('userId')
            .equalTo(id)
            .once('value', function(response) {
                $timeout(function() {
                    if (response.val()) {
                        for (key in response.val()) {
                            if (response.val()[key]) {
                                if (response.val()[key].id == $scope.projectId && response.val()[key].active == 'true') {
                                    $scope.pushIdBookmarked = key;
                                    $scope.hasBookmarked = true;
                                } else if (response.val()[key].id == $scope.projectId) {
                                    $scope.pushIdBookmarked = key;
                                }
                            }
                        }
                    }
                }, 0)
            })
    }

    $scope.projectLiked = function() {
        checkLiked($scope.userId);
        if ($scope.pushIdLiked) {
            db.ref('userActivity/likes/' + $scope.pushIdLiked + '/' + 'isLiked').set('true');
            db.ref('userActivity/likes/' + $scope.pushIdLiked + '/' + 'isDisliked').set('false');
            $scope.showLike = true;
        } else {
            var params = {
                    token: $scope.userId,
                    operation: 'likes',
                    isLiked: 'true',
                    isDisliked: 'false',
                    type: $scope.category,
                    id: $scope.projectId
                }
                // console.log(parameter);
            $http({
                url: 'http://107.23.243.89/api/LogActivity_1.0',
                method: 'GET',
                params: {
                    args: encodeParams(params)
                }
            }).then(function mySucces(response) {
                $scope.token = response.data;
                $scope.showLike = true;

            }, function myError(err) {
                // console.log(err);
            })
        }
    }

    $scope.projectBookmarked = function() {
        // checkBookmarked($scope.userId);

        if ($scope.pushIdBookmarked) {
            db.ref('userActivity/bookmarks/' + $scope.pushIdBookmarked + '/' + 'active').set('true');
            $scope.hasBookmarked = true;
        } else {
            var params = {
                token: $scope.userId,
                operation: 'bookmarks',
                type: $scope.category,
                active: 'true',
                id: $scope.projectId
            }
            $http({
                url: 'http://107.23.243.89/api/LogActivity_1.0',
                method: 'GET',
                params: {
                    args: encodeParams(params)
                }
            }).then(function mySucces(response) {
                $scope.token = response.data;
                $scope.hasBookmarked = true;
                // console.log($scope.token);
                // demoFunction($scope.token);

            }, function myError(err) {
                // console.log(err);
            })
        }
    }
    $scope.projectUnmarked = function() {
        db.ref('userActivity/bookmarks')
            .orderByChild('userId')
            .equalTo($scope.userId)
            .once('value', function(response) {
                $timeout(function() {
                    if (response.val()) {
                        for (key in response.val()) {
                            if (response.val()[key]) {
                                if (response.val()[key].id == $scope.projectId && response.val()[key].active == 'true') {
                                    $scope.pushIdBookmarked = key;
                                    if ($scope.pushIdBookmarked) {
                                        db.ref('userActivity/bookmarks/' + $scope.pushIdBookmarked + '/' + 'active').set('false');
                                        $scope.hasBookmarked = false;
                                    }
                                }
                            }
                        }
                    }
                }, 100)
            })
    }

    $scope.projectUnliked = function() {
        db.ref('userActivity/likes')
            .orderByChild('userId')
            .equalTo($scope.userId)
            .once('value', function(response) {
                $timeout(function() {
                    if (response.val()) {
                        for (key in response.val()) {
                            if (response.val()[key]) {
                                if (response.val()[key].id == $scope.projectId && response.val()[key].isLiked == 'true' && response.val()[key].isDisliked == 'false') {
                                    $scope.pushIdLiked = key;
                                    if ($scope.pushIdLiked) {
                                        db.ref('userActivity/likes/' + $scope.pushIdLiked + '/' + 'isDisliked').set('false')
                                        db.ref('userActivity/likes/' + $scope.pushIdLiked + '/' + 'isLiked').set('false')
                                        $scope.showLike = false;
                                    }
                                }
                            }
                        }
                    }
                }, 100)
            })

    }


}])


app.controller('locationReviewRatingCtrl', ['$scope', '$timeout', '$stateParams', '$rootScope', '$http', '$state', function($scope, $timeout, $stateParams, $rootScope, $http, $state) {
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    var parameters = decodeParams($stateParams.p);
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

    $http({
        url: 'http://35.154.60.19/api/GetReviewSummary_1.0',
        method: 'GET',
        params: {
            id: $scope.locationId,
            type: $scope.category
        }
    }).then(function mySucces(response) {
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
        // console.log(parameters.category, $scope.reviews[index].reviewId);
        $http({
            url: 'http://35.154.60.19/api/GetReviewDetails_1.0',
            method: 'GET',
            params: {
                id: $scope.reviews[index].reviewId,
                type: $scope.category
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


app.controller('relatedProjectsCtrl', ['$scope', '$http', '$timeout', '$stateParams', function($scope, $http, $timeout, $stateParams) {
    // console.log('called');
    var parameters = decodeParams($stateParams.p);
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    $scope.locId = parameters.id;
    $scope.type = parameters.category;
    $scope.relatedProjects = [];
    var page_start = 0;
    var page_size = 9;
    $scope.pages = [];
    $scope.currentPage = 1;
    $scope.lastPage = 0;
    var totalProjectsFetched = 0;
    if (parameters.category == 'locality') {
        $scope.category = 'locality';
    } else {
        $scope.category = 'location';
    }

    getRelatedProjects();

    function getRelatedProjects() {
        var data = {
                locationId: $scope.locId,
                category: 'all',
                vertical: 'residential',
                page_size: page_size,
                page_start: page_start
            }
            // console.log(data);
        $scope.loading = true;
        $http({
            url: 'http://35.154.60.19/api/GetListing_1.0',
            method: 'GET',
            params: {
                args: encodeParams(data)
            }
        }).then(function mySucces(response) {
            $scope.relatedProjects = [];
            totalProjects = response.data.hits;
            if (totalProjects == 0) {
                $scope.hasNoProjects = true;
            } else {
                $scope.hasNoProjects = false;
            }
            if ($scope.pages.length == 0) {
                var max = 0;
                if (totalProjects / page_size > parseInt(totalProjects / page_size)) {
                    max = parseInt(totalProjects / page_size) + 1;
                } else {
                    max = parseInt(totalProjects / page_size);
                }
                // console.log(max);
                for (var i = 1; i <= max; i++) {
                    $scope.pages.push(i);
                }
                $scope.lastPage = $scope.pages[$scope.pages.length - 1];
            }
            totalProjectsFetched += Object.keys(response.data.details).length;
            $scope.dataFetched = true;
            $scope.projects = response.data.details;
            for (key in $scope.projects) {
                if ($scope.projects[key].cover.indexOf('http') == -1) {
                    $scope.projects[key].cover = "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/' + $scope.projects[key].type + '/' + $scope.projects[key].id + '/images/coverPhoto/' + $scope.projects[key].cover + '-s.jpg';
                }
                $scope.relatedProjects.push($scope.projects[key]);
            }
            // console.log($scope.relatedProjects);
            $timeout(function() {
                $scope.loading = false;
            }, 1000);
        }, function myError(err) {
            $timeout(function() {
                $scope.loading = false;
            }, 1000);
        })
    }

    $scope.goToPage = function(pageNum) {
        $('html,body').animate({
                scrollTop: $(".related-projects").offset().top - 80
            },
            'slow');
        page_start = (pageNum - 1) * page_size;
        if (pageNum < $scope.currentPage) {
            page_size = 9;
        } else {
            if (pageNum == $scope.pages[$scope.pages.length - 1]) {
                page_size = totalProjects - page_start;
            }
        }
        $scope.currentPage = pageNum;
        getRelatedProjects();
    }

    $scope.changePage = function(val) {
        if (val == 1) {
            if ($scope.currentPage > 1) {
                $scope.goToPage($scope.currentPage - 1);
            }
        } else {
            if (val != $scope.lastPage) {
                $scope.goToPage($scope.currentPage + 1);
            }
        }
    }

    $scope.getRedirectionString = function(id, type) {
        var data = {
            projectId: id,
            category: type
        }
        return '../#/project-details/' + encodeParams(data);
    }
}]);
