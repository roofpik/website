app.controller('headerCtrl', function($scope, $mdDialog, $state, $rootScope, $timeout, UserTokenService) {
    $scope.user = false;
    $scope.gotoHome = function() {
        console.log('called');
        $state.go('home');
    }


    $rootScope.$watch('loginStatus', function(){
        console.log($rootScope.loginStatus);
         $scope.loginStatus = $rootScope.loginStatus;
    });

    $rootScope.$on("callShowLogin", function(){
        console.log('called');
        $timeout(function(){
            $scope.showLogin();
        },0);
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
        var timestamp = new Date().getTime();
        UserTokenService.checkToken($rootScope.uid, timestamp, 5);
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            $timeout(function(){
                $scope.loginStatus = false;
                $rootScope.loginStatus = false;
                deleteLocalStorage('loginStatus');
            },100);

        }, function(error) {
            // An error happened.
            var timestamp = new Date().getTime();
            UserTokenService.checkToken($rootScope.uid, timestamp, 4);
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
