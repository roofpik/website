app.controller('listingCtrl', ['$scope', '$timeout', '$stateParams', function($scope, $timeout, $stateParams) {

    // console.log("called");
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    $scope.details = {
        amenities: {}
    }
    $scope.reviews = {
        reviews: {}
    }
    $scope.coverStories = {
        stories: {}
    }
    $scope.priceRange = { //Object to hold minimum and maximum prices after final iteration
        '2A': {
            min: 2000000,
            max: 0
        },
        '3A': {
            min: 2000000,
            max: 0
        },
        '4A': {
            min: 2000000,
            max: 0
        },
        '5A': {
            min: 2000000,
            max: 0
        },
        '3P': {
            min: 2000000,
            max: 0
        },
        '4P': {
            min: 2000000,
            max: 0
        },
        '5P': {
            min: 2000000,
            max: 0
        }
    }
    var parameters = decodeParams($stateParams.parameters);
    // console.log(parameters);
    $scope.hideStories = false;
    $scope.showStories = false;
    $scope.hidePriceRange = true;
    $scope.hidePropertyTypes = true;
    $scope.hideGallery = true;
    $scope.hideRatingsAndReviews = true;
    $scope.availablePropertyTypes = [];
    getParams(); //fetch parameters from encoded url

    function getParams() {
        $scope.Id = parameters.id;
        $scope.type = parameters.type;
        $scope.vertical = parameters.vertical;
        $scope.category = parameters.category;
        // console.log($scope.Id);
        fetchDetails(); //to fetch amenities, images, and other details
        fetchReviews(); //to fetch reviews
        fetchStories(); //to fetch cover stories
    }

    function fetchDetails() {
        if ($scope.type == 'locality') {
            db.ref('locality/' + $scope.cityId).once('value', function(snapshot) {
                $timeout(function() {
                    for (key in snapshot.val()) {
                        if (key == $scope.Id) {
                            $scope.details.id = snapshot.val()[key].localityId;
                            $scope.details.name = snapshot.val()[key].localityName;
                            if (snapshot.val()[key].amenities) {
                                $scope.details.amenities.general = snapshot.val()[key].amenities;
                            }
                            if (snapshot.val()[key].images) {
                                $scope.details.images = snapshot.val()[key].images;
                            }
                        }
                    }
                }, 0)
                bindData();
            });
        }
        if ($scope.type == 'location') {
            db.ref('locations/' + $scope.cityId).once('value', function(snapshot) {
                $timeout(function() {
                    for (key in snapshot.val()) {
                        if (key == $scope.Id) {
                            $scope.details.id = snapshot.val()[key].locationId;
                            $scope.details.name = snapshot.val()[key].locationName;
                            if (snapshot.val()[key].amenities) {
                                $scope.details.amenities.general = snapshot.val()[key].amenities;
                            }
                            if (snapshot.val()[key].images) {
                                $scope.details.images = snapshot.val()[key].images;
                            }
                        }
                    }
                    bindData();
                }, 0)
            });
        }
        if ($scope.type == 'project' && $scope.vertical == 'commercial') {
            db.ref('projects/' + $scope.cityId + '/commercial').once('value', function(snapshot) {
                $timeout(function() {
                    for (key in snapshot.val()) {
                        if (key == $scope.Id) {
                            $scope.details.id = snapshot.val()[key].projectId;
                            $scope.details.name = snapshot.val()[key].projectName;
                            if (snapshot.val()[key].facilities) {
                                $scope.details.amenities.general = snapshot.val()[key].facilities;
                            }
                            if (snapshot.val()[key].images) {
                                $scope.details.images = snapshot.val()[key].images;
                            }
                        }
                    }
                    bindData();
                }, 0)
            });
            db.ref('projects/' + $scope.cityId + '/commercial').once('value', function(snapshot) {
                $timeout(function() {
                    for (key in snapshot.val()) {
                        if (key == $scope.Id) {
                            $scope.configs = snapshot.val()[key].configurations;
                            // console.log($scope.configs)
                            for (key in $scope.configs) {
                                $scope.availablePropertyTypes.push($scope.configs[key].unit);
                            }
                        }
                    }
                    $scope.propertyTypes = removeDuplicate($scope.availablePropertyTypes);
                    // console.log($scope.propertyTypes);
                    bindPropertyTypes();
                }, 0)
            });

        }
        if ($scope.type == 'project' && $scope.vertical == 'commercial' && $scope.category == 'coWorking') {
            db.ref('projects/' + $scope.cityId + '/coWorking').once('value', function(snapshot) {
                $timeout(function() {
                    for (key in snapshot.val()) {
                        if (key == $scope.Id) {
                            $scope.details.id = snapshot.val()[key].projectId;
                            $scope.details.name = snapshot.val()[key].projectName;

                            if (snapshot.val()[key].facilities) {
                                $scope.details.amenities.general = snapshot.val()[key].facilities;
                            }
                            if (snapshot.val()[key].images) {
                                $scope.details.images = snapshot.val()[key].images;
                            }
                        }
                    }
                    bindData();
                }, 0)
            });
            db.ref('projects/' + $scope.cityId + '/coWorking').once('value', function(snapshot) {
                $timeout(function() {
                    for (key in snapshot.val()) {
                        if (key == $scope.Id) {
                            if (snapshot.val()[key].configurations) {
                                $scope.configs = snapshot.val()[key].configurations;
                                $scope.hidePropertyTypes = false;
                                // console.log($scope.configs)
                                for (key in $scope.configs) {
                                    $scope.availablePropertyTypes.push($scope.configs[key].unit);
                                }
                            }
                        }
                    }
                    $scope.propertyTypes = removeDuplicate($scope.availablePropertyTypes);
                    // console.log($scope.propertyTypes);
                    bindPropertyTypes();
                }, 0)
            });
        }
        if ($scope.type == 'project' && $scope.vertical == 'pg') {
            db.ref('projects/' + $scope.cityId + '/pg').once('value', function(snapshot) {
                $timeout(function() {
                    for (key in snapshot.val()) {
                        if (key == $scope.Id) {
                            $scope.details.id = snapshot.val()[key].projectId;
                            $scope.details.name = snapshot.val()[key].projectName;

                            if (snapshot.val()[key].commonFacilities) {
                                $scope.details.amenities.general = snapshot.val()[key].commonFacilities;
                            }
                            if (snapshot.val()[key].images) {
                                $scope.details.images = snapshot.val()[key].images;
                            }
                        }
                    }
                    bindData();
                }, 0)
            });
            db.ref('projects/' + $scope.cityId + '/pg').once('value', function(snapshot) {
                $timeout(function() {
                    for (key in snapshot.val()) {
                        if (key == $scope.Id) {
                            $scope.configs = snapshot.val()[key].configurations;
                            // console.log($scope.configs)
                            for (key in $scope.configs) {
                                $scope.availablePropertyTypes.push($scope.configs[key].unit);
                            }
                        }
                    }
                    $scope.propertyTypes = removeDuplicate($scope.availablePropertyTypes);
                    // console.log($scope.propertyTypes);
                    bindPropertyTypes();
                }, 0)
            });
        }
        if ($scope.type == 'project' && $scope.vertical == 'residential' && $scope.category == 'cghs') {
            db.ref('projects/' + $scope.cityId + '/cghs').once('value', function(snapshot) {
                $timeout(function() {
                    for (key in snapshot.val()) {
                        if (key == $scope.Id) {
                            $scope.configs = snapshot.val()[key].configurations;
                            console.log($scope.configs)
                            for (config in $scope.configs) {
                                console.log(config);
                                var key = $scope.configs[config];
                                // console.log(key);
                                if (key.unit == 'Apartments') {
                                    if (key.bhk == '2') {
                                        if ($scope.priceRange['2A'].min > key.pricing.rent.min) {
                                            $scope.priceRange['2A'].min = key.pricing.rent.min;
                                        }
                                        if ($scope.priceRange['2A'].max < key.pricing.rent.max) {
                                            $scope.priceRange['2A'].max = key.pricing.rent.max;
                                        }
                                    }
                                    if (key.bhk == '3') {
                                        if ($scope.priceRange['3A'].min > key.pricing.rent.min) {
                                            $scope.priceRange['3A'].min = key.pricing.rent.min;
                                        }

                                        if ($scope.priceRange['3A'].max < key.pricing.rent.max) {
                                            $scope.priceRange['3A'].max = key.pricing.rent.max;
                                        }
                                    }
                                    if (key.bhk == '4') {
                                        if ($scope.priceRange['4A'].min > key.pricing.rent.min) {
                                            $scope.priceRange['4A'].min = key.pricing.rent.min;
                                        }
                                        if ($scope.priceRange['4A'].max < key.pricing.rent.min) {
                                            $scope.priceRange['4A'].max = key.pricing.rent.max;
                                        }
                                    }
                                    if (key.bhk == '5') {
                                        if ($scope.priceRange['5A'].min > key.pricing.rent.min) {
                                            $scope.priceRange['5A'].min = key.pricing.rent.min;
                                        }
                                        if ($scope.priceRange['5A'].max < key.pricing.rent.min) {
                                            $scope.priceRange['5A'].max = key.pricing.rent.max;
                                        }
                                    }
                                }
                                if (key.unit == 'Penthouses / Duplexes') {
                                    if (key.bhk == '3') {
                                        console.log('called')
                                        if ($scope.priceRange['3P'].min > key.pricing.rent.min) {
                                            $scope.priceRange['3P'].min = key.pricing.rent.min;
                                        }
                                        if ($scope.priceRange['3P'].max < key.pricing.rent.min) {
                                            $scope.priceRange['3P'].max = key.pricing.rent.max;
                                        }
                                    }
                                    if (key.bhk == '4') {
                                        console.log('called')
                                        if ($scope.priceRange['4P'].min > key.pricing.rent.min) {
                                            $scope.priceRange['4P'].min = key.pricing.rent.min;
                                        }
                                        if ($scope.priceRange['4P'].max < key.pricing.rent.min) {
                                            $scope.priceRange['4P'].max = key.pricing.rent.max;
                                        }
                                    }
                                    if (key.bhk == '5') {
                                        if ($scope.priceRange['5P'].min > key.pricing.rent.min) {
                                            $scope.priceRange['5P'].min = key.pricing.rent.min;
                                        }
                                        if ($scope.priceRange['5P'].max < key.pricing.rent.min) {
                                            $scope.priceRange['5P'].max = key.pricing.rent.max;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    bindPriceRange();
                }, 0)
            });
        }
        if ($scope.type == 'project' && $scope.vertical == 'residential') {
            db.ref('projects/' + $scope.cityId + '/residential').once('value', function(snapshot) {
                $timeout(function() {
                    for (key in snapshot.val()) {
                        if (key == $scope.Id) {
                            $scope.details.id = snapshot.val()[key].projectId;
                            $scope.details.name = snapshot.val()[key].projectName;

                            if (snapshot.val()[key].amenities) {
                                $scope.details.amenities = snapshot.val()[key].amenities;
                            }
                            if (snapshot.val()[key].images) {
                                $scope.details.images = snapshot.val()[key].images;
                            }
                        }
                    }
                    bindData();
                }, 0)
            });
            db.ref('projects/' + $scope.cityId + '/residential').once('value', function(snapshot) {
                $timeout(function() {
                    for (key in snapshot.val()) {
                        if (key == $scope.Id) {
                            $scope.configs = snapshot.val()[key].configurations;
                            // console.log($scope.configs)
                            for (config in $scope.configs) {
                                $scope.availablePropertyTypes.push($scope.configs[config].unit);
                            }
                        }
                    }
                    $scope.propertyTypes = removeDuplicate($scope.availablePropertyTypes);
                    // console.log($scope.propertyTypes);
                    bindPropertyTypes();
                }, 0)
            });
            db.ref('projects/' + $scope.cityId + '/residential').once('value', function(snapshot) {
                $timeout(function() {
                    for (key in snapshot.val()) {
                        if (key == $scope.Id) {
                            $scope.configs = snapshot.val()[key].configurations;
                            console.log($scope.configs)
                            for (config in $scope.configs) {
                                console.log(config);
                                var key = $scope.configs[config];
                                // console.log(key);
                                if (key.unit == 'Apartments') {
                                    if (key.bhk == '2') {
                                        if ($scope.priceRange['2A'].min > key.pricing.rent.min) {
                                            $scope.priceRange['2A'].min = key.pricing.rent.min;
                                        }
                                        if ($scope.priceRange['2A'].max < key.pricing.rent.max) {
                                            $scope.priceRange['2A'].max = key.pricing.rent.max;
                                        }
                                    }
                                    if (key.bhk == '3') {
                                        if ($scope.priceRange['3A'].min > key.pricing.rent.min) {
                                            $scope.priceRange['3A'].min = key.pricing.rent.min;
                                        }

                                        if ($scope.priceRange['3A'].max < key.pricing.rent.max) {
                                            $scope.priceRange['3A'].max = key.pricing.rent.max;
                                        }
                                    }
                                    if (key.bhk == '4') {
                                        if ($scope.priceRange['4A'].min > key.pricing.rent.min) {
                                            $scope.priceRange['4A'].min = key.pricing.rent.min;
                                        }
                                        if ($scope.priceRange['4A'].max < key.pricing.rent.min) {
                                            $scope.priceRange['4A'].max = key.pricing.rent.max;
                                        }
                                    }
                                    if (key.bhk == '5') {
                                        if ($scope.priceRange['5A'].min > key.pricing.rent.min) {
                                            $scope.priceRange['5A'].min = key.pricing.rent.min;
                                        }
                                        if ($scope.priceRange['5A'].max < key.pricing.rent.min) {
                                            $scope.priceRange['5A'].max = key.pricing.rent.max;
                                        }
                                    }
                                }
                                if (key.unit == 'Penthouses / Duplexes') {
                                    if (key.bhk == '3') {
                                        console.log('called')
                                        if ($scope.priceRange['3P'].min > key.pricing.rent.min) {
                                            $scope.priceRange['3P'].min = key.pricing.rent.min;
                                        }
                                        if ($scope.priceRange['3P'].max < key.pricing.rent.min) {
                                            $scope.priceRange['3P'].max = key.pricing.rent.max;
                                        }
                                    }
                                    if (key.bhk == '4') {
                                        console.log('called')
                                        if ($scope.priceRange['4P'].min > key.pricing.rent.min) {
                                            $scope.priceRange['4P'].min = key.pricing.rent.min;
                                        }
                                        if ($scope.priceRange['4P'].max < key.pricing.rent.min) {
                                            $scope.priceRange['4P'].max = key.pricing.rent.max;
                                        }
                                    }
                                    if (key.bhk == '5') {
                                        if ($scope.priceRange['5P'].min > key.pricing.rent.min) {
                                            $scope.priceRange['5P'].min = key.pricing.rent.min;
                                        }
                                        if ($scope.priceRange['5P'].max < key.pricing.rent.min) {
                                            $scope.priceRange['5P'].max = key.pricing.rent.max;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    bindPriceRange();
                }, 0)
            });
        }
    }

    function fetchReviews() {
        if ($scope.type == 'location') {
            db.ref('reviews/' + $scope.cityId + '/location').once('value', function(snapshot) {
                $timeout(function() {
                    for (key in snapshot.val()) {
                        if (key == $scope.Id) {
                            if (snapshot.val()[key]) {
                                $scope.reviews.reviews = snapshot.val()[key]
                            }
                        }
                    }
                    bindReviews();
                }, 0)
            });
        }
        if ($scope.type == 'locality') {
            db.ref('reviews/' + $scope.cityId + '/locality').once('value', function(snapshot) {
                $timeout(function() {
                    for (key in snapshot.val()) {
                        if (key == $scope.Id) {
                            if (snapshot.val()[key]) {
                                $scope.reviews.reviews = snapshot.val()[key]
                            }
                        }
                    }
                    bindReviews();
                }, 0)
            });
        }

        if ($scope.type == 'project' && $scope.vertical == 'cghs') {
            db.ref('reviews/' + $scope.cityId + '/cghs').once('value', function(snapshot) {
                $timeout(function() {
                    for (key in snapshot.val()) {
                        if (key == $scope.Id) {
                            if (snapshot.val()[key]) {
                                $scope.reviews.reviews = snapshot.val()[key]
                            }
                        }
                    }
                    bindReviews();
                }, 0)
            });
        }
        if ($scope.type == 'project' && $scope.vertical == 'pg') {
            db.ref('reviews/' + $scope.cityId + '/pg').once('value', function(snapshot) {
                $timeout(function() {
                    for (key in snapshot.val()) {
                        if (key == $scope.Id) {
                            if (snapshot.val()[key]) {
                                $scope.reviews.reviews = snapshot.val()[key]
                            }
                        }
                    }
                    bindReviews();
                }, 0)
            });
        }
        if ($scope.type == 'project' && $scope.vertical == 'commercial') {
            db.ref('reviews/' + $scope.cityId + '/commercial').once('value', function(snapshot) {
                $timeout(function() {
                    for (key in snapshot.val()) {
                        if (key == $scope.Id) {
                            if (snapshot.val()[key]) {
                                $scope.reviews.reviews = snapshot.val()[key]
                            }
                        }
                    }
                    bindReviews();
                }, 0)
            });
        }
        if ($scope.type == 'project' && $scope.vertical == 'residential') {
            db.ref('reviews/' + $scope.cityId + '/residential').once('value', function(snapshot) {
                $timeout(function() {
                    for (key in snapshot.val()) {
                        if (key == $scope.Id) {
                            if (snapshot.val()[key]) {
                                $scope.reviews.reviews = snapshot.val()[key]
                            }
                        }
                    }
                    bindReviews();
                }, 0)

            });
        }
        if ($scope.type == 'project' && $scope.vertical == 'commercial' && $scope.type == 'coWorking') {
            db.ref('reviews/' + $scope.cityId + '/coWorking').once('value', function(snapshot) {
                $timeout(function() {
                    for (key in snapshot.val()) {
                        if (key == $scope.Id) {
                            if (snapshot.val()[key]) {
                                $scope.reviews.reviews = snapshot.val()[key]
                            }
                        }
                    }
                    bindReviews();
                }, 0)
            });
        }
    }

    function fetchStories() {
        db.ref('shortStories/' + $scope.cityId).once('value', function(snapshot) {
            $timeout(function() {
                for (key in snapshot.val()) {
                    if (key == $scope.Id) {
                        if (snapshot.val()[key]) {
                            $scope.stories.userName = snapshot.val()[key].userName
                            $scope.stories.title = snapshot.val()[key].title
                            $scope.stories.story = snapshot.val()[key].shortStory
                            $scope.stories.coverPhoto = snapshot.val()[key].coverPhoto
                        }
                    }
                }

            }, 0)
        });
        bindStories();
    }


    function bindData() {
        // console.log('called');
        $scope.projDetails = $scope.details;
        $scope.projectName = $scope.details.name;
        $scope.projectId = $scope.details.id;
        $scope.otherImages = [];
        if ($scope.type == 'project') {
            for (key in $scope.details.images) {
                if (key == 'coverPhoto') {
                    var link = $scope.details.images[key];
                    var url = link.url;
                    $scope.coverPhoto = "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/' + $scope.vertical + '/' + $scope.projectId + '/images/coverPhoto/' + url + '-m.jpg';
                    $scope.thumbnailPhoto = "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/' + $scope.vertical + '/' + $scope.projectId + '/images/coverPhoto/' + url + '-s.jpg';
                } else {
                    for (key1 in $scope.details.images[key]) {
                        // console.log($scope.details.images[key][key1].url)
                        var link = $scope.details.images[key][key1].url
                        var url = "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/' + $scope.vertical + '/' + $scope.projectId + '/images/otherPhotos/' + key1 + '/' + link + '-s.jpg';
                        $scope.otherImages.push(url);
                        $scope.hideGallery = false;
                    }
                }
            }
        }
    }

    function bindReviews() {
        $scope.totalReviews = $scope.reviews;
        if ($scope.totalReviews != undefined) {
            $scope.hideRatingsAndReviews = false;
        }
    }

    function bindStories() {
        if (Object.keys($scope.coverStories.stories).length != 0) {
            $scope.hideStories = true;
            $scope.showStories = true;
        }
    }

    function bindPropertyTypes() {
        if ($scope.propertyTypes != undefined) {
            $scope.hidePropertyTypes = false;
        }
    }

    function bindPriceRange() {
        if ($scope.type == 'project' && ($scope.vertical == 'residential' || $scope.vertical == 'cghs'))
            for (key in $scope.priceRange) {
                // console.log($scope.priceRange[key].min)
                if ($scope.priceRange[key].min == 2000000) {
                    $scope.priceRange[key].min = 'NA';
                }
                if ($scope.priceRange[key].max == 0) {
                    $scope.priceRange[key].max = 'NA'
                }
            }
        console.log($scope.priceRange);
        $scope.hidePriceRange = false;
    }

    function removeDuplicate(a) {
        return a.sort().filter(function(item, pos, ary) {
            return !pos || item != ary[pos - 1];
        })
    }
}]);


app.filter('titleCase', function() {
        return function(input) {
            input = input || '';
            return input.replace(/\w\S*/g, function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
        };
    })
