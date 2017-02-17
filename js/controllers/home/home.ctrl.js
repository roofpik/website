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

                $('ul.tabs').tabs();
                $('select').material_select();
                $('.parallax').parallax();
                // to change verttical and category options
                $scope.selectVertical = function(val) {
                    $scope.selectedVertical = val;
                    $scope.categorySearch = searchObject[$scope.selectedVertical];
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


                $scope.showResults = function() {
                    console.log('called')
                    console.log($scope.searched)
                    if ($scope.searched.length = 2) {
                        console.log($scope.searched);
                        $http({
                            url: 'http://107.23.243.89/api/GetResidential_1.0',
                            method: 'GET',
                            params: {
                                details_name: $scope.searched
                            }
                        }).then(function mySuccess(response) {
                            console.log(response);
                            totalProjects = response.data.hits;
                            totalProjectsFetched += Object.keys(response.data.details).length;
                            $scope.dataFetched = true;
                            $scope.projects = response.data.details;
                            console.log($scope.projects);
                            for (key in $scope.projects) {
                                if ($scope.projects[key].cover.indexOf('http') == -1) {
                                    $scope.projects[key].cover = "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/residential/' + $scope.projects[key].id + '/images/coverPhoto/' + $scope.projects[key].cover + '-xs.jpg';
                                }
                                $scope.projectList1[$scope.projects[key].name.toString()] = $scope.projects[key].cover;
                                $scope.projectList2[$scope.projects[key].name.toString()] = $scope.projects[key].id;
                            }
                            console.log($scope.projectList1)
                            console.log($scope.projectList2)

                            bindValues();

                            loading(true);
                        }, function myError(err) {
                            console.log(err);
                        })
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
                        // getMapData(position.coords.latitude, position.coords.longitude);
                        getLocations();
                    }

                    $scope.showLocalities = function() {
                        if ($scope.locality.length = 2) {
                            console.log('called')
                            var searchedLocality = encodeURIComponent($scope.locality);
                            var param = btoa('id=' + searchedLocality);
                            $http({
                                url: 'http://107.23.243.89/api/GetLocality_1.0',
                                method: 'GET',
                                params: {
                                    id: param
                                }
                            }).then(function mySucces(response) {
                                console.log(response);
                                $scope.total = response.data.details;
                                for (key in $scope.total) {
                                    console.log(key);
                                    if ($scope.total[key].name) {
                                        $scope.localities[$scope.total[key].name.toString()] = $scope.total[key].id;
                                        $scope.localities2[$scope.total[key].name.toString()] = null;

                                    }

                                }
                                console.log($scope.localities);
                                setList();
                            }, function myError(err) {
                                console.log(err);
                            })
                        }
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

                    function getMapData(lat, lon) {
                        var data = {
                            lat: lat,
                            lon: lon

                                if (parameter.length != 0) {
                                parameter += "&"

                            }
                        }


                        function getLocations() {

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
                                console.log(response);
                                $scope.locations = [];
                                for (key in response.data.details) {
                                    $scope.locations.push(response.data.details[key]);
                                }
                                console.log($scope.locations);
                                $scope.locationDataLoaded = true;
                            })
                        }

                        $scope.searchLocation = function() {
                            // console.log($scope.locationSearched);
                            if ($scope.locationSearched) {
                                if ($scope.locationSearched.length > 2) {
                                    name = "&name=" + encodeURIComponent($scope.locationSearched);
                                    getLocations(name);
                                }
                            }
                        }

                        $scope.selectLocation = function(loc) {
                            // console.log(loc);
                            $scope.locationSearched = loc.name;
                            $scope.showSearch1 = false;
                            $scope.selectedLocation = loc;
                        }

                        $scope.search = function() {
                            // If person is searching by name take to details view else take to list view
                            if ($scope.searchByName) {

                            } else {
                                var param = {
                                    'vertical': $scope.selectedVertical,
                                    'category': 'Apartments',
                                    'location': '-KYJOldHpi16DEUK0pXn'
                                }
                                var parameter = encodeParams(param);
                                // console.log(parameter);
                                $state.go('list', { p: parameter });

                            }
                        }

                        //demo function attached to delete button to test the projects/locations/localities details page
                        $scope.testListPage = function() {
                            var params = {
                                id: "-KYY51110zIdChgwOHSb",
                                name: "Bestech Park View Spa",
                                type: "residential"

                            }
                            var param = encodeParams(params);
                            $state.go('write-review', { id: param });
                        }


                    }]);


            app.controller('coverStoryHomeCtrl', ['$scope', '$timeout', function($scope, $timeout) {
                $scope.cityId = '-KYJONgh0P98xoyPPYm9';
                $scope.coverStoriesFetched = false;
                db.ref('shortStories/-KYJONgh0P98xoyPPYm9')
                    .limitToFirst(8)
                    .once('value', function(response) {
                        console.log(response.val());
                        $timeout(function() {
                            $scope.stories = response.val();
                            angular.forEach($scope.stories, function(value, key) {
                                // value.redirectionUrl = '/#/story/gurgaon/' + convertToHyphenSeparated(value.placeName) + '/' + convertToHyphenSeparated(value.title) + '/' + value.storyId;
                                // value.redirectionUrl = value.redirectionUrl.replace(/[?=]/g, "");
                                value.coverPhoto = 'http://cdn.roofpik.com/roofpik/coverStory/stories/' + $scope.cityId + '/' + value.storyId + '/coverPhoto/' + value.coverPhoto + '-m.jpg';
                            })
                            $scope.coverStoriesFetched = true;
                        }, 0);
                    })
            }]);
