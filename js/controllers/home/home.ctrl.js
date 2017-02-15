app.controller('homeCtrl', ['$scope', '$http', '$state', '$timeout', '$rootScope', function($scope, $http, $state, $timeout, $rootScope) {
    $scope.selectedVertical = 'residential';
    $scope.categorySearch = searchObject[$scope.selectedVertical]; //Stores the search object for different verticals
    $scope.categorySearched = '';
    $scope.locationSearched = '';
    $scope.showSearch = false;
    var parameter = '';
    $scope.uid = '';
    $scope.locations = [];
    $scope.searchByName = false;
    $scope.showSearchTitle = 'Search by Name';
    $scope.toggleIcon = 'arrow_drop_down_circle';
    $scope.locationDataLoaded = false;
    $scope.searchingName = false;

    $('ul.tabs').tabs();
 $('select').material_select();
   $('.parallax').parallax();
    // to change verttical and category options
    $scope.selectVertical = function(val){
        $scope.selectedVertical = val;
        $scope.categorySearch = searchObject[$scope.selectedVertical];
    }

    $scope.toggleSearchType = function(){
        $scope.searchByName = !$scope.searchByName;
        if($scope.searchByName){
            $scope.showSearchTitle = 'Guided Search';
            $scope.toggleIcon = 'arrow_drop_up';
        } else {
            $scope.showSearchTitle = 'Search by Name';
            $scope.toggleIcon = 'arrow_drop_down_circle';
        }
    }

    // if user is logged in, appen uid to params
    if (checkLocalStorage('uid')) {
        $timeout(function() {
            // console.log(JSON.parse(localStorage.getItem('uid')));
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
    $scope.selectCategory = function(val) {
        if (val.name == 'Explore Locality') {
            // if selected type is search locality then shift focus to locality search
            $('#locality-search').focus();
        }
        $scope.categorySearched = val.name;
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
        getMapData(position.coords.latitude, position.coords.longitude);
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

    function getMapData(lat, lon){
        var data = {
            lat: lat,
            lon: lon
        }
        console.log(encodeParams(data));
        $http({
            url: 'http://35.154.60.19/api/GetMapData_1.0',
            method: 'GET',
            params: {
                args: encodeParams(data)
            }
        }).then(function(response){
            console.log(response);
        })      
    }


    function getLocations() {
        // parameter += "&name="+encodeURIComponent('Sector 48');
        // console.log(parameter);
        finalParam = btoa(parameter);
        $http({
            url: 'http://35.154.60.19/api/GetLocations_1.0',
            method: 'GET',
            params: {
                args: finalParam
            }
        }).then(function(response) {
            console.log(response);
            $scope.locations = [];
            for (key in response.data.details) {
                $scope.locations.push(response.data.details[key]);
            }
            console.log($scope.locations);
            $scope.locationDataLoaded = true;
        })
    }

    $scope.searchLocation = function(){
        if($scope.locationSearched) {
            if($scope.locationSearched.length > 2){
                parameter += "&name="+encodeURIComponent($scope.locationSearched);
                getLocations();
            }
        }
    }

    $scope.selectLocation = function(loc) {
        // console.log(loc);
        $scope.locationSearched = loc.name;
        $scope.showSearch1 = false;
        $scope.selectedLocation = loc;
    }

    $scope.search = function(){
        // If person is searching by name take to details view else take to list view
        if($scope.searchByName){

        } else {
            var param = {
                'vertical': $scope.selectedVertical,
                'category': 'Apartments',
                'location': '-KYJOldHpi16DEUK0pXn'
            }
            var parameter = encodeParams(param);
            // console.log(parameter);
            $state.go('list', {p: parameter});
        }
    }

}]);
