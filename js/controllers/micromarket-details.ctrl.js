app.controller('micromarketDetailsCtrl', function($scope, $timeout, $stateParams, $http, $q, imageUrl) {
    $scope.micromarket = {};
    $scope.pros = [];
    $scope.cons = [];
    db.ref('locations/country/-K_43TEI8cBodNbwlKqJ/micromarket/city/' + $stateParams.city + '/places/' + $stateParams.micro).once('value', function(snapshot) {
        $timeout(function() {
            if (snapshot.val()) {
                $scope.micromarket = snapshot.val();
                var defer = $q.defer();
                var t = imageUrl.getUrl($scope.micromarket['cover-image'], defer);
                t.then(function(response) {
                    $scope.coverImage = response;
                });
                if ($scope.micromarket.about) {
                    // console.log($scope.micromarket.about.length);
                    if ($scope.micromarket.about.length > 500) {
                        $scope.micromarket.about1 = $scope.micromarket.about.substring(0, 500);
                        $scope.micromarket.about2 = $scope.micromarket.about.substring(501, $scope.micromarket.about.length);
                    } else {
                        $scope.micromarket.about1 = $scope.micromarket.about;
                    }
                }
                if ($scope.micromarket.highlight) {
                    if ($scope.micromarket.highlight.pros) {
                        $scope.pros = $scope.micromarket.highlight.pros.split("*");
                    }
                    if ($scope.micromarket.highlight.cons) {
                        $scope.cons = $scope.micromarket.highlight.cons.split("*");
                    }

                }
            }
        }, 0);
    })

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

            [$scope.micromarket.name, $scope.micromarket.lat, $scope.micromarket.lng]


        ];



        // Info window content
        var infoWindowContent = [

            ['<div class="row relative mgbn">' +
                '<div class="col s4 imglist pdb10">' +
                '<a href=""> <img src="' + $scope.coverImage + '" class="responsive-img"></a>' +
                '</div>' +
                '<div class="col s6 pdln">' +
                '<div class="truncate grey-text ft12">lorem ipsum</div>' +
                '<h2 class="ft18 b mgbn mgt5 truncate"><a href="" class="redt">' + $scope.micromarket.name + '</a></h2>' +
                '<h6 class="mgbn ft12 truncate b text-darken-2 mgt5">' +
                '<a href="" class="grey-text"> Golf Course Road, Sector 56</a>' +
                '</h6>' +
                '<div class="grey-text mgt5 ft12">lorem ipsum</div>' +
                '</div>' +
                '<div class="col s2 pdln right-align">' +
                '<span class="pdl10 pdr10 b grnbg white-text">4.7</span>' +
                '<div class="ft11 grey-text mgt5">7832 votes </div>' +
                '<div class="ft11 grey-text">4233 reviews</div>' +
                '</div>' +
                '</div>'
            ],

        ];


        // Add multiple markers to map
        var infoWindow = new google.maps.InfoWindow({

            }),
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


            // Add info window to marker    
            google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
                return function() {
                    infoWindow.setContent(infoWindowContent[i][0]);

                    infoWindow.open(map, marker);


                }
            })(marker, i));



            // Center the map to fit all markers on the screen
            map.fitBounds(bounds);
        }

        // Set zoom level
        var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
            this.setZoom(13);
            google.maps.event.removeListener(boundsListener);

        });


    }

    // Load initialize function
    // google.maps.event.addDomListener(window, 'load', initMap);


    $(document).ready(function() {
        $('ul.tabs').tabs();
        Materialize.updateTextFields();

        $('.button-collapse').sideNav({
            menuWidth: 300, // Default is 240
            edge: 'left', // Choose the horizontal origin
            closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
            draggable: true // Choose whether you can drag to open on touch screens
        });
        $('select').material_select();
        $('.slider').slider();
        $('.dropdown-button').dropdown();
        $('.carousel').carousel();
        $('.modal').modal();

    });

    $('.gallery').each(function() { // the containers for all your galleries
        $(this).magnificPopup({
            delegate: 'a', // the selector for gallery item
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    })
    $(function() {
        var menu = $('#fixsub_hd'),
            pos = menu.offset();
        $(window).scroll(function() {
            if ($(this).scrollTop() > pos.top + menu.height() && menu.hasClass('displayn')) {
                menu.fadeOut('fast', function() {
                    $(this).removeClass('displayn').addClass('fixed').fadeIn('fast');
                });
            } else if ($(this).scrollTop() <= pos.top && menu.hasClass('fixed')) {
                menu.fadeOut('fast', function() {
                    $(this).removeClass('fixed').addClass('displayn').fadeIn('fast');
                });
            }
        });
    });

    $scope.openModal = function() {
        $('#view_map_popup').modal('open');
        initMap();
    }
})
