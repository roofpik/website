app.controller('projectDetailsCtrl', function($scope, $timeout, $stateParams, $rootScope, $state, $sce, $mdDialog, UserTokenService, $location) {
    // console.log('called');
    var timestamp = new Date().getTime();
    var urlInfo = {
        url: $location.path()
    }
    UserTokenService.checkToken(urlInfo, timestamp, 1);
    $('.project-details-page').hide();

    var rates = [1, 2, 3, 4, 5];
    $scope.projectId = $stateParams.id;
    $scope.reviews = [];
    $scope.hasReviews = false;
    $scope.isActive = '';
    $scope.viewReviews = 5;
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    $scope.bhk = '';
    $scope.minArea;
    $scope.maxArea;
    $scope.propertyTypes = [];
    $scope.configurations = [];
    $scope.buySelected = true;
    $scope.rentSelected = false;
    $scope.showMoreNotClicked = true;
    $scope.amenitiesMoreLess = 'More +';
    $scope.amenities = {};
    $scope.allRatings = {};
    $scope.allAmenities = {
        'carParking': 'Car Parking',
        'cctv': 'CCTV',
        'clubhouse': 'Clubhouse',
        'fireProtection': 'Fire Protection',
        'gym': 'Gym',
        'intercom': 'Intercom',
        'kidsPlayArea': 'Kids Play Area',
        'kidsPool': 'Kids Pool',
        'lifts': 'Lifts',
        'parks': 'Parks',
        'powerBackup': 'Power Backup',
        'security24x7': 'Security 24X7',
        'swimmingPool': 'Swimming Pool',
        'videoPhone': 'Video Phone',
        'waterSupply24x7': 'Water Supply 24X7',
        'badmintonCourt': 'Badminton Court',
        'football': 'Football',
        'inhouseChemist': 'Inhouse Chemist',
        'inhouseGroceryStore': 'Inhouse Grocery Store',
        'inhousePlaySchool': 'Inhouse Play School',
        'inhouseRestaurants': 'Inhouse Restaurants',
        'multipurposeCourt': 'Multipurpose Court',
        'squashCourt': 'Squash Court',
        'volleyball': 'Volleyball',
        'amphitheatre': 'Amphitheatre',
        'bowling': 'Bowling',
        'cafe': 'Cafe',
        'cardsRoom': 'Cards Room',
        'indoorGames': 'Indoor Games',
        'jacuzzi': 'Jacuzzi',
        'library': 'Library',
        'miniTheatre': 'Mini Theatre',
        'partyHall': 'Party Hall',
        'spa': 'Spa',
        'steam-sauna': 'Steam/Sauna',
        'videoGames': 'Video Games',
        'gatedCommunity': 'Gated Community',
        'guardAtLiftLobby': 'Guard At Lift Lobby',
        'guestAccomodation': 'Guest Accomodation',
        'petArea': 'Pet Area',
        'smartCard-biometric': 'SmartCard/Biometric',
        'visitorParking': 'Visitor Parking',
        'maintenanceStaff': 'Maintenance Staff',
        'rainWaterHarvesting': 'Rain Water Harvesting',
        'wasteDisposal': 'Waste Disposal',
        'basketballCourt': 'Basketball Court',
        'cricket': 'Cricket',
        'golfCourseFacing': 'Golf Course Facing',
        'golfPutting': 'Golf Putting',
        'joggingTrack': 'Jogging Track',
        'skatingRink': 'Skating Rink',
        'snookerPool': 'Snooker/Pool',
        'tableTennis': 'Table Tennis',
        'tennisCourt': 'Tennis Court'
    };

    loading(true);

    $rootScope.$watch('allRatings', function() {
        $scope.allRatings = $rootScope.allRatings;
    });

    $scope.takeToHome = function() {
        $state.go('home');
    }

    // $scope.toTrustedHTML = function(html) {
    //     return $sce.trustAsHtml(html);
    // }
});


