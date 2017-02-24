//YET TO INCLUDE THE CHANGE IMAGE FEATURE
app.controller('profileCtrl', ['$scope', '$stateParams', '$state', '$timeout', '$http', function($scope, $stateParams, $state, $timeout, $http) {
    document.title = "My Profile";
    var uid = decodeParams($stateParams.id)
        // console.log(uid)
        // $scope.userId = uid.id;
    // $scope.userId = '8LoX0ojlVCPc4OtsQR5FPHT8Vgk2'

    // if user is not signed in, take him to the home page
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
        } else {
            $state.go('home');
        }
    });
    $scope.textReviews = 0;
    $scope.nonTextReviews = 0;
    $scope.noReviews = true;
    $scope.user = {};
    $scope.i = 0;
    $scope.newPassword = '';
    $scope.newPasswordVerification = '';
    $scope.user.userId = $scope.userId;
    $scope.disableFullName = true;
    // $scope.disablePwd = true;
    // $scope.disableRePwd = true;
    // $scope.disableLastName = true;
    $scope.disablePhoneNumber = true;
    $scope.disableAddress = true;
    $scope.showReviews = false;
    $scope.noReviewsToShow = false;
    $scope.userReviews = {};
    $scope.userReviews[$scope.i] = 0;
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

    if(Object.keys($scope.userReviews).length > 1){
        $scope.noReviews = false;
    }
    console.log(Object.keys($scope.userReviews).length)

    function getUserReviews() {
        db.ref('userReviews/' + $scope.userId).once('value', function(snapshot) {
                for (key in snapshot.val()) {
                    console.log('called')
                    for (key1 in snapshot.val()[key]) {
                        $scope.userReviews[$scope.i] = {};
                        console.log(key, key1)
                        if (snapshot.val()[key][key1].reviewTitle) {
                            $scope.userReviews[$scope.i].reviewTitle = snapshot.val()[key][key1].reviewTitle;
                            $scope.textReviews++;
                        } else {
                            $scope.nonTextReviews++;
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
                    }
                }
                console.log($scope.userReviews);
                // console.log($scope.userId)
                bindReviews();
        })
    }

    function getReviewData(i, projId) {
                $http({
                    url: 'http://107.23.243.89/api/GetReviewDetails_1.0',
                    method: 'GET',
                    params: {
                        id: projId
                    }
                }).then(function mySucces(response) {
                    console.log(response);
                    if (response.status == 200) {
                        $scope.text = response.data.reviewText;
                        setReviewText($scope.text, i)
                    }
                    loading(false, 1000);
                }, function myError(err) {
                    console.log(err);
                });
    }

    function setReviewText(text, i){
            $scope.userReviews[i].reviewText = text;
    }

    function bindReviews() {

        $scope.totalRatings = $scope.textReviews + $scope.nonTextReviews;
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
