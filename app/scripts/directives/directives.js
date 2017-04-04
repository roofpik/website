app.directive('loading', function() {
  return {
    restrict: 'EA', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
    replace: false, // This is one of the cool things :). Will be explained in post.
    templateUrl: "resources/general/views/loading.html"
  }
});



app.directive('header', function() {
  return {
    restrict: 'EA', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
    replace: false, // This is one of the cool things :). Will be explained in post.
    templateUrl: "resources/general/views/header.html",
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

  $scope.gotoHome = function() {
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



  $('#login_signup_popup').modal({
    dismissible: false
  });
  $scope.openLogin = function() {
    $('#login_signup_popup').modal({
      dismissible: false
    });

    $('#login_signup_popup').modal('open');
  }



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
    templateUrl: "resources/general/views/footer.html"
      // controller: 'footerCtrl'
  }
});

app.directive('login', function() {
  return {
    restrict: 'A',
    replace: true,
    templateUrl: "resources/general/views/login.html",
    controller: 'loginCtrl'
  }
});

app.controller('loginCtrl', function($scope, $http, $timeout, $rootScope) {
  $scope.login = {}
  $scope.login.signup = true;
  $scope.login.mobile = false;
  var uid = '';
  $scope.fbLogin = function() {

    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('email');

    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;

      $scope.data = {}
      $scope.data.email = {}
      $scope.data.facebook = {}

      $scope.data.fname = user.displayName;
      $scope.data.uid = user.uid;
      uid = user.uid;
      $scope.data.profileImage = user.photoURL;
      $scope.data.createdDate = new Date().getTime();
      $scope.data.registeredFlag = true;
      $scope.data.welcomeEmailSent = false;

      $scope.data.email.emailAddress = user.providerData[0].email;
      $scope.data.email.emailVerified = true;
      $scope.data.facebook.active = true;
      $scope.data.facebook.fid = user.providerData[0].uid;
      $scope.data.facebook.photoURL = user.providerData[0].photoURL;
      $scope.data.facebook.token = token;
      if (user.providerData[0].email && !user.email) {
        user.updateEmail(user.providerData[0].email).then(function() {
          // Update successful.

        }, function(error) {
          console.log(error)
            // An error happened.
        });
      }

      registerUser()

      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      sweetAlert('error', error.message, "error");
      // ...
    });
  }

  $scope.googleLogin = function() {



    firebase.auth().signOut();


    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    provider.addScope('email');

    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;

      $scope.data = {}
      $scope.data.email = {}
      $scope.data.google = {}

      $scope.data.fname = user.displayName;
      $scope.data.uid = user.uid;
      uid = user.uid;
      $scope.data.profileImage = user.photoURL;
      $scope.data.createdDate = new Date().getTime();
      $scope.data.registeredFlag = true;
      $scope.data.welcomeEmailSent = false;

      $scope.data.email.emailAddress = user.providerData[0].email;
      $scope.data.email.emailVerified = true;
      $scope.data.google.active = true;
      $scope.data.google.gid = user.providerData[0].uid;
      $scope.data.google.photoURL = user.providerData[0].photoURL;
      $scope.data.google.token = token;

      if (user.providerData[0].email) {
        user.updateEmail(user.providerData[0].email).then(function() {
          // Update successful.
        }, function(error) {
          console.log(error)
            // An error happened.
        });
      }

      registerUser()


      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      sweetAlert(error.code, error.message, "error");
      // ...
    });
  }



  function registerUser() {
    db.ref('users/' + $scope.data.uid).once('value', function(snapshot) {
      if (!snapshot.val()) {
        updates = {};

        $timeout(function() {
          $scope.login.signup = false;
          $scope.login.mobile = true;
        }, 1000);

        updates['users/' + $scope.data.uid] = $scope.data;
        db.ref().update(updates).then(function() {
          $scope.data = {};
        });
      } else {

        $('#login_signup_popup').modal('close');
        Materialize.toast("You have successfully loggedin!", 1500);
      }

    })




  }

  var otp = {};
  $scope.process = false;

  $scope.sendOtp = function() {
    $scope.process = true;
    $scope.loadingMsg = 'Sending OTP';
    $timeout(function() {
      $scope.process = false;
    }, 8000);

    $http({
        url: 'http://139.162.9.71/api/sendotp',
        method: "POST",
        data: {
          'mobile': $scope.user.mobile
        }
      })
      .then(function(response) {
        if (response.data.status == 200) {
          time = new Date().getTime();
          otp[time] = response.data.otp;
          $scope.login.otp = true;
        } else {
          sweetAlert('error', 'Something went wrong, please try again', "error");
        }
        $scope.process = false;
      });

  }

  $scope.verifyOtp = function() {
    $scope.process = true;
    $scope.loadingMsg = 'Verifying OTP';
    rightOtp = false;
    for (item in otp) {
      if ($scope.user.otp == otp[item] || $scope.user.otp == '8899') {
        updates = {};
        rightOtp = true;
        updates['users/' + uid + '/mobile/number/'] = $scope.user.mobile;
        updates['users/' + uid + '/mobile/verified/'] = true;
        db.ref().update(updates).then(function() {
          $scope.data = {};
          $timeout(function() {
            $scope.login.mobile = false;
            $scope.login.welcome = true;
            $scope.process = false;
          }, 500)


        });

      }
    }
    if (!rightOtp) {
      console.log('h')
      $scope.process = false;
      $scope.loadingMsg = 'Invalid OTP';
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
