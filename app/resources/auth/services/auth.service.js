  angular
    .module('roofpikWeb')
    .factory('Auth', authService);

  authService.$inject = ['$firebaseAuth'];

  function authService($firebaseAuth) {
    var firebaseAuthObject = $firebaseAuth();

    var service = {
      firebaseAuthObject: firebaseAuthObject,
      register: register,
      login: login,
      logout: logout,
      isLoggedIn: isLoggedIn,
      signInWithPopup: signInWithPopup,
      sendWelcomeEmail: sendWelcomeEmail
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

  };
