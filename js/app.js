var app = angular.module('roofpik', ['ngMaterial', 'ui.router']);

app.run(function($rootScope, $mdDialog, $timeout, UserTokenService) {
    $rootScope.loginStatus = false;
    $rootScope.uid = null;
    $rootScope.localStorageCount = 0;
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    
    firebase.auth().onAuthStateChanged(function(user) {
        if (user && $rootScope.uid == null) {
            $rootScope.uid = user.uid;
            var timestamp = new Date().getTime();
            UserTokenService.checkToken($rootScope.uid, timestamp, 4);
            $rootScope.loginStatus = true;
            localStorage.setItem('loginStatus', true);
        }
    });

    db.ref('dataVersions').once('value', function(response) {
        $scope.dataVersions = response.val();
    }).then(function() {
        $timeout(function() {
            if (checkLocalStorage('projectList')) {
                var projectListVersion = (getLocalStorage('projectList')).version;
                if (projectListVersion != $scope.dataVersions.projectList) {
                    getProjectList($scope.dataVersions.projectList);
                }
                else{
                    $rootScope.localStorageCount = $rootScope.localStorageCount + 1;
                }
            } else {
                getProjectList($scope.dataVersions.projectList);
            }

            if (checkLocalStorage('searchList')) {
                var searchListVersion = (getLocalStorage('searchList')).version;
                if (searchListVersion != $scope.dataVersions.searchList) {
                    getSearchList($scope.dataVersions.searchList);
                }
                else{
                    $rootScope.localStorageCount = $rootScope.localStorageCount + 1;
                }
            } else {
                getSearchList($scope.dataVersions.searchList);
            }
        }, 100);
    });


    function getProjectList(version) {
        db.ref('projectList/' + $scope.cityId + '/residential').once('value', function(snapshot) {
            for (key in snapshot.val()) {
                $scope.projectList.push(snapshot.val()[key]);
            }
            setLocalStorage($scope.projectList, 'projectList', version);
            $rootScope.localStorageCount = $rootScope.localStorageCount + 1;
        });
    };

    function getSearchList(version) {
        db.ref('search').once('value', function(snapshot) {
            for (key in snapshot.val()) {
                $scope.searchList.push(snapshot.val()[key]);
            }
            setLocalStorage($scope.searchList, 'searchList', version);
            $rootScope.localStorageCount = $rootScope.localStorageCount + 1;

        })
    };
});

function loading(status, timer) {
    if (!timer) {
        timer = 10000;
    }
    if (status) {
        console.log(timer);
        $('.loader-modal').fadeIn();
        setTimeout(function() {
            $('.loader-modal').fadeOut();
        }, timer);
    } else {
        $('.loader-modal').fadeOut();
    }
}
