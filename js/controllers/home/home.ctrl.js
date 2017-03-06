app.controller('homeCtrl', ['$scope', '$http', '$state', '$timeout', '$rootScope', '$sce', function($scope, $http, $state, $timeout, $rootScope, $sce) {
    $scope.selectedVertical = 'residential';
    $scope.categorySearch = searchObject[$scope.selectedVertical]; //Stores the search object for different verticals
    $scope.categorySearched = '';
    $scope.locationSearched = '';
    document.title = "Home"
    $scope.loading = true;
    var parameter = '';
    $scope.uid = '';
    $scope.locations = [];
    $scope.searchByName = false;
    $scope.searchByNameData = [];
    $scope.showSearchTitle = 'Search by Name';
    $scope.toggleIcon = 'arrow_drop_down_circle';
    $scope.searchingName = false;
    $scope.searchingLocation = false;
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    $('ul.tabs').tabs();
    $('select').material_select();
    $('.parallax').parallax();
    $('#category-search').hide();
    $('#locality-selection').hide();

    // to change verttical and category options
    $scope.selectVertical = function(val) {
        $timeout(function() {

            $scope.categorySearched = '';
            $scope.selectedVertical = val;
            $scope.categorySearch = searchObject[$scope.selectedVertical];
            if (val != 'residential') {
                Materialize.toast('Coming Soon!', 3000);
            }
        }, 0);
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
        $('#locality-search').focus();
        $scope.categorySearched = val.name;
        $scope.selectedType = val;
    }

    // show type search when clicked on input for searching types for a particular vertical

    $("#type-selection").focusin(function() {
        $timeout(function() {
            $('#category-search').fadeIn();
        }, 100);

    });

    // hide type search list when input for searching types is out of focus

    $("#type-selection").focusout(function() {
        $('#category-search').fadeOut();
    });

    // show locality search when clicked on input for searching locations or localities

    $("#locality-search").focusin(function() {
        $timeout(function() {
            $('#locality-selection').fadeIn();
        }, 100);
    });

    // hide locality search list when input is out of focus

    $("#locality-search").focusout(function() {
        $('#locality-selection').fadeOut();
    });

    // show search by name when clicked on input for searching by name

    $("#name-search").focusin(function() {
        $timeout(function() {
            $('.search-results').fadeIn();
        }, 0);
    });

    // hide search by name list when input for searching by name

    $("#name-search").focusout(function() {
        $('.search-results').fadeOut();
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
        console.log(parameter);
        if (!name) {
            name = '';
        }
        finalParam = btoa(parameter + name);
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
            $timeout(function() {
                $scope.searchingLocation = false;
            }, 0);
            $scope.loading = false;
        })
    }

    $scope.searchLocation = function() {
        if ($scope.locationSearched) {
            if ($scope.locationSearched.length > 2) {
                $scope.searchingLocation = true;
                name = "&name=" + encodeURIComponent($scope.locationSearched);
                getLocations(name);
            }
        }
    }

    // Select a location when clicked on it
    $scope.selectLocation = function(loc) {
        // console.log(loc);
        var param = {};
        $scope.locationSearched = loc.name;
        $scope.selectedLocation = loc;
        if ($scope.exploreLocality) {
            if ($scope.selectedLocation.type == 'locality') {
                param.category = 'lcoality'
            } else {
                param.category = 'locations'
            }
            param.id = $scope.selectedLocation.id
            $state.go('location-details', { p: encodeParams(param) });
        } else {
            param.vertical = 'residential';
            if ($scope.firstSelected) {
                if ($scope.searchedText == 'Penthouse / Villas') {
                    param.category = 'Penthouses / Duplexes$Villas / Row-houses';
                } else if ($scope.searchedText == 'Low Rise / Independent Floors') {
                    param.category = 'Independent Floors';
                } else if ($scope.searchedText == 'CGHS') {
                    param.category = 'CGHS';
                } else {
                    param.category = 'Apartments';
                }

                if ($scope.selectedLocation) {
                    if ($scope.selectedLocation.type == 'location') {
                        param.location = $scope.selectedLocation.id;
                    } else {
                        param.locality = $scope.selectedLocation.id;
                    }
                }

                var parameter = encodeParams(param);
                $state.go('list', { p: parameter });
            } else {
                $('#type-selection').focus();
                $('#category-search').fadeIn();
            }
        }
    }

    $scope.takeToLocalityBox = function() {
        $('#locality-search').focus();
        $('#locality-selection').fadeIn();
        $scope.exploreLocality = true;
    }

    $scope.selectSearchByName = function(val) {
        // console.log(val);
        $scope.firstSelected = true;
        $scope.searchedText = val.name;
        $scope.searchedValue = val;
        var param = {};
        if ($scope.searchedValue.from == 'local') {
            if(!$scope.selectedLocation){
                $scope.takeToLocalityBox();
            }
        } else {
            if ($scope.searchedValue.type == 'residential') {
                param = {
                    projectId: $scope.searchedValue.id
                }
                $state.go('project-details', { p: encodeParams(param) });
            } else if ($scope.searchedValue.type == 'cghs') {
                param = {
                    projectId: $scope.searchedValue.id,
                    category: 'cghs'
                }
                $state.go('project-details', { p: encodeParams(param) });
            }
        }
    }

    $scope.search = function() {
        // If person is searching by name take to details view else take to list view
        var param = {};
        if ($scope.searchedValue) {
            param.vertical = 'residential';
            if ($scope.searchedText == 'Penthouse / Villas') {
                param.category = 'Penthouses / Duplexes$Villas / Row-houses';
            } else if ($scope.searchedText == 'Low Rise / Independent Floors') {
                param.category = 'Independent Floors';
            } else if ($scope.searchedText == 'CGHS') {
                param.category = 'CGHS';
            } else {
                param.category = 'Apartments';
            }
            if ($scope.selectedLocation) {
                if ($scope.selectedLocation) {
                    if ($scope.selectedLocation.type == 'location') {
                        param.location = $scope.selectedLocation.id;
                    } else {
                        param.locality = $scope.selectedLocation.id;
                    }
                }
            }
            var parameter = encodeParams(param);
            $state.go('list', { p: parameter });
        } else if ($scope.selectedLocation) {
            if ($scope.selectedLocation.type == 'locality') {
                param.category = 'lcoality'
            } else {
                param.category = 'locations'
            }
            param.id = $scope.selectedLocation.id
            $state.go('location-details', { p: encodeParams(param) });
        } else {
            $state.go('list');
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
                // url: 'http://35.154.60.19/api/GetByNameHome_1.0',
                url: 'http://107.23.243.89/api/GetByNameHome_1.0',
                method: 'GET',
                params: {
                    args: encodeParams(data)
                }
            }).then(function mySucces(response) {
                console.log(response);
                $scope.categorySearch = [];
                if (Object.keys(response.data).length > 0) {
                    for (key in response.data) {
                        response.data[key].from = 'api';
                        response.data[key].icon = "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/' + response.data[key].type + '/' + response.data[key].id + '/images/coverPhoto/' + response.data[key].image + '-s.jpg';
                        $scope.categorySearch.push(response.data[key]);
                    }
                }
                $scope.searchingName = false;
            }, function myError(err) {
                $scope.searchingName = false;
                // console.log(err);
            })
        } else {
            $scope.categorySearch = searchObject[$scope.selectedVertical];
        }
    }

    $scope.highlight = function(text, search) {
        // console.log('called');
        if (!search) {
            return $sce.trustAsHtml(text);
        }
        return $sce.trustAsHtml(text.replace(new RegExp(search, 'gi'), '<span class="highlightedText">$&</span>'));
    };


    // get data to display on map and cover stories only when scrolled to that particular div
    $(window).bind('scroll', function() {
        if ($('.write-review-home').offset()) {
            if ($(window).scrollTop() >= $('.write-review-home').offset().top + $('.write-review-home').outerHeight() - window.innerHeight) {
                $timeout(function() {
                    $rootScope.showCoverStories = true;
                }, 0);
            }
        }
        if ($('.stats-home').offset()) {
            if ($(window).scrollTop() >= $('.stats-home').offset().top + $('.stats-home').outerHeight() - window.innerHeight) {
                $timeout(function() {
                    $rootScope.showMap = true;
                }, 0);
            }
        }
    });
    $scope.goToWriteReview = function() {
        // console.log('here')
        $state.go('write-review');
    }

}]);

