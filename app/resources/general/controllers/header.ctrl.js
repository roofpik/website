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
