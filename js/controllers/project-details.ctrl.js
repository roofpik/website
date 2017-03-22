app.controller('projectDetailsCtrl', function($scope, $timeout) {
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


        ];



        // Info window content
        var infoWindowContent = [

            ['<div class="row relative mgbn">' +
                '<div class="col s4 imglist pdb10">' +
                '<a href=""> <img src="images/olive.jpg" class="responsive-img"></a>' +
                '</div>' +
                '<div class="col s6 pdln">' +
                '<div class="truncate grey-text ft12">lorem ipsum</div>' +
                '<h2 class="ft18 b mgbn mgt5 truncate"><a href="" class="redt"> The Olive Heights</a></h2>' +
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
    google.maps.event.addDomListener(window, 'load', initMap);
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
    $('.gallery').each(function() { // the containers for all your galleries
        $(this).magnificPopup({
            delegate: 'a', // the selector for gallery item
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    });
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

    $scope.countryId = '-K_43TEI8cBodNbwlKqJ';
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    $scope.micromarketId = '-KfM5tQ-UKt6DtrWtzeE';
    $scope.localityId = '-KfRC32KzT4Tjo0O14kI';
    $scope.projectId = '-Kfp4KJG2TlJYKI6-iZ0';
    $scope.pros = [];
    $scope.cons = [];
    $scope.specifications = {};
    db.ref('project/country/' + $scope.countryId + '/city/' + $scope.cityId + '/residential/micromarket/' + $scope.micromarketId + '/locality/' + $scope.localityId + '/projects/' + $scope.projectId).once('value', function(snapshot) {
        console.log(snapshot.val());
        $timeout(function() {
            $scope.project = snapshot.val();
            console.log($scope.project['cover-image']);
            $scope.coverImage = getImageUrl($scope.project['cover-image']);
            for(key in $scope.project.specifications){
            	var x = camelCaseToTitleCase(key);
            	$scope.specifications[x] = {};
            	for(key1 in $scope.project.specifications[key]){
            		var y = camelCaseToTitleCase(key1);
            		$scope.specifications[x][y] = $scope.project.specifications[key][key1];
            	}
            }
            console.log($scope.project.specifications);
            if ($scope.project.highlights) {
                if ($scope.project.highlights.pros) {
                    $scope.pros = $scope.project.highlights.pros.split("*");
                }
                if ($scope.project.highlights.cons) {
                    $scope.cons = $scope.project.highlights.cons.split("*");
                }

            }
            if ($scope.project.general.about) {
                console.log($scope.project.general.about.length);
                if ($scope.project.general.about.length > 500) {
                    $scope.project.general.about1 = $scope.project.general.about.substring(0, 500);
                    $scope.project.general.about2 = $scope.project.general.about.substring(501, $scope.project.general.about.length);
                } else {
                    $scope.project.general.about1 = $scope.project.general.about;
                }
            } else {
                console.log('else');
            }
            console.log($scope.coverImage);
        })

    })
})
