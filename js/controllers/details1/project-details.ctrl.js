app.controller('projectDetailsCtrl', ['$scope', '$timeout', '$stateParams', '$rootScope', function($scope, $timeout, $stateParams, $rootScope){
	$('ul.tabs').tabs();
    // loading(true);
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    $scope.projectId = $stateParams.projectId;
    if($stateParams.category){
        if($stateParams.category == 'CGHS'){
            $scope.category = 'cghs';
        } else {
            $scope.category = 'residential';
        }
    } else {
        $scope.category = 'residential';
    }

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
    	'convenience':{
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
    	'safety' : {
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
    	'basic' : {
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

    db.ref('projects/-KYJONgh0P98xoyPPYm9/'+$scope.category+'/' + $scope.projectId).once('value', function(snapshot) {
        $timeout(function() {
        	// console.log(snapshot.val());
            $scope.project = snapshot.val();
            $scope.projectName = $scope.project.projectName;
            document.title=$scope.projectName;
            $scope.coverImage = "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/'+$scope.category+'/' + $scope.project.projectId + '/images/coverPhoto/' + $scope.project.images.coverPhoto.url + '-m.jpg';
            $scope.path = ["Gurgaon", "Residential"];
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
            }
            $scope.path.push($scope.projectName);
        }, 100);
    })

    function generateAmenitiesList(amenities) {
    	for(key in amenities){
    		for(key1 in amenities[key]){
    			if(amenities[key][key1] != 'NA'){
    				$scope.amenitiesPresent[key].present = true;
    			}
    		}
    	}

    	for(key in $scope.amenitiesPresent){
    		if($scope.amenitiesPresent[key].present){
    			$scope.showAmenities = true;
    		}
    	}
    	// console.log($scope.amenitiesPresent);
    }

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
        $scope.minBhk = bhkData[0];
        minBhk = bhkData[0];
        areaData = jQuery.unique(areaData);
        areaData = areaData.sort();
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

    function addNa(configs) {
    	var data = [];
        for (key in configs) {
            // console.log(configs[key]);
            if (!configs[key].buyMin) {
                configs[key].buyMin = 'NA'
            }
            if (!configs[key].buyMax) {
                configs[key].buyMax = 'NA'
            }
            if (!configs[key].rentMin) {
                configs[key].rentMin = 'NA'
            }
            if (!configs[key].rentMax) {
                configs[key].rentMax = 'NA'
            }
            if(key == minBhk){
            	configs[key].selected = true;
            } else {
            	configs[key].selected = false;
            }
            configs[key].hrefLink = '#bhk'+configs[key].bhk;
            data.push(configs[key]);
        }
        // console.log(data);
        generateConfigurationDisplay(data);
        
    }

    function generateConfigurationDisplay(data){
    	var sampleConfig = {};
    	for(key in data){
    		if(!sampleConfig[data[key].bhk]){
                sampleConfig[data[key].bhk] = {
                    superBuiltArea: [],
                    rent: [],
                    unit: [],
                    hrefLink: '#bhk'+data[key].bhk,
                    bhk: data[key].bhk
                };
            }
            var area = {
            	min: data[key].superBuiltAreaMin,
            	max: data[key].superBuiltAreaMax
            }
            var price = {
            	min: data[key].rentMin,
            	max: data[key].rentMax
            }
            sampleConfig[data[key].bhk].superBuiltArea.push(area);
            sampleConfig[data[key].bhk].rent.push(price);
            sampleConfig[data[key].bhk].unit.push(data[key].unit);
            if(data[key].bhk == $scope.minBhk){
            	sampleConfig[data[key].bhk].selected = true;
            }
    	}
    	for(key in sampleConfig){
    		$scope.configurations.push(sampleConfig[key]);
    	}
    	$timeout(function(){
            // loading(false);
            $scope.projectDataFetched = true;
            $('ul.tabs').tabs();
        },500);
    	// console.log($scope.configurations);
    }

	$scope.selectConfig = function(config){
		for(key in $scope.configurations){
			if($scope.configurations[key].bhk ==config.bhk) {
				$scope.configurations[key].selected = true;
			} else {
				$scope.configurations[key].selected = false;
			}
		}
	}

	$scope.provideDetails = function(data){
		// loading(true);
		db.ref('queries/'+$scope.cityId+'/'+$scope.category+'/'+$scope.projectId).push(data).then(function(){
            // loading(false);
			swal('Request Logged', 'You will recieve the details in your mail', 'success');
			$timeout(function(){
				$scope.query = {};
				$scope.contactForm.$setPristine();
        		$scope.contactForm.$setUntouched();
			},1000);
		})
	}

    function generateImageList(images) {
        var imageData = [];
        for (key in images) {
            if (key == 'coverPhoto') {
                var newImage = {
                    thumb: "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/'+$scope.category+'/' + $scope.project.projectId + '/images/coverPhoto/' + images[key].url + '-s.jpg',
                    src: "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/'+$scope.category+'/' + $scope.project.projectId + '/images/coverPhoto/' + images[key].url + '-m.jpg',
                    display: false
                }
                if (images[key].description) {
                    newImage.caption = images[key].description;
                }
                imageData.push(newImage);
            } else {
                for (key1 in images[key]) {
                    var newImage = {
                        thumb: "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/'+$scope.category+'/' + $scope.project.projectId + '/images/' + key + '/' + key1 + '/' + images[key][key1].url + '-s.jpg',
                        src: "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/'+$scope.category+'/' + $scope.project.projectId + '/images/' + key + '/' + key1 + '/' + images[key][key1].url + '-m.jpg',
                        display: false
                    }
                    if (images[key][key1].description) {
                        newImage.caption = images[key][key1].description;
                    }
                    imageData.push(newImage);
                }
            }
        }
        $rootScope.$broadcast('initGallery', imageData);
    }

    $rootScope.$watch('allRatings', function() {
        $scope.allRatings = $rootScope.allRatings;
        console.log($scope.allRatings);
    });

}]);

// Reviews and Ratings Controller
app.controller('projectReviewRatingCtrl', ['$scope', '$timeout', '$stateParams', '$rootScope', '$http', '$state', function($scope, $timeout, $stateParams, $rootScope, $http, $state){
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    $scope.projectId = $stateParams.projectId;
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
        {id: 'security', id1: 'security1', name: 'Security'},
        {id: 'amenities', id1: 'amenities1', name: 'Amenities'},
        {id: 'openAndGreenAreas', id1: 'openAndGreenAreas1', name: 'Open and Green Areas'},
        {id: 'electricityAndWaterSupply', id1: 'electricityAndWaterSupply1', name: 'Electricity and Water Supply'},
        {id: 'convenienceOfHouseMaids', id1: 'convenienceOfHouseMaids1', name: 'Convenience of Housemaids'},
        {id: 'convenienceOfParking', id1: 'convenienceOfParking1', name: 'Convenience of Parking'},
        {id: 'infrastructure', id1: 'infrastructure1', name: 'Infrastructure'},
        {id: 'layoutOfApartment', id1: 'layoutOfApartment1', name: 'Layout of Apartments'}
    ];


    $http({
        url: 'http://35.154.60.19/api/GetReviewSummary_1.0',
        method : 'GET',
        params: {
            id: $scope.projectId
        }
    }).then(function mySucces(response) {
        // console.log(response);
        if(response.status == 200){
            if(response.data.numberOfReviews != 0){
                $rootScope.allRatings = response.data;
                $scope.reviewsAvailable =true;
                if(response.data.numberOfReviews > 0){
                    $scope.reviewAvailable = true;
                }
                $scope.reviewObject = response.data;
                for(key in $scope.reviewObject){
                    $scope.reviewObject[key+'1'] = Math.round($scope.reviewObject[key]);
                }
                $("#excellentStar").css("width", ($scope.reviewObject.fiveStar / $scope.reviewObject.numberOfReviews) * 100 + '%');
                $("#veryGoodStar").css("width", ($scope.reviewObject.fourStar / $scope.reviewObject.numberOfReviews) * 100 + '%');
                $("#goodStar").css("width", ($scope.reviewObject.threeStar / $scope.reviewObject.numberOfReviews) * 100 + '%');
                $("#averageStar").css("width", ($scope.reviewObject.twoStar / $scope.reviewObject.numberOfReviews) * 100 + '%');
                $("#badStar").css("width", ($scope.reviewObject.oneStar / $scope.reviewObject.numberOfReviews) * 100 + '%');
                // console.log($scope.reviewObject);
            }
        }
    }, function myError(err) {
        console.log(err);
    })


    getReviews();

    function getReviews(){
        $http({
            url: 'http://35.154.60.19/api/GetProjectReviews_1.0',
            method : 'GET',
            params: {
                pid: $scope.projectId,
                overallRating: selectedRating,
                customerType: customerType,
                page_size: page_size,
                page_start: page_start
            }
        }).then(function mySucces(response) {
            if(response.data){
                totalReviews = response.data.hits;
                reviewsFetchedNum += Object.keys(response.data.details).length;
                if(reviewsFetchedNum == totalReviews){
                    $scope.hasMoreReviews = false;
                }
                for(key in response.data.details){
                    if(response.data.details[key].reviewText.length < response.data.details[key].wordCount) {
                        response.data.details[key].showMore = true;
                    } else {
                        response.data.details[key].showMore = false;
                    }
                    $scope.reviews.push(response.data.details[key]);
                }
                if($scope.reviews.length > 0){
                    $scope.hasReviews = true;
                }
            } else {
                $scope.hasMoreReviews = false;
            }
            if($scope.projectDataFetched){
                // loading(false);    
            }
        }, function myError(err) {
            console.log(err);
        })
    }

    $scope.showReviewText = function(index){
        // console.log($scope.reviews[index]);
        // loading(true);
        $http({
            url: 'http://35.154.60.19/api/GetReviewDetails_1.0',
            method: 'GET',
            params: {
                id: $scope.reviews[index].reviewId
            }
        }).then(function mySucces(response) {
            // console.log(response);
            if(response.status == 200){
                $scope.reviews[index].reviewText = response.data.reviewText;
                $scope.reviews[index].showMore = false;
            } 
            // loading(false, 1000);
        }, function myError(err) {
            console.log(err);
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

    $scope.filterReview = function(index){
        var count = 0;
        count = $scope.allRatings[index];
        if($scope.ratingSelected[index]){
            for(var i = count-1; i < 5; i++){
                $scope.ratingSelected[$scope.ratingIndex[i]] = true;
            }
            selectedRating = count;
        } else {
            // console.log(count);
            for(var i = 4; i > count-1 ; i--){
                $scope.ratingSelected[$scope.ratingIndex[i]] = false;
            }
            selectedRating = count -1;
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

    $scope.filterReviewByCustomerType = function(index){
        if($scope.selectedCustomerType[index]){
            if(index == 'tenant'){
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
        if(totalReviews - reviewsFetchedNum < 5){
            page_size = totalReviews - reviewsFetchedNum
        }
        getReviews();
    }

    $scope.takeToWriteReview = function(){
        $state.go('write-review', {id: $scope.projectId});
    }
}]);


app.controller('galleryCtrl', ['$scope', '$timeout', function($scope, $timeout) {
    $scope.showGallery = true;
    $scope.$on('initGallery', function(event, data) {
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
                gallery.startImageLightbox();
            });
            $scope.showGallery = true;

        }, 500)
    });
}]);