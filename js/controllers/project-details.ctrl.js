app.controller('projectDetailsCtrl', function($scope, $timeout, $stateParams, $rootScope, $state, $sce, $mdDialog, UserTokenService, $location){

    var timestamp = new Date().getTime();
    var urlInfo = {
        url: $location.path()
    }
    UserTokenService.checkToken(urlInfo, timestamp, 1);
    
    var rates = [1, 2, 3, 4, 5];
    $scope.projectId = $stateParams.id;
    $scope.reviews = [];
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

    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    db.ref('projects/-KYJONgh0P98xoyPPYm9/residential/'+$scope.projectId).once('value', function(snapshot) {
        // console.log(snapshot.val());
        $timeout(function() {
            $scope.project = snapshot.val();
            $scope.projectName = $scope.project.projectName;
            $scope.coverImage = "http://cdn.roofpik.com/roofpik/projects/"+$scope.cityId+'/residential/'+$scope.project.projectId+'/images/coverPhoto/'+$scope.project.images.coverPhoto+'-m.jpg';
            $scope.path = [">","Gurgaon", ">","Residential", ">"];
            if($scope.project.configurations){
                generateInfo($scope.project.configurations);
            }
            if($scope.project.amenities){
                generateAmenitiesList($scope.project.amenities);
            }
            generateImageList($scope.project.images);
            generateConfigurations($scope.project.configurations);
            $scope.buyMin = convertCurrency($scope.project.price.buy.min);
            $scope.buyMax = convertCurrency($scope.project.price.buy.max);
            $scope.rentMin = convertCurrency($scope.project.price.rent.min);
            $scope.rentMax = convertCurrency($scope.project.price.rent.max);
            if(angular.isDefined($stateParams.category)){
                $scope.path.push(($stateParams.category).capitalize());
                $scope.path.push(">");
            }
            $scope.path.push($scope.projectName);
        }, 100);
    }).then(function() {
        db.ref('reviews/-KYJONgh0P98xoyPPYm9/residential/'+$scope.projectId)
        .orderByChild('wordCount')
        .once('value', function(snapshot) {
            var allReviewsCount = Object.keys(snapshot.val()).length;
            $timeout(function(){
                var reviewCount = 0;
                snapshot.forEach(function(childSnapshot){
                    reviewCount++;
                    // console.log(childSnapshot.val().wordCount);
                    $scope.reviews.push(childSnapshot.val());
                    if(reviewCount == allReviewsCount){
                        if(reviewCount > 5){
                            $scope.showReviewBtn = true;
                        }
                    }
                });
            },0);

        }).then(function() {
            db.ref('ratingReview/-KYJONgh0P98xoyPPYm9/residential/'+$scope.projectId).once('value', function(snapshot) {
                $timeout(function() {
                    $scope.allRatings = snapshot.val();
                    $("#excellentStar").css("width", ($scope.allRatings.fiveStar / $scope.allRatings.overallRatingNum) * 100 + '%');
                    $("#veryGoodStar").css("width", ($scope.allRatings.fourStar / $scope.allRatings.overallRatingNum) * 100 + '%');
                    $("#goodStar").css("width", ($scope.allRatings.threeStar / $scope.allRatings.overallRatingNum) * 100 + '%');
                    $("#averageStar").css("width", ($scope.allRatings.twoStar / $scope.allRatings.overallRatingNum) * 100 + '%');
                    $("#badStar").css("width", ($scope.allRatings.oneStar / $scope.allRatings.overallRatingNum) * 100 + '%');
                    if($scope.allRatings.amenities){
                       $scope.allRatings.amenities1 = Math.round($scope.allRatings.amenities); 
                    }
                    if($scope.allRatings.security){
                       $scope.allRatings.security1 = Math.round($scope.allRatings.security); 
                    }
                    if($scope.allRatings.openAndGreenAreas){
                       $scope.allRatings.openAndGreenAreas1 = Math.round($scope.allRatings.openAndGreenAreas); 
                    }
                    if($scope.allRatings.electricityAndWaterSupply){
                       $scope.allRatings.electricityAndWaterSupply1 = Math.round($scope.allRatings.electricityAndWaterSupply); 
                    }
                    if($scope.allRatings.convenienceOfHouseMaids){
                       $scope.allRatings.convenienceOfHouseMaids1 = Math.round($scope.allRatings.convenienceOfHouseMaids); 
                    }
                    if($scope.allRatings.convenienceOfParking){
                       $scope.allRatings.convenienceOfParking1 = Math.round($scope.allRatings.convenienceOfParking); 
                    }
                    loading(false);
                }, 50);
            })
        })
    })

    function generateInfo(config){
        var bhkData = [];
        var areaData = [];
        for(key in config){
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
        $scope.maxArea = areaData[areaData.length  - 1];
        for(key in bhkData){
            $scope.bhk += (bhkData[key]).toString() +', ';
        }
        $scope.bhk = $scope.bhk.substring(0, $scope.bhk.length - 2)+ ' BHK';
    }

    function convertCurrency(value){
        valueLen = getlength(value);
        var denomination = '';

        if(valueLen <= 5){
            return value;
        } else if(valueLen> 5 && valueLen <= 7){
            denomination = ' L';
            value = value/100000;
            value = parseFloat(Math.round(value * 100) / 100).toFixed(2);
            return value+denomination;
        } else if(valueLen> 7 && valueLen <= 9){
            denomination = ' Cr';
            value = value/10000000;
            value = parseFloat(Math.round(value * 100) / 100).toFixed(2);
            return value+denomination;
        }
    }

    function getlength(number) {
       return number.toString().length;
    }

    function generateAmenitiesList(amenities){
        var data = [];
        for(key in amenities){
            data = [];
            for(key1 in amenities[key]){
                if(amenities[key][key1] != 'NA'){
                    var amenity = {
                        category: key,
                        id: key1,
                        value: amenities[key][key1],
                        name: $scope.allAmenities[key1]
                    }
                    data.push(amenity);
                }
            }
            if(data.length != 0){
                $scope.amenities[key] = data;
            }
        }
    }

    function generateConfigurations(configs){
        for(key in configs){
            var data = {
                unit: configs[key].unit,                
                bhk: configs[key].bhk,                
                superBuiltArea: configs[key].superBuiltArea         
            }
            if(configs[key].pricing.buy.min){
                data.buyMin = convertCurrency(configs[key].pricing.buy.min);
            }
            if(configs[key].pricing.buy.max){
                data.buyMax = convertCurrency(configs[key].pricing.buy.max);
            }  
            if(configs[key].pricing.rent.min){
                data.rentMin = convertCurrency(configs[key].pricing.rent.min);
            }
            if(configs[key].pricing.rent.max){
                data.rentMax = convertCurrency(configs[key].pricing.rent.max);
            }
            $scope.configurations.push(data);                
        }
    }

    function generateImageList(images){
        var imageData = [];
        for(key in images){
            if(key == 'coverPhoto'){
                var newImage = {
                    thumb: "http://cdn.roofpik.com/roofpik/projects/"+$scope.cityId+'/residential/'+$scope.project.projectId+'/images/coverPhoto/'+images[key]+'-s.jpg',
                    src: "http://cdn.roofpik.com/roofpik/projects/"+$scope.cityId+'/residential/'+$scope.project.projectId+'/images/coverPhoto/'+images[key]+'-m.jpg',
                    display: false
                }
                imageData.push(newImage);
            } else {
                for(key1 in images[key]){
                    var newImage = {
                        thumb: "http://cdn.roofpik.com/roofpik/projects/"+$scope.cityId+'/residential/'+$scope.project.projectId+'/images/'+key+'/'+key1+'/'+images[key][key1]+'-s.jpg',
                        src: "http://cdn.roofpik.com/roofpik/projects/"+$scope.cityId+'/residential/'+$scope.project.projectId+'/images/'+key+'/'+key1+'/'+images[key][key1]+'-m.jpg',
                        display: false
                    }
                    imageData.push(newImage);
                }
            }
        }
        console.log(imageData);
        $rootScope.$broadcast('initGallery',imageData);
    }

    $scope.showMoreAmenities = function(){
        $scope.showMoreNotClicked = !$scope.showMoreNotClicked;
        if($scope.showMoreNotClicked){
            $scope.amenitiesMoreLess = 'More +';
        } else {
            $scope.amenitiesMoreLess = 'Less -';
        }
    }

    $scope.showMoreReviews = function(){
        $scope.viewReviews += 5;
        if($scope.reviews.length > $scope.viewReviews){
            $scope.showReviewBtn = true;
        } else {
            $scope.showReviewBtn = false;
        }
    }

    $scope.takeToHome = function(){
        $state.go('home');
    }

    $scope.toTrustedHTML = function( html ){
        return $sce.trustAsHtml( html );
    }
});