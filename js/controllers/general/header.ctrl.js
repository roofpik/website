app.controller('headerCtrl', ['$scope', '$state', '$http', '$stateParams', '$rootScope', '$timeout', function($scope, $state, $http,$stateParams, $rootScope, $timeout) {

    $(document).ready(function() {
        Materialize.updateTextFields();
        $('.button-collapse').sideNav({
            menuWidth: 300, // Default is 240
            edge: 'left', // Choose the horizontal origin
            closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
            draggable: true // Choose whether you can drag to open on touch screens
        });
        $('.button-heart').sideNav({
            menuWidth: 400, // Default is 240
            edge: 'right', // Choose the horizontal origin
            closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
            draggable: true // Choose whether you can drag to open on touch screens
        });
        $(".dropdown-button").dropdown();
        $('.modal').modal();
    })

    $scope.user = {};

    var page_size = 10;
    $scope.enteredText = "";
    var page_start = 0;
    var totalProjects = 0;
    var totalProjectsFetched = 0;
    $scope.projectList = [];
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    $scope.projectList = [];
    $scope.dataFetched = false;
    $scope.filters = {
        bhk: null,
        price_range: null,
        area_range: null,
        locationId: null,
        propertyType: null,
        style: null,
        page_start: $scope.page_start,
        page_size: $scope.page_size
    }



    fetchProjects()

    function fetchProjects() {
        $http({
            url: 'http://35.154.60.19/api/GetResidential_1.0',
            method: 'GET',
            params: {
                style: $scope.filters.style,
                bhk: $scope.filters.bhk,
                price_range: $scope.filters.price_range,
                area_range: $scope.filters.area_range,
                locationId: $scope.filters.locationId,
                details_builder: $scope.filters.details_builder,
                // propertyType : $scope.filters.propertyType,
                page_start: page_start,
                page_size: page_size
            }
        }).then(function mySucces(response) {
            totalProjects = response.data.hits;
            totalProjectsFetched += Object.keys(response.data.details).length;
            $scope.dataFetched = true;
            $scope.projects = response.data.details;
            for (key in $scope.projects) {
                if ($scope.projects[key].cover.indexOf('http') == -1) {
                    $scope.projects[key].cover = "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/residential/' + $scope.projects[key].id + '/images/coverPhoto/' + $scope.projects[key].cover + '-s.jpg';
                }
                $scope.projectList.push($scope.projects[key]);
            }
            loading(true);
        }, function myError(err) {
            // console.log(err);
        })

    }

    $scope.callFunction = function() {
        $scope.projectList = [];
        if ($scope.enteredText.length >= 2) {
            $http({
                url: 'http://35.154.60.19/api/GetResidential_1.0',
                method: 'GET',
                params: {
                    details_name: $scope.enteredText
                }
            }).then(function mySucces(response) {
                totalProjects = response.data.hits;
                totalProjectsFetched += Object.keys(response.data.details).length;
                $scope.dataFetched = true;
                $scope.projects = response.data.details;
                for (key in $scope.projects) {
                    if ($scope.projects[key].cover.indexOf('http') == -1) {
                        $scope.projects[key].cover = "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/residential/' + $scope.projects[key].id + '/images/coverPhoto/' + $scope.projects[key].cover + '-s.jpg';
                    }
                    $scope.projectList.push($scope.projects[key]);
                }
                loading(true);
            }, function myError(err) {
                // console.log(err);
            })
        }

        else {
            fetchProjects();
        }
    }
    $rootScope.$watch('loginStatus', function() {
        $scope.loginStatus = $rootScope.loginStatus;
        if($rootScope.loginStatus){
          $timeout(function(){
              $scope.user = firebase.auth().currentUser;
          }, 0);
        }
    });

    if (checkLocalStorage('loginStatus')) {
        $scope.loginStatus = JSON.parse(localStorage.getItem('loginStatus'));
        if (JSON.parse(localStorage.getItem('loginStatus'))) {
            $timeout(function(){
                $scope.user = firebase.auth().currentUser;
            },0);
        }
    }

    $rootScope.$on("callShowLogin", function() {
        $timeout(function() {
            $scope.showLogin();
        }, 0);
    });

    $scope.showLogin = function(ev) {
      $("#open-login").click();
    }; 

    $scope.gotoReview = function() {
        $state.go('write-review');
    }

    $scope.logout = function() {
        console.log('called');
        var timestamp = new Date().getTime();
        // UserTokenService.checkToken($rootScope.uid, timestamp, 5);
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            $timeout(function() {
                $rootScope.uid = null;
                $timeout(function(){
                    $rootScope.loginStatus = false;
                },0);
                localStorage.setItem('loginStatus', false);
                $('.modal').modal('close');
                sweetAlert("Logout Successful", "You have successfully logged out!", "success");
            }, 100);

        }, function(error) {
            // An error happened.
            var timestamp = new Date().getTime();
            UserTokenService.checkToken($rootScope.uid, timestamp, 4);
        });

    }; 


}]);
