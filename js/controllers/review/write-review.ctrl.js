app.controller('writeReviewCtrl', ['$scope', '$timeout', '$rootScope', '$location', '$stateParams', '$http', function($scope, $timeout, $rootScope, $location, $stateParams, $http) {
    document.title = "Write Review";
    $('.modal').modal({
        dismissible: false
    });
    $scope.couponCode = '';
    $scope.couponCodeSuccessful = false;
    $scope.step = 1;
    $rootScope.$watch('loginStatus', function() {
        // $timeout(function() {
        if ($rootScope.loginStatus) {
            $scope.loginStatus = true;
            $scope.user = firebase.auth().currentUser;
        } else {
            $scope.loginStatus = false;
        }
        getUser($scope.user);
        // }, 0)
    })
    if (checkLocalStorage('loginStatus')) {
        $scope.loginStatus = JSON.parse(localStorage.getItem('loginStatus'));
        if (JSON.parse(localStorage.getItem('loginStatus'))) {
            $scope.user = firebase.auth().currentUser;
        } else {
            console.log('this is working')
            $rootScope.$emit("callShowLogin");
        }
    } else {
        $rootScope.$emit("callShowLogin");
    }

    function getUser(user) {
        $scope.userName = user.displayName;
        $scope.userId = user.uid;
    }
    var urlInfo = {
        url: $location.path()
    }
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    $scope.user = {};
    $scope.review = {
        ratings: {}
    }
        // console.log($stateParams);
    $scope.selectedProject = {};
    $scope.review = {
        ratings: {}
    }
    $scope.ratingParams = [{
        name: 'Security',
        id: 1
    }, {
        name: 'Amenities',
        id: 2
    }, {
        name: 'Open and green areas',
        id: 3
    }, {
        name: 'Convenience of parking',
        id: 4
    }, {
        name: 'Infrastructure',
        id: 5
    }];

    // if ($stateParams.id) {
    //     var params = $stateParams.id;
    // }
    // if (params) {
    //     $scope.showSelected = true;
    //     $scope.showLoadingSelected = true;
    //     $scope.showLoading = true;
    // } else {
    //     // console.log('called');
    //     $scope.showSelected = false;
    //     $scope.showSearch = true;
    // }

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
            $scope.review.ratings.convenienceOfParking = rating;
        } else if (index == 6) {
            $scope.review.ratings.infrastructure = rating;
        }
    };
    $scope.projectLocality = [];
    $scope.selectedItem = '';
    $scope.showMore = false;
    $scope.showMoreLess = 'Show More +';
    $scope.projectSelected = false;
    $('#textarea1').trigger('autoresize');

    if ($stateParams.id) {
        console.log($stateParams);
        $scope.selectedItem = decodeURIComponent((atob($stateParams.n)));
        $scope.selectedProject = {
            id: $stateParams.id,
            name: $scope.selectedItem,
            type: atob($stateParams.t)
        }
        $scope.showSearch = false;
        $scope.projectSelected = true;
    } else {
        $scope.showSearch = true;
    }

    $scope.nameEntered = function() {
        if ($scope.selectedItem) {
            if ($scope.selectedItem.length > 2) {
                $scope.showLoading = true;
                $scope.showResults = true;
                var data = {
                    name: $scope.selectedItem
                }
                var args = encodeParams(data);
                $http({
                    url: 'http://35.154.60.19/api/GetByName_1.0',
                    method: 'GET',
                    params: {
                        args: args
                    }
                }).then(function mySucces(response) {
                    $scope.projectList = {};
                    $timeout(function() {
                        if (Object.keys(response.data).length > 0) {
                            $scope.projectList = response.data;
                        }
                        $scope.showLoading = false;
                    }, 500)
                }, function myError(err) {})
            } else {
                $scope.showResults = false;
            }
        }
    }

    $scope.selectProject = function(project) {
        $scope.projectSelected = true;
        $scope.selectedItem = project.name;
        $scope.selectedProject = project;
        $scope.showResults = false;
    }

    $("#select_name_review").focusin(function() {
        $timeout(function() {
            $('.search-results').fadeIn();
        }, 0);
    });

    // hide search by name list when input for searching by name

    $("#select_name_review").focusout(function() {
        $('.search-results').fadeOut();
    });


    $scope.showMoreFn = function() {
        $scope.showMore = !$scope.showMore;
        if ($scope.showMore) {
            $scope.showMoreLess = 'Show Less -';
        } else {
            $scope.showMoreLess = 'Show More +';
        }
    }

    $scope.submitReview = function() {
        console.log($scope.selectedProject);
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
            reviewTitle: $scope.review.reviewTitle,
            status: $scope.review.status,
            createdDate: $scope.review.createdDate
        }
        if ($scope.selectedProject.type == 'residential') {
            newKey = db.ref('websiteReviews/' + $scope.cityId + '/residential/' + $scope.selectedProject.id).push().key;
            $scope.userReviewData.id = $scope.selectedProject.id;
            $scope.userReviewData.name = $scope.selectedProject.name;
            reviewPath = 'websiteReviews/' + $scope.cityId + '/residential/' + $scope.selectedProject.id + '/' + newKey;
            userReviewPath = 'userReviews/' + $scope.review.userId + '/residential/' + newKey;
        } else if ($scope.selectedProject.type == 'location') {
            newKey = db.ref('websiteReviews/' + $scope.cityId + '/location/' + $scope.selectedProject.id).push().key;
            $scope.userReviewData.id = $scope.selectedProject.id;
            $scope.userReviewData.name = $scope.selectedProject.name;
            reviewPath = 'websiteReviews/' + $scope.cityId + '/location/' + $scope.selectedProject.id + '/' + newKey;
            userReviewPath = 'userReviews/' + $scope.review.userId + '/location/' + newKey;
        } else if ($scope.selectedProject.type == 'locality') {
            newKey = db.ref('websiteReviews/' + $scope.cityId + '/locality/' + $scope.selectedProject.id).push().key;
            $scope.userReviewData.id = $scope.selectedProject.id;
            $scope.userReviewData.name = $scope.selectedProject.name;
            reviewPath = 'websiteReviews/' + $scope.cityId + '/locality/' + $scope.selectedProject.id + '/' + newKey;
            userReviewPath = 'userReviews/' + $scope.review.userId + '/locality/' + newKey;
        } else if ($scope.selectedProject.type == 'cghs') {
            newKey = db.ref('websiteReviews/' + $scope.cityId + '/cghs/' + $scope.selectedProject.id).push().key;
            $scope.userReviewData.id = $scope.selectedProject.id;
            $scope.userReviewData.name = $scope.selectedProject.name;
            reviewPath = 'websiteReviews/' + $scope.cityId + '/cghs/' + $scope.selectedProject.id + '/' + newKey;
            userReviewPath = 'userReviews/' + $scope.review.userId + '/cghs/' + newKey;
        }

        if (Object.keys($scope.review.ratings).length == 0) {
            delete $scope.review.ratings;
        }
        if ($scope.review.mobileNum) {
            updates['userRegistration/mobile/' + $scope.userMobileNum] = $scope.user.uid;
            updates['users/' + $scope.user.uid + '/mobile/mobileNum'] = $scope.userMobileNum;
            updates['users/' + $scope.user.uid + '/mobile/mobileVerified'] = true;
        }
        updates[reviewPath] = $scope.review;
        updates[userReviewPath] = $scope.userReviewData;
        console.log(updates);
        return;
        db.ref().update(updates).then(function() {
            $timeout(function() {
                var email = encodeURIComponent($scope.user.email);
                var name = encodeURIComponent($scope.user.displayName);
                var config = 2;
                var verifiedFlag = '';
                var parameter = 'email=' + email + '&name=' + name + '&conf=' + config
                if ($scope.review.verified) {
                    verifiedFlag = 'True';
                    parameter += '&verifiedFlag=' + verifiedFlag;
                } else {
                    verifiedFlag = 'False';
                }
                var couponFlag = '';
                if ($scope.review.couponApplied) {
                    couponFlag = 'True';
                    parameter += '&couponFlag=' + couponFlag;
                } else {
                    couponFlag = 'False';
                }
                if ($scope.review.couponApplied) {
                    parameter += '&coupon=' + $scope.review.couponCode;
                }
                console.log(parameter);
                $http({
                    url: 'http://35.154.60.19/api/SendMail_1.0',
                    method: 'GET',
                    params: {
                        args: btoa(parameter)
                    }
                }).then(function mySucces(response) {
                    console.log(response);
                    $timeout(function() {
                        $scope.step = 5;
                    }, 1000)
                }, function myError(err) {
                    $timeout(function() {
                        $scope.step = 5;
                    }, 1000)
                })
            }, 0);
        })
    }

    /*Coupon Code Verification Starts*/

    $scope.validateCoupon = function() {
        console.log($scope.couponCode);
        var timestamp = parseInt((new Date().getTime()) / 1000);
        if ($scope.couponCode == '') {
            $scope.message = 'Please enter the coupon code.';
            $scope.messageClass = 'failed';
        } else {
            $scope.applyingCoupon = true;
            db.ref('coupons/' + $scope.couponCode).once('value', function(snapshot) {
                $timeout(function() {
                    $scope.couponDetails = snapshot.val();
                    if ($scope.couponDetails) {
                        if (timestamp > $scope.couponDetails.createdDate && timestamp < $scope.couponDetails.expiryDate) {
                            if ($scope.couponDetails.status == 'active') {
                                $scope.message = 'Your coupon code has been applied successfully';
                                $scope.messageClass = 'success';
                                $scope.couponCodeSuccessful = true;

                            } else {
                                $scope.message = 'This coupon code is not active';
                                $scope.messageClass = 'failed';
                                $scope.couponCodeSuccessful = false;
                            }
                        } else {
                            $scope.message = 'This coupon code has expired'
                            $scope.messageClass = 'failed';
                            $scope.couponCodeSuccessful = false;
                        }
                    } else {
                        $scope.message = 'This coupon code is invalid'
                        $scope.messageClass = 'failed';
                        $scope.couponCodeSuccessful = false;
                    }
                    $scope.applyingCoupon = false;
                }, 1000);
            });
        }
    }

    /*Coupon Code Verification Ends*/

    // sends one time password to registered email and mobile number
    $scope.sendOtp = function(mobile) {
        if (mobile) {
            mobile = mobile.toString();
            $scope.userMobileNum = mobile;
            if (mobile.length == 10) {
                $scope.step = 2;
                $scope.loadingMessage = 'Sending OTP...';
                // $scope.showModalLoading = true;
                $scope.otp = Math.floor(1000 + Math.random() * 9000);
                // var data = {
                //     mobile: mobile,
                //     otp: otp,
                //     email: $scope.user.email
                // }

                $scope.splitEmail = $scope.user.email.split("@");
                $http({
                    url: 'http://35.154.60.19/api/SendOTP_1.0',
                    method: 'GET',
                    params: {
                        mobile: mobile,
                        otp: $scope.otp.toString(),
                        email: $scope.user.email
                    }
                }).then(function(response) {
                    console.log(response);
                    if (response.status == 200) {
                        $timeout(function() {
                            // $scope.showModalLoading = false;
                            $scope.step = 3;
                        }, 1000);
                    } else {
                        $scope.step = 1;
                        $scope.numberError = 'OTP not sent, please try again.'
                    }
                });
            } else {
                $scope.step = 1;
                $scope.numberError = 'Please enter your 10 digit mobile number';
            }
        } else {
            $scope.step = 1;
            $scope.numberError = 'Please enter your 10 digit mobile number';
        }
    }

    $scope.verifyOtp = function(otp) {
        console.log(otp, $scope.otp);
        if (parseInt($scope.otp) != parseInt(otp)) {
            $scope.incorrectOtp = true;
        } else {
            $scope.step = 4;
            if ($scope.couponCodeSuccessful) {
                $scope.review.couponApplied = true;
                $scope.review.couponCode = $scope.couponCode;
            } else {
                $scope.review.couponApplied = false;
            }
            $scope.review.verified = true;
            $scope.review.mobileNum = parseInt($scope.userMobileNum);
            $scope.loadingMessage = 'Submitting review...';
            $scope.submitReview();
        }
    }

    $scope.submitWithoutVerification = function() {
        // console.log($scope.review);
        $scope.step = 4;
        $scope.review.couponApplied = false;
        $scope.review.verified = false;
        $scope.loadingMessage = 'Submitting review...'
        $scope.submitReview();
    }

    $scope.refreshPage = function() {
        $timeout(function() {
            window.location.reload(true);
        }, 1000);
    }
}]);
