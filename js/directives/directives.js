app.directive('header', function() {
    return {
        restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: false,
        scope: { user: '=' }, // This is one of the cool things :). Will be explained in post.
        templateUrl: "templates/directives/header.html"
            // controller: 'headerCtrl'
    }
});

app.directive('footer', function() {
    return {
        restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: false,
        scope: { user: '=?' }, // This is one of the cool things :). Will be explained in post
        templateUrl: "templates/directives/footer.html"
            // controller: 'footerCtrl'
    }
});

app.directive('login', function() {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: "templates/directives/login.html",
        controller: 'loginCtrl'
    }
});

app.controller('loginCtrl', function($scope, $http, $timeout) {
    var ip = '';
    var token = '';
    var user = {};
    var mobileNumber;
    $scope.loginWithGoogle = function() {
        console.log('clicked');
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().signInWithPopup(provider).then(function(result) {
            console.log(result);
            token = result.credential.accessToken;
            user = result.user;
            checkRegistered(result.user);
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            sweetAlert(error.code, error.message, "error");
        });
    }

    function loginLoad() {
        try {
            $.get("http://ipinfo.io", function(response) {
                ip = JSON.stringify(response)
            }, "jsonp")
        } catch (e) {

        }
    };

    loginLoad();

    function replaceSpaces(str) {
        var mystring = str;
        var newchar = ' '
        mystring = mystring.split('.').join(newchar);
        mystring = mystring.replace(/ /g, '')
        return mystring;
    };

    function getReferralCode(fname, lname) {
        var refchar;
        var refnum;
        fname = replaceSpaces(fname);
        var fnameLength = fname.length;
        if (fnameLength > 4) {
            refchar = fname.substring(0, 4);
        } else {
            refchar = fname.substring(0, fnameLength) + lname.substring(0, (4 - fnameLength));
        }
        refnum = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        return refchar.toUpperCase() + refnum;
    };

    function checkRegistered(user) {
        console.log(user);
        db.ref('users/' + user.uid).once('value', function(snapshot) {
            if (snapshot.val()) {
                $('.modal').modal('close');
                swal("Success", "You have successfully logged in", "success");
            } else {
                console.log(user);
                var name = user.displayName.split(" ");
                var userData = {
                    uid: user.uid,
                    email: {
                        emailAddress: user.email,
                        emailVerified: true
                    },
                    createdDate: new Date().getTime(),
                    fname: name[0],
                    mobile: {
                        mobileVerified: false,
                    },
                    photoURL: user.photoURL,
                    google: {
                        active: true,
                        photoURL: user.providerData[0].photoURL,
                        token: token,
                        gid: user.providerData[0].uid
                    }
                }
                if (name[1]) {
                    userData.lname = name[1]
                }

                if (name[1]) {
                    userData.referral = getReferralCode(userData.fname, userData.lname);
                } else {
                    userData.referral = getReferralCode(userData.fname, "NA");
                }

                db.ref('users/' + user.uid).update(userData).then(function() {
                    $('.modal').modal('close');
                    swal({
                            title: "Verify mobile number",
                            text: "Wnter your 10 digit mobile number",
                            type: "input",
                            showCancelButton: true,
                            closeOnConfirm: false,
                            animation: "slide-from-top",
                            inputPlaceholder: "Type here"
                        },
                        function(inputValue) {
                            console.log(inputValue, inputValue.length);
                            if (inputValue === false) {
                                return false;
                            }
                            if (inputValue.length < 10) {
                                swal.showInputError("Invalid mobile number");
                                return false
                            } else if (inputValue.length == 10) {
                                mobileNumber = inputValue;
                                sendOTP(mobileNumber);
                            }
                            // showRegisteredMsg();
                        });
                })
            }
        })
    }

    // function showRegisteredMsg(){
    //     console.log(mobileNumber.length);
    //     if(mobileNumber.length){

    //     }
    // }
    $scope.mobileVerified = false;

    function sendOTP(mobile) {
        $scope.otp = Math.floor(1000 + Math.random() * 9000);
        $http({
            url: 'http://35.154.60.19/api/SendOTP_1.0',
            method: 'GET',
            params: {
                mobile: mobile,
                otp: $scope.otp.toString(),
                email: user.email.emailAddress
            }
        }).then(function(response) {
            if (response.status == 200) {
                swal({
                        title: "Verify mobile",
                        text: "Please enter the OTP",
                        type: "input",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        animation: "slide-from-top",
                        inputPlaceholder: "Type here"
                    },
                    function(inputValue) {
                        console.log(inputValue, inputValue.length);
                        if (inputValue === false) {
                            console.log('executed');
                            return false;
                        }
                        if (inputValue.length < 4) {
                            swal.showInputError("Invalid OTP");
                            return false
                        } else if (inputValue.length == 4) {
                            if(parseInt(inputValue) == parseInt($scope.otp)){
                                var updates = {};
                                updates['mobile/mobileNum'] = mobile;
                                updates['mobile/mobileVerified'] = true;
                                db.ref('users/'+user.uid).update(updates).then(function(){
                                    swal("Welcome", "Mobile Number Verified and login successful", "success");
                                })
                            }
                        }
                    });
            } else {
                swal({
                        title: "OTP not sent",
                        text: "Please try again later",
                        type: "error",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "OK",
                        closeOnConfirm: false
                    },
                    function() {
                        swal("Welcome", "You have successfully logged in", "success");
                    });
            }
        });
    }
})

// $scope.sendOtp = function(mobile) {
//     if (mobile) {
//         mobile = mobile.toString();
//         $scope.userMobileNum = mobile;
//         if (mobile.length == 10) {
//             $scope.step = 2;
//             $scope.loadingMessage = 'Sending OTP...';
//             // $scope.showModalLoading = true;
//             $scope.otp = Math.floor(1000 + Math.random() * 9000);
//             // var data = {
//             //     mobile: mobile,
//             //     otp: otp,
//             //     email: $scope.user.email
//             // }

//             $scope.splitEmail = $scope.user.email.split("@");
//             $http({
//                 url: 'http://35.154.60.19/api/SendOTP_1.0',
//                 method: 'GET',
//                 params: {
//                     mobile: mobile,
//                     otp: $scope.otp.toString(),
//                     email: $scope.user.email
//                 }
//             }).then(function(response) {
//                 // console.log(response);
//                 if (response.status == 200) {
//                     $timeout(function() {
//                         // $scope.showModalLoading = false;
//                         $scope.step = 3;
//                     }, 1000);
//                 } else {
//                     $scope.step = 1;
//                     $scope.numberError = 'OTP not sent, please try again.'
//                 }
//             });
//         } else {
//             $scope.step = 1;
//             $scope.numberError = 'Please enter your 10 digit mobile number';
//         }
//     } else {
//         $scope.step = 1;
//         $scope.numberError = 'Please enter your 10 digit mobile number';
//     }
// }
