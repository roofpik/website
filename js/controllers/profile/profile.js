//YET TO INCLUDE THE CHANGE IMAGE FEATURE
app.controller('profileCtrl', ['$scope', '$stateParams', '$state', '$timeout', '$http', function($scope, $stateParams, $state, $timeout, $http) {
    document.title = "My Profile";
    // var uid = decodeParams($stateParams.id)
    $scope.cityId = '-KYJONgh0P98xoyPPYm9'
        // console.log(uid)
        // $scope.userId = 'PTAksrDxGnX79L200YGnmgi8wxH2'
        // if user is not signed in, take him to the home page
    firebase.auth().onAuthStateChanged(function(user) {
        $timeout(function() {
            if (user) {
                // console.log(firebase.auth().currentUser)
                $scope.user = firebase.auth().currentUser
            } else {
                $state.go('home');
            }
            getUser($scope.user)
        }, 100)
    });
    // $scope.userId = 'G5FQWnOOoFcRl8oMiQ6Tub9R9Ho2'
    // console.log($scope.userId);
    $scope.textReviews = 0;
    $scope.nonTextReviews = 0;
    // $scope.overallExists = false;
    $scope.showRatings = true;
    $scope.loading = true;
    $scope.nonTextReviews = 0;
    $scope.user = {};
    $scope.i = 0;
    // $scope.amenitiesExists = false;

    $scope.newPassword = '';
    $scope.newPasswordVerification = '';
    $scope.user.userId = $scope.userId;
    $scope.disableFullName = true;
    // $scope.disablePwd = true;
    // $scope.disableRePwd = true;
    // $scope.disableLastName = true;
    $scope.disablePhoneNumber = true;
    $scope.disableAddress = true;
    $scope.showReviews = true;
    $scope.noReviewsToShow = false;
    $scope.userReviews = {};
    $scope.userReviews[$scope.i] = 0;

    function getUser(user) {
        $scope.userId = user.uid;
        getUserData();
    }

    function getUserData() {
        // console.log($scope.userId)
        db.ref('users/' + $scope.userId).once('value', function(snapshot) {
            $timeout(function() {
                if (snapshot.val().fname) {
                    $scope.user.firstName = snapshot.val().fname;
                } else {
                    $scope.user.firstName = '';
                }
                if (snapshot.val().lname) {
                    $scope.user.lastName = snapshot.val().lname;
                } else {
                    $scope.user.lastName = '';
                }
                $scope.user.fullName = $scope.user.firstName + " " + $scope.user.lastName
                $scope.user.password = snapshot.val().tempPassword;
                if (snapshot.val().address) {
                    if (snapshot.val().address.addressLine1) {
                        $scope.user.address = snapshot.val().address.addressLine1;
                    }
                    if (snapshot.val().address.cityName) {
                        $scope.user.city = snapshot.val().address.cityName;
                    }
                }
                $scope.user.emailId = snapshot.val().email.emailAddress;
                if (snapshot.val().mobile) {
                    if (snapshot.val().mobile.mobileNum) {
                        $scope.user.phoneNumber = snapshot.val().mobile.mobileNum;
                    }
                }
                if (firebase.auth().currentUser.photoURL) {
                    $scope.image = firebase.auth().currentUser.photoURL;
                } else {
                    $scope.image = "https://getuikit.com/v2/docs/images/placeholder_600x400.svg" //Dummy Image
                }
            }, 0);
            getUserReviews();
        })
    }

    function getUserReviews() {
        db.ref('userReviews/' + $scope.userId).once('value', function(snapshot) {
            $timeout(function() {
                for (key in snapshot.val()) {
                    for (key1 in snapshot.val()[key]) {
                        $scope.userReviews[$scope.i].overallExists = false;
                        if (snapshot.val()[key]) {
                            $scope.userReviews[$scope.i] = {};
                            if (snapshot.val()[key][key1].reviewTitle) {
                                $scope.userReviews[$scope.i].reviewTitle = snapshot.val()[key][key1].reviewTitle;
                                $scope.textReviews++;
                            }
                            if (snapshot.val()[key][key1].projectName) {
                                $scope.userReviews[$scope.i].projectName = snapshot.val()[key][key1].projectName;
                            }
                            if (snapshot.val()[key][key1].createdDate) {
                                $scope.userReviews[$scope.i].createdDate = snapshot.val()[key][key1].createdDate;
                            }
                            if (snapshot.val()[key][key1].projectId) {
                                $scope.userReviews[$scope.i].projectId = snapshot.val()[key][key1].projectId;
                            }
                            if (snapshot.val()[key][key1].verified) {
                                $scope.userReviews[$scope.i].reviewVerified = snapshot.val()[key][key1].verified;
                                if ($scope.userReviews[$scope.i].reviewVerified == true) {
                                    $scope.verifiedReviewMessage = "Verified Review"
                                }
                            }
                            $scope.userReviews[$scope.i].type = key;
                            $scope.userReviews[$scope.i].reviewId = key1;
                            $scope.userReviews[$scope.i].counter = $scope.i;
                            getReviewData($scope.i, key1);
                            $scope.i++;
                            // $scope.noReviews = false;
                        } else {
                            // $scope.noReviews = true;
                        }
                    }
                }
                $scope.loading = false;
            })
        })
    }

    function showHideReviewRating(i, overall) {
        if (overall && $scope.userReviews[i].reviewTitle == '' && $scope.userReviews[i].reviewText == '') {
            $scope.showRatings = false;
        } else {
            $scope.showRatings = true;
        }
        if ($scope.userReviews[0] == 0) {
            $scope.showReviews = true;
        } else {
                $scope.showReviews = false;
        }
    }

    function getReviewData(i, Id) {
        // console.log($scope.userReviews[i]);
        // console.log(Id);
        $http({
            url: 'http://35.154.60.19/api/GetReviewDetails_1.0',
            method: 'GET',
            params: {
                id: Id,
                type: $scope.userReviews[i].type
            }
        }).then(function mySucces(response) {
            $timeout(function() {
                // console.log(response);
                if (response.status == 200) {
                    // console.log(response);
                    $scope.text = response.data.reviewText;
                    setReviewText($scope.text, i, response)
                    showHideReviewRating(i, $scope.userReviews[i].overallExists);
                    $scope.loading = false;
                }
                // loading(false, 1000);
            }, function myError(err) {
                // console.log(err);
            }, 0);
        })
    }

    function setReviewText(text, i, response) {
        $scope.userReviews[i].reviewText = text;
        if (response.data.overallRating) {
            $scope.userReviews[i].overallRatings = response.data.overallRating;
            $scope.userReviews[i].overallExists = true;
        }
        if ($scope.userReviews[i].overallExists && response.data.reviewTitle == '' && response.data.reviewText == '') {
            $scope.nonTextReviews++;
        }
        // console.log($scope.userReviews[i].type, $scope.userReviews[i].projectId, $scope.userReviews[i].reviewId)
        db.ref('reviews/' + $scope.cityId + '/' + $scope.userReviews[i].type + '/' + $scope.userReviews[i].projectId + '/' + $scope.userReviews[i].reviewId).once('value', function(response) {
            $timeout(function() {
                if (response.val().verified) {
                    $scope.userReviews[i].reviewVerified = response.val().verified;
                }
            }, 0);
        })
    }

    //Function to redirect to the project page from user's reviews

    $scope.goToProjectPage = function(id) {
        if (id.type == 'residential') {
            param = {
                projectId: id.projectId
            }
            $state.go('project-details', { p: encodeParams(param) });
        } else if (id.type == 'cghs') {
            param = {
                projectId: id.projectId,
                category: 'CGHS'
            }
            $state.go('project-details', { p: encodeParams(param) });
        } else if (id.type == 'locality') {
            param = {
                id: id.projectId,
                category: 'locality'
            }
            $state.go('location-details', { p: encodeParams(param) });
        } else if (id.type == 'location') {
            param = {
                id: id.projectId,
                category: 'locations'
            }
            $state.go('location-details', { p: encodeParams(param) });
        } else {}
    }

    $scope.enableFullName = function() {
            $scope.disableFullName = false;
        }
        // $scope.enablePwd = function() {
        //     $scope.disablePwd = false;
        // }
        // $scope.enableRePwd = function() {
        //     $scope.disableRePwd = false;
        // }
    $scope.enablePhoneNumber = function() {
        $scope.disablePhoneNumber = false;
    }
    $scope.enableAddress = function() {
        $scope.disableAddress = false;
    }
    $scope.blurFullName = function() {
        $scope.disableFullName = true;
        $scope.name = $scope.user.fullName.split(" ");
        // console.log($scope.name);
        db.ref('users/' + $scope.userId + '/' + 'fname').set($scope.name[0]);
        db.ref('users/' + $scope.userId + '/' + 'lname').set($scope.name[1]);
        Materialize.toast("Your Name Has Been Updated", 1000, 'rounded');
    }
    $scope.blurPhoneNumber = function() {
        $scope.disablePhoneNumber = true;
        db.ref('users/' + $scope.userId + '/' + 'mobile/mobileNum').set($scope.user.phoneNumber);
        Materialize.toast("Your Phone Number Has Been Updated", 1000, 'rounded');
    }
    $scope.blurAddress = function() {
            $scope.disableAddress = true;
            db.ref('users/' + $scope.userId + '/' + 'address/addressLine1').set($scope.user.address);
            Materialize.toast("Your Adderss Has Been Updated", 1000, 'rounded');
        }
        // $scope.blurPwd = function() {
        //     $scope.disablePwd = true;
        //     if ($scope.newPassword == $scope.user.password) {
        //         swal("New Password Must Be Different From The Old Password", "Try Again");
        //     }
        //     if ($scope.newPassword.length < 8) {
        //         swal("The Password Must Be Atleast 8 Characters Long", "Try Again");
        //     } else {
        //         swal("Are You Sure You Want To Change Your Password?")
        //     }
        // }
        // $scope.blurRePwd = function() {
        //     $scope.disableRePwd = true;
        //     if ($scope.newPasswordVerification.length != 0) {
        //         if ($scope.newPassword != $scope.newPasswordVerification) {
        //             swal("Passwords Don't Match", "Try Again");
        //         } else {
        //             db.ref('users/' + $scope.userId + '/' + 'tempPassword').set($scope.newPassword)
        //             swal("Password Successfully Changed", "Congratulations!", "success")
        //         }
        //     } else {
        //         if ($scope.newPassword) {
        //             swal('Cannot Leave This Field Blank');
        //         }
        //     }
        // }

    //Image Uploader (Not correct)
    $scope.getFileDetails = function(file) {
            var file = file.files[0];
            var image = "https://getuikit.com/v2/docs/images/" + file.name; //To Rectify
            // changeImage(image); //To Rectify
        }
        //To Rectify this function (Image Uploading)
    function changeImage(image) {
        db.ref('users/' + $scope.userId + '/' + 'profileImage').set(image);
        $scope.image = image;
    }

    $scope.getVerified = function(id) {
        swal({
                title: "Enter your 10 digit mobile number",
                text: "You will soon receive a one time password",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                cancelButtonText: 'Cancel',
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
                    sendOtp(inputValue, id);
                } else {
                    // Materialize.toast("You have successfully logged in!", 2000, 'rounded');
                    return true;
                }
            });
    }

    function sendOtp(mobile, id) {
        swal({
            title: "Sending OTP",
            text: "Please wait...",
            imageUrl: "https://d1ow200m9i3wyh.cloudfront.net/img/assets/common/images/loader.gif",
            showConfirmButton: false
        });
        var otp = Math.floor(1000 + Math.random() * 9000);
        var data = {
            mobile: parseInt(mobile),
            otp: otp
        }
        $http({
            url: 'http://35.154.60.19/api/SendOTP_1.0',
            method: 'GET',
            params: {
                args: encodeParams(data)
            }
        }).then(function(response) {
            $timeout(function() {
                // console.log(response);
                if (response.status == 200) {
                    // console.log('sent');
                    swal({
                            title: "Enter OTP",
                            text: "A verification code has been sent to your registered mobile xxxxxxxxx" + mobile[mobile.length - 1],
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
                                    alert('Verified Successfully');
                                    setVerifiedReview(id.counter, mobile);

                                } else {
                                    swal.showInputError("Incorrect OTP");
                                }
                            } else {
                                // swal('')
                                alert('Not Verified');
                                return true;
                            }
                        });

                } else {
                    // console.log('not sent');
                    swal('OTP not sent', 'Please try again.', 'error');
                }
            }, 0)
        });
    }

    function setVerifiedReview(i, mobile) {
        // console.log(i);
        // console.log(mobile);
        var updates = {
            mobile: $scope.userReviews[i].reviewId
        }
        $timeout(function() {
            if ($scope.mobileVerified) {
                $scope.userReviews[i].reviewVerified = true;
                db.ref('userReviews/' + $scope.userReviews[i].projectId + '/' + $scope.userReviews[i].type + '/' + $scope.userReviews[i].reviewId + '/verified').set('true');
                db.ref('users/' + $scope.userId + '/mobile/mobileNum').set(mobile);
                db.ref('userRegistration/mobile/').update(updates);
            }
        }, 100)
    }
}])
