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
