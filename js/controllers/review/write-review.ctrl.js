app.controller('writeReviewCtrl', ['$scope', '$timeout', '$rootScope', '$location', '$stateParams', '$http', function($scope, $timeout, $rootScope, $location, $stateParams, $http) {
    document.title = "Write Review";
    $('.modal').modal({
        dismissible: false
    });

    $scope.couponCode = '';

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

    // if(firebase.auth().currentUser){

    // }else {
    //     $rootScope.$emit("callShowLogin");
    // }


    function getUser(user) {
        // console.log(user);
        $scope.userName = user.displayName;
        $scope.userId = user.uid;
        // console.log($scope.userName);
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
    if ($stateParams.id) {
        var params = $stateParams.id;
    }
    // console.log(params);
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
    var user;
    if (params) {
        $scope.showSelected = true;
        $scope.showLoadingSelected = true;
        $scope.showLoading = true;
    } else {
        // console.log('called');
        $scope.showSelected = false;
        $scope.showSearch = true;
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
            }, 500)
            $scope.showLoadingSelected = false;
        }, function myError(err) {})

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
                // console.log(args);
                $http({
                    url: 'http://107.23.243.89/api/GetByName_1.0',
                    method: 'GET',
                    params: {
                        args: args
                    }
                }).then(function mySucces(response) {
                    $scope.projectList = {};
                    $timeout(function() {
                        if (Object.keys(response.data).length > 0) {
                            $scope.projectList = response.data;
                            // console.log($scope.projectList);
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
        // console.log(project)
        $scope.projectSelected = true;
        $scope.selectedItem = project.name;
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
        console.log($scope.review);
        swal({
                title: "Enter your 10 digit mobile number",
                text: "You will soon receive a one time password",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                cancelButtonText: 'Submit without verification',
                confirmButtonText: 'Send OTP',
                animation: "slide-from-top",
                inputPlaceholder: "Phone Number"
            },
            function(inputValue) {
                if (inputValue == "") {
                    swal.showInputError("Mobile number not entered");
                    return false;
                } else if (inputValue.length < 10) {
                    swal.showInputError("Mobile number incorrect");
                    return false;
                } else if (inputValue.length == 10) {
                    $scope.sendOtp(inputValue);
                } else {
                    // Materialize.toast("You have successfully logged in!", 2000, 'rounded');
                    return true;
                }
                // swal({
                //         title: "Verifying Your Phone Number",
                //         text: "Please Enter The OTP",
                //         type: "input",
                //         showCancelButton: true,
                //         closeOnConfirm: false,
                //         animation: "slide-from-top",
                //         inputPlaceholder: "One Time Password"
                //     },
                //     function(inputValue) {
                //         if (inputValue === false) return false;

                //         if (inputValue === "") {
                //             swal.showInputError("This Field Cannot Be Left Blank");
                //             return false
                //         }

                //     });
            });

        // swal({
        //     title: "Submitting Review",
        //     text: "Please wait...",
        //     imageUrl: "https://d1ow200m9i3wyh.cloudfront.net/img/assets/common/images/loader.gif",
        //     showConfirmButton: false
        // });
        // var reviewPath = '';
        // var userReviewPath = '';
        // var key = '';
        // $scope.review.userName = user.displayName;
        // // $scope.review.userName = 'Anu Porwal';
        // $scope.review.userId = user.uid;
        // // $scope.review.userId = '2cQ2XQ7w7pdT9WGq2nyGJhrPSOo2';
        // $scope.review.blocked = false;
        // $scope.review.createdDate = new Date().getTime();
        // $scope.review.dataFormat = 1;
        // $scope.review.wordCount = ($scope.review.reviewText).length;
        // $scope.review.source = 'website';
        // $scope.review.status = 'uploaded';
        // var updates = {};
        // $scope.userReviewData = {
        //     cityId: $scope.cityId,
        //     cityName: 'Gurgaon',
        //     reviewTitle: $scope.review.reviewTitle,
        //     status: $scope.review.status,
        //     createdDate: $scope.review.createdDate
        // }
        // if ($scope.selectedProject.type == 'residential') {
        //     newKey = db.ref('websiteReviews/' + $scope.cityId + '/residential/' + $scope.selectedProject.id).push().key;
        //     $scope.userReviewData.projectId = $scope.selectedProject.id;
        //     $scope.userReviewData.projectName = $scope.selectedProject.name;
        //     reviewPath = 'websiteReviews/' + $scope.cityId + '/residential/' + $scope.selectedProject.id + '/' + newKey;
        //     userReviewPath = 'userReviews/' + $scope.review.userId + '/residential/' + newKey;
        // }

        // if ($scope.selectedProject.type == 'location') {
        //     newKey = db.ref('websiteReviews/' + $scope.cityId + '/location/' + $scope.selectedProject.id).push().key;
        //     $scope.userReviewData.projectId = $scope.selectedProject.id;
        //     $scope.userReviewData.projectName = $scope.selectedProject.name;
        //     reviewPath = 'websiteReviews/' + $scope.cityId + '/location/' + $scope.selectedProject.id + '/' + newKey;
        //     userReviewPath = 'userReviews/' + $scope.review.userId + '/location/' + newKey;
        // }

        // if ($scope.selectedProject.type == 'locality') {
        //     newKey = db.ref('websiteReviews/' + $scope.cityId + '/locality/' + $scope.selectedProject.id).push().key;
        //     $scope.userReviewData.projectId = $scope.selectedProject.id;
        //     $scope.userReviewData.projectName = $scope.selectedProject.name;
        //     reviewPath = 'websiteReviews/' + $scope.cityId + '/locality/' + $scope.selectedProject.id + '/' + newKey;
        //     userReviewPath = 'userReviews/' + $scope.review.userId + '/locality/' + newKey;
        // }

        // if (Object.keys($scope.review.ratings).length == 0) {
        //     delete $scope.review.ratings;
        // }
        // updates[reviewPath] = $scope.review;
        // updates[userReviewPath] = $scope.userReviewData;
        // console.log(updates);
        // db.ref().update(updates).then(function() {
        //     $timeout(function() {
        //         swal({
        //             title: "Done",
        //             text: "Your review was successfully submitted!",
        //             type: "success",
        //             showCancelButton: false,
        //             confirmButtonColor: "#AEDEF4",
        //             confirmButtonText: "OK",
        //             closeOnConfirm: false
        //         }, function() {
        //             window.location.reload(true);
        //         });
        //     }, 500);
        // })
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
            if (mobile.length == 10) {
                swal({
                    title: "Sending OTP",
                    text: "Please wait...",
                    imageUrl: "https://d1ow200m9i3wyh.cloudfront.net/img/assets/common/images/loader.gif",
                    showConfirmButton: false
                });
                var otp = Math.floor(1000 + Math.random() * 9000);
                // var data = {
                //     mobile: mobile,
                //     otp: otp,
                //     email: $scope.user.email
                // }

                var splitEmail= $scope.user.email.split("@");
                $http({
                    url: 'http://107.23.243.89/api/SendOTP_1.0',
                    method: 'GET',
                    params: {
                        mobile: mobile,
                        otp: otp.toString(),
                        email: $scope.user.email
                    }
                }).then(function(response) {
                    console.log(response);
                    if (response.status == 200) {
                        // console.log('sent');
                        swal({
                                title: "Enter OTP",
                                text: "A verification code has been sent to your registered mobile "+mobile[0]+"xxxxxxxx" + mobile[mobile.length - 1]+"and email address "+$scope.user.email[0]+"XXX"+splitEmail[1],
                                type: "input",
                                showCancelButton: true,
                                closeOnConfirm: true,
                                animation: "slide-from-top",
                                inputPlaceholder: "One Time Password"
                            },
                            function(inputValue) {
                                if (inputValue == "") {
                                    swal.showInputError("OTP not entered");
                                    return false;
                                } else if (inputValue.length < 4) {
                                    swal.showInputError("Incorrect OTP");
                                    return false;
                                } else if (inputValue.length == 4) {
                                    if (inputValue == otp) {
                                        $scope.mobileVerified = true;
                                        alert('mobile verified');
                                    } else {
                                        swal.showInputError("Incorrect OTP");
                                    }
                                } else {
                                    // swal('')
                                    alert('mobile not verified');
                                    return true;
                                }
                            });
                    } else {
                        // console.log('not sent');
                        swal('OTP not sent', 'Please try again.', 'error');
                    }
                });
            } else {
                Materialize.toast('Invalid Number', 2000);
            }
        } else {
            Materialize.toast('Please enter your 10 digit mobile number', 2000);
        }
    }
}]);
