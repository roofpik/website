  function loginController($scope, $mdDialog, $rootScope, UserTokenService, $location) {

      // Log File Entry
      var timestamp = new Date().getTime();

      var urlInfo = {
          url: $location.path()
      }

      UserTokenService.checkToken(urlInfo, timestamp, 1);

      $scope.user = null;
      var ip;
      // $scope.hide = function() {
      //     $mdDialog.hide();
      // };

      $scope.cancel = function() {
          $mdDialog.cancel();
      };

      // $scope.answer = function(answer) {
      //     $mdDialog.hide(answer);
      // };

      // firebase.auth().signInWithEmailAndPassword('arpit@roofpik.com', '123456').then(function(result) {
      //     console.log(result);
      // }).catch(function(error) {
      //     // Handle Errors here.
      //     var errorCode = error.code;
      //     var errorMessage = error.message;
      //     console.log(error);
      //     // ...
      // });

      // $scope.logout = function() {
      //     console.log('sign out');
      //     firebase.auth().signOut().then(function() {
      //         // Sign-out successful.
      //         $rootScope.loginStatus = false;

      //     }, function(error) {
      //         // An error happened.
      //     });

      // };

      // $scope.logout();

      // db.ref('users').orderByKey().startAt('8sbLBHdolnene5heupJdAEVdWM42').limitToFirst(2).once('value').then(function(snapshot){
      //   console.log(snapshot.val());

      // })

      // firebase.auth().fetchProvidersForEmail('tinassood@gmail.com').then(function(providers) {
      //     console.log(providers);
      //     //     for (index in providers) {
      //     //         if (provider == null || provider != 'email')
      //     //             provider = providers[index];
      //     //     }
      //     // for (provider in providers) {
      //     //     console.log(provider);
      //     //     console.log(providers[provider]);
      //     // }
      // });

      // $scope.createAccount = function() {

      //     // console.log($scope.user);
      //     firebase.auth().createUserWithEmailAndPassword('arpit@roofpik.com', '123456')
      //         .then(function(result) {
      //             console.log(result);
      //         })
      //         .catch(function(error) {
      //             // Handle Errors here.
      //             console.log(error);
      //             var errorCode = error.code;
      //             var errorMessage = error.message;
      //             // ...
      //         });

      // }

      // $scope.createAccount();


      function changeEmail(str) {
          var mystring = str;
          var newchar = '--';
          var newchar2 = '*';
          mystring = mystring.split('.').join(newchar2);
          mystring = mystring.split('@').join(newchar);
          return mystring;
      }

      $scope.linkAccount = function(email, newLoginProvider) {
          var provider = null;
          firebase.auth().fetchProvidersForEmail(email).then(function(providers) {
              for (index in providers) {
                  if (provider == null || provider == 'password')
                      provider = providers[index];
              }

              if (provider == 'password') {

                  db.ref('userRegistration/emails/' + changeEmail(email)).once('value').then(function(snapshot) {
                    console.log(snapshot.val());
                      db.ref('users/' + snapshot.val() + '/tempPassword/').once('value').then(function(pass) {
                          if (pass.val() != null) {
                              firebase.auth().signInWithEmailAndPassword(email, pass.val().toString()).then(function(result) {
                                  console.log(result);
                                  console.log(newLoginProvider);
                                  if (newLoginProvider == 'google') {
                                      var provider = new firebase.auth.GoogleAuthProvider();
                                      provider.addScope('profile');
                                      provider.addScope('email');
                                      provider.addScope('https://www.googleapis.com/auth/plus.login');
                                      firebase.auth().currentUser.linkWithPopup(provider).then(function(result) {
                                          // Accounts successfully linked.
                                          var credential = result.credential;
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
                                          user.registeredFlag = true;
                                          user.signupIp = JSON.parse(ip);
                                          var updates = {};
                                          updates['users/' + result.user.uid] = user;
                                          db.ref().update(updates);
                                          var user = firebase.auth().currentUser;
                                          user.updateProfile({
                                              displayName: result.user.providerData[0].displayName,
                                              photoURL: user.profileImage
                                          })
                                      }).catch(function(error) {
                                          // Handle Errors here.
                                          // ...
                                      });
                                  } else {
                                      console.log('reached');
                                      var provider = new firebase.auth.FacebookAuthProvider();
                                      provider.addScope('email');
                                      firebase.auth().currentUser.linkWithPopup(provider).then(function(result) {
                                          // Accounts successfully linked.
                                          console.log(result);
                                          var credential = result.credential;
                                          user.createdDate = new Date().getTime();
                                          user.email.emailAddress = result.user.providerData[0].email;
                                          var uname = result.user.providerData[0].displayName.split(" ");
                                          user.fname = uname[0];
                                          user.lname = uname[1];
                                          user.profileImage = result.user.providerData[0].photoURL;
                                          user.facebook.active = true;
                                          user.facebook.token = result.credential.accessToken;
                                          user.facebook.photoURL = result.user.providerData[0].photoURL;
                                          user.facebook.gid = result.user.providerData[0].uid;
                                          user.uid = result.user.uid;
                                          user.referral = getReferralCode(user.fname, user.lname);
                                          user.registeredFlag = true;
                                          user.signupIp = JSON.parse(ip);
                                          var updates = {};
                                          updates['users/' + result.user.uid] = user;
                                          db.ref().update(updates);
                                      }).catch(function(error) {
                                        console.log(error);
                                          // Handle Errors here.
                                          // ...
                                      });
                                  }
                              });

                          } else {
                              alert("Something went wrong please send an email to contact@roofpik.com");
                          }
                      });
                  });

              } else if (provider == 'google.com') {
                  sweetAlert("Alert", "You have created your account on roofpik using google!", "error");
              } else if (provider == 'facebook.com') {
                  sweetAlert("Alert", "You have created your account on roofpik using facebook!", "error");

              }
          });



      };

      //   $scope.linkAccount('arpit.hello@gmail.com');


      // var user1 = firebase.auth().currentUser;

      // if (user1) {
      //     // User is signed in.
      //     console.log(user1);
      // } else {
      //     console.log('no current user');
      //     // No user is signed in.
      // }

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
              $rootScope.loginSuccess = true;
              db.ref('userRegistration/emails/' + changeEmail(result.user.providerData[0].email)).once('value').then(function(snapshot) {
                  console.log(snapshot.val());
                  if (snapshot.val()) {
                      // Do nothing
                  } else {
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
                      var updates = {};
                      updates['userRegistration/emails/' + changeEmail(result.user.providerData[0].email)] = result.user.uid;
                      updates['userRegistration/referrals/' + user.referral] = result.user.uid;
                      updates['users/' + result.user.uid] = user;
                      db.ref().update(updates);

                  }
              });

              $rootScope.loginSuccess = true;

          }, function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              sweetAlert("Alert", error.message, "error");

              var credential = error.credential;
              if (errorCode == "auth/account-exists-with-different-credential") {
                  $scope.linkAccount(error.email, 'google');
              }
          });
      }


      $scope.facebookLogin = function() {
          var provider = new firebase.auth.FacebookAuthProvider();
          provider.addScope('email');
          firebase.auth().signInWithPopup(provider).then(function(result) {
              $rootScope.loginSuccess = true;
              db.ref('userRegistration/emails/' + changeEmail(result.user.providerData[0].email)).once('value').then(function(snapshot) {
                  if (snapshot.val()) {
                      // Do nothing
                  } else {
                      user.createdDate = new Date().getTime();
                      user.email.emailAddress = result.user.providerData[0].email;
                      var uname = result.user.providerData[0].displayName.split(" ");
                      user.fname = uname[0];
                      user.lname = uname[1];
                      user.profileImage = result.user.providerData[0].photoURL;
                      user.facebook.active = true;
                      user.facebook.token = result.credential.accessToken;
                      user.facebook.photoURL = result.user.providerData[0].photoURL;
                      user.facebook.gid = result.user.providerData[0].uid;
                      user.uid = result.user.uid;
                      user.referral = getReferralCode(user.fname, user.lname);
                      user.registeredFlag = true;
                      user.signupIp = JSON.parse(ip);
                      var updates = {};
                      updates['userRegistration/emails/' + changeEmail(result.user.providerData[0].email)] = result.user.uid;
                      updates['userRegistration/referrals/' + user.referral] = result.user.uid;
                      updates['users/' + result.user.uid] = user;
                      db.ref().update(updates);
                  }

              });
              // ...
          }, function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              if (errorCode == "auth/account-exists-with-different-credential") {
                  $scope.linkAccount(error.email, 'facebook');
              } else {
                  alert(errorMessage);
              }
          });
      };
      loading(false);
  };
