app.directive('loading', function() {
    return {
        restrict: 'EA', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: false, // This is one of the cool things :). Will be explained in post.
        templateUrl: "templates/directives/loading.html"
    }
});



app.directive('header', function() {
    return {
        restrict: 'EA', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: false, // This is one of the cool things :). Will be explained in post.
        templateUrl: "templates/directives/header.html",
        controller: 'headerCtrl'
    }
});

app.controller('headerCtrl', function($scope, $timeout, $rootScope, $state) {
    $scope.user = {};
    $scope.loginStatus = false;
    $scope.$watch('loginStatus', function() {
        $timeout(function() {
            $scope.loginStatus = $rootScope.loginStatus;
            if ($rootScope.loginStatus) {
                $scope.user = firebase.auth().currentUser;
            } else {
                $scope.user = {};
                $scope.user.photoURL = null;
                $scope.user.displayName = null;
            }
        }, 0);
    });

    $scope.gotoHome = function(){
        $state.go('home');
    }

    $rootScope.$on("loggedIn", function() {
        console.log('called');
        $timeout(function() {
            $scope.user = firebase.auth().currentUser;
            $scope.loginStatus = true;
        }, 0);
    });

    $scope.logout = function() {
        swal({
                title: "Logout!",
                text: "Are You Sure You Want To Logout?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, log me out!",
                closeOnConfirm: true,
            },
            function() {
                firebase.auth().signOut().then(function(response) {
                    $timeout(function() {
                        $rootScope.uid = null;
                        $timeout(function() {
                            $rootScope.loginStatus = false;
                            $scope.user = {};
                            $scope.user.photoURL = null;
                            $scope.user.displayName = null;
                            $scope.loginStatus = false;
                        }, 0);
                        localStorage.setItem('loginStatus', false);
                        sweetAlert("Logout Successful", "You have successfully logged out!", "success");
                    }, 100);

                }, function(error) {
                    var timestamp = new Date().getTime();
                });
            });
    };


    $('.modal').modal();



    $('.button-collapse').sideNav({
        menuWidth: 300, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true // Choose whether you can drag to open on touch screens
    });


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

app.controller('loginCtrl', function($scope, $http, $timeout, $rootScope) {
    var ip = '';
    var token = '';
    var user = {};
    var mobileNumber;
    $scope.loginWithGoogle = function() {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().signInWithPopup(provider).then(function(result) {
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
        db.ref('users/' + user.uid).once('value', function(snapshot) {
            if (snapshot.val()) {
                $('.modal').modal('close');
                var data = firebase.auth().get
                $rootScope.uid = user.uid;
                $rootScope.photoURL = user.photoURL;
                $rootScope.displayName = user.displayName;
                $timeout(function() {
                    $rootScope.loginStatus = true;
                }, 0);
                localStorage.setItem('loginStatus', true);
                localStorage.setItem('uid', JSON.stringify(user.uid));
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
                    },
                    registration: {
                        device: navigator.userAgent.toLowerCase(),
                        platform: 'website',
                        regType: 'online'
                    }
                }
                if (ip) {
                    userData.registration.signupIp = JSON.parse(ip);
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
                    $rootScope.uid = userData.uid;
                    $rootScope.photoURL = userData.photoURL;
                    $rootScope.displayName = user.displayName;
                    $timeout(function() {
                        $rootScope.loginStatus = true;
                    }, 0);
                    localStorage.setItem('loginStatus', true);
                    localStorage.setItem('uid', JSON.stringify(user.uid));
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
                            if (parseInt(inputValue) == parseInt($scope.otp)) {
                                var updates = {};
                                updates['mobile/mobileNum'] = mobile;
                                updates['mobile/mobileVerified'] = true;
                                db.ref('users/' + user.uid).update(updates).then(function() {
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

app.directive('reviewRatings', reviewRatings);

function reviewRatings() {
    return {
        restrict: 'AE',
        replace: true,
        template: '<div class="text-center review_ratings">' +
            '<span ng-style="iconOffColor" ng-click="ratingsClicked(1)" ng-if="rating < 1" ng-class="{\'read_only\':(readOnly)}"><i class="material-icons">star_border</i></span>' +
            '<span ng-style="iconOnColor" ng-click="ratingsUnClicked(1)" ng-if="rating > 0" ng-class="{\'read_only\':(readOnly)}"><i class="material-icons">star</i></span>' +
            '<span ng-style="iconOffColor" ng-click="ratingsClicked(2)" ng-if="rating < 2" ng-class="{\'read_only\':(readOnly)}"><i class="material-icons">star_border</i></span>' +
            '<span ng-style="iconOnColor" ng-click="ratingsUnClicked(2)" ng-if="rating > 1" ng-class="{\'read_only\':(readOnly)}"><i class="material-icons">star</i></span>' +
            '<span ng-style="iconOffColor" ng-click="ratingsClicked(3)" ng-if="rating < 3" ng-class="{\'read_only\':(readOnly)}"><i class="material-icons">star_border</i></span>' +
            '<span ng-style="iconOnColor" ng-click="ratingsUnClicked(3)" ng-if="rating > 2" ng-class="{\'read_only\':(readOnly)}"><i class="material-icons">star</i></span>' +
            '<span ng-style="iconOffColor" ng-click="ratingsClicked(4)" ng-if="rating < 4" ng-class="{\'read_only\':(readOnly)}"><i class="material-icons">star_border</i></span>' +
            '<span ng-style="iconOnColor" ng-click="ratingsUnClicked(4)" ng-if="rating > 3" ng-class="{\'read_only\':(readOnly)}"><i class="material-icons">star</i></span>' +
            '<span ng-style="iconOffColor" ng-click="ratingsClicked(5)" ng-if="rating < 5" ng-class="{\'read_only\':(readOnly)}"><i class="material-icons">star_border</i></span>' +
            '<span ng-style="iconOnColor" ng-click="ratingsUnClicked(5)" ng-if="rating > 4" ng-class="{\'read_only\':(readOnly)}"><i class="material-icons">star</i></span>' +
            '</div>',
        scope: {
            ratingsObj: '=ratingsobj',
            index: '=index'
        },
        link: function(scope, element, attrs) {

            //Setting the default values, if they are not passed
            scope.iconOnColor = scope.ratingsObj.iconOnColor || 'rgb(43, 187, 173)';
            scope.iconOffColor = scope.ratingsObj.iconOffColor || 'rgb(140, 140, 140)';
            scope.rating = scope.ratingsObj.rating || 0;
            scope.minRating = scope.ratingsObj.minRating || 0;
            scope.readOnly = scope.ratingsObj.readOnly || false;
            scope.index = scope.index || 0;

            //Setting the color for the icon, when it is active
            scope.iconOnColor = {
                color: scope.iconOnColor
            };

            //Setting the color for the icon, when it is not active
            scope.iconOffColor = {
                color: scope.iconOffColor
            };

            //Setting the rating
            scope.rating = (scope.rating > scope.minRating) ? scope.rating : scope.minRating;

            //Setting the previously selected rating
            scope.prevRating = 0;

            scope.$watch('ratingsObj.rating', function(newValue, oldValue) {
                setRating(newValue);
            });

            function setRating(val, uiEvent) {
                if (scope.minRating !== 0 && val < scope.minRating) {
                    scope.rating = scope.minRating;
                } else {
                    scope.rating = val;
                }
                scope.prevRating = val;
                if (uiEvent) scope.ratingsObj.callback(scope.rating, scope.index);
            }


            //Called when he user clicks on the rating
            scope.ratingsClicked = function(val) {
                setRating(val, true);
            };

            scope.ratingsUnClicked = function(val) {
                if (scope.minRating !== 0 && val < scope.minRating) {
                    scope.rating = scope.minRating;
                } else {
                    scope.rating = val;
                }
                if (scope.prevRating == val) {
                    if (scope.minRating !== 0) {
                        scope.rating = scope.minRating;
                    } else {
                        scope.rating = 0;
                    }
                }
                scope.prevRating = val;
                scope.ratingsObj.callback(scope.rating, scope.index);
            };
        }
    };
}

function deleteLocalStorage(name) {
    localStorage.removeItem(name);
}

function checkLocalStorage(name) {
    if (localStorage.getItem(name) === null) {
        return false;
    } else {
        return true;
    }
}

function camelCaseToTitleCase(camelCase) {
    if (camelCase == null || camelCase == "") {
        return camelCase;
    }

    camelCase = camelCase.trim();
    var newText = "";
    for (var i = 0; i < camelCase.length; i++) {
        if (/[A-Z]/.test(camelCase[i]) && i != 0 && /[a-z]/.test(camelCase[i - 1])) {
            newText += " ";
        }
        if (i == 0 && /[a-z]/.test(camelCase[i])) {
            newText += camelCase[i].toUpperCase();
        } else {
            newText += camelCase[i];
        }
    }

    return newText;
}
