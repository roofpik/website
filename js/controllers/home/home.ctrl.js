app.controller('homeCtrl', ['$scope', '$http', '$state', '$timeout', '$rootScope', function($scope, $http, $state, $timeout, $rootScope) { << << << < HEAD

    $scope.selectedVertical = 'commercial';
    $scope.search = searchObject[$scope.selectedVertical]; //Stores the search object for different verticals
    $scope.searched = '';
    $scope.locationSearched = '';
    $scope.showSearch = false;
    var parameter = '';
    $scope.uid = '';
    $scope.locations = [];

    $('ul.tabs').tabs();

    // if user is logged in, appen uid to params
    if (checkLocalStorage('uid')) {
        $timeout(function() {
            console.log(JSON.parse(localStorage.getItem('uid')));
            $scope.uid = JSON.parse(localStorage.getItem('uid'));
            if (parameter.length != 0) {
                parameter += "&"
            }
            parameter = "uid=" + encodeURIComponent($scope.uid);
            getCurrentLocation();
        }, 0);
    } else {
        getCurrentLocation();
    }

    // called when user selects a type
    $scope.selectType = function(val) {
        if (val.name == 'Explore Locality') {
            // if selected type is search locality then shift focus to locality search
            $('#locality-search').focus();
        }
        $scope.searched = val.name;
        $scope.selectedType = val;
        $scope.showSearch = false;
    }

    // show type search when clicked on input for searching types for a particular vertical
    $("#type-selection").focusin(function() {
        $timeout(function() {
            $scope.showSearch = true;
        }, 100);
    });

    // hide type search list when input for searching types is out of focus
    $("#type-selection").focusout(function() {
        $scope.showSearch = false;
    });

    // show locality search when clicked on input for searching types for a particular vertical
    $("#locality-search").focusin(function() {
        console.log('called');
        $timeout(function() {
            $scope.showSearch1 = true;
        }, 100);
    });

    // hide locality search list when input for searching types is out of focus
    $("#locality-search").focusout(function() {
        $scope.showSearch1 = false;
    });

    // Code to get current location of user
    function getCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            // console.log("Geolocation is not supported by this browser.");
            getLocations();
        }
    }

    // called when location of user is successfully obtained
    function showPosition(position) {
        if (parameter.length != 0) {
            parameter += "&"
        }

        parameter += "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
        getLocations();
    }

    // called when location not found or no permission
    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                // console.log("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                // console.log("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                // console.log("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                // console.log("An unknown error occurred.");
                break;
        }
        getLocations();
    }

    function getLocations() {
        parameter = btoa(parameter);
        $http({
            url: 'http://35.154.60.19/api/GetLocations_1.0',
            method: 'GET',
            params: {
                args: parameter
            }
        }).then(function(response) {
            console.log(response);
            for (key in response.data.details) {
                $scope.locations.push(response.data.details[key]);
            }
        })
    }

    $scope.selectLocation = function(loc) {
        console.log(loc);
        $scope.locationSearched = loc.name;
        $scope.showSearch1 = false;
        $scope.selectedLocation = loc;
    }

    
    // $scope.selectedVertical = 'commercial';

    // $scope.search = searchObject[$scope.selectedVertical]; //Stores the search object for different verticals

    // $scope.searched = '';

    // $scope.showSearch = false;

    // console.log($rootScope.loginStatus);

    // // $scope.uid = firebase.auth().currentUser();

    // $scope.uid = 'u6MrWFAjdaXAiHnBaAVBoA6wWjc2';

    // // called when user selects a type

    // $scope.selectType = function(val) {

    //     if (val.name == 'Explore Locality') {

    //         // if selected type is search locality then shift focus to locality search
    //         $('#locality-search').focus();

    //     }

    //     $scope.searched = val.name;

    //     $scope.selectedType = val;

    //     $scope.showSearch = false;

    // }

    // // show type search when clicked on input for searching types for a particular vertical

    // $("#type-selection").focusin(function() {

    //     $timeout(function() {

    //         $scope.showSearch = true;

    //     }, 100);

    // });

    // // hide search list when input for searching types is out of focus

    // $("#type-selection").focusout(function() {

    //     $scope.showSearch = false;

    // });

    // $("#locality-search").focusin(function() {

    //     $timeout(function() {

    //         $scope.showSearch1 = true;

    //     }, 100);

    // });

    // // hide search list when input for searching types is out of focus

    // $("#locality-search").focusout(function() {

    //     $scope.showSearch1 = false;

    // });

}]);