app.controller('basicDetailsCtrl', function($scope, $timeout, $rootScope, $stateParams){
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    db.ref('projects/-KYJONgh0P98xoyPPYm9/residential/' + $scope.projectId).once('value', function(snapshot) {
        $timeout(function() {
            $scope.project = snapshot.val();
            $scope.projectName = $scope.project.projectName;
            document.title=$scope.projectName;
            $scope.coverImage = "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/residential/' + $scope.project.projectId + '/images/coverPhoto/' + $scope.project.images.coverPhoto.url + '-m.jpg';
            $scope.path = [">", "Gurgaon", ">", "Residential", ">"];
            if ($scope.project.configurations) {
                generateInfo($scope.project.configurations);
            }
            if ($scope.project.amenities) {
                generateAmenitiesList($scope.project.amenities);
            }
            generateImageList($scope.project.images);
            generateConfigurations($scope.project.configurations);
            $scope.buyMin = convertCurrency($scope.project.price.buy.min);
            $scope.buyMax = convertCurrency($scope.project.price.buy.max);
            $scope.rentMin = convertCurrency($scope.project.price.rent.min);
            $scope.rentMax = convertCurrency($scope.project.price.rent.max);
            if (angular.isDefined($stateParams.category)) {
                $scope.path.push(($stateParams.category).capitalize());
                $scope.path.push(">");
            }
            $scope.path.push($scope.projectName);
        }, 100);
    });

    function generateInfo(config) {
        var bhkData = [];
        var areaData = [];
        for (key in config) {
            bhkData.push(config[key].bhk);
            areaData.push(config[key].superBuiltArea);
            $scope.propertyTypes.push(config[key].unit);
        }
        $scope.propertyTypes = jQuery.unique($scope.propertyTypes);
        bhkData = jQuery.unique(bhkData);
        bhkData = bhkData.sort();
        areaData = jQuery.unique(areaData);
        areaData = areaData.sort();
        $scope.minArea = areaData[0];
        $scope.maxArea = areaData[areaData.length - 1];
        for (key in bhkData) {
            $scope.bhk += (bhkData[key]).toString() + ', ';
        }
        $scope.bhk = $scope.bhk.substring(0, $scope.bhk.length - 2) + ' BHK';
    }

    function convertCurrency(value) {
        valueLen = getlength(value);
        var denomination = '';

        if (valueLen <= 5) {
            return value;
        } else if (valueLen > 5 && valueLen <= 7) {
            denomination = ' L';
            value = value / 100000;
            value = parseFloat(Math.round(value * 100) / 100).toFixed(2);
            return value + denomination;
        } else if (valueLen > 7 && valueLen <= 9) {
            denomination = ' Cr';
            value = value / 10000000;
            value = parseFloat(Math.round(value * 100) / 100).toFixed(2);
            return value + denomination;
        }
    }

    function getlength(number) {
        return number.toString().length;
    }

    function generateAmenitiesList(amenities) {
        var data = [];
        for (key in amenities) {
            data = [];
            for (key1 in amenities[key]) {
                if (amenities[key][key1] != 'NA') {
                    var amenity = {
                        category: key,
                        id: key1,
                        value: amenities[key][key1],
                        name: $scope.allAmenities[key1]
                    }
                    data.push(amenity);
                }
            }
            if (data.length != 0) {
                $scope.amenities[key] = data;
            }
        }
    }
function generateConfigurations(configs) {
        var example = {};
        for (key in configs) {
            if (example[configs[key].bhk]) {
                if (example[configs[key].bhk].unit == configs[key].unit) {
                    if (configs[key].superBuiltArea < example[configs[key].bhk].superBuiltAreaMin) {
                        example[configs[key].bhk].superBuiltAreaMin = configs[key].superBuiltArea;
                    } else if (configs[key].superBuiltArea > example[configs[key].bhk].superBuiltAreaMax) {
                        example[configs[key].bhk].superBuiltAreaMax = configs[key].superBuiltArea;
                    }
                    if (configs[key].pricing.buy.min != 'NA') {
                        if (configs[key].pricing.buy.min < example[configs[key].bhk].buyMin) {
                            example[configs[key].bhk].buyMin = convertCurrency(configs[key].pricing.buy.min);
                        }
                    }
                    if (configs[key].pricing.buy.max != 'NA') {
                        if (configs[key].pricing.buy.max > example[configs[key].bhk].buyMax) {
                            example[configs[key].bhk].buyMax = convertCurrency(configs[key].pricing.buy.max);
                        }
                    }
                    if (configs[key].pricing.rent.min != 'NA') {
                        if (configs[key].pricing.rent.min < example[configs[key].bhk].rentMin) {
                            example[configs[key].bhk].rentMin = convertCurrency(configs[key].pricing.rent.min);
                        }
                    }
                    if (configs[key].pricing.rent.max != 'NA') {
                        if (configs[key].pricing.rent.max > example[configs[key].bhk].rentMax) {
                            example[configs[key].bhk].rentMax = convertCurrency(configs[key].pricing.rent.max);
                        }
                    }
                } else {
                    var data = {
                        unit: configs[key].unit,
                        bhk: configs[key].bhk,
                        superBuiltAreaMin: configs[key].superBuiltArea,
                        superBuiltAreaMax: configs[key].superBuiltArea
                    }
                    if (configs[key].pricing.buy.min != 'NA') {
                        data.buyMin = convertCurrency(configs[key].pricing.buy.min);
                    }
                    if (configs[key].pricing.buy.max != 'NA') {
                        data.buyMax = convertCurrency(configs[key].pricing.buy.max);
                    }
                    if (configs[key].pricing.rent.min != 'NA') {
                        data.rentMin = convertCurrency(configs[key].pricing.rent.min);
                    }
                    if (configs[key].pricing.rent.max != 'NA') {
                        data.rentMax = convertCurrency(configs[key].pricing.rent.max);
                    }
                    if (data.buyMin) {
                        if (!data.buyMax) {
                            data.buyMax = data.buyMin;
                        }
                    } else {
                        if (data.buyMax) {
                            data.buyMin = data.buyMax;
                        }
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
                    superBuiltAreaMin: configs[key].superBuiltArea,
                    superBuiltAreaMax: configs[key].superBuiltArea
                }
                if (configs[key].pricing.buy.min != 'NA') {
                    data.buyMin = convertCurrency(configs[key].pricing.buy.min);
                }
                if (configs[key].pricing.buy.max != 'NA') {
                    data.buyMax = convertCurrency(configs[key].pricing.buy.max);
                }
                if (configs[key].pricing.rent.min != 'NA') {
                    data.rentMin = convertCurrency(configs[key].pricing.rent.min);

                    if (configs[key].pricing.rent.max != 'NA') {
                        data.rentMax = convertCurrency(configs[key].pricing.rent.max);
                    }
                    if (data.buyMin) {
                        if (!data.buyMax) {
                            data.buyMax = data.buyMin;
                        }
                    } else {
                        if (data.buyMax) {
                            data.buyMin = data.buyMax;
                        }
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
        addNa(example);
    }
    function addNa(configs){
        $scope.configurations = [];
        for(key in configs){
            if(!configs[key].buyMin) {
                configs[key].buyMin = 'NA'
            }
            if(!configs[key].buyMax) {
                configs[key].buyMax = 'NA'
            }
            if(!configs[key].rentMin) {
                configs[key].rentMin = 'NA'
            }
            if(!configs[key].rentMax) {
                configs[key].rentMax = 'NA'
            }
            $scope.configurations.push(configs[key]);
        }
    }

    function generateImageList(images) {
        var imageData = [];
        for (key in images) {
            if (key == 'coverPhoto') {
                var newImage = {
                    thumb: "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/residential/' + $scope.project.projectId + '/images/coverPhoto/' + images[key].url + '-s.jpg',
                    src: "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/residential/' + $scope.project.projectId + '/images/coverPhoto/' + images[key].url + '-m.jpg',
                    display: false
                }
                if (images[key].description) {
                    newImage.caption = images[key].description;
                }
                imageData.push(newImage);
            } else {
                for (key1 in images[key]) {
                    var newImage = {
                        thumb: "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/residential/' + $scope.project.projectId + '/images/' + key + '/' + key1 + '/' + images[key][key1].url + '-s.jpg',
                        src: "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/residential/' + $scope.project.projectId + '/images/' + key + '/' + key1 + '/' + images[key][key1].url + '-m.jpg',
                        display: false
                    }
                    if (images[key][key1].description) {
                        newImage.caption = images[key][key1].description;
                    }
                    imageData.push(newImage);
                }
            }
            // console.log(imageData);
        }
        $rootScope.$broadcast('initGallery', imageData);
    }

    $scope.showMoreAmenities = function() {
        $scope.showMoreNotClicked = !$scope.showMoreNotClicked;
        if ($scope.showMoreNotClicked) {
            $scope.amenitiesMoreLess = 'More +';
        } else {
            $scope.amenitiesMoreLess = 'Less -';
        }
    }
});

app.controller('reviewDetailsCtrl', function($scope, $timeout, $rootScope){
    db.ref('reviews/-KYJONgh0P98xoyPPYm9/residential/' + $scope.projectId)
        .orderByChild('wordCount')
        .once('value', function(snapshot) {
            // console.log(snapshot.val());
            if (snapshot.val()) {
                $scope.hasReviews = true;
                var allReviewsCount = Object.keys(snapshot.val()).length;
                $timeout(function() {
                    var reviewCount = 0;
                    snapshot.forEach(function(childSnapshot) {
                        reviewCount++;
                        $scope.reviews.push(childSnapshot.val());
                        if (reviewCount == allReviewsCount) {
                            if (reviewCount > 5) {
                                $scope.showReviewBtn = true;
                            }
                        }
                    });
                }, 0);
            }
        })
    $scope.showMoreReviews = function() {
        $scope.viewReviews += 5;
        if ($scope.reviews.length > $scope.viewReviews) {
            $scope.showReviewBtn = true;
        } else {
            $scope.showReviewBtn = false;
        }
    }
});

app.controller('ratingDetailsCtrl', function($scope, $timeout, $rootScope){
    db.ref('ratingReview/-KYJONgh0P98xoyPPYm9/residential/' + $scope.projectId).once('value', function(snapshot) {
        // console.log(snapshot.val());
        $timeout(function() {
            if (snapshot.val()) {
                $rootScope.allRatings = snapshot.val();
                $scope.allRatings = snapshot.val();
                $("#excellentStar").css("width", ($scope.allRatings.fiveStar / $scope.allRatings.overallRatingNum) * 100 + '%');
                $("#veryGoodStar").css("width", ($scope.allRatings.fourStar / $scope.allRatings.overallRatingNum) * 100 + '%');
                $("#goodStar").css("width", ($scope.allRatings.threeStar / $scope.allRatings.overallRatingNum) * 100 + '%');
                $("#averageStar").css("width", ($scope.allRatings.twoStar / $scope.allRatings.overallRatingNum) * 100 + '%');
                $("#badStar").css("width", ($scope.allRatings.oneStar / $scope.allRatings.overallRatingNum) * 100 + '%');
                if ($scope.allRatings.amenities) {
                    $scope.allRatings.amenities1 = Math.round($scope.allRatings.amenities);
                }
                if ($scope.allRatings.security) {
                    $scope.allRatings.security1 = Math.round($scope.allRatings.security);
                }
                if ($scope.allRatings.openAndGreenAreas) {
                    $scope.allRatings.openAndGreenAreas1 = Math.round($scope.allRatings.openAndGreenAreas);
                }
                if ($scope.allRatings.electricityAndWaterSupply) {
                    $scope.allRatings.electricityAndWaterSupply1 = Math.round($scope.allRatings.electricityAndWaterSupply);
                }
                if ($scope.allRatings.convenienceOfHouseMaids) {
                    $scope.allRatings.convenienceOfHouseMaids1 = Math.round($scope.allRatings.convenienceOfHouseMaids);
                }
                if ($scope.allRatings.convenienceOfParking) {
                    $scope.allRatings.convenienceOfParking1 = Math.round($scope.allRatings.convenienceOfParking);
                }
                if($scope.allRatings.layoutOfApartment){
                    $scope.allRatings.layoutOfApartment1 = Math.round($scope.allRatings.layoutOfApartment);
                }
                if($scope.allRatings.infrastructure){
                    $scope.allRatings.infrastructure1 = Math.round($scope.allRatings.infrastructure);
                }
                loading(false);
            } else {
                $scope.allRatings = {
                    amenities: 0,
                    amenities1: 0,
                    convenienceOfHouseMaids: 0,
                    convenienceOfHouseMaids1: 0,
                    convenienceOfParking: 0,
                    convenienceOfParking1: 0,
                    electricityAndWaterSupply: 0,
                    electricityAndWaterSupply1: 0,
                    infrastructure: 0,
                    infrastructure1: 0,
                    openAndGreenAreas: 0,
                    openAndGreenAreas1: 0,
                    security: 0,
                    security1: 0,
                    layoutOfApartment: 0,
                    layoutOfApartment1: 0,
                    oneStar: 0,
                    twoStar: 0,
                    threeStar: 0,
                    fourStar: 0,
                    fiveStar: 0,
                    overallRating: 0,
                    overallRatingNum: 0
                }
                $rootScope.allRatings = $scope.allRatings;
                console.log($scope.allRatings);
                loading(false);
            }
            $('.project-details-page').show();
        }, 50);
    })
});