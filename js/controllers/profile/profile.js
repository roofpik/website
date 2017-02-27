//YET TO INCLUDE THE CHANGE IMAGE FEATURE
app.controller('profileCtrl', ['$scope', '$stateParams', '$state', '$timeout', '$http', function($scope, $stateParams, $state, $timeout, $http) {
    document.title = "My Profile";
    var uid = decodeParams($stateParams.id)
    // console.log(uid)
        // $scope.userId = 'vyEaEOyjGgUl8OvOVRZek8twcpk1'
    $scope.userId = uid.id;
    // if user is not signed in, take him to the home page
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
        } else {
            $state.go('home');
        }
    });
    $scope.textReviews = 0;
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
    getUserData();

    function getUserData() {
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
                        $scope.userReviews[$scope.i].houseMaidsExists = false;
                        $scope.userReviews[$scope.i].electricityExists = false;
                        $scope.userReviews[$scope.i].greenAreasExists = false;
                        $scope.userReviews[$scope.i].securityExists = false;
                        $scope.userReviews[$scope.i].infraExists = false;
                        $scope.userReviews[$scope.i].parkingExists = false;
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
                            $scope.userReviews[$scope.i].type = key;
                            $scope.userReviews[$scope.i].reviewId = key1;
                            getReviewData($scope.i, key1);
                            $scope.i++;
                            // $scope.noReviews = false;
                        } else {
                            // $scope.noReviews = true;
                        }
                    }
                }
                bindReviews();
                $scope.loading = false;
            })
        })
    }

    function showHideReviewRating(i, amenities, maids, electricity, greenAreas, security, infra, parking) {
        if (amenities || maids || electricity || greenAreasExistsnAreas || security || infra || parking) {
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

    function getReviewData(i, projId) {
        $http({
            url: 'http://107.23.243.89/api/GetReviewDetails_1.0',
            method: 'GET',
            params: {
                id: projId
            }
        }).then(function mySucces(response) {
            if (response.status == 200) {
                console.log(response);
                $scope.text = response.data.reviewText;
                setReviewText($scope.text, i, response)
                showHideReviewRating(i, $scope.userReviews[i].amenitiesExists, $scope.userReviews[i].houseMaidsExists, $scope.userReviews[i].electricityExists, $scope.userReviews[i].greenAreasExists, $scope.userReviews[i].securityExists, $scope.userReviews[i].infraExists, $scope.userReviews[i].parkingExists);
            }
            // loading(false, 1000);
        }, function myError(err) {
            console.log(err);
        });
    }

    function setReviewText(text, i, response) {
        $scope.userReviews[i].reviewText = text;
        if (response.data.overallRating) {
            $scope.userReviews[i].overallRatings = response.data.overallRating;
            $scope.userReviews[i].overallExists = true;
            $scope.nonTextReviews++;
        }
        if (response.data.ratings) {
            if (response.data.ratings.amenities) {
                $scope.userReviews[i].amenitiesRatings = response.data.ratings.amenities;
                $scope.userReviews[i].amenitiesExists = true;
                // console.log('amenitiesWorking')
            }
            if (response.data.ratings.convenienceOfHouseMaids) {
                $scope.userReviews[i].convenienceOfHouseMaidRating = response.data.ratings.convenienceOfHouseMaids;
                $scope.userReviews[i].houseMaidsExists = true;
            }
            if (response.data.ratings.electricityAndWaterSupply) {
                $scope.userReviews[i].electricityAndWaterSupplyRating = response.data.ratings.electricityAndWaterSupply;
                $scope.userReviews[i].electricityExists = true;
            }
            if (response.data.ratings.openAndGreenAreas) {
                $scope.userReviews[i].openAndGreenAreasRating = response.data.ratings.openAndGreenAreas;
                $scope.userReviews[i].greenAreasExists = true;
            }
            if (response.data.ratings.security) {
                $scope.userReviews[i].securityRating = response.data.ratings.security;
                $scope.userReviews[i].securityExists = true;
            }
            if (response.data.ratings.infrasctructure) {
                $scope.userReviews[i].infrastructureRating = response.data.ratings.infrastructure;
                $scope.userReviews[i].infraExists = true;
            }
            if (response.data.ratings.convenienceOfParking) {
                $scope.userReviews[i].parkingRating = response.data.ratings.convenienceOfParking;
                $scope.userReviews[i].parkingExists = true;
            }
        }
    }

    function bindReviews() {

        $scope.totalRatings = $scope.textReviews + $scope.nonTextReviews;
        // $scope.loading = false;

        // if (Object.keys($scope.userReviews).length) {
        //     $scope.showReviews = true;
        // } else {
        //     $scope.noReviewsToShow = true;
        // }
        // $http({
        //     url: 'http://107.23.243.89/api/GetReviewDetails_1.0',
        //     method: 'GET',
        //     params: {
        //         id: $scope.reviews[index].reviewId
        //     }
        // }).then(function mySucces(response) {
        //     // console.log(response);
        //     if(response.status == 200){
        //         $scope.reviews[index].reviewText = response.data.reviewText;
        //         $scope.reviews[index].showMore = false;
        //     } 
        //     loading(false, 1000);
        // }, function myError(err) {
        //     console.log(err);
        // })
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
