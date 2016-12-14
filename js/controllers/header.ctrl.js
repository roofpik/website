app.controller('headerCtrl', function($scope, $mdDialog, $state, $rootScope) {
    $scope.user = false;
    $scope.gotoHome = function() {
        console.log('called');
        $state.go('home');
    }


$rootScope.$watch('loginStatus', function(){
    console.log($rootScope.loginStatus);
     $scope.logStatus = $rootScope.loginStatus;
});
   

    $scope.showLogin = function(ev) {
        $mdDialog.show({
                controller: loginController,
                templateUrl: '/templates/dialogs/auth.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
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


    $scope.showSignUp = function(ev) {
        $mdDialog.show({
                controller: DialogController,
                templateUrl: '/templates/dialogs/auth.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    }

    $scope.takeToProfile = function() {
        $state.go('profile');
    };

    $scope.takeToMyReviews = function() {
        $state.go('user-all-reviews');
    };

});
