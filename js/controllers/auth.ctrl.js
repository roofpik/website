  function loginController($scope, $mdDialog, $rootScope) {

      $scope.user = null;
      var ip;
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

      $scope.logout();

      firebase.auth().fetchProvidersForEmail('tinassood@gmail.com').then(function(providers) {
          console.log(providers);
          //     for (index in providers) {
          //         if (provider == null || provider != 'email')
          //             provider = providers[index];
          //     }
          // for (provider in providers) {
          //     console.log(provider);
          //     console.log(providers[provider]);
          // }
      });

      $scope.createAccount = function() {

          console.log($scope.user);
          firebase.auth().createUserWithEmailAndPassword($scope.user.email, $scope.user.password)
              .then(function(result) {
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


      function changeEmail(str) {
          var mystring = str;
          var newchar = '--';
          var newchar2 = '*';
          mystring = mystring.split('.').join(newchar2);
          mystring = mystring.split('@').join(newchar);
          return mystring;
      }

      $scope.linkAccount = function(email) {
          var provider = null;
          firebase.auth().fetchProvidersForEmail(email).then(function(providers) {
              console.log(providers);
              for (index in providers) {
                  if (provider == null || provider == 'password')
                      provider = providers[index];
              }
              console.log(provider);
              if (provider == 'password') {

                  db.ref('userRegistration/emails/' + changeEmail(email)).once('value').then(function(snapshot) {
                      console.log(snapshot.val());
                      db.ref('users/' + snapshot.val() + '/tempPassword/').once('value').then(function(pass) {
                          console.log(pass.val());
                          if (pass.val() != null) {

                              firebase.auth().signInWithEmailAndPassword(email, pass.val().toString()).then(function(result) {
                                console.log(result);
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
                              });
                          } else {

                          }
                      });
                  });

              } else if (provider == 'google.com') {
                  alert("You have created your account on roofpik using google");
              } else if (provider == 'facebook.com') {
                  alert("You have created your account on roofpik using facebook");
              }
          });



      };

   //   $scope.linkAccount('arpit.hello@gmail.com');

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

      var user = {
          "createdDate": null,
          "email": {
              "emailAddress": null,
              "emailVerified": true
          },
          "mobile": {
              "mobileProvided": false
          },
          "fname": null,
          "lname": null,
          "referral": null,
          "registeredFlag": null,
          "uid": null,
          "welcomeEmailSent": false,
          "profileImage": null,
          "google": {
              "active": false,
              "gid": null,
              "photoURL": null,
              "token": null
          },
          "signupIp": null,
          "facebook": {
              "active": false,
              "fid": null,
              "photoURL": null,
              "token": null
          }
      }
      try {
          $.getJSON('//freegeoip.net/json/?callback=?', function(data) {
              ip = JSON.stringify(data, null, 2);
              console.log(JSON.parse(ip));
          });
      } catch (e) {

      }


      function replaceSpaces(str) {
          var mystring = str;
          var newchar = ' '
          mystring = mystring.split('.').join(newchar);
          mystring = mystring.replace(/ /g, '')
          return mystring;
      }

      function getReferralCode(fname, lname) {
          var refchar;
          var refnum;
          // console.log(fname);
          fname = replaceSpaces(fname);
          var fnameLength = fname.length;
          // console.log(fname);
          if (fnameLength > 4) {
              refchar = fname.substring(0, 4);
          } else {
              refchar = fname.substring(0, fnameLength) + lname.substring(0, (4 - fnameLength));
          }
          refnum = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
          // console.log(refchar + refnum);
          return refchar.toUpperCase() + refnum;
      }

      $scope.googleLogin = function() {
          var provider = new firebase.auth.GoogleAuthProvider();
          provider.addScope('profile');
          provider.addScope('email');
          provider.addScope('https://www.googleapis.com/auth/plus.login');
          firebase.auth().signInWithPopup(provider).then(function(result) {
            db.ref('userRegistration/emails/' + changeEmail(result.user.providerData[0].email)).once('value').then(function(snapshot) {
               console.log(snapshot.val());
              if(snapshot.val()){
                console.log('user exists');
              }
              else{
              user.createdDate = new Date().getTime();
              user.email.emailAddress = result.user.providerData[0].email;
              var uname = result.user.providerData[0].displayName.split(" ");
              user.fname = uname[0];
              user.lname = uname[1];
              user.profileImage = result.user.providerData[0].photoURL;
              user.google.active = true;
              user.google.token = result.credential.accessToken;
              user.google.photoURL = result.user.providerData[0].photoURL;
              user.google.gid = result.user.providerData[0].uid;
              user.uid = result.user.uid;
              user.referral = getReferralCode(user.fname, user.lname);
              user.registeredFlag = true;
              user.signupIp = JSON.parse(ip);
              console.log(user);
              var updates = {};
              updates['userRegistration/emails/' + changeEmail(result.user.providerData[0].email)] = result.user.uid;
              updates['userRegistration/referrals/' + user.referral] = result.user.uid;
              updates['users/' + result.user.uid] = user;
              console.log(updates);
              db.ref().update(updates);
              }
            });
              // This gives you a Google Access Token. You can use it to access the Google API.
              // var token = result.credential.accessToken;
              // console.log(token);
              // The signed-in user info.
              
              //db.ref('users').
              //   var user = result.user;
          }, function(error) {
              // Handle Errors here.

              console.log(error);
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              alert(error.message);
              // firebase.auth().fetchProvidersForEmail(email).then(function(providers) {
              //     alert('You have previously registered your account with ' + provides[0]);
              // });

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
          firebase.auth().signInWithRedirect(provider).then(function(result) {
              // This gives you a Facebook Access Token. You can use it to access the Facebook API.
              var token = result.credential.accessToken;
              // The signed-in user info.
              console.log(token);
              // The signed-in user info.
              console.log(result.user.providerData[0]);
              console.log(result.user);
              var user = result.user;

              user.createdDate = new Date().getTime();
              user.email.emailAddress = result.user.providerData[0].email;
              var uname = result.user.providerData[0].displayName.split(" ");
              user.fname = uname[0];
              user.lname = uname[1];
              user.profileImage = result.user.providerData[0].photoURL;
              user.google.active = true;
              user.google.token = result.credential.accessToken;
              user.google.photoURL = result.user.providerData[0].photoURL;
              user.google.gid = result.user.providerData[0].uid;
              user.uid = result.user.uid;
              user.referral = getReferralCode(user.fname, user.lname);
              user.registeredFlag = true;
              user.ip = ip;
              console.log(user);
              // ...
          }, function(error) {
              // Handle Errors here.


              console.log(error);
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;

              // firebase.auth().fetchProvidersForEmail(email).then(function(providers) {
              //     alert('You have previously registered your account with ' + provides[0]);
              // });
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              console.log(credential);
              if (errorCode == "auth/account-exists-with-different-credential") {
                  linkAccount(email);
              } else {
                  alert(errorMessage);
              }


              // ...
          });
      }
  };
