  angular
    .module('roofpikWeb')
    .factory('Auth', authService);

  authService.$inject = ['$firebaseAuth', '$http', '$rootScope'];

  function authService($firebaseAuth,$http,$rootScope) {
    var firebaseAuthObject = $firebaseAuth();

    var service = {
      firebaseAuthObject: firebaseAuthObject,
      register: register,
      login: login,
      logout: logout,
      isLoggedIn: isLoggedIn,
      signInWithPopup: signInWithPopup,
      sendWelcomeEmail: sendWelcomeEmail,
      sendOtp: sendOtp
    };

    return service;

    ////////////

    function signInWithPopup(provider) {
      return firebaseAuthObject.$signInWithPopup(provider);
    }

    function register(user) {
      return firebaseAuthObject.$createUserWithEmailAndPassword(user.email, user.password);
    }

    function login(user) {
      return firebaseAuthObject.$signInWithEmailAndPassword(user.email, user.password);
    }

    function logout() {
      // partyService.reset();
      firebaseAuthObject.$signOut();
    }

    function isLoggedIn() {
      return firebaseAuthObject.$getAuth();
    }

    function sendWelcomeEmail(emailAddress) {
      // firebaseDataService.emails.push({
      //   emailAddress: emailAddress
      // });
    }

    function sendOtp(data) {

      return $http({
        method: 'POST',
        crossDomain: true,
        dataType: "JSONP",
        url: $rootScope.domain + '/api/sendotp',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: $.param(data)

      });

    }

  };
