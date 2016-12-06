  function DialogController($scope, $mdDialog) {
      $scope.hide = function() {
          $mdDialog.hide();
      };

      $scope.cancel = function() {
          $mdDialog.cancel();
      };

      $scope.answer = function(answer) {
          $mdDialog.hide(answer);
      };

      $scope.login = function() {
          console.log('login');
      };

      $scope.signUp = function() {
          console.log('signup');
      }

      $scope.googleLogin = function() {
          var provider = new firebase.auth.GoogleAuthProvider();
          provider.addScope('profile');
          provider.addScope('https://www.googleapis.com/auth/plus.login');
          firebase.auth().signInWithPopup(provider).then(function(result) {
              // This gives you a Google Access Token. You can use it to access the Google API.
              var token = result.credential.accessToken;
              console.log(token);
              // The signed-in user info.
              console.log(result.user.providerData[0]);
              console.log(result.user);
              var user = result.user;

              // ...
          }).catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
          });
      }


      $scope.facebookLogin = function() {
          var provider = new firebase.auth.FacebookAuthProvider();
          // provider.setCustomParameters({
          //     'display': 'popup'
          // });


          firebase.auth().signInWithPopup(provider).then(function(result) {
              // This gives you a Facebook Access Token. You can use it to access the Facebook API.
              var token = result.credential.accessToken;
              // The signed-in user info.
              console.log(token);
              // The signed-in user info.
              console.log(result.user.providerData[0]);
              console.log(result.user);
              var user = result.user;
              // ...
          }).catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
          });
      }
  };
