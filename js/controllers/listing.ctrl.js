app.controller('listingCtrl', function($scope, $timeout, $stateParams, $http, $state, $location) {
    console.log($stateParams);
    console.log($location.search());
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

    $scope.selected = {};
    $scope.categories = [
        { name: 'Best Amenities', id: 'bestAmenities' },
        { name: 'Luxury', id: 'luxury' },
        { name: 'Affordable', id: 'affordable' },
        { name: 'Ultra Luxury', id: 'ultraLuxury' },
        { name: 'Pet Friendly', id: 'petFriendly' },
        { name: 'Downtown', id: 'downtown' },
        { name: 'Bachelors', id: 'bachelors' },
        { name: 'Senior Living', id: 'seniorLiving' }
    ];

    $scope.propertyTypes = [
        { name: 'Apartments', id: 'apartments' },
        { name: 'Villas', id: 'villa' },
        { name: 'Penthouse', id: 'penthouse' },
        { name: 'Row House', id: 'rowHouse' }
    ];
    $scope.availablePropertyTypes = {
    	'apartments': 'Apartments',
    	'villa': 'Villas',
    	'penthouse': 'Penthouse',
    	'rowHouse': 'Row House'
    }

    $scope.micromarkets = [];
    $scope.locations = [];
    $scope.builders = [];
    var parameters = {};
    $scope.price = {};
    getLocations();

    function getLocations() {
        db.ref('locations/country/-K_43TEI8cBodNbwlKqJ/locality/city/-KYJONgh0P98xoyPPYm9/micromarket').once('value', function(snapshot) {
            $timeout(function() {
                for (key in snapshot.val()) {
                    for (key1 in snapshot.val()[key].places) {
                        $scope.locations.push(snapshot.val()[key].places[key1]);
                    }
                }
                getLocalities();
            }, 0)
        })
    }

    function getLocalities() {
        db.ref('locations/country/-K_43TEI8cBodNbwlKqJ/micromarket/city/-KYJONgh0P98xoyPPYm9/places').once('value', function(snapshot) {
            $timeout(function() {
                for (key in snapshot.val()) {
                    $scope.micromarkets.push(snapshot.val()[key]);
                }
                getBuilders();
            }, 0)
        })
    }

    function getBuilders() {
        db.ref('builder').once('value', function(snapshot) {
            $timeout(function() {
                for (key in snapshot.val()) {
                    $scope.builders.push(snapshot.val()[key]);
                }
                mapParameters();
            }, 0);
        })
    }

    function mapParameters() {
        for (key in $stateParams) {
            if ($stateParams[key]) {
                console.log(key, $stateParams[key]);
                if (key == 'rent') {
                    var data = $stateParams[key].split(',');
                    $scope.price.min = parseInt(data[0]);
                    $scope.price.max = parseInt(data[1]);
                } else {
                    var data = $stateParams[key].split(',');
                    console.log(data);
                    for (key1 in data) {
                        if (!$scope.selected[key]) {
                            $scope.selected[key] = {};
                        }
                        $scope.selected[key][data[key1]] = true;
                    }
                }
            }
        }
        getProjects();
        console.log($scope.selected);
    }

    function getProjects() {
        $scope.projectsFetched = false;
        $http({
            url: 'http://139.162.9.71/api/projectFilter',
            method: 'POST',
            params: {
                loc: $stateParams.loc,
                micro: $stateParams.micro,
                ptype: $stateParams.ptype,
                bhk: $stateParams.bhk,
                rmin: $scope.selected.min,
                rmax: $scope.selected.max,
                builder: $stateParams.builder,
                category: $stateParams.category
            }
        }).then(function mySucces(response) {
            console.log(response);
            $scope.projectsFetched = true;
            $scope.projects = response.data.items;
            if($scope.projects.length == 0){
                $scope.noProjects= true;
            } else {
                $scope.noProjects = false;
            }
            for (key in $scope.projects) {
                $scope.projects[key].hrefLink = '#/project-details?city='+$scope.projects[key].location.citykey+'&micro='+$scope.projects[key].location.microkey+'&locality='+$scope.projects[key].location.lockey+'&id='+$scope.projects[key].key;
                if ($scope.projects[key].propType) {
                    for (key1 in $scope.projects[key].propType) {
                        if ($scope.projects[key].propType[key1] == 'Yes') {
                        	if($scope.projects[key].propertyTypes){
                        		$scope.projects[key].propertyTypes += ', ';
                        	} else {
                        		$scope.projects[key].propertyTypes = '';
                        	}
                        	$scope.projects[key].propertyTypes += $scope.availablePropertyTypes[key1];
                        }
                    }
                }
            }
            // $scope.searchingProject = false;
        }, function myError(err) {
            // console.log(err);
            $scope.projectsFetched = false;
        })
    }

    $scope.applyFilters = function() {
        console.log($scope.selected);
        for (key in $scope.selected) {
            console.log(key, $scope.selected[key]);
            if ($scope.selected[key]) {
                var data = '';
                for (key1 in $scope.selected[key]) {
                    console.log(key1, $scope.selected[key][key1]);
                    if ($scope.selected[key][key1]) {
                        if (data.length != 0) {
                            data += ','
                        }
                        data += key1;
                    }
                }
                parameters[key] = data;
            }
        }
        if ($scope.price) {
            if ($scope.price.min && $scope.price.max) {
                if ($scope.price.min <= $scope.price.max) {
                    parameters.rent = $scope.price.min + ',' + $scope.price.max;
                } else {
                    Materialize.toast("Minimum rent should be less than maximum rent");
                }
            }
        }
        console.log(parameters);
        $state.go('listing', { category: parameters.category, bhk: parameters.bhk, micro: parameters.micro, loc: parameters.loc, builder: parameters.builder, rent: parameters.rent, ptype: parameters.ptype});
    }
})
