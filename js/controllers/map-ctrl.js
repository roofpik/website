app.controller('mapCtrl', ['$scope', '$timeout', '$http', function($scope, $timeout, $http) {
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
     var data = [];
     var image = '';
     var content = [];
     $scope.cityId = '-KYJONgh0P98xoyPPYm9';
     var markers = [];
     $scope.searchedText = '';
     $scope.searchByNameResults = {};
     var map;
     $scope.min = 0;
     $scope.max = 10;
     $scope.numPages = 1;

     getCurrentLocation();
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
         // getMapData(position.coords.latitude, position.coords.longitude);
         getMapData(28.406730, 77.042633);
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
        console.log(lat, lon);
         var data = {
             lat: lat,
             lon: lon
         }
         console.log(encodeParams(data));
         $http({
             // url: 'http://107.23.243.89/api/GetMapData_1.0',
             url: 'http://107.23.243.89/api/GetMapData_1.0',
             method: 'GET',
             params: {
                 args: encodeParams(data)
             }
         }).then(function(response) {
             console.log(response);
             console.log(Object.keys(response.data).length);
             $scope.mapData = response.data;
             for (key in $scope.mapData) {
                 if ($scope.mapData[key].type == 'residential' || $scope.mapData[key].type == 'cghs') {
                     data = [$scope.mapData[key].name, $scope.mapData[key].location.lat, $scope.mapData[key].location.lon, 'images/home/marker1.png', $scope.mapData[key].id];
                     $scope.projectMarkers.push(data);
                     if ($scope.mapData[key].cover == 'NA') {
                         image = 'images/sohna.jpg';
                     } else {
                         image = "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/residential/' + $scope.mapData[key].id + '/images/coverPhoto/' + $scope.mapData[key].cover + '-s.jpg'
                     }
                     content = ['<div class="info_content">' +
                         '<div class="card info_content mg0">' +
                         '<div class="card-image">' +
                         '<img src="' + image + '">' +
                         '<a href="" class="btn red absbtn"><i class="material-icons left">details</i>See Details</a>' +
                         '</div>' +
                         '<div class="cardTitle row mgbn bdbtm">' +
                         '<a class="col m8 black-text text-lighten-4 pd5 pd-tspanmap">' +
                         '<span class="b">' + $scope.mapData[key].name + '</span>' +
                         '<span class="ft12">Sohna Road, Sector 48 Gurgaon</span>' +
                         '</a>' +
                         '<div class="col m4 right-align pd5 ft12i" ng-show="' + $scope.mapData[key].rating + ' != 0">' +
                         '<span class="block b">' + $scope.mapData[key].rating + ' Reviews</span>' +
                         '<span class="block">' +
                         '<i class="material-icons" ng-repeat="i in [1,2,3,4,5] track by $index" ng-class="$index <' + $scope.mapData[key].rating + ' "blue-text":"normal"">star</i>' +
                         '</span>' +
                         '</div>' +
                         '</div>' +
                         '<div class="row mg0 ht50">' +
                         '<div class="col m6 pd5 dis-tab center ht50" ng-show="' + $scope.mapData[key].rent + '">' +
                         '<span class="block b ellipsis">Rent Price</span>' +
                         '<span class="ft12 block ellipsis">₹' + $scope.mapData[key].rent.min + ' - ₹' + $scope.mapData[key].rent.max + '</span>' +
                         '</div>' +
                         '<div class="col m6 pd5 center ht50">' +
                         '<span class="block b ellipsis">2, 3, 4 BHK</span>' +
                         '<span class="ft12 block ellipsis">1776 Sq. Ft. - 2345 Sq. </span>' +
                         '</div>' +
                         '</div>' +
                         '</div>' +
                         '</div>'
                     ]
                     $scope.projectInfoWindow.push(content);
                 } else if ($scope.mapData[key].type == 'locality') {
                     data = [$scope.mapData[key].name, $scope.mapData[key].location.lat, $scope.mapData[key].location.lon, 'images/home/marker2.png', $scope.mapData[key].id];
                     $scope.localityMarkers.push(data);
                     if ($scope.mapData[key].cover == 'NA') {
                         image = 'images/sohna.jpg';
                     } else {
                         image = "http://cdn.roofpik.com/roofpik/locality/" + $scope.cityId + '/' + $scope.mapData[key].id + '/images/coverPhoto/' + $scope.mapData[key].cover + '-s.jpg'
                     }
                     content = ['<div class="info_content">' +
                         '<div class="card info_content mg0">' +
                         '<div class="card-image">' +
                         '<img src="' + image + '">' +
                         '<a href="" class="btn red absbtn"><i class="material-icons left">details</i>See Details</a>' +
                         '</div>' +
                         '<div class="cardTitle row mgbn bdbtm">' +
                         '<a class="col m8 black-text text-lighten-4 pd5 pd-tspanmap">' +
                         '<span class="b">' + $scope.mapData[key].name + '</span>' +
                         '<span class="ft12">Sohna Road, Sector 48 Gurgaon</span>' +
                         '</a>' +
                         '<div class="col m4 right-align pd5 ft12i" ng-show="' + $scope.mapData[key].rating + ' != 0">' +
                         '<span class="block b">' + $scope.mapData[key].rating + ' Reviews</span>' +
                         '<span class="block">' +
                         '<i class="material-icons" ng-repeat="i in [1,2,3,4,5] track by $index" ng-class="$index <' + $scope.mapData[key].rating + ' "blue-text":"normal"">star</i>' +
                         '</span>' +
                         '</div>' +
                         '</div>' +
                         '<div class="row mg0 ht50">' +
                         '<div class="col m6 pd5 dis-tab center ht50" ng-show="' + $scope.mapData[key].rent + '">' +
                         '<span class="block b ellipsis">Rent Price</span>' +
                         '<span class="ft12 block ellipsis">₹' + $scope.mapData[key].rent.min + ' - ₹' + $scope.mapData[key].rent.max + '</span>' +
                         '</div>' +
                         '<div class="col m6 pd5 center ht50">' +
                         '<span class="block b ellipsis">2, 3, 4 BHK</span>' +
                         '<span class="ft12 block ellipsis">1776 Sq. Ft. - 2345 Sq. </span>' +
                         '</div>' +
                         '</div>' +
                         '</div>' +
                         '</div>'
                     ]
                     $scope.localityInfoWindow.push(content);
                 } else {
                     data = [$scope.mapData[key].name, $scope.mapData[key].location.lat, $scope.mapData[key].location.lon, 'images/home/marker3.png', $scope.mapData[key].id];
                     $scope.locationMarkers.push(data);
                     if ($scope.mapData[key].cover == 'NA') {
                         image = 'images/sohna.jpg';
                     } else {
                         image = "http://cdn.roofpik.com/roofpik/locations/" + $scope.cityId + '/' + $scope.mapData[key].id + '/images/coverPhoto/' + $scope.mapData[key].cover + '-s.jpg'
                     }
                     content = ['<div class="info_content">' +
                         '<div class="card info_content mg0">' +
                         '<div class="card-image">' +
                         '<img src="' + image + '">' +
                         '<a href="" class="btn red absbtn"><i class="material-icons left">details</i>See Details</a>' +
                         '</div>' +
                         '<div class="cardTitle row mgbn bdbtm">' +
                         '<a class="col m8 black-text text-lighten-4 pd5 pd-tspanmap">' +
                         '<span class="b">' + $scope.mapData[key].name + '</span>' +
                         '<span class="ft12">Sohna Road, Sector 48 Gurgaon</span>' +
                         '</a>' +
                         '<div class="col m4 right-align pd5 ft12i" ng-show="' + $scope.mapData[key].rating + ' != 0">' +
                         '<span class="block b">' + $scope.mapData[key].rating + ' Reviews</span>' +
                         '<span class="block">' +
                         '<i class="material-icons" ng-repeat="i in [1,2,3,4,5] track by $index" ng-class="$index <' + $scope.mapData[key].rating + ' "blue-text":"normal"">star</i>' +
                         '</span>' +
                         '</div>' +
                         '</div>' +
                         '<div class="row mg0 ht50">' +
                         '<div class="col m6 pd5 dis-tab center ht50" ng-show="' + $scope.mapData[key].rent + '">' +
                         '<span class="block b ellipsis">Rent Price</span>' +
                         '<span class="ft12 block ellipsis">₹' + $scope.mapData[key].rent.min + ' - ₹' + $scope.mapData[key].rent.max + '</span>' +
                         '</div>' +
                         '<div class="col m6 pd5 center ht50">' +
                         '<span class="block b ellipsis">2, 3, 4 BHK</span>' +
                         '<span class="ft12 block ellipsis">1776 Sq. Ft. - 2345 Sq. </span>' +
                         '</div>' +
                         '</div>' +
                         '</div>' +
                         '</div>'
                     ]
                     $scope.locationInfoWindow.push(content);
                 }
             }
             $timeout(function() {
                 console.log($scope.selectedType)
                 if ($scope.selectedType == 'projects') {
                     $scope.listMenu = $scope.projectMarkers;
                     $scope.menuTitle = 'Projects';
                     initMap($scope.projectMarkers, $scope.projectInfoWindow);
                 } else if ($scope.selectedType == 'localities') {
                     $scope.listMenu = $scope.localityMarkers;
                     $scope.menuTitle = 'Localities';
                     initMap($scope.localityMarkers, $scope.localityInfoWindow);
                 } else if ($scope.selectedType == 'locations') {
                     $scope.listMenu = $scope.locationMarkers;
                     $scope.menuTitle = 'Locations';
                     initMap($scope.locationMarkers, $scope.locationInfoWindow);
                 }
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
             google.maps.event.addListener(infoWindow, 'closeclick', function() {
                 $('.LeftBox').css('left', '10px');
             });
             // $('#map-list').append('<a class="greytran white-text pda10 marker-link" data-markerid="' + i + '">' + markers[i][0] + '</a>');

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

         // $('.marker-link').on('click', function() {
         //     // console.log(markers[$(this).data('markerid')]);
         //     // console.log($(this).data('markerid'));
         //     // console.log(infoWindowContent[$(this).data('markerid')][0]);
         //     // console.log(infoWindowContent[markers[$(this).data('markerid')]][0]);
         //     // return function() {
         //            // console.log(infoWindowContent[markers[$(this).data('markerid')]][0]);
         //            debugger;
         //             infoWindow.setContent(infoWindowContent[$(this).data('markerid')][0]);

         //             infoWindow.open(map, markers[$(this).data('markerid')]);
         //             $('.LeftBox').css('left', '-500px');
         //         // }
         //     // google.maps.event.trigger(markers[$(this).data('markerid')], 'click');
         // });
     }

     // Select the list of items to be displayed on map and the list beside it
     $scope.selectType = function() {
         $scope.min = 0;
         $scope.max = 10;
         console.log($scope.selectedType);
         if ($scope.selectedType == 'projects') {
             $scope.listMenu = $scope.projectMarkers;
             // if($scope.projectMarkers.length/10 >)
             $scope.menuTitle = 'Projects';
             initMap($scope.projectMarkers, $scope.projectInfoWindow);
         } else if ($scope.selectedType == 'localities') {
             $scope.listMenu = $scope.localityMarkers;
             $scope.menuTitle = 'Localities';
             initMap($scope.localityMarkers, $scope.localityInfoWindow);
         } else {
             $scope.listMenu = $scope.locationMarkers;
             $scope.menuTitle = 'Locations';
             initMap($scope.locationMarkers, $scope.locationInfoWindow);
         }
         $scope.showList();
     }

     $scope.showList = function() {
         $scope.finalShow = !$scope.finalShow;
     }

     // get search results based on the string in input box
     $scope.getSearchData = function() {
         console.log($scope.searchedText);
         if ($scope.searchedText.length > 2) {
             var data = {
                 name: $scope.searchedText
             }
             console.log(data);
             $http({
                 url: 'http://107.23.243.89/api/GetByName_1.0',
                 method: 'GET',
                 params: {
                     args: encodeParams(data)
                 }
             }).then(function mySucces(response) {
                 console.log(response);
                 if(Object.keys(response.data).length > 0){
                    console.log(response.data);
                    $scope.searchByNameResults = response.data;
                    $scope.showSearch = true;
                 }
                 console.log($scope.searchByNameResults);
             }, function myError(err) {
                 console.log(err);
             })
         }
     }

     $scope.selectResult = function(val){
        $scope.searchedText = val.name;
        $scope.showSearch = false;

        // redirect to a view or show on map after selection
     }
 }]);
