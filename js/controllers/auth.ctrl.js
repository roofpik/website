  function loginController($scope, $mdDialog, $rootScope, UserTokenService, $location) {

      // Log File Entry
      var timestamp = new Date().getTime();
      var urlInfo = { url: $location.path() };
      var ip;
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
          UserTokenService.checkToken(urlInfo, timestamp, 1);
          try {

              $.get("http://ipinfo.io", function(response) {
                  ip = JSON.stringify(response)
              }, "jsonp")
          } catch (e) {

          }
      };

      loginLoad();

      $scope.cancel = function() {
          $mdDialog.cancel();
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
                  sweetAlert("Alert", error.message, "error");
              }
          });
      };

      $scope.facebookLogin = function() {
          loading(true, 20000);
          var provider = new firebase.auth.FacebookAuthProvider();
          provider.addScope('email');
          firebase.auth().signInWithPopup(provider).then(function(result) {
              db.ref('users/' + result.user.uid + '/registeredFlag').once('value').then(function(snapshot) {
                  if (snapshot.val() == null) {
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
                                          sweetAlert("Alert", error.message, "error");
                                      });
                                  } else {
                                      var provider = new firebase.auth.FacebookAuthProvider();
                                      provider.addScope('email');
                                      firebase.auth().currentUser.linkWithPopup(provider).then(function(result) {
                                          updateUser(result, 'facebook', 'link');
                                      }).catch(function(error) {
                                          loading(false, 0);
                                          sweetAlert("Alert", error.message, "error");
                                      });
                                  }
                              });
                          } else {
                              loading(false, 0);
                              sweetAlert("Alert", "Something went wrong please send an email to contact@roofpik.com!", "error");
                          }
                      });
                  });
              } else if (provider == 'google.com') {
                  loading(false, 0);
                  sweetAlert("Alert", "You have created your account on roofpik using google!", "error");
              } else if (provider == 'facebook.com') {
                  loading(false, 0);
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
          user.registration.signupIp = JSON.parse(ip);
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
          UserTokenService.checkToken($rootScope.uid, timestamp, 4);
          $rootScope.loginStatus = true;
          localStorage.setItem('loginStatus', true);
          $mdDialog.hide();
          loading(false, 0);
          sweetAlert("Welcome", "You have successfully logged in!", "success");
      }
      loading(false, 0);
  };
