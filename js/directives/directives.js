app.directive('contentLoading', function() {
    return {
        restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        template: '<div class="loader-modal"><div class="loader-cont">' +
            '<div class="loader"></div></div></div>'
    }
});

app.directive('gallery', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/projects/gallery.html',
        controller: 'galleryCtrl',
        scope: {
            galleryResponse: '='
        }
    }
});
app.directive('gallerynew', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/details1/gallery.html',
        controller: 'galleryCtrl',
        scope: {
            galleryResponse: '='
        }
    }
});

app.directive('searchall', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/directives/search.html',
        controller: 'searchCtrl'
        
    }
});

app.directive('header', function() {
    return {
        restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: false,
        scope: { user: '=' }, // This is one of the cool things :). Will be explained in post.
        templateUrl: "templates/directives/header.html",
        controller: 'headerCtrl'
    }
});

app.directive('footer', function() {
    return {
        restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: false,
        scope: { user: '=?' }, // This is one of the cool things :). Will be explained in post
        templateUrl: "templates/directives/footer.html",
        controller: 'headerCtrl'
    }
});

app.directive('maphome', function() {
    return {
        restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        scope: { user: '=' }, // This is one of the cool things :). Will be explained in post.
        templateUrl: "templates/directives/map.html",
        controller: 'mapCtrl'
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

app.controller('loginCtrl', function($scope, $timeout, $rootScope, $location, $http) {
    console.log('called');
    var timestamp = new Date().getTime();
    var urlInfo = { url: $location.path() };
    var ip = '';
    var newUser = false;
    var user = {
        "createdDate": new Date().getTime(),
        "email": {
            "emailAddress": null,
            "emailVerified": true
        },
        "fname": null,
        "lname": null,
        "referral": null,
        "registeredFlag": true,
        "uid": null,
        "welcomeEmailSent": false,
        "profileImage": null,
        "google": {
            "active": false,
            "gid": null,
            "photoURL": null,
            "token": null
        },
        "facebook": {
            "active": false,
            "fid": null,
            "photoURL": null,
            "token": null
        },
        'registration': {
            'regDate': new Date().getTime(),
            'device': null,
            'platform': null,
            'regType': null,
            "signupIp": null
        }
    };

    function loginLoad() {
        // UserTokenService.checkToken(urlInfo, timestamp, 1);
        try {

            $.get("http://ipinfo.io", function(response) {
                ip = JSON.stringify(response)
            }, "jsonp")
        } catch (e) {

        }
    };

    loginLoad();
    $scope.facebookLogin = function() {
        loading(true, 20000);
        var provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('email');
        firebase.auth().signInWithPopup(provider).then(function(result) {
            db.ref('users/' + result.user.uid + '/registeredFlag').once('value').then(function(snapshot) {
                if (snapshot.val() == null) {
                    newUser = true;
                    updateUser(result, 'facebook', 'new');
                } else if (snapshot.val() == false) {
                    updateUser(result, 'facebook', 'link');
                } else if (snapshot.val() == true) {
                    loginSuccess(result.user);
                }
            });
        }, function(error) {
            if (error.code == "auth/account-exists-with-different-credential") {
                $scope.linkAccount(error.email, 'facebook');
            } else {
                loading(false, 0);
                $('.modal').modal('close');
                sweetAlert("Alert", error.message, "error");
            }
        });
    };

    $scope.googleLogin = function() {
        loading(true, 20000);
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().signInWithPopup(provider).then(function(result) {
            db.ref('users/' + result.user.uid + '/registeredFlag').once('value').then(function(snapshot) {
                if (snapshot.val() == null) {
                    newUser = true;
                    updateUser(result, 'google', 'new');
                } else if (snapshot.val() == false) {
                    updateUser(result, 'google', 'link');
                } else if (snapshot.val() == true) {
                    loginSuccess(result.user);
                }
            });
        }, function(error) {
            if (error.code == "auth/account-exists-with-different-credential") {
                $scope.linkAccount(error.email, 'google');
            } else {
                loading(false, 0);
                $('.modal').modal('close');
                sweetAlert("Alert", error.message, "error");
            }
        });
    };

    $scope.linkAccount = function(email, newLoginProvider) {
        var provider = null;
        firebase.auth().fetchProvidersForEmail(email).then(function(providers) {
            for (index in providers) {
                if (provider == null || provider == 'password')
                    provider = providers[index];
            }
            if (provider == 'password') {
                db.ref('userRegistration/emails/' + changeEmail(email)).once('value').then(function(snapshot) {
                    db.ref('users/' + snapshot.val() + '/tempPassword/').once('value').then(function(pass) {
                        if (pass.val() != null) {
                            firebase.auth().signInWithEmailAndPassword(email, pass.val().toString()).then(function(result) {
                                if (newLoginProvider == 'google') {
                                    var provider = new firebase.auth.GoogleAuthProvider();
                                    provider.addScope('profile');
                                    provider.addScope('email');
                                    provider.addScope('https://www.googleapis.com/auth/plus.login');
                                    firebase.auth().currentUser.linkWithPopup(provider).then(function(result) {
                                        updateUser(result, 'google', 'link');
                                    }).catch(function(error) {
                                        loading(false, 0);
                                        $('.modal').modal('close');
                                        sweetAlert("Alert", error.message, "error");
                                    });
                                } else {
                                    var provider = new firebase.auth.FacebookAuthProvider();
                                    provider.addScope('email');
                                    firebase.auth().currentUser.linkWithPopup(provider).then(function(result) {
                                        updateUser(result, 'facebook', 'link');
                                    }).catch(function(error) {
                                        loading(false, 0);
                                        $('.modal').modal('close');
                                        sweetAlert("Alert", error.message, "error");
                                    });
                                }
                            });
                        } else {
                            loading(false, 0);
                            $('.modal').modal('close');
                            sweetAlert("Alert", "Something went wrong please send an email to contact@roofpik.com!", "error");
                        }
                    });
                });
            } else if (provider == 'google.com') {
                loading(false, 0);
                $('.modal').modal('close');
                sweetAlert("Alert", "You have created your account on roofpik using google!", "error");
            } else if (provider == 'facebook.com') {
                loading(false, 0);
                $('.modal').modal('close');
                sweetAlert("Alert", "You have created your account on roofpik using facebook!", "error");
            }
        });
    };

    function updateUser(result, source, regType) {
        user.createdDate = new Date().getTime();
        user.email.emailAddress = result.user.providerData[0].email;
        user.fname = result.user.providerData[0].displayName.split(" ")[0];
        user.lname = result.user.providerData[0].displayName.split(" ")[1];
        user.profileImage = result.user.providerData[0].photoURL;
        user.uid = result.user.uid;
        user.referral = getReferralCode(user.fname, user.lname);
        user.registration.device = navigator.userAgent.toLowerCase();
        user.registration.platform = 'website';
        user.registration.regType = 'online';
        if (ip) {
            user.registration.signupIp = JSON.parse(ip);
        }
        if (source == 'google') {
            user.google.active = true;
            user.google.token = result.credential.accessToken;
            user.google.photoURL = result.user.providerData[0].photoURL;
            user.google.gid = result.user.providerData[0].uid;
        } else {
            user.facebook.active = true;
            user.facebook.token = result.credential.accessToken;
            user.facebook.photoURL = result.user.providerData[0].photoURL;
            user.facebook.fid = result.user.providerData[0].uid;
        }
        createUser(regType, source);
    };

    function createUser(regType, source) {
        var updates = {};
        if (regType == 'new') {
            updates['userRegistration/emails/' + changeEmail(user.email.emailAddress)] = user.uid;
            updates['userRegistration/referrals/' + user.referral] = user.uid;
            updates['users/' + user.uid] = user;
        } else {
            updates['users/' + user.uid + '/fname/'] = user.fname;
            updates['users/' + user.uid + '/lname/'] = user.lname;
            updates['users/' + user.uid + '/email/emailAddress/'] = user.email.emailAddress;
            updates['users/' + user.uid + '/registeredFlag/'] = true;
            updates['users/' + user.uid + '/offlineReg/'] = true;
            updates['users/' + user.uid + '/profileImage/'] = user.profileImage;
            updates['users/' + user.uid + '/registration/device/'] = user.registration.device;
            updates['users/' + user.uid + '/registration/platform/'] = user.registration.platform;
            updates['users/' + user.uid + '/registration/regType/'] = user.registration.regType;
            updates['users/' + user.uid + '/registration/signupIp/'] = user.registration.signupIp;
            if (source == 'google') {
                updates['users/' + user.uid + '/google/active/'] = user.google.active;
                updates['users/' + user.uid + '/google/token/'] = user.google.token;
                updates['users/' + user.uid + '/google/photoURL/'] = user.google.photoURL;
                updates['users/' + user.uid + '/google/gid/'] = user.google.gid;
            } else {
                updates['users/' + user.uid + '/facebook/active/'] = user.facebook.active;
                updates['users/' + user.uid + '/facebook/token/'] = user.facebook.token;
                updates['users/' + user.uid + '/facebook/photoURL/'] = user.facebook.photoURL;
                updates['users/' + user.uid + '/facebook/fid/'] = user.facebook.fid;
            }
        }
        var currentUser = firebase.auth().currentUser;
        currentUser.updateProfile({
            displayName: user.fname + " " + user.lname,
            photoURL: user.profileImage
        });
        db.ref().update(updates).then(function(result) {
            loginSuccess(user);
        });
    };

    function changeEmail(str) {
        var mystring = str;
        var newchar = '--';
        var newchar2 = '*';
        mystring = mystring.split('.').join(newchar2);
        mystring = mystring.split('@').join(newchar);
        return mystring;
    };

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

    function loginSuccess(loginUser) {
        $rootScope.uid = loginUser.uid;
        var timestamp = new Date().getTime();
        // UserTokenService.checkToken($rootScope.uid, timestamp, 4);
        $rootScope.photoURL = user.photoURL;
        $rootScope.displayName = user.displayName;
        $timeout(function() {
            $rootScope.loginStatus = true;
        }, 0);
        localStorage.setItem('loginStatus', true);
        $('.modal').modal('close');
        loading(false, 0);
        if (newUser) {
            var userDetails = firebase.auth().currentUser;
            var email = encodeURIComponent(userDetails.email);
            var name = encodeURIComponent(userDetails.displayName);
            var config = 1;
            var parameter = btoa('email=' + email + '&name=' + name + '&config=' + config);
            console.log(parameter);
            $http({
                url: 'http://107.23.243.89/api/SendMail_1.0',
                method: 'GET',
                params: {
                    args: parameter
                }
            }).then(function(response) {
                console.log(response);
                swal({
                        title: "Signup Successful",
                        text: "Have a code ?",
                        type: "input",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        animation: "slide-from-top",
                        inputPlaceholder: "Enter Code"
                    },
                    function(inputValue) {
                        if (inputValue.length) {
                            db.ref('users/' + user.uid + '/codeUsed').set(inputValue.toUpperCase()).then(function() {
                                $timeout(function() {
                                    sweetAlert("Welcome", "You have successfully logged in!", "success");
                                })
                            });
                        } else {
                            sweetAlert("Welcome", "You have successfully logged in!", "success");
                            return true;
                        }
                    });
            });
        } else {
            sweetAlert("Welcome", "You have successfully logged in!", "success");
        }
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
            scope.iconOnColor = scope.ratingsObj.iconOnColor || 'rgb(45, 182, 214)';
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
