app.controller('homeCtrl', ['$scope', '$http', '$state', '$timeout', '$rootScope', '$sce', function($scope, $http, $state, $timeout, $rootScope, $sce) {
    $scope.selectedVertical = 'residential';
    $scope.categorySearch = searchObject[$scope.selectedVertical]; //Stores the search object for different verticals
    $scope.categorySearched = '';
    $scope.locationSearched = '';
    document.title = "Home"
    $scope.showSearch = false;
    var parameter = '';
    $scope.uid = '';
    $scope.locations = [];
    $scope.searchByName = false;
    $scope.searchByNameData = [];
    $scope.showSearchTitle = 'Search by Name';
    $scope.toggleIcon = 'arrow_drop_down_circle';
    $scope.searchingName = false;
    $scope.searchingLocation= false;
    $('ul.tabs').tabs();
    $('select').material_select();
    $('.parallax').parallax();
    // to change verttical and category options

    $scope.selectVertical = function(val) {
        $timeout(function(){
            $scope.categorySearched = '';
            $scope.selectedVertical = val;
            $scope.categorySearch = searchObject[$scope.selectedVertical];
        },0);
    }

    $scope.toggleSearchType = function() {
        $scope.searchByName = !$scope.searchByName;
        if ($scope.searchByName) {
            $scope.showSearchTitle = 'Guided Search';
            $scope.toggleIcon = 'arrow_drop_up';
        } else {
            $scope.showSearchTitle = 'Search by Name';
            $scope.toggleIcon = 'arrow_drop_down_circle';
        }
    }

    // called when user selects a type

    $scope.selectCategory = function(val) {
        // if (val.name == 'Explore Locality') {
            // if selected type is search locality then shift focus to locality search
            $('#locality-search').focus();
        // }
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

    // show locality search when clicked on input for searching locations or localities

    $("#locality-search").focusin(function() {
        $timeout(function() {
            $scope.showSearch1 = true;
        }, 100);
    });

    // hide locality search list when input is out of focus

    $("#locality-search").focusout(function() {
        $scope.showSearch1 = false;
    });

    // show search by name when clicked on input for searching by name

    $("#name-search").focusin(function() {
        $timeout(function() {
            $scope.showSearch2 = true;
        }, 100);
    });

    // hide search by name list when input for searching by name

    $("#name-search").focusout(function() {
        $scope.showSearch2 = false;
    });

    getCurrentLocation();
    // Code to get current location of user

    function getCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            // console.log("Geolocation is not supported by this browser.");
            parameter += "lat=" + 28.406730 + "&lon=" + 77.042633;
            getLocations();
        }
    }

    // called when location of user is successfully obtained

    function showPosition(position) {
        if (parameter.length != 0) {
            parameter += "&"
        }
        parameter += "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
        // getMapData(position.coords.latitude, position.coords.longitude);
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
        if (parameter.length != 0) {
            parameter += "&"
        }
        parameter += "lat=" + 28.4594965 + "&lon=" + 77.02663830000006;
        getLocations();
    }

    function getLocations(name) {
        // parameter += "&name="+encodeURIComponent('Sector 48');
        // console.log(parameter);
        if (!name) {
            name = '';
        }
        finalParam = btoa(parameter + name);
        console.log(atob(finalParam));
        $http({
            url: 'http://107.23.243.89/api/GetLocations_1.0',
            method: 'GET',
            params: {
                args: finalParam
            }
        }).then(function(response) {
            // console.log(response);
            $scope.locations = [];
            for (key in response.data.details) {
                $scope.locations.push(response.data.details[key]);
            }
            $timeout(function(){
                $scope.searchingLocation = false;
                console.log('now false');  
            }, 0);
            // console.log($scope.locations);
        })
    }

    $scope.searchLocation = function() {
        // console.log($scope.locationSearched);
        if ($scope.locationSearched) {
            if ($scope.locationSearched.length > 2) {
                $scope.searchingLocation = true;
                console.log('now false');
                name = "&name=" + encodeURIComponent($scope.locationSearched);
                getLocations(name);
            }
        }
    }

    // Select a location when clicked on it
    $scope.selectLocation = function(loc) {
        // console.log(loc);
        $scope.locationSearched = loc.name;
        $scope.showSearch1 = false;
        $scope.selectedLocation = loc;
    }

    $scope.selectSearchByName = function(val){
        $scope.searchedText = val.name;
        $scope.searchedValue = val;
        $scope.showSearch2 = false;
        // console.log($scope.searchedValue);
    }

    $scope.search = function() {
        // If person is searching by name take to details view else take to list view
        var param = {};
        if ($scope.searchByName) {
            if($scope.searchedValue.type == 'residential'){
                param = {
                    projectId : $scope.searchedValue.id
                }
                $state.go('project-details', {p: encodeParams(param)});
            } else if($scope.searchedValue.type == 'cghs') {
                param = {
                    projectId : $scope.searchedValue.id,
                    category: 'cghs'
                }
                $state.go('project-details', {p: encodeParams(param)});
            } else if($scope.searchedValue.type == 'locality'){
                param = {
                    id: $scope.searchedValue.id,
                    category: 'locality'
                }
                $state.go('location-details', {p: encodeParams(param)});
            } else if($scope.searchedValue.type == 'location'){
                param = {
                    id: $scope.searchedValue.id,
                    category: 'locations'
                }
                $state.go('location-details', {p: encodeParams(param)});
            }
        } else {
            var param = {
                'vertical': $scope.selectedVertical
            }
            if($scope.categorySearched == 'Penthouse / Villas'){
                param.category = 'Penthouses / Duplexes$Villas / Row-houses';
            } else if($scope.categorySearched =='Low Rise / Independent Floors'){
                param.category = 'Independent Floors';
            } else if($scope.categorySearched == 'CGHS'){
                param.category = 'CGHS';
            } else {
                param.category = 'Apartments';
            }

            if($scope.selectedLocation){
                if($scope.selectedLocation.type == 'location'){
                    param.location = $scope.selectedLocation.id;
                } else {
                    param.locality= $scope.selectedLocation.id;
                }
            }

            var parameter = encodeParams(param);
            // console.log(parameter);
            $state.go('list', { p: parameter});
        }
    }

     // get search results based on the string in input box
     $scope.getSearchData = function() {
         // console.log($scope.searchedText);
         if ($scope.searchedText.length > 2) {
            $scope.searchingName = true;
             var data = {
                 name: $scope.searchedText
             }
             $http({
                 url: 'http://107.23.243.89/api/GetByName_1.0',
                 method: 'GET',
                 params: {
                     args: encodeParams(data)
                 }
             }).then(function mySucces(response) {
                 // console.log(response);
                 if(Object.keys(response.data).length > 0){
                    for(key in response.data){
                        $scope.searchByNameData.push(response.data[key]);
                    }
                    $scope.showSearch2 = true;
                 }
                 $scope.searchingName = false;
             }, function myError(err) {
                $scope.searchingName = false;
                 // console.log(err);
             })
         }
     }

     $scope.selectResult = function(val){
        $scope.searchedText = val.name;
        $scope.showSearch = false;

        // redirect to a view or show on map after selection
     }

    //demo function attached to delete button to test the projects/locations/localities details page

    $scope.testListPage = function() {
        // $state.go('location-details', {id: '-KYJOduA3Aiy5b0FEiis', category: 'locality'});
        // $state.go('project-details', {projectId: '-KbT8haHPqV7gTy55f-x', category: 'CGHS'});
        var params = {
            'vertical': 'residential',
            'id': '-KYMt4pSYjIUsknqZ6Qr',
            'type': 'project'
        }

        var parameter = encodeParams(params);
        $state.go('listing', { parameters: parameter });
    }

    $scope.highlight = function(text, search) {
    console.log('called');
    if (!search) {
        return $sce.trustAsHtml(text);
    }
    return $sce.trustAsHtml(text.replace(new RegExp(search, 'gi'), '<span class="highlightedText">$&</span>'));
};

}]);

