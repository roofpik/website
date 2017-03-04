app.controller('projectDetailsCtrl', ['$scope', '$timeout', '$stateParams', '$rootScope', '$state', '$http', function($scope, $timeout, $stateParams, $rootScope, $state, $http) {
    $('ul.tabs').tabs();
    $('.materialboxed').materialbox();
    // loading(true);
    $scope.loading = true;
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    var parameters = decodeParams($stateParams.p);
    console.log(parameters);
    var parameter = '';
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            // console.log(user);
            $scope.userId = user.uid;
            $scope.userName = user.displayName;
        } else {
            // $state.go('home');
        }
    });
    $scope.projectId = parameters.projectId;
    if (parameters.category) {
        if (parameters.category == 'cghs') {
            $scope.category = 'cghs';
        } else {
            $scope.category = 'residential';
        }
    } else {
        $scope.category = 'residential';
    }
    $scope.forms = {};
    $scope.projectImages = [];
    $scope.propertyTypes = [];
    $scope.bhk = '';
    $scope.configurations = [];
    $scope.minBhk = 0;
    $scope.projectDataFetched = false;
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
            'security24x7': {
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
            'waterSupply24x7': {
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
            'inhouseRestaurants': {
                name: 'Inhouse Restaurants',
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
            'indoorGames': {
                name: 'Indoor Games',
                img: 'images/icons/chess.png'
            },
            'jacuzzi': {
                name: 'Jacuzzi',
                img: 'images/icons/Jacuzzi.png'
            },
            'library': {
                name: 'Library',
                img: 'images/icons/Library.png'
            },
            'miniTheatre': {
                name: 'Mini Theatre',
                img: 'images/icons/Theatre.png'
            },
            'partyHall': {
                name: 'Party Hall',
                img: 'images/icons/hall.png'
            },
            'spa': {
                name: 'Spa',
                img: 'images/icons/spa.png'
            },
            'steam-sauna': {
                name: 'Steam/Sauna',
                img: 'images/icons/Steam.png'
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
            'smartCard-biometric': {
                name: 'SmartCard/Biometric',
                img: 'images/icons/smart-card.png'
            },
            'visitorParking': {
                name: 'Visitor Parking',
                img: 'images/icons/Parking.png'
            }
        },
        'services': {
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
        'services': {
            'present': false,
            'name': 'Services',
            'hrefLink': '#services'
        },
        'sports': {
            'present': false,
            'name': 'Sports',
            'hrefLink': '#sports'
        }
    };

    $scope.scrollToDiv = function(value) {
        $('html,body').animate({
                scrollTop: $("." + value).offset().top - 80
            },
            'slow');
    }
    console.log($scope.category)
    db.ref('projects/-KYJONgh0P98xoyPPYm9/' + $scope.category + '/' + $scope.projectId).once('value', function(snapshot) {
        $timeout(function() {
            console.log(snapshot.val());
            $scope.project = snapshot.val();
            $scope.projectName = $scope.project.projectName;
            document.title = $scope.projectName;
            $scope.coverImage = "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/' + $scope.category + '/' + $scope.project.projectId + '/images/coverPhoto/' + $scope.project.images.coverPhoto.url + '-m.jpg';
            $scope.path = ["Gurgaon", "Residential"];
            if ($scope.project.configurations) {
                generateInfo($scope.project.configurations);
            }
            if ($scope.project.amenities) {
                generateAmenitiesList($scope.project.amenities);
            }
            generateImageList($scope.project.images);
            generateConfigurations($scope.project.configurations);
            if (angular.isDefined($stateParams.category)) {
                $scope.path.push(($stateParams.category).capitalize());
            }
            $scope.loading = false;
            $scope.path.push($scope.projectName);
        }, 100);
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
        // console.log($scope.amenitiesPresent);
    }

    function sortNumber(a, b) {
        return a - b;
    }

    function generateInfo(config) {
        var bhkData = [];
        var areaData = [];
        var minPriceData = [];
        var maxPriceData = [];
        for (key in config) {
            bhkData.push(config[key].bhk);
            areaData.push(parseInt(config[key].superBuiltArea));
            $scope.propertyTypes.push(config[key].unit);
            if (config[key].pricing.rent.min != 'NA') {
                minPriceData.push(config[key].pricing.rent.min);
            }
            if (config[key].pricing.rent.max != 'NA') {
                maxPriceData.push(config[key].pricing.rent.max);
            }
        }
        $scope.propertyTypes = jQuery.unique($scope.propertyTypes);
        bhkData = jQuery.unique(bhkData);
        bhkData = bhkData.sort();
        $scope.minBhk = bhkData[0];
        minBhk = bhkData[0];
        areaData = jQuery.unique(areaData);
        areaData = areaData.sort(sortNumber);
        minPriceData = minPriceData.sort(sortNumber);
        maxPriceData = maxPriceData.sort(sortNumber);
        console.log(minPriceData);
        console.log(maxPriceData);
        if (minPriceData.length != 0) {
            $scope.rentMin = convertCurrency(minPriceData[0]);
        } else {
            $scope.rentMin = 'NA';
        }

        if (maxPriceData.length != 0) {
            $scope.rentMax = convertCurrency(maxPriceData[maxPriceData.length - 1]);
        } else {
            $scope.rentMax = 'NA';
        }

        $scope.minArea = areaData[0];
        $scope.maxArea = areaData[areaData.length - 1];
        for (key in bhkData) {
            $scope.bhk += (bhkData[key]).toString() + ', ';
        }
        $scope.bhk = $scope.bhk.substring(0, $scope.bhk.length - 2);
        // console.log($scope.bhk);
    }

    function convertCurrency(value) {
        valueLen = getlength(value);
        var denomination = '';

        if (valueLen <= 5) {
            return value;
        } else if (valueLen > 5 && valueLen <= 7) {
            denomination = ' L';
            value = value / 100000;
            // value = parseFloat(Math.round(value * 100) / 100).toFixed(2);
            return value + denomination;
        } else if (valueLen > 7 && valueLen <= 9) {
            denomination = ' Cr';
            value = value / 10000000;
            // value = parseFloat(Math.round(value * 100) / 100).toFixed(2);
            return value + denomination;
        }
    }

    function getlength(number) {
        return number.toString().length;
    }

    function generateConfigurations(configs) {
        var example = {};
        for (key in configs) {
            if (example[configs[key].bhk]) {
                if (example[configs[key].bhk].unit == configs[key].unit) {
                    if (parseInt(configs[key].superBuiltArea) < example[configs[key].bhk].superBuiltAreaMin) {
                        example[configs[key].bhk].superBuiltAreaMin = configs[key].superBuiltArea;
                    } else if (configs[key].superBuiltArea > example[configs[key].bhk].superBuiltAreaMax) {
                        example[configs[key].bhk].superBuiltAreaMax = configs[key].superBuiltArea;
                    }
                    if (configs[key].pricing.rent.min != 'NA') {
                        if (configs[key].pricing.rent.min < example[configs[key].bhk].rentMin) {
                            example[configs[key].bhk].rentMin = configs[key].pricing.rent.min;
                        }
                    }
                    if (configs[key].pricing.rent.max != 'NA') {
                        if (configs[key].pricing.rent.max > example[configs[key].bhk].rentMax) {
                            example[configs[key].bhk].rentMax = configs[key].pricing.rent.max;
                        }
                    }
                } else {
                    var data = {
                        unit: configs[key].unit,
                        bhk: configs[key].bhk,
                        superBuiltAreaMin: parseInt(configs[key].superBuiltArea),
                        superBuiltAreaMax: parseInt(configs[key].superBuiltArea)
                    }
                    if (configs[key].pricing.rent.min != 'NA') {
                        data.rentMin = configs[key].pricing.rent.min;
                    }
                    if (configs[key].pricing.rent.max != 'NA') {
                        data.rentMax = configs[key].pricing.rent.max;
                    }
                    if (data.rentMin) {
                        if (!data.rentMax) {
                            data.rentMax = data.rentMin;
                        }
                    } else {
                        if (data.rentMax) {
                            data.rentMin = data.rentMax;
                        }
                    }
                    example[configs[key].bhk + '2'] = data;
                    // console.log(example);
                }
            } else {
                var data = {
                    unit: configs[key].unit,
                    bhk: configs[key].bhk,
                    superBuiltAreaMin: parseInt(configs[key].superBuiltArea),
                    superBuiltAreaMax: parseInt(configs[key].superBuiltArea)
                }
                if (configs[key].pricing.rent.min != 'NA') {
                    // data.rentMin = convertCurrency(configs[key].pricing.rent.min);
                    data.rentMin = configs[key].pricing.rent.min;

                    if (configs[key].pricing.rent.max != 'NA') {
                        // data.rentMax = convertCurrency(configs[key].pricing.rent.max);
                        data.rentMax = configs[key].pricing.rent.max;
                    }
                    if (data.rentMin) {
                        if (!data.rentMax) {
                            data.rentMax = data.rentMin;
                        }
                    } else {
                        if (data.rentMax) {
                            data.rentMin = data.rentMax;
                        }
                    }
                }
                example[configs[key].bhk] = data;
                // console.log(example);
            }
        }
        console.log(example);
        addNa(example);
    }

    function addNa(configs) {
        var data = [];
        for (key in configs) {
            // console.log(configs[key]);
            if (!configs[key].rentMin) {
                configs[key].rentMin = 'NA'
            }
            if (!configs[key].rentMax) {
                configs[key].rentMax = 'NA'
            }
            if (key == minBhk) {
                configs[key].selected = true;
            } else {
                configs[key].selected = false;
            }
            configs[key].hrefLink = '#bhk' + configs[key].bhk;
            data.push(configs[key]);
        }
        // console.log(data);
        generateConfigurationDisplay(data);

    }

    function generateConfigurationDisplay(data) {
        var sampleConfig = {};
        for (key in data) {
            // console.log(data[key]);
            if (!sampleConfig[data[key].bhk]) {
                sampleConfig[data[key].bhk] = {
                    superBuiltArea: [],
                    rent: [],
                    unit: [],
                    hrefLink: '#bhk' + data[key].bhk,
                    bhk: data[key].bhk
                };
            }
            var area = {
                min: parseInt(data[key].superBuiltAreaMin),
                max: parseInt(data[key].superBuiltAreaMax)
            }
            var price = {
                min: data[key].rentMin,
                max: data[key].rentMax
            }
            sampleConfig[data[key].bhk].superBuiltArea.push(area);
            sampleConfig[data[key].bhk].rent.push(price);
            sampleConfig[data[key].bhk].unit.push(data[key].unit);
            if (data[key].bhk == $scope.minBhk) {
                sampleConfig[data[key].bhk].selected = true;
            }
        }
        for (key in sampleConfig) {
            $scope.configurations.push(sampleConfig[key]);
        }
        $timeout(function() {
            // loading(false);
            $scope.projectDataFetched = true;
            $('ul.tabs').tabs();
        }, 500);
        // console.log($scope.configurations);
    }

    $scope.selectConfig = function(config) {
        for (key in $scope.configurations) {
            if ($scope.configurations[key].bhk == config.bhk) {
                $scope.configurations[key].selected = true;
            } else {
                $scope.configurations[key].selected = false;
            }
        }
    }

    $scope.provideDetails = function(data) {
        // loading(true);
        db.ref('queries/' + $scope.cityId + '/' + $scope.category + '/' + $scope.projectId).push(data).then(function() {
            // loading(false);
            swal('Request Logged', 'You will receive the details in your mail', 'success');
            $timeout(function() {
                $scope.query = {};
                $scope.forms.contactForm.$setPristine();
                $scope.forms.contactForm.$setUntouched();
            }, 1000);
        })
    }
    $scope.goToWriteReview = function() {
        // console.log('called')
        $state.go('write-review', { id: $scope.projectId, n: btoa(encodeURIComponent(document.title)), t: btoa($scope.category) });
    }

    function generateImageList(images) {
        var imageData = [];
        for (key in images) {
            if (key == 'coverPhoto') {
                var newImage = {
                    thumb: "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/' + $scope.category + '/' + $scope.project.projectId + '/images/coverPhoto/' + images[key].url + '-s.jpg',
                    src: "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/' + $scope.category + '/' + $scope.project.projectId + '/images/coverPhoto/' + images[key].url + '-m.jpg',
                    display: false
                }
                if (images[key].description) {
                    newImage.caption = images[key].description;
                }
                imageData.push(newImage);
            } else {
                for (key1 in images[key]) {
                    var newImage = {
                        thumb: "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/' + $scope.category + '/' + $scope.project.projectId + '/images/' + key + '/' + key1 + '/' + images[key][key1].url + '-s.jpg',
                        src: "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/' + $scope.category + '/' + $scope.project.projectId + '/images/' + key + '/' + key1 + '/' + images[key][key1].url + '-m.jpg',
                        display: false
                    }
                    if (images[key][key1].description) {
                        newImage.caption = images[key][key1].description;
                    }
                    imageData.push(newImage);
                }
            }
        }
        $scope.projectImages = imageData;
        $timeout(function(){
            $('.materialboxed').materialbox();
        }, 500);
        // $rootScope.$broadcast('initGallery', imageData);
    }
}]);

// Reviews and Ratings Controller
app.controller('projectReviewRatingCtrl', ['$scope', '$timeout', '$stateParams', '$rootScope', '$http', '$state', function($scope, $timeout, $stateParams, $rootScope, $http, $state) {
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    var parameters = decodeParams($stateParams.p);
    $scope.projectId = parameters.projectId;
    $scope.reviews = [];
    $scope.reviewsAvailable = false;
    var selectedRating = 0;
    $scope.reviews = [];
    var reviewsFetchedNum = 0;
    var totalReviews = 0;
    var page_start = 0;
    var page_size = 5;
    $scope.reviewsFetched = false;
    var customerType = null;
    $scope.hasMoreReviews = true;
    $scope.hasReviews = false;
    $scope.reviewAvailable = false;
    $scope.ratingSummaryParams = [
        { id: 'security', id1: 'security1', name: 'Security' },
        { id: 'amenities', id1: 'amenities1', name: 'Amenities' },
        { id: 'openAndGreenAreas', id1: 'openAndGreenAreas1', name: 'Open and Green Areas' },
        { id: 'convenienceOfParking', id1: 'convenienceOfParking1', name: 'Convenience of Parking' },
        { id: 'infrastructure', id1: 'infrastructure1', name: 'Infrastructure' }
    ];


    $http({
        url: 'http://35.154.60.19/api/GetReviewSummary_1.0',
        method: 'GET',
        params: {
            id: $scope.projectId
        }
    }).then(function mySucces(response) {
        console.log(response);
        if (response.status == 200) {
            if (response.data[$scope.projectId]) {
                if (response.data[$scope.projectId] != 'not found') {
                    $rootScope.allRatings = response.data;
                    $scope.reviewsAvailable = true;
                    if (response.data.numberOfReviews > 0) {
                        $scope.reviewAvailable = true;
                    }
                    $scope.reviewObject = response.data;
                    createProgressBars();
                    // console.log($scope.reviewObject);
                }
            } else if (response.data.numbers.numberOfReviews != 0) {
                $rootScope.allRatings = response.data;
                $scope.reviewsAvailable = true;
                if (response.data.numberOfReviews > 0) {
                    $scope.reviewAvailable = true;
                }
                $scope.reviewObject = response.data;
                createProgressBars();
            }
        }
    }, function myError(err) {
        // console.log(err);
    })

    function createProgressBars() {
        console.log($scope.reviewObject);
        for (key in $scope.reviewObject.numbers) {
            $scope.reviewObject.numbers[key + '1'] = Math.round($scope.reviewObject.numbers[key]);
        }
        $("#excellentStar").css("width", ($scope.reviewObject.numbers.fiveStar / $scope.reviewObject.numbers.numberOfReviews) * 100 + '%');
        $("#veryGoodStar").css("width", ($scope.reviewObject.numbers.fourStar / $scope.reviewObject.numbers.numberOfReviews) * 100 + '%');
        $("#goodStar").css("width", ($scope.reviewObject.numbers.threeStar / $scope.reviewObject.numbers.numberOfReviews) * 100 + '%');
        $("#averageStar").css("width", ($scope.reviewObject.numbers.twoStar / $scope.reviewObject.numbers.numberOfReviews) * 100 + '%');
        $("#badStar").css("width", ($scope.reviewObject.numbers.oneStar / $scope.reviewObject.numbers.numberOfReviews) * 100 + '%');

        $scope.gsp = parseFloat(($scope.reviewObject.yes_no.goodSchools.yes / ($scope.reviewObject.yes_no.goodSchools.yes + $scope.reviewObject.yes_no.goodSchools.no + $scope.reviewObject.yes_no.goodSchools['not sure'])) * 100).toFixed(2) + '%';
        $scope.gmp = parseFloat(($scope.reviewObject.yes_no.markets.yes / ($scope.reviewObject.yes_no.markets.yes + $scope.reviewObject.yes_no.markets.no + $scope.reviewObject.yes_no.markets['not sure'])) * 100).toFixed(2) + '%';
        $scope.rhp = parseFloat(($scope.reviewObject.yes_no.goodHospitals.yes / ($scope.reviewObject.yes_no.goodHospitals.yes + $scope.reviewObject.yes_no.goodHospitals.no + $scope.reviewObject.yes_no.goodSchools['not sure'])) * 100).toFixed(2) + '%';
        $scope.dnip = parseFloat(($scope.reviewObject.yes_no.dailyNeedItems.yes / ($scope.reviewObject.yes_no.dailyNeedItems.yes + $scope.reviewObject.yes_no.dailyNeedItems.no + $scope.reviewObject.yes_no.goodSchools['not sure'])) * 100).toFixed(2) + '%';
        $scope.ptp = parseFloat(($scope.reviewObject.yes_no.easyAccessToPublicTransport.yes / ($scope.reviewObject.yes_no.easyAccessToPublicTransport.yes + $scope.reviewObject.yes_no.easyAccessToPublicTransport.no + $scope.reviewObject.yes_no.goodSchools['not sure'])) * 100).toFixed(2) + '%';
        $scope.alep = parseFloat(($scope.reviewObject.yes_no.apartmentLayoutEfficient.yes / ($scope.reviewObject.yes_no.apartmentLayoutEfficient.yes + $scope.reviewObject.yes_no.apartmentLayoutEfficient.no + $scope.reviewObject.yes_no.goodSchools['not sure'])) * 100).toFixed(2) + '%';
        $scope.epp = parseFloat(($scope.reviewObject.yes_no['24x7electricity'].yes / ($scope.reviewObject.yes_no['24x7electricity'].yes + $scope.reviewObject.yes_no['24x7electricity'].no + $scope.reviewObject.yes_no.goodSchools['not sure'])) * 100).toFixed(2) + '%';
        $scope.rcwsp = parseFloat(($scope.reviewObject.yes_no.regularCleanWaterSupply.yes / ($scope.reviewObject.yes_no.regularCleanWaterSupply.yes + $scope.reviewObject.yes_no.regularCleanWaterSupply.no + $scope.reviewObject.yes_no.goodSchools['not sure'])) * 100).toFixed(2) + '%';

        $('#gs').css("width", ($scope.reviewObject.yes_no.goodSchools.yes / ($scope.reviewObject.yes_no.goodSchools.yes + $scope.reviewObject.yes_no.goodSchools.no + $scope.reviewObject.yes_no.goodSchools['not sure'])) * 100 + '%');
        $('#gm').css("width", ($scope.reviewObject.yes_no.markets.yes / ($scope.reviewObject.yes_no.markets.yes + $scope.reviewObject.yes_no.markets.no + $scope.reviewObject.yes_no.markets['not sure'])) * 100 + '%');
        $('#rh').css("width", ($scope.reviewObject.yes_no.goodHospitals.yes / ($scope.reviewObject.yes_no.goodHospitals.yes + $scope.reviewObject.yes_no.goodHospitals.no + $scope.reviewObject.yes_no.goodHospitals['not sure'])) * 100 + '%');
        $('#dni').css("width", ($scope.reviewObject.yes_no.dailyNeedItems.yes / ($scope.reviewObject.yes_no.dailyNeedItems.yes + $scope.reviewObject.yes_no.dailyNeedItems.no + $scope.reviewObject.yes_no.dailyNeedItems['not sure'])) * 100 + '%');
        $('#pt').css("width", ($scope.reviewObject.yes_no.easyAccessToPublicTransport.yes / ($scope.reviewObject.yes_no.easyAccessToPublicTransport.yes + $scope.reviewObject.yes_no.easyAccessToPublicTransport.no + $scope.reviewObject.yes_no.easyAccessToPublicTransport['not sure'])) * 100 + '%');
        $('#ale').css("width", ($scope.reviewObject.yes_no.apartmentLayoutEfficient.yes / ($scope.reviewObject.yes_no.apartmentLayoutEfficient.yes + $scope.reviewObject.yes_no.apartmentLayoutEfficient.no + $scope.reviewObject.yes_no.apartmentLayoutEfficient['not sure'])) * 100 + '%');
        $('#24e').css("width", ($scope.reviewObject.yes_no['24x7electricity'].yes / ($scope.reviewObject.yes_no['24x7electricity'].yes + $scope.reviewObject.yes_no['24x7electricity'].no + $scope.reviewObject.yes_no['24x7electricity']['not sure'])) * 100 + '%');
        $('#rcws').css("width", ($scope.reviewObject.yes_no.regularCleanWaterSupply.yes / ($scope.reviewObject.yes_no.regularCleanWaterSupply.yes + $scope.reviewObject.yes_no.regularCleanWaterSupply.no + $scope.reviewObject.yes_no.regularCleanWaterSupply['not sure'])) * 100 + '%');
    }


    getReviews();

    function getReviews() {
        $scope.fetchingReviews = true;
        if (page_start == 0) {
            $scope.firstLoading = true;
        } else {
            $scope.firstLoading = false;
        }
        console.log($scope.projectId, selectedRating, customerType, page_size, page_start)
        $http({
            url: 'http://35.154.60.19/api/GetProjectReviews_1.0',
            method: 'GET',
            params: {
                pid: $scope.projectId,
                overallRating: selectedRating,
                userType: customerType,
                page_size: page_size,
                page_start: page_start
            }
        }).then(function mySucces(response) {
            console.log(response);
            if (response.data) {
                totalReviews = response.data.hits;
                reviewsFetchedNum += Object.keys(response.data.details).length;
                if (reviewsFetchedNum == totalReviews) {
                    $scope.hasMoreReviews = false;
                }
                for (key in response.data.details) {
                    if (response.data.details[key].reviewText.length < response.data.details[key].wordCount) {
                        response.data.details[key].showMore = true;
                    } else {
                        response.data.details[key].showMore = false;
                    }
                    $scope.reviews.push(response.data.details[key]);
                }
                if ($scope.reviews.length > 0) {
                    $scope.hasReviews = true;
                }
            } else {
                $scope.hasMoreReviews = false;
            }
            if ($scope.projectDataFetched) {
                // loading(false);    
            }
            $scope.fetchingReviews = false;
        }, function myError(err) {
            $scope.fetchingReviews = false;
            // console.log(err);
        })
    }

    $scope.showReviewText = function(index) {
        // console.log($scope.reviews[index]);
        // loading(true);
        $http({
            url: 'http://35.154.60.19/api/GetReviewDetails_1.0',
            method: 'GET',
            params: {
                id: $scope.reviews[index].reviewId,
                type: $scope.category
            }
        }).then(function mySucces(response) {
            // console.log(response);
            if (response.status == 200) {
                $scope.reviews[index].reviewText = response.data.reviewText;
                $scope.reviews[index].showMore = false;
            }
            // loading(false, 1000);
        }, function myError(err) {
            // console.log(err);
        })
    }

    $scope.allRatings = {
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5
    };
    $scope.ratingIndex = ['one', 'two', 'three', 'four', 'five'];

    $scope.filterReview = function(index) {
        var count = 0;
        count = $scope.allRatings[index];
        if ($scope.ratingSelected[index]) {
            for (var i = count - 1; i < 5; i++) {
                $scope.ratingSelected[$scope.ratingIndex[i]] = true;
            }
            selectedRating = count;
        } else {
            // console.log(count);
            for (var i = 4; i > count - 1; i--) {
                $scope.ratingSelected[$scope.ratingIndex[i]] = false;
            }
            selectedRating = count - 1;
        }
        $scope.reviews = [];
        reviewsFetchedNum = 0;
        totalReviews = 0;
        page_start = 0;
        page_size = 5;
        $scope.reviewsFetched = false;
        $scope.hasMoreReviews = true;
        $scope.hasReviews = false;
        $scope.reviewAvailable = false;
        getReviews();
    }

    $scope.filterReviewByCustomerType = function(index) {
        if ($scope.selectedCustomerType[index]) {
            if (index == 'tenant') {
                customerType = 'tenant';
                $scope.selectedCustomerType.owner = false;
            } else {
                customerType = 'owner';
                $scope.selectedCustomerType.tenant = false;
            }
        } else {
            customerType = null;
        }
        $scope.reviews = [];
        reviewsFetchedNum = 0;
        totalReviews = 0;
        page_start = 0;
        page_size = 5;
        $scope.reviewsFetched = false;
        $scope.hasMoreReviews = true;
        $scope.hasReviews = false;
        $scope.reviewAvailable = false;
        getReviews();
    }

    $scope.showMoreReviews = function() {
        // loading(true);
        page_start = reviewsFetchedNum;
        // console.log(page_start);
        if (totalReviews - reviewsFetchedNum < 5) {
            page_size = totalReviews - reviewsFetchedNum
        }
        getReviews();
    }

    $scope.takeToWriteReview = function() {
        $state.go('write-review', { id: $scope.projectId, n: btoa(encodeURIComponent(document.title)), t: btoa($scope.category) });
    }
}]);


app.controller('galleryCtrl', ['$scope', '$timeout', function($scope, $timeout) {
    $('.materialboxed').materialbox();
    $scope.showGallery = true;
    $scope.$on('initGallery', function(event, data) {
        // console.log(data);
        $scope.images = data;
        $timeout(function() {
            var gallery = $('a[data-imagelightbox="a"]').imageLightbox({
                activity: true,
                arrows: true,
                button: true,
                caption: true,
                navigation: false,
                overlay: true
            });

            $('.trigger_gallery').on('click', function() {
                // console.log('clicked');
                // gallery.startImageLightbox();
            });
            $scope.showGallery = true;

        }, 500)
    });
}]);
