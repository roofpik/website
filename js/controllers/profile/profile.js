//YET TO IMPROVE THE CHANGE IMAGE FEATURE
app.controller('profileCtrl', ['$scope', '$stateParams', '$state', '$timeout', function($scope, $stateParams, $state, $timeout) {
    document.title = "My Profile";
    var uid = decodeParams($stateParams.id)
        // console.log(uid)
    $scope.userId = uid.id;
    // console.log(auth);

    //if no user is logged in, take the user back to home page
    if (firebase.auth().currentUser == null) {
        $state.go('home');
    }
    $scope.user = {};
    $scope.newPassword = '';
    $scope.newPasswordVerification = '';
    $scope.user.userId = $scope.userId;
    $scope.disableFirstName = true;
    // $scope.disablePwd = true;
    // $scope.disableRePwd = true;
    $scope.disableLastName = true;
    $scope.disablePhoneNumber = true;
    $scope.disableAddress = true;
    $scope.showReviews = false;
    $scope.noReviewsToShow = false;
    $scope.userReviews = {};
    getUserData();

    function getUserData() {
        db.ref('users/' + $scope.userId).once('value', function(snapshot) {
            $timeout(function() {
                // console.log($scope.userId)
                if (snapshot.val().fname) {
                    $scope.user.firstName = snapshot.val().fname;
                }
                if (snapshot.val().lname) {
                    $scope.user.lastName = snapshot.val().lname;
                }
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
                if (snapshot.val().profileImage) {
                    $scope.image = snapshot.val().profileImage;
                } else {
                    $scope.image = "https://getuikit.com/v2/docs/images/placeholder_600x400.svg" //Dummy Image
                }
            }, 0);
        })
    }
    getUserReviews();

    function getUserReviews() {
        db.ref('userReviews/' + $scope.userId).once('value', function(snapshot) {
            $timeout(function() {
                for (key in snapshot.val()) {
                    $scope.userReviews[key] = {};
                    for (key1 in snapshot.val()[key]) {
                        $scope.userReviews[key][key1] = {};
                        if (snapshot.val()[key][key1].reviewTitle) {
                            $scope.userReviews[key][key1].reviewTitle = snapshot.val()[key][key1].reviewTitle;
                        }
                        if (snapshot.val()[key][key1].projectName) {
                            $scope.userReviews[key][key1].projectName = snapshot.val()[key][key1].projectName;
                        }
                        if (snapshot.val()[key][key1].createdDate) {
                            $scope.userReviews[key][key1].createdDate = snapshot.val()[key][key1].createdDate;
                        }
                        if (snapshot.val()[key][key1].projectId) {
                            $scope.userReviews[key][key1].projectId = snapshot.val()[key][key1].projectId;
                        }
                        $scope.userReviews[key][key1].type = key;
                    }
                }
                bindReviews();
            }, 0);
        })
    }

    function bindReviews() {
        if (Object.keys($scope.userReviews).length) {
            $scope.showReviews = true;
        } else {
            $scope.noReviewsToShow = true;
        }
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

    $scope.enableFirstName = function() {
            $scope.disableFirstName = false;
        }
        // $scope.enablePwd = function() {
        //     $scope.disablePwd = false;
        // }
        // $scope.enableRePwd = function() {
        //     $scope.disableRePwd = false;
        // }
    $scope.enableLastName = function() {
        $scope.disableLastName = false;
    }
    $scope.enablePhoneNumber = function() {
        $scope.disablePhoneNumber = false;
    }
    $scope.enableAddress = function() {
        $scope.disableAddress = false;
    }
    $scope.blurFirstName = function() {
        $scope.disableFirstName = true;
        db.ref('users/' + $scope.userId + '/' + 'fname').set($scope.user.firstName);
    }
    $scope.blurLastName = function() {
        $scope.disableLastName = true;
        db.ref('users/' + $scope.userId + '/' + 'lname').set($scope.user.lastName);
    }
    $scope.blurPhoneNumber = function() {
        $scope.disablePhoneNumber = true;
        db.ref('users/' + $scope.userId + '/' + 'mobile/mobileNum').set($scope.user.phoneNumber);
    }
    $scope.blurAddress = function() {
            $scope.disableAddress = true;
            db.ref('users/' + $scope.userId + '/' + 'address/addressLine1').set($scope.user.address);
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

    //Image Uploader (Not fully correct)
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
}])
