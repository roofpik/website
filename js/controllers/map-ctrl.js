 app.controller('mapCtrl', ['$scope', '$timeout', '$http', function($scope, $timeout, $http) {
     $scope.selectedType = 'projects';
     console.log('called');
     $('.collapsible').collapsible();  
     $('.draggable').attr('draggable', true);

     $('.dropdown-button').dropdown();
     $('input.autocomplete').autocomplete({
         data: {
             "Apple": null,
             "App": null,
             "Ap": null,
             "Microsoft": null,
             "Google": 'http://placehold.it/250x250'
         }
     });

     var projectMarkers = [];
     var localityMarkers = [];
     var locationMarkers = [];
     var projectInfoWindow = [];
     var localityInfoWindow = [];
     var locationInfoWindow = [];

     getCurrentLocation();
     // Code to get current location of user
     function getCurrentLocation() {
         if (navigator.geolocation) {
             navigator.geolocation.getCurrentPosition(showPosition, showError);
         } else {
             // console.log("Geolocation is not supported by this browser.");
             // getLocations();
         }
     }

     // called when location of user is successfully obtained
     function showPosition(position) {
         // if (parameter.length != 0) {
         //     parameter += "&"
         // }

         // parameter += "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
         getMapData(position.coords.latitude, position.coords.longitude);
         // getLocations();
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
         getMapData(28.4594965, 77.02663830000006);
     }


     function getMapData(lat, lon) {
         console.log('called');
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
         }).then(function(response) {
             console.log(response);
             console.log(Object.keys(response.data).length);
             $scope.mapData = response.data;
             for (key in $scope.mapData) {
                 if ($scope.mapData[key].type == 'residential') {
                    var data = [$scope.mapData[key].name, $scope.mapData[key].location.lat, $scope.mapData[key].location.lon, 'images/home/marker1.png'];
                    projectMarkers.push(data);
                    var content = ['<div class="info_content">' +
                                     '<div class="card info_content mg0">' +
                                     '<div class="card-image">' +
                                     '<img src="images/sohna.jpg">' +
                                     '<a href="" class="btn grey darken-4 absbtn"><i class="material-icons left">details</i>See Details</a>' +
                                     '</div>' +
                                     '<div class="cardTitle row mgan bdbtm">' +
                                     '<a class="col m8 black-text text-lighten-4 pd5 pd-tspanmap">' +
                                     '<span class="b">'+$scope.mapData[key].name+'</span>' +
                                     '<span class="ft12">Sohna Road, Sector 48 Gurgaon</span>' +
                                     '</a>' +
                                     '<div class="col m4 right-align pd5 ft12i">' +
                                     '<span class="block b">'+$scope.mapData[key].rating +' Reviews</span>' +
                                     '<span class="block">' +
                                     '<i class="material-icons" ng-repeat="i in [1,2,3,4,5] track by $index" ng-class="$index <'+$scope.mapData[key].rating+' "blue-text":"normal"">star</i>' +
                                     '</span>' +
                                     '</div>' +
                                     '</div>' +
                                     '<div class="row mg0 ht50">' +
                                     '<div class="col m6 pd5 dis-tab center ht50">' +
                                     '<span class="block b ellipsis">Rent Price</span>' +
                                     '<span class="ft12 block ellipsis">₹'+$scope.mapData[key].rent.min+' - ₹'+$scope.mapData[key].rent.max+'</span>' +
                                     '</div>' +
                                     '<div class="col m6 pd5 center ht50">' +
                                     '<span class="block b ellipsis">2, 3, 4 BHK</span>' +
                                     '<span class="ft12 block ellipsis">1776 Sq. Ft. - 2345 Sq. </span>' +
                                     '</div>' +
                                     '</div>' +
                                     '</div>' +
                                     '</div>'
                                  ]
                    projectInfoWindow.push(content);
                 }
             }

            console.log(projectMarkers, projectInfoWindow);
             $timeout(function() {
                 // google.maps.event.addDomListener(window, 'load', initMap);
                 initMap();
             }, 100);
         })
     }

     function initMap() {
         var map;
         var bounds = new google.maps.LatLngBounds();
         var mapOptions = {
             mapTypeId: 'roadmap'
         };
         // Display a map on the web page
         map = new google.maps.Map(document.getElementById("mapCanvas"), mapOptions);
         map.setTilt(50);

         // Multiple markers location, latitude, and longitude

         var markers = [

             ['Vipul Trade Center, NY', 28.406909, 77.042623],
             ['Shona Road, NY', 28.416920, 77.042746, 'images/home/marker1.png'],
             ['IFFCO Chowk Metro Station, NY', 28.471623, 77.072390, 'images/home/marker2.png'],
             ['Huda Metro Station, NY', 28.459552, 77.072430, 'images/home/marker3.png']

         ];

         // Info window content
         var infoWindowContent = [

             ['<div class="info_content">' +
                 '<div class="card info_content mg0">' +
                 '<div class="card-image">' +
                 '<img src="images/sohna.jpg">' +
                 '<a href="" class="btn red absbtn"><i class="material-icons left">details</i>See Details</a>' +
                 '</div>' +
                 '<div class="cardTitle row mgbn bdbtm">' +
                 '<a class="col m8 black-text text-lighten-4 pd5 pd-tspanmap">' +
                 '<span class="b">Bestech Park View City 1</span>' +
                 '<span class="ft12">Sohna Road, Sector 48 Gurgaon</span>' +
                 '</a>' +
                 '<div class="col m4 right-align pd5 ft12i">' +
                 '<span class="block b">5 Reviews</span>' +
                 '<span class="block">' +
                 '<i class="material-icons blue-text">star</i><i class="material-icons blue-text">star</i><i class="material-icons blue-text">star</i><i class="material-icons blue-text">star</i><i class="material-icons blue-text">star</i>' +
                 '</span>' +
                 '</div>' +
                 '</div>' +
                 '<div class="row mg0 ht50">' +
                 '<div class="col m6 pd5 dis-tab center ht50">' +
                 '<span class="block b ellipsis">Rent Price</span>' +
                 '<span class="ft12 block ellipsis">₹28000 - ₹55000</span>' +
                 '</div>' +
                 '<div class="col m6 pd5 center ht50">' +
                 '<span class="block b ellipsis">2, 3, 4 BHK</span>' +
                 '<span class="ft12 block ellipsis">1776 Sq. Ft. - 2345 Sq. </span>' +
                 '</div>' +
                 '</div>' +
                 '</div>' +
                 '</div>'
             ]

         ];

         // Add multiple markers to map
         var infoWindow = new google.maps.InfoWindow({}),
             marker, i;

         // Place each marker on the map  
         for (i = 0; i < projectMarkers.length; i++) {
             var position = new google.maps.LatLng(projectMarkers[i][1], projectMarkers[i][2]);
             bounds.extend(position);
             marker = new google.maps.Marker({
                 position: position,
                 map: map,
                 title: projectMarkers[i][0],
                 icon: projectMarkers[i][3],
                 animation: google.maps.Animation.DROP

             });
             google.maps.event.addListener(infoWindow, 'closeclick', function() {
                 $('.LeftBox').css('left', '10px');
             });
             // Add info window to marker    
             google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
                 return function() {
                     infoWindow.setContent(projectInfoWindow[i][0]);
                     infoWindow.open(map, marker);
                     $('.LeftBox').css('left', '-500px');
                 }
             })(marker, i));
             // Center the map to fit all markers on the screen
             map.fitBounds(bounds);
         }

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
     }

     // Load initialize function

     $scope.selectType = function() {
         if ($scope.selectedType == 'projects') {

         } else if ($scope.selectedType == 'localities') {

         } else {

         }
     }

     $scope.listNum = [1,2,3,4,5];

 }]);
