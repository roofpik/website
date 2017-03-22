app.controller('projectDetailsCtrl', function($scope, $timeout, $q, imageUrl) {
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
            map.fitBounds(bounds);
        }
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
    $scope.allAmenities = {
        'basic': {
            'carParking': {
                name: 'Car Parking',
                img: 'images/icons/car-parking.png'
            },
            'cctv': {
                name: 'CCTV',
                img: 'images/icons/cctv.png'
            },
            'clubhouse': {
                name: 'Clubhouse',
                img: 'images/icons/clubhouse.png'
            },
            'fireProtection': {
                name: 'Fire Protection',
                img: 'images/icons/fire.png'
            },
            'gym': {
                name: 'Gym',
                img: 'images/icons/gym.png'
            },
            'intercom': {
                name: 'Intercom',
                img: 'images/icons/Intercom.png'
            },
            'kidsPlayArea': {
                name: 'Kids Play Area',
                img: 'images/icons/kidsPlayground.png'
            },
            'kidsPool': {
                name: 'Kids Pool',
                img: 'images/icons/Pool_2.png'
            },
            'lifts': {
                name: 'Lifts',
                img: 'images/icons/lift.png'
            },
            'parks': {
                name: 'Parks',
                img: 'images/icons/garden.png'
            },
            'powerBackup': {
                name: 'Power Backup',
                img: 'images/icons/power-backup.png'
            },
            'security': {
                name: 'Security 24X7',
                img: 'images/icons/group_full_security.png'
            },
            'swimmingPool': {
                name: 'Swimming Pool',
                img: 'images/icons/swiming-pool.png'
            },
            'videoPhone': {
                name: 'Video Phone',
                img: 'images/icons/smartphones.png'
            },
            'waterSupply': {
                name: 'Water Supply 24X7',
                img: 'images/icons/water3.png'
            }
        },
        'convenience': {
            'badmintonCourt': {
                name: 'Badminton Court',
                img: 'images/icons/Tennis_court.png'
            },
            'football': {
                name: 'Football',
                img: 'images/icons/basketball.png'
            },
            'inhouseChemist': {
                name: 'Inhouse Chemist',
                img: 'images/icons/Inhouse-chemist.png'
            },
            'inhouseGroceryStore': {
                name: 'Inhouse Grocery Store',
                img: 'images/icons/store.png'
            },
            'inhousePlaySchool': {
                name: 'Inhouse Play School',
                img: 'images/icons/Bookmark.png'
            },
            'inhouseRestaurant': {
                name: 'Inhouse Restaurant',
                img: 'images/icons/restaurant.png'
            },
            'multipurposeCourt': {
                name: 'Multipurpose Court',
                img: 'images/icons/court.png'
            },
            'squashCourt': {
                name: 'Squash Court',
                img: 'images/icons/balls-snooker.png'
            },
            'volleyball': {
                name: 'Volleyball',
                img: 'images/icons/Volleyball.png'
            }
        },
        'entertainment': {
            'amphitheatre': {
                name: 'Amphitheatre',
                img: 'images/icons/Amphitheatre.png'
            },
            'bowling': {
                name: 'Bowling',
                img: 'images/icons/bowling.png'
            },
            'cafe': {
                name: 'Cafe',
                img: 'images/icons/cafe.png'
            },
            'cardsRoom': {
                name: 'Cards Room',
                img: 'images/icons/card.png'
            },
            'jacuzzi': {
                name: 'Jacuzzi',
                img: 'images/icons/Jacuzzi.png'
            },
            'miniTheatre': {
                name: 'Mini Theatre',
                img: 'images/icons/Theatre.png'
            },
            'partyHall': {
                name: 'Party Hall',
                img: 'images/icons/hall.png'
            },
            'spaSteamSauna': {
                name: 'Spa',
                img: 'images/icons/spa.png'
            },
            'videoGames': {
                name: 'Video Games',
                img: 'images/icons/video-games.png'
            }
        },
        'safety': {
            'gatedCommunity': {
                name: 'Gated Community',
                img: 'images/icons/group2.png'
            },
            'guardAtLiftLobby': {
                name: 'Guard At Lift Lobby',
                img: 'images/icons/Elevator.png'
            },
            'guestAccomodation': {
                name: 'Guest Accomodation',
                img: 'images/icons/hotel.png'
            },
            'petArea': {
                name: 'Pet Area',
                img: 'images/icons/miscellaneous-62.png'
            },
            'smartCardBiometric': {
                name: 'SmartCard/Biometric',
                img: 'images/icons/smart-card.png'
            },
            'visitorParking': {
                name: 'Visitor Parking',
                img: 'images/icons/Parking.png'
            }
        },
        'others': {
            'indoorGames': {
                name: 'Indoor Games',
                img: 'images/icons/chess.png'
            },
            'library': {
                name: 'Library',
                img: 'images/icons/Library.png'
            },
            'maintenanceStaff': {
                name: 'Maintenance Staff',
                img: 'images/icons/group_full_security.png'
            },
            'rainWaterHarvesting': {
                name: 'Rain Water Harvesting',
                img: 'images/icons/weather-04.png'
            },
            'wasteDisposal': {
                name: 'Waste Disposal',
                img: 'images/icons/wastedisposal.png'
            }
        },
        'sports': {
            'basketballCourt': {
                name: 'Basketball Court',
                img: 'images/icons/basketball.png'
            },
            'cricket': {
                name: 'Cricket',
                img: 'images/icons/cricket.png'
            },
            'golfCourseFacing': {
                name: 'Golf Course Facing',
                img: 'images/icons/1golf.png'
            },
            'golfPutting': {
                name: 'Golf Putting',
                img: 'images/icons/golf.png'
            },
            'joggingTrack': {
                name: 'Jogging Track',
                img: 'images/icons/walk.png'
            },
            'skatingRink': {
                name: 'Skating Rink',
                img: 'images/icons/icon-skate.png'
            },
            'snookerPool': {
                name: 'Snooker/Pool',
                img: 'images/icons/balls-snooker.png'
            },
            'tableTennis': {
                name: 'Table Tennis',
                img: 'images/icons/court.png'
            },
            'tennisCourt': {
                name: 'Tennis Court',
                img: 'images/icons/Tennis_court.png'
            }
        }
    };

    $scope.amenitiesPresent = {
        'basic': {
            'present': false,
            'name': 'Basic',
            'hrefLink': '#basic'
        },
        'convenience': {
            'present': false,
            'name': 'Convenience',
            'hrefLink': '#convenience'
        },
        'entertainment': {
            'present': false,
            'name': 'Entertainment',
            'hrefLink': '#entertainment'
        },
        'safety': {
            'present': false,
            'name': 'Safety',
            'hrefLink': '#safety'
        },
        'others': {
            'present': false,
            'name': 'Others',
            'hrefLink': '#others'
        },
        'sports': {
            'present': false,
            'name': 'Sports',
            'hrefLink': '#sports'
        }
    };
    db.ref('project/country/' + $scope.countryId + '/city/' + $scope.cityId + '/residential/micromarket/' + $scope.micromarketId + '/locality/' + $scope.localityId + '/projects/' + $scope.projectId).once('value', function(snapshot) {
        // console.log(snapshot.val());
        $timeout(function() {
            $scope.project = snapshot.val();
            var defer = $q.defer();
            var t = imageUrl.getUrl($scope.project['cover-image'], defer);
            t.then(function(response) {
                $scope.coverImage = response;
            });

            getImages($scope.project.images);
            if ($scope.project.amenities) {
                generateAmenitiesList($scope.project.amenities);
            }
            for (key in $scope.project.specifications) {
                var x = camelCaseToTitleCase(key);
                $scope.specifications[x] = {};
                for (key1 in $scope.project.specifications[key]) {
                    var y = camelCaseToTitleCase(key1);
                    $scope.specifications[x][y] = $scope.project.specifications[key][key1];
                }
            }
            // console.log($scope.project.specifications);
            if ($scope.project.highlights) {
                if ($scope.project.highlights.pros) {
                    $scope.pros = $scope.project.highlights.pros.split("*");
                }
                if ($scope.project.highlights.cons) {
                    $scope.cons = $scope.project.highlights.cons.split("*");
                }

            }
            if ($scope.project.general.about) {
                // console.log($scope.project.general.about.length);
                if ($scope.project.general.about.length > 500) {
                    $scope.project.general.about1 = $scope.project.general.about.substring(0, 500);
                    $scope.project.general.about2 = $scope.project.general.about.substring(501, $scope.project.general.about.length);
                } else {
                    $scope.project.general.about1 = $scope.project.general.about;
                }
            }
        })
    })

    function generateAmenitiesList(amenities) {
        for (key in amenities) {
            for (key1 in amenities[key]) {
                if (amenities[key][key1] != 'NA') {
                    $scope.amenitiesPresent[key].present = true;
                }
            }
        }

        for (key in $scope.amenitiesPresent) {
            if ($scope.amenitiesPresent[key].present) {
                $scope.showAmenities = true;
            }
        }
        $timeout(function() {
            $('ul.tabs').tabs();
        }, 100);
        // console.log($scope.amenitiesPresent);
    }

    $scope.images = [];

    function getImages(images) {
        for (key in images) {
            var defer = $q.defer();
            var t = imageUrl.getUrl(key, defer);
            t.then(function(response) {
                $scope.images.push(response);
            });
        }
        console.log($scope.images);
        $timeout(function() {
            $('.gallery').each(function() { // the containers for all your galleries
                $(this).magnificPopup({
                    delegate: 'a', // the selector for gallery item
                    type: 'image',
                    gallery: {
                        enabled: true
                    }
                });
            });
        }, 100);
    }
})