app.controller('coverStoryHomeCtrl', ['$scope', '$timeout', function($scope, $timeout) {
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    $scope.coverStoriesFetched = false;
    $scope.stories = [];
    db.ref('shortStories/-KYJONgh0P98xoyPPYm9')
        .limitToFirst(8)
        .once('value', function(response) {
            $timeout(function() {
                // $scope.stories = response.val();
                // angular.forEach(response.val(), function(value, key) {
                //     // value.redirectionUrl = '/#/story/gurgaon/' + convertToHyphenSeparated(value.placeName) + '/' + convertToHyphenSeparated(value.title) + '/' + value.storyId;
                //     // value.redirectionUrl = value.redirectionUrl.replace(/[?=]/g, "");
                //     value.coverPhoto = 'http://cdn.roofpik.com/roofpik/coverStory/stories/' + $scope.cityId + '/' + value.storyId + '/coverPhoto/' + value.coverPhoto + '-m.jpg';
                // })
                for(key in response.val()){
                    var data = response.val()[key];
                    data.coverPhoto = 'http://cdn.roofpik.com/roofpik/coverStory/stories/' + $scope.cityId + '/' + data.storyId + '/coverPhoto/' + data.coverPhoto + '-m.jpg';
                    $scope.stories.push(data);
                }
                $scope.coverStoriesFetched = true;
            }, 0);
        })
}]);