app.controller('coverStoryHomeCtrl', ['$scope', '$timeout', '$rootScope', function($scope, $timeout, $rootScope) {
    $('.home-cover-stories').hide();
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    $scope.coverStoriesFetched = false;
    $scope.stories = [];
    $rootScope.$watch('showCoverStories', function() {
        if ($rootScope.showCoverStories && !$scope.coverStoriesFetched) {
            db.ref('shortStories/-KYJONgh0P98xoyPPYm9')
                .limitToFirst(8)
                .once('value', function(response) {
                    $timeout(function() {
                        for (key in response.val()) {
                            var data = response.val()[key];
                            data.redirectionUrl = '/#/story/gurgaon/' + convertToHyphenSeparated(data.placeName) + '/' + convertToHyphenSeparated(data.title) + '/' + data.storyId;
                            data.redirectionUrl = data.redirectionUrl.replace(/[?=]/g, "");
                            data.coverPhoto = 'http://cdn.roofpik.com/roofpik/coverStory/stories/' + $scope.cityId + '/' + data.storyId + '/coverPhoto/' + data.coverPhoto + '-m.jpg';
                            $scope.stories.push(data);
                        }
                        $scope.coverStoriesFetched = true;
                        $('.home-cover-stories').fadeIn(2000);
                    }, 0);
                })
        }
        // console.log($scope.allRatings);
    });
}]);
