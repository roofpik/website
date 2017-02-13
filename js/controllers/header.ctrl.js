app.controller('headerCtrl', ['$scope', '$state', '$http', function($scope, $state, $http) {

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
            console.log(response);

            totalProjects = response.data.hits;
            totalProjectsFetched += Object.keys(response.data.details).length;
            $scope.dataFetched = true;
            $scope.projects = response.data.details;
            console.log($scope.projects);
            for (key in $scope.projects) {
                if ($scope.projects[key].cover.indexOf('http') == -1) {
                    $scope.projects[key].cover = "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/residential/' + $scope.projects[key].id + '/images/coverPhoto/' + $scope.projects[key].cover + '-s.jpg';
                }
                $scope.projectList.push($scope.projects[key]);
            }
            console.log($scope.projectList)

            loading(true);
        }, function myError(err) {
            console.log(err);
        })

    }

    $scope.callFunction = function() {
        console.log($scope.enteredText.length)

        $scope.projectList = [];
        if ($scope.enteredText.length >= 2) {
            $http({
                url: 'http://35.154.60.19/api/GetResidential_1.0',
                method: 'GET',
                params: {
                    details_name: $scope.enteredText
                }
            }).then(function mySucces(response) {
                console.log(response);

                totalProjects = response.data.hits;
                totalProjectsFetched += Object.keys(response.data.details).length;
                $scope.dataFetched = true;
                $scope.projects = response.data.details;
                console.log($scope.projects);
                for (key in $scope.projects) {
                    if ($scope.projects[key].cover.indexOf('http') == -1) {
                        $scope.projects[key].cover = "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/residential/' + $scope.projects[key].id + '/images/coverPhoto/' + $scope.projects[key].cover + '-s.jpg';
                    }
                    $scope.projectList.push($scope.projects[key]);
                }
                console.log($scope.projectList)

                loading(true);
            }, function myError(err) {
                console.log(err);
            })
        }

        else {
            fetchProjects();
        }
    }

    $scope.openProject = function(){
        console.log($scope.item.name)
    }

    // $scope.gotoHome = function() {
    //     $state.go('home');
    // }

    // $rootScope.$watch('loginStatus', function() {
    //     $scope.loginStatus = $rootScope.loginStatus;

    //     if($rootScope.loginStatus){
    //         $scope.user.photo = $rootScope.photoURL;
    //         $scope.user.name = $rootScope.displayName;
    //     }
    //     else{
    //         $scope.user.photo = null;
    //         $scope.user.name = null;
    //     }
    // });

    // $rootScope.$on("callShowLogin", function() {
    //     $timeout(function() {
    //         $scope.showLogin();
    //     }, 0);
    // });

    // $scope.showLogin = function(ev) {
    //     $mdDialog.show({
    //             controller: loginController,
    //             templateUrl: '/templates/dialogs/auth.html',
    //             parent: angular.element(document.body),
    //             targetEvent: ev,
    //             clickOutsideToClose: true,
    //             fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    //         })
    //         .then(function(answer) {
    //             $scope.status = 'You said the information was "' + answer + '".';
    //         }, function() {
    //             $scope.status = 'You cancelled the dialog.';
    //         });
    // };

    // $scope.logout = function() {

    //     var timestamp = new Date().getTime();
    //     UserTokenService.checkToken($rootScope.uid, timestamp, 5);
    //     firebase.auth().signOut().then(function() {
    //         // Sign-out successful.
    //         $timeout(function() {
    //             $rootScope.uid = null;
    //             $rootScope.loginStatus = false;
    //             localStorage.setItem('loginStatus', false);
    //             $mdDialog.hide();
    //             sweetAlert("Logout Successful", "You have successfully logged out!", "success");
    //         }, 100);

    //     }, function(error) {
    //         // An error happened.
    //         var timestamp = new Date().getTime();
    //         UserTokenService.checkToken($rootScope.uid, timestamp, 4);
    //     });

    // };


    // $scope.showSignUp = function(ev) {
    //     $mdDialog.show({
    //             controller: DialogController,
    //             templateUrl: '/templates/dialogs/auth.html',
    //             parent: angular.element(document.body),
    //             targetEvent: ev,
    //             clickOutsideToClose: true,
    //             fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    //         })
    //         .then(function(answer) {
    //             $scope.status = 'You said the information was "' + answer + '".';
    //         }, function() {
    //             $scope.status = 'You cancelled the dialog.';
    //         });
    // }

    // $scope.takeToProfile = function() {
    //     $state.go('profile');
    // };

    // $scope.takeToMyReviews = function() {
    //     $state.go('user-all-reviews');
    // };

    //   $scope.goToCoverStories = function() {
    //     $state.go('cover-stories', { city: 'gurgaon', cityId: $scope.cityId, from: 1 });
    // }

    // $scope.goToBlogs = function() {
    //     $state.go('blogs', { city: 'gurgaon', cityId: $scope.cityId, from: 1 })
    // }

    // $scope.gotoWriteReviews = function() {
    //     $state.go('write-review');
    // }



}]);
