var app = angular.module('roofpik', ['ngMaterial', 'ui.router']);

app.run(function($rootScope, $mdDialog, $timeout, UserTokenService) {
    $rootScope.loginStatus = false;
    $rootScope.uid = null;
    $rootScope.localStorageCount = 0;
    cityId = '-KYJONgh0P98xoyPPYm9';
    var searchList = [];
    var projectList = [];

    firebase.auth().onAuthStateChanged(function(user) {
        if (user && $rootScope.uid == null) {
            $rootScope.uid = user.uid;
            var timestamp = new Date().getTime();
            UserTokenService.checkToken($rootScope.uid, timestamp, 4);
            $rootScope.loginStatus = true;
            localStorage.setItem('loginStatus', true);
            $mdDialog.hide();
            // User is signed in.
        } else {
            $rootScope.uid = null;
            $rootScope.loginStatus = false;
            localStorage.setItem('loginStatus', false);
            // No user is signed in.
        }
    });

    db.ref('dataVersions').once('value', function(response) {
        dataVersions = response.val();
    }).then(function() {
        $timeout(function() {
            if (checkLocalStorage('projectList')) {
                var projectListVersion = (getLocalStorage('projectList')).version;
                if (projectListVersion != dataVersions.projectList) {
                    getProjectList(dataVersions.projectList);
                } else {
                    $rootScope.localStorageCount = $rootScope.localStorageCount + 1;
                }
            } else {
                getProjectList(dataVersions.projectList);
            }

            if (checkLocalStorage('searchList')) {
                var searchListVersion = (getLocalStorage('searchList')).version;
                if (searchListVersion != dataVersions.searchList) {
                    getSearchList(dataVersions.searchList);
                } else {
                    $rootScope.localStorageCount = $rootScope.localStorageCount + 1;
                }
            } else {
                getSearchList(dataVersions.searchList);
            }
        }, 100);
    });


    function getProjectList(version) {
        db.ref('projectList/' + cityId + '/residential').once('value', function(snapshot) {

            for (key in snapshot.val()) {
                projectList.push(snapshot.val()[key]);
            }
            setLocalStorage(projectList, 'projectList', version);
            $timeout(function() {
                $rootScope.localStorageCount = $rootScope.localStorageCount + 1;
            }, 500);
        });
    };

    function getSearchList(version) {
        db.ref('search').once('value', function(snapshot) {
            for (key in snapshot.val()) {
                searchList.push(snapshot.val()[key]);
            }
            setLocalStorage(searchList, 'searchList', version);
            $timeout(function() {
                $rootScope.localStorageCount = $rootScope.localStorageCount + 1;
            }, 500);
        })
    };
});

function loading(status, timer) {
    if (!timer) {
        timer = 10000;
    }
    if (status) {
        $('.loader-modal').fadeIn();
        setTimeout(function() {
            $('.loader-modal').fadeOut();
        }, timer);
    } else {
        $('.loader-modal').fadeOut();
    }
}
