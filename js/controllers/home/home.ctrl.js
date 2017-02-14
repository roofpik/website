app.controller('homeCtrl', ['$scope', '$http', '$state', '$timeout', '$rootScope', function($scope, $http, $state, $timeout, $rootScope) {

    $scope.selectedVertical = 'commercial';
    $scope.search = searchObject[$scope.selectedVertical]; //Stores the search object for different verticals
    $scope.searched = '';
    $scope.showSearch = false;
    var parameter = '';
    $scope.uid = '';

    if(checkLocalStorage('loginStatus')){
        console.log(getLocalStorage('loginStatus'));
        if(getLocalStorage('loginStatus')){
            $scope.uid = firebase.auth().currentUser;
            parameter = "uid="+encodeURIComponent($scope.uid);
        }
    }

    // called when user selects a type
    $scope.selectType = function(val){
        if(val.name == 'Explore Locality'){
            // if selected type is search locality then shift focus to locality search
            $('#locality-search').focus();
        }
        $scope.searched = val.name;
        $scope.selectedType = val;
        $scope.showSearch = false;
    }

    // show type search when clicked on input for searching types for a particular vertical
    $( "#type-selection" ).focusin(function() {
        $timeout(function(){
            $scope.showSearch = true;
        },100);
    });

    // hide search list when input for searching types is out of focus
    $( "#type-selection" ).focusout(function() {
        $scope.showSearch = false;
    });

    getCurrentLocation();
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
        console.log("Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude);
        if(parameter.length != 0){
            parameter += "&"
        }

        parameter += "lat="+ position.coords.latitude+"&lon="+ position.coords.longitude;
    }

    // called when location not found or no permission
    function showError(error) {
        switch(error.code) {
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

    function getLocations(){
        parameter = btoa(parameter);
        $http({
            url: 'http://35.154.60.19/api/GetLocations_1.0',
            method: 'GET',
            params: {
                args: parameter
            }
          }).then(function(response){
            console.log(response);
          })
    }

    // var vertical = 'residential';
    // var category = 'Apartments';

    // var parameter = btoa("vertical="+encodeURIComponent(vertical)+"&category="+encodeURIComponent(category));
    // console.log(parameter);
    // $http({
    //     url:'http://35.154.60.19/api/GetCghs_1.0',
    //     method: 'GET',
    //     params: {
    //         args: parameter
    //     }
    // }).then(function(response){
    //     console.log(response);
    // })

    // console.log('called')
    // var page_size = 10;
    // var page_start = 0;
    // var totalProjects = 0;
    // var totalProjectsFetched = 0;
    // $scope.projectList1 = {};
    // $scope.projectList2 = {};
    // $scope.localities = {};
    // $scope.localities2 = {};
    // $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    // $scope.projectList = [];
    // $scope.dataFetched = false;
    // $scope.filters = {
    //     bhk: null,
    //     price_range: null,
    //     area_range: null,
    //     locationId: null,
    //     propertyType: null,
    //     style: null,
    //     page_start: $scope.page_start,
    //     page_size: $scope.page_size
    // }


    // $scope.showResults = function() {
    //     console.log('called')
    //     console.log($scope.searched)
    //     if ($scope.searched.length >= 2) {
    //         $http({
    //             url: 'http://35.154.60.19/api/GetResidential_1.0',
    //             method: 'GET',
    //             params: {
    //                 details_name: $scope.searched
    //             }
    //         }).then(function mySucces(response) {
    //             console.log(response);
    //             totalProjects = response.data.hits;
    //             totalProjectsFetched += Object.keys(response.data.details).length;
    //             $scope.dataFetched = true;
    //             $scope.projects = response.data.details;
    //             console.log($scope.projects);
    //             for (key in $scope.projects) {
    //                 if ($scope.projects[key].cover.indexOf('http') == -1) {
    //                     $scope.projects[key].cover = "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/residential/' + $scope.projects[key].id + '/images/coverPhoto/' + $scope.projects[key].cover + '-xs.jpg';
    //                 }
    //                 $scope.projectList1[$scope.projects[key].name.toString()] = $scope.projects[key].cover;
    //                 $scope.projectList2[$scope.projects[key].name.toString()] = $scope.projects[key].id;
    //             }
    //             console.log($scope.projectList1)
    //             console.log($scope.projectList2)

    //             bindValues();

    //             loading(true);
    //         }, function myError(err) {
    //             console.log(err);
    //         })
    //     }
    // }

    // function bindValues() {
    //     // console.log('bindValues called')
    //     for (key in $scope.projectList1) {
    //         $('#location').autocomplete({
    //             data: $scope.projectList1,
    //             limit: 10,
    //             onAutocomplete: function(value, data) {
    //                 $scope.projectId = $scope.projectList2[value];
    //                 $state.go('project-details', { projectId: $scope.projectId });

    //             }
    //         });
    //     }

    // }

    // $scope.showLocalities = function() {
    //     if ($scope.locality.length >= 2) {
    //         console.log('called')
    //         var searchedLocality = encodeURIComponent($scope.locality);
    //         var param = btoa('id=' + searchedLocality);
    //         $http({
    //             url: 'http://35.154.60.19/api/GetLocality_1.0',
    //             method: 'GET',
    //             params: {
    //                 id: param
    //             }
    //         }).then(function mySucces(response) {
    //             console.log(response);
    //             $scope.total = response.data.details;
    //             for (key in $scope.total) {
    //                 console.log(key);
    //                 if ($scope.total[key].name) {
    //                     $scope.localities[$scope.total[key].name.toString()] = $scope.total[key].id;
    //                     $scope.localities2[$scope.total[key].name.toString()] = null;

    //                 }

    //             }
    //             console.log($scope.localities);

    //             setList();

    //             // loading(true);
    //         }, function myError(err) {
    //             console.log(err);
    //         })
    //     }
    // }

    // function setList() {
       
    //     $('#searched').autocomplete({
    //         data: $scope.localities2,
    //         limit: 10,
    //         onAutocomplete: function(value, data) {
    //             console.log(value);
    //             console.log($scope.localities)
    //             var localityId = $scope.localities[value];
    //             console.log(localityId);
    //             $state.go('projects', {locality: localityId});
    //         }

    //     });
       
    // }
}]);