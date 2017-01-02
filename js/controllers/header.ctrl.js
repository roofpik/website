app.controller('headerCtrl', function($scope, $mdDialog, $state, $rootScope, $timeout, UserTokenService) {
    $scope.user = {};
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    $scope.gotoHome = function() {
        $state.go('home');
    }

    $rootScope.$watch('loginStatus', function() {
        $scope.loginStatus = $rootScope.loginStatus;

        if($rootScope.loginStatus){
            $scope.user.photo = $rootScope.photoURL;
            $scope.user.name = $rootScope.displayName;
        }
        else{
            $scope.user.photo = null;
            $scope.user.name = null;
        }
    });

    $rootScope.$on("callShowLogin", function() {
        $timeout(function() {
            $scope.showLogin();
        }, 0);
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

        var timestamp = new Date().getTime();
        UserTokenService.checkToken($rootScope.uid, timestamp, 5);
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            $timeout(function() {
                $rootScope.uid = null;
                $rootScope.loginStatus = false;
                localStorage.setItem('loginStatus', false);
                $mdDialog.hide();
                sweetAlert("Logout Successful", "You have successfully logged out!", "success");
            }, 100);

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

});
