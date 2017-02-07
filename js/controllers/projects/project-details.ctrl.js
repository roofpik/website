app.controller('projectDetailsCtrl', ['$scope', '$timeout', '$stateParams', '$rootScope', function($scope, $timeout, $stateParams, $rootScope){
	$('ul.tabs').tabs();
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    $scope.projectId = '-KYMtlqwTF_W5S0CL6_P';
    $scope.propertyTypes = [];
    $scope.bhk = '';
    $scope.configurations = [];
    $scope.minBhk = 0;
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
	        	img: 'images/icons/court.png'
	        },
	        'inhouseChemist': {
	        	name: 'Inhouse Chemist',
	        	img: 'images/icons/court.png'
	        },
	        'inhouseGroceryStore': {
	        	name: 'Inhouse Grocery Store',
	        	img: 'images/icons/court.png'
	        },
	        'inhousePlaySchool': {
	        	name: 'Inhouse Play School',
	        	img: 'images/icons/court.png'
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
	        	img: 'images/icons/court.png'
	        },
	        'volleyball': {
	        	name: 'Volleyball',
	        	img: 'images/icons/court.png'
	        }
    	},
    	'entertainment': {
    		'amphitheatre': {
	        	name: 'Amphitheatre',
	        	img: 'images/icons/hall.png'
	        },
	        'bowling': {
	        	name: 'Bowling',
	        	img: 'images/icons/hall.png'
	        },
	        'cafe': {
	        	name: 'Cafe',
	        	img: 'images/icons/hall.png'
	        },
	        'cardsRoom': {
	        	name: 'Cards Room',
	        	img: 'images/icons/hall.png'
	        },
	        'indoorGames': {
	        	name: 'Indoor Games',
	        	img: 'images/icons/hall.png'
	        },
	        'jacuzzi': {
	        	name: 'Jacuzzi',
	        	img: 'images/icons/hall.png'
	        },
	        'library': {
	        	name: 'Library',
	        	img: 'images/icons/hall.png'
	        },
	        'miniTheatre': {
	        	name: 'Mini Theatre',
	        	img: 'images/icons/hall.png'
	        },
	        'partyHall': {
	        	name: 'Party Hall',
	        	img: 'images/icons/hall.png'
	        },
	        'spa': {
	        	name: 'Spa',
	        	img: 'images/icons/hall.png'
	        },
	        'steam-sauna': {
	        	name: 'Steam/Sauna',
	        	img: 'images/icons/hall.png'
	        },
	        'videoGames': {
	        	name: 'Video Games',
	        	img: 'images/icons/hall.png'
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
	        	img: 'images/icons/court.png'
	        },
	        'golfCourseFacing': {
	        	name: 'Golf Course Facing',
	        	img: 'images/icons/court.png'
	        },
	        'golfPutting': {
	        	name: 'Golf Putting',
	        	img: 'images/icons/court.png'
	        },
	        'joggingTrack': {
	        	name: 'Jogging Track',
	        	img: 'images/icons/court.png'
	        },
	        'skatingRink': {
	        	name: 'Skating Rink',
	        	img: 'images/icons/court.png'
	        },
	        'snookerPool': {
	        	name: 'Snooker/Pool',
	        	img: 'images/icons/court.png'
	        },
	        'tableTennis': {
	        	name: 'Table Tennis',
	        	img: 'images/icons/court.png'
	        },
	        'tennisCourt': {
	        	name: 'Tennis Court',
	        	img: 'images/icons/court.png'
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
    loading(false);
    db.ref('projects/-KYJONgh0P98xoyPPYm9/residential/' + $scope.projectId).once('value', function(snapshot) {
        $timeout(function() {
        	console.log(snapshot.val());
            $scope.project = snapshot.val();
            $scope.projectName = $scope.project.projectName;
            document.title=$scope.projectName;
            $scope.coverImage = "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/residential/' + $scope.project.projectId + '/images/coverPhoto/' + $scope.project.images.coverPhoto.url + '-s.jpg';
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
    	console.log($scope.amenitiesPresent);
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
        console.log(data);
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
            loading(false);
            $('ul.tabs').tabs();
        },300);
    	console.log($scope.configurations);
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
		loading(true);
		console.log(data);
		db.ref('queries/'+$scope.cityId+'/residential/'+$scope.projectId).push(data).then(function(){
			loading(false);
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
        }
        $rootScope.$broadcast('initGallery', imageData);
    }

}]);

// Reviews and Ratings Controller
app.controller('projectReviewRatingCtrl', ['$scope', '$timeout', '$stateParams', '$rootScope', function($scope, $timeout, $stateParams, $rootScope){
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    $scope.projectId = '-KYMtlqwTF_W5S0CL6_P';
    $scope.reviews = [];

    function dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    db.ref('reviews/-KYJONgh0P98xoyPPYm9/residential/' + $scope.projectId)
        .orderByChild('wordCount')
        .limitToLast(6)
        .once('value', function(snapshot) {
        	console.log(snapshot.val());
            if (snapshot.val()) {
                $timeout(function() {
                    $scope.hasReviews = true;
                    var reviewCount = 0;
                    var allReviewCount = Object.keys(snapshot.val()).length;
                    snapshot.forEach(function(childSnapshot){
                        // console.log(childSnapshot.key, childSnapshot.val().wordCount);
                        reviewCount++;
                        if(allReviewCount < 6){
                            $scope.reviews.push(childSnapshot.val());
                        } else {
                            if(!$scope.lastValue){
                                $scope.lastValue = childSnapshot.val().wordCount;
                            } else {
                                $scope.reviews.push(childSnapshot.val());
                            }
                        }
                        if(reviewCount ==  allReviewCount){
                            loading(false);
                            if(reviewCount < 6){
                                $scope.showReviewBtn = false;
                            } else {
                                $scope.showReviewBtn = true;
                            }
                        }
                        $scope.reviews.sort(dynamicSort("-wordCount"));
                    })
                }, 0);
            }
        })

    $scope.showMoreReviews = function() {
        loading(true);
        $scope.viewReviews += 5;
        // console.log($scope.lastValue);
        db.ref('reviews/-KYJONgh0P98xoyPPYm9/residential/' + $scope.projectId)
            .orderByChild('wordCount')
            .endAt($scope.lastValue)
            .limitToLast(6)
            .once('value', function(snapshot){
                $timeout(function() {
                    if (snapshot.val()) {
                            var reviewCount = 0;
                            var allReviewCount = Object.keys(snapshot.val()).length;
                            snapshot.forEach(function(childSnapshot){
                                // console.log(childSnapshot.key, childSnapshot.val().wordCount);
                                reviewCount++;
                                if(allReviewCount < 6){
                                    $scope.reviews.push(childSnapshot.val());
                                } else {
                                    if(reviewCount==1){
                                        $scope.lastValue = childSnapshot.val().wordCount;
                                    } else {
                                        $scope.reviews.push(childSnapshot.val());
                                    }
                                }
                                if(reviewCount ==  allReviewCount){
                                    loading(false);
                                    if(reviewCount < 6){
                                        $scope.showReviewBtn = false;
                                    } else {
                                        $scope.showReviewBtn = true;
                                    }
                                }
                                $scope.reviews.sort(dynamicSort("-wordCount"));
                            })
                        // console.log($scope.showReviewBtn);
                    } else {
                        $scope.showReviewBtn = false;
                        loading(false);
                    }
                }, 0);
            })
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
            	console.log('clicked');
                gallery.startImageLightbox();
            });
            $scope.showGallery = true;

        }, 500)
    });
}]);