app.controller('mapCtrl', ['$scope', '$timeout', '$http', '$state', '$rootScope', function($scope, $timeout, $http, $state, $rootScope) {
    $scope.selectedType = 'projects';
    $('.collapsible').collapsible();
    $('.draggable').attr('draggable', true);
    $('.dropdown-button').dropdown();
    $scope.projectMarkers = [];
    $scope.localityMarkers = [];
    $scope.locationMarkers = [];
    $scope.projectInfoWindow = [];
    $scope.localityInfoWindow = [];
    $scope.locationInfoWindow = [];
    $scope.searchByNameResults = [];
    $scope.fetchingResults = false;
    var finalMarkers = [];

    var data = [];
    var image = '';
    var content = [];
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    var markers = [];
    $scope.searchedText = '';
    var map;
    $scope.min = 0;
    $scope.max = 10;
    $scope.numPages = 1;
    $scope.pages = [];
    $scope.currentPage = 1;
    $scope.dataFetchedOnce = false;

    $rootScope.$watch('showMap', function() {
        if ($rootScope.showMap && !$scope.dataFetchedOnce) {
            // alert('fetching Map Data');
            $scope.loading = true;
            $scope.showMapOnHome = true;
            getCurrentLocation();
        }
    });
    // Code to get current location of user
    function getCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            getMapData(28.406730, 77.042633);
            // console.log("Geolocation is not supported by this browser.");
        }
    }

    // called when location of user is successfully obtained
    function showPosition(position) {
        getMapData(position.coords.latitude, position.coords.longitude);
        // getMapData(28.406730, 77.042633);
    }

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
        getMapData(28.406730, 77.042633);
    }

    function getMapData(lat, lon) {
        // console.log(lat, lon);
        var data = {
                lat: lat,
                lon: lon
            }
            // console.log(encodeParams(data));
        $http({
            // url: 'http://35.154.60.19/api/GetMapData_1.0',
            url: 'http://35.154.60.19/api/GetMapData_1.0',
            method: 'GET',
            params: {
                args: encodeParams(data)
            }
        }).then(function(response) {
            // console.log(response);
            $scope.mapData = response.data;
            if (!$scope.dataFetchedOnce) {
                if (Object.keys(response.data).length > 0) {
                    $scope.dataFetchedOnce = true;
                }
            }
            for (key in $scope.mapData) {
                if ($scope.mapData[key].type == 'residential' || $scope.mapData[key].type == 'cghs') {
                    $scope.mapData[key].name;
                    data = [$scope.mapData[key].name, $scope.mapData[key].location.lat, $scope.mapData[key].location.lon, 'images/home/marker1.png', $scope.mapData[key].id];
                    $scope.projectMarkers.push(data);
                    if ($scope.mapData[key].cover == 'NA') {
                        image = 'images/general/default-image.jpg';
                    } else {
                        image = "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/' + $scope.mapData[key].type + '/' + $scope.mapData[key].id + '/images/coverPhoto/' + $scope.mapData[key].cover + '-s.jpg'
                    }
                    content = ['<div class="info_content">' +
                        '<div class="card info_content mg0">' +
                        '<div class="card-image">' +
                        '<img src="' + image + '">' +
                        '<div class="btn red absbtn details-link" id="' + key + '"><i class="material-icons left">details</i>See Details</div>' +
                        '</div>' +
                        '<div class="cardTitle row mgan bdbtm">' +
                        '<a class="col m8 black-text text-lighten-4 pd5 pd-tspanmap">' +
                        '<span class="b">' + $scope.mapData[key].name + '</span>' +
                        '<span class="ft12">Sohna Road, Sector 48 Gurgaon</span>' +
                        '</a>' +
                        '<div class="col m4 right-align pd5 ft12i" ng-show="' + $scope.mapData[key].rating + ' != 0">'
                        // '<span class="block b">' + $scope.mapData[key].rating + ' Reviews</span>' +
                        // '<span class="block">' +
                    ]
                    var starRating = '';
                    var thisClass = '';
                    for (var k = 0; k < 5; k++) {
                        if (k < $scope.mapData[key].rating) {
                            thisClass = 'blue-text'
                        } else {
                            thisClass = 'grey-text'
                        }
                        starRating += '<i class="material-icons blue-text ' + thisClass + '">star</i>'
                    }
                    content[0] += starRating;
                    content[0] += '</span>' +
                        '</div>' +
                        '</div>' +
                        '<div class="row mg0 ht50">' +
                        '<div class="col m6 pd5 dis-tab center ht50" ng-show="' + $scope.mapData[key].rent + '">' +
                        '<span class="block b ellipsis">Rent Price</span>' +
                        '<span class="ft12 block ellipsis">₹' + $scope.mapData[key].rent.min + ' - ₹' + $scope.mapData[key].rent.max + '</span>' +
                        '</div>' +
                        '<div class="col m6 pd5 center ht50">';

                    if ($scope.mapData[key].bhks) {
                        content[0] += '<span class="block b ellipsis">' + $scope.mapData[key].bhks + ' BHK</span>';
                    }
                    // '<span class="ft12 block ellipsis">1776 Sq. Ft. - 2345 Sq. </span>' +
                    content[0] += '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                    $scope.projectInfoWindow.push(content);
                } else if ($scope.mapData[key].type == 'locality') {
                    data = [$scope.mapData[key].name, $scope.mapData[key].location.lat, $scope.mapData[key].location.lon, 'images/home/marker2.png', $scope.mapData[key].id];
                    $scope.localityMarkers.push(data);
                    if ($scope.mapData[key].cover == 'NA') {
                        image = 'images/general/default-image.jpg';
                    } else {
                        image = "http://cdn.roofpik.com/roofpik/locality/" + $scope.cityId + '/' + $scope.mapData[key].id + '/images/coverPhoto/' + $scope.mapData[key].cover + '-s.jpg'
                    }
                    content = ['<div class="info_content">' +
                        '<div class="card info_content mg0">' +
                        '<div class="card-image">' +
                        '<img src="' + image + '">' +
                        '<div class="btn red absbtn details-link" id="' + key + '"><i class="material-icons left">details</i>See Details</div>' +
                        '</div>' +
                        '<div class="cardTitle row mgan bdbtm">' +
                        '<a class="col m8 black-text text-lighten-4 pd5 pd-tspanmap">' +
                        '<span class="b">' + $scope.mapData[key].name + '</span>' +
                        // '<span class="ft12">Sohna Road, Sector 48 Gurgaon</span>' +
                        '</a>' +
                        // '<div class="col m4 right-align pd5 ft12i" ng-show="' + $scope.mapData[key].rating + ' != 0">' +
                        // '<span class="block b">' + $scope.mapData[key].rating + ' Reviews</span>' +
                        // '<span class="block">' +
                        // '<i class="material-icons" ng-repeat="i in [1,2,3,4,5] track by $index" ng-class="$index <' + $scope.mapData[key].rating + ' "blue-text":"normal"">star</i>' +
                        // '</span>' +
                        // '</div>' +
                        '</div>' +
                        // '<div class="row mg0 ht50">' +
                        // '<div class="col m6 pd5 dis-tab center ht50" ng-show="' + $scope.mapData[key].rent + '">' +
                        // '<span class="block b ellipsis">Rent Price</span>' +
                        // '<span class="ft12 block ellipsis">₹' + $scope.mapData[key].rent.min + ' - ₹' + $scope.mapData[key].rent.max + '</span>' +
                        // '</div>' +
                        // '<div class="col m6 pd5 center ht50">' +
                        // '<span class="block b ellipsis">2, 3, 4 BHK</span>' +
                        // '<span class="ft12 block ellipsis">1776 Sq. Ft. - 2345 Sq. </span>' +
                        // '</div>' +
                        // '</div>' +
                        // '</div>' +
                        '</div>'
                    ]
                    $scope.localityInfoWindow.push(content);
                } else {
                    data = [$scope.mapData[key].name, $scope.mapData[key].location.lat, $scope.mapData[key].location.lon, 'images/home/marker3.png', $scope.mapData[key].id];
                    $scope.locationMarkers.push(data);
                    if ($scope.mapData[key].cover == 'NA') {
                        image = 'images/general/default-image.jpg';
                    } else {
                        image = "http://cdn.roofpik.com/roofpik/locations/" + $scope.cityId + '/' + $scope.mapData[key].id + '/images/coverPhoto/' + $scope.mapData[key].cover + '-s.jpg'
                    }
                    content = ['<div class="info_content">' +
                        '<div class="card info_content mg0">' +
                        '<div class="card-image">' +
                        '<img src="' + image + '">' +
                        '<div class="btn red absbtn details-link" id="' + key + '"><i class="material-icons left">details</i>See Details</div>' +
                        '</div>' +
                        '<div class="cardTitle row mgan bdbtm">' +
                        '<a class="col m8 black-text text-lighten-4 pd5 pd-tspanmap">' +
                        '<span class="b">' + $scope.mapData[key].name + '</span>' +
                        // '<span class="ft12">Sohna Road, Sector 48 Gurgaon</span>' +
                        '</a>' +
                        // '<div class="col m4 right-align pd5 ft12i" ng-show="' + $scope.mapData[key].rating + ' != 0">' +
                        // '<span class="block b">' + $scope.mapData[key].rating + ' Reviews</span>' +
                        // '<span class="block">' +
                        // '<i class="material-icons" ng-repeat="i in [1,2,3,4,5] track by $index" ng-class="$index <' + $scope.mapData[key].rating + ' "blue-text":"normal"">star</i>' +
                        // '</span>' +
                        // '</div>' +
                        '</div>' +
                        // '<div class="row mg0 ht50">' +
                        // '<div class="col m6 pd5 dis-tab center ht50" ng-show="' + $scope.mapData[key].rent + '">' +
                        // '<span class="block b ellipsis">Rent Price</span>' +
                        // '<span class="ft12 block ellipsis">₹' + $scope.mapData[key].rent.min + ' - ₹' + $scope.mapData[key].rent.max + '</span>' +
                        // '</div>' +
                        // '<div class="col m6 pd5 center ht50">' +
                        // '<span class="block b ellipsis">2, 3, 4 BHK</span>' +
                        // '<span class="ft12 block ellipsis">1776 Sq. Ft. - 2345 Sq. </span>' +
                        // '</div>' +
                        // '</div>' +
                        // '</div>' +
                        '</div>'
                    ]
                    $scope.locationInfoWindow.push(content);
                }
            }
            $timeout(function() {
                getMapList();
            }, 100);
        })
    }

    function initMap(m, infowindow) {
        // var map;
        var bounds = new google.maps.LatLngBounds();
        var mapOptions = {
            mapTypeId: 'roadmap'
        };
        // Display a map on the web page
        map = new google.maps.Map(document.getElementById("mapCanvas"), mapOptions);
        map.setTilt(50);

        // Multiple markers location, latitude, and longitude

        markers = m;

        // Info window content
        var infoWindowContent = infowindow;

        // Add multiple markers to map
        var infoWindow = new google.maps.InfoWindow({}),
            marker, i;

        // Place each marker on the map 
        finalMarkers = [];
        for (i = 0; i < markers.length; i++) {
            var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
            bounds.extend(position);
            marker = new google.maps.Marker({
                position: position,
                map: map,
                title: markers[i][0],
                icon: markers[i][3],
                animation: google.maps.Animation.DROP

            });
            finalMarkers.push(marker);
            google.maps.event.addListener(infoWindow, 'closeclick', function() {
                $('.LeftBox').css('left', '10px');
            });

            // Add info window to marker    
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infoWindow.setContent(infoWindowContent[i][0]);
                    infoWindow.open(map, marker);
                    $('.LeftBox').css('left', '-500px');
                }
            })(marker, i));
            // Center the map to fit all markers on the screen
            map.fitBounds(bounds);
        }



        google.maps.event.addListener(map, 'click', function(event) {
            $scope.projectMarkers = [];
            $scope.localityMarkers = [];
            $scope.locationMarkers = [];
            $scope.projectInfoWindow = [];
            $scope.localityInfoWindow = [];
            $scope.locationInfoWindow = [];
            $scope.listMenu = [];
            $scope.loading = true;
            $scope.goToPage(1);
            getMapData(event.latLng.lat(), event.latLng.lng());
        });

        google.maps.event.addListener(infowindow, 'domready', function() {
            // Reference to the DIV which receives the contents of the infowindow using jQuery
            var iwOuter = $('.gm-style-iw');
            /* The DIV we want to change is above the .gm-style-iw DIV.
             * So, we use jQuery and create a iwBackground variable,
             * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
             */
            var iwBackground = iwOuter.prev();
            // Remove the background shadow DIV
            iwBackground.children(':nth-child(2)').css({ 'display': 'none' });
            // Remove the white background DIV
            iwBackground.children(':nth-child(4)').css({ 'display': 'none' });

        });
        // Set zoom level
        var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
            this.setZoom(13);
            google.maps.event.removeListener(boundsListener);

        });
        $scope.loading = false;
    }

    $scope.openInfoWindow = function(index, from) {
        if (from == 'list') {
            $scope.searchedText = '';
            if (finalMarkers.length == 1) {
                getMapList();
            }
        }
        google.maps.event.trigger(finalMarkers[index], 'click');
    }

    // Select the list of items to be displayed on map and the list beside it
    $scope.selectType = function() {
        $scope.min = 0;
        $scope.max = 10;
        $scope.currentPage = 1;
        // console.log($scope.selectedType);
        getMapList();
        $scope.showList();
    }

    function getMapList() {
        if ($scope.selectedType == 'projects') {
            $scope.listMenu = $scope.projectMarkers;
            // console.log($scope.projectMarkers.length);
            getPages($scope.projectMarkers);
            $scope.menuTitle = 'Projects';
            initMap($scope.projectMarkers, $scope.projectInfoWindow);
        } else if ($scope.selectedType == 'localities') {
            $scope.listMenu = $scope.localityMarkers;
            getPages($scope.localityMarkers);
            $scope.menuTitle = 'Localities';
            initMap($scope.localityMarkers, $scope.localityInfoWindow);
        } else {
            $scope.listMenu = $scope.locationMarkers;
            getPages($scope.locationMarkers);
            $scope.menuTitle = 'Locations';
            initMap($scope.locationMarkers, $scope.locationInfoWindow);
        }
    }

    function getPages(markers) {
        if (markers.length / 10 > parseInt(markers.length / 10)) {
            $scope.numPages = parseInt(markers.length / 10) + 1;
        } else {
            $scope.numPages = parseInt(markers.length / 10);
        }
        $scope.pages = [];
        for (var i = 0; i < $scope.numPages; i++) {
            $scope.pages.push(i + 1);
        }
        $scope.lastPage = $scope.pages[$scope.pages.length - 1];
    }

    $scope.goToPage = function(i) {
        $scope.currentPage = i;
        $scope.min = (i - 1) * 10;
        $scope.max = $scope.min + 10;
    }

    $scope.changePage = function(val) {
        if (val == 1) {
            if ($scope.currentPage > 1) {
                $scope.goToPage($scope.currentPage - 1);
            }
        } else {
            if (val != $scope.lastPage) {
                $scope.goToPage($scope.currentPage + 1);
            }
        }
    }

    $scope.showList = function() {
        $scope.finalShow = !$scope.finalShow;
    }

    // get search results based on the string in input box
    $scope.getSearchData = function() {
        // console.log($scope.searchedText);
        if ($scope.searchedText.length > 2) {
            var data = {
                name: $scope.searchedText
            }
            $scope.fetchingResults = true;
            $http({
                url: 'http://35.154.60.19/api/GetByName_1.0',
                method: 'GET',
                params: {
                    args: encodeParams(data)
                }
            }).then(function mySucces(response) {
                // console.log(response);
                $scope.searchByNameResults = [];
                if (Object.keys(response.data).length > 0) {
                    // console.log(response.data);
                    for (key in response.data) {
                        $scope.searchByNameResults.push(response.data[key]);
                    }
                    $scope.showSearch = true;
                }
                $scope.fetchingResults = false;
                // console.log($scope.searchByNameResults);
            }, function myError(err) {
                // console.log(err);
                $scope.fetchingResults = false;
            })
        }
    }

    $scope.selectResult = function(val) {
        $scope.searchedText = val.name;
        $scope.mapSearched = val;
        $timeout(function() {
            $scope.showSearch = false;
        }, 200);
    }

    $scope.fetchData = function() {
        $scope.projectMarkers = [];
        $scope.localityMarkers = [];
        $scope.locationMarkers = [];
        $scope.projectInfoWindow = [];
        $scope.localityInfoWindow = [];
        $scope.locationInfoWindow = [];
        // console.log($scope.mapSearched.location.lat,$scope.mapSearched.location.lon);
        getMapData($scope.mapSearched.location.lat, $scope.mapSearched.location.lon);
    }


    // Take to details page if see details is clicked on any of the infowindows
    $(document).on("click", ".details-link", function() {
        var param = {};
        var clickedBtnID = $(this).attr('id'); // or var clickedBtnID = this.id
        if ($scope.mapData[clickedBtnID].type == 'locality' || $scope.mapData[clickedBtnID].type == 'location') {
            Materialize.toast('Coming Soon!', 2000);
        } else if ($scope.mapData[clickedBtnID].type == 'residential') {
            param = {
                projectId: $scope.mapData[clickedBtnID].id
            }
            $state.go('project-details', { p: encodeParams(param) });
        } else if ($scope.mapData[clickedBtnID].type == 'cghs') {
            param = {
                projectId: $scope.mapData[clickedBtnID].id,
                category: 'cghs'
            }
            $state.go('project-details', { p: encodeParams(param) });
        }
        // console.log($scope.mapData[clickedBtnID]);
    });
}]);