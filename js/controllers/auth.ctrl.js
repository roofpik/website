  function loginController($scope, $mdDialog, $rootScope) {

      $scope.user = null;

      $scope.hide = function() {
          $mdDialog.hide();
      };

      $scope.cancel = function() {
          $mdDialog.cancel();
      };

      $scope.answer = function(answer) {
          $mdDialog.hide(answer);
      };

      $scope.logout = function() {
          console.log('sign out');
          firebase.auth().signOut().then(function() {
              // Sign-out successful.
              $rootScope.loginStatus = false;

          }, function(error) {
              // An error happened.
          });

      };

        firebase.auth().fetchProvidersForEmail('arpit1.hello@gmail.com').then(function(providers) {
          console.log(providers);
        });

      $scope.createAccount = function() {

          console.log($scope.user);
          firebase.auth().createUserWithEmailAndPassword($scope.user.email, $scope.user.password)
          .then(function(result){
            console.log(result);
          })
          .catch(function(error) {
              // Handle Errors here.
              console.log(error);
              var errorCode = error.code;
              var errorMessage = error.message;
              // ...
          });

      }

      $scope.linkAccount = function() {
          console.log('google link with facebook');
          var provider = new firebase.auth.GoogleAuthProvider();
          provider.addScope('email');
          firebase.auth().currentUser.linkWithRedirect(provider).then(function(result) {
              // Accounts successfully linked.
              var credential = result.credential;
              var user = result.user;
              // ...
          }).catch(function(error) {
            console.log(error);
              // Handle Errors here.
              // ...
          });
      };



      firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
              console.log(user);
              // User is signed in.
          } else {
              console.log('No user is signed in');
              // No user is signed in.
          }
      });

      var user1 = firebase.auth().currentUser;

      if (user1) {
          // User is signed in.
          console.log(user1);
      } else {
          console.log('no current user');
          // No user is signed in.
      }

      $scope.googleLogin = function() {
          var provider = new firebase.auth.GoogleAuthProvider();
          provider.addScope('profile');
          provider.addScope('email');
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
          }, function(error) {
              // Handle Errors here.
              console.log(error);
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

          provider.addScope('email');
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
          }, function(error) {
              // Handle Errors here.
              console.log(error);
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
