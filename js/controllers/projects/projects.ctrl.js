app.controller('projectsCtrl', ['$scope', '$http', '$timeout', '$stateParams', '$state', function($scope, $http, $timeout, $stateParams, $state) {
	console.log($stateParams);
    $('.modal').modal();
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    $scope.projectList = [];
    var page_start = 0;
    var page_size = 10;
    var totalProjects = 0;
    var totalProjectsFetched = 0;
    $scope.dataFetched = false;
    $scope.selected = {
    	segment: {},
    	builders: {},
    	locations: {},
    	localities: {},
    	priceRange: {},
    	areaRange: {},
    	bhk: {}
    };
    $scope.demo = {};
    $scope.minArea = 0;
    $scope.maxArea = 5000;
    $scope.minPrice = 0;
    $scope.maxPrice = 1500000;
    $scope.builders = [];
    $scope.locations = [];
    $scope.localities = [];
    // $scope.segments = [
    // 	{name:'Economy', id:'economy'},
    // 	{name:'High End', id:'highEnd'},
    // 	{name:'Luxury', id:'luxury'},
    // 	{name:'Ultra Luxury', id:'ultraLuxury'}
    // ];
    $scope.filters = {
    	style:null,
    	bhk: null,
    	price_range: null,
    	area_range: null,
    	locationId: null,
    	details_builder: null,
    	page_size: null,
    	page_start: null
    }

	getLocality();
	getLocation();
	getBuilders();

	function getLocality() {
	    db.ref('locality/' + $scope.cityId).once('value', function(snapshot) {
	        $timeout(function() {

	            for (key in snapshot.val()) {
	                $scope.localities[snapshot.val()[key].localityName] = snapshot.val()[key].localityId;

	            }
	            // console.log($scope.localities);

	        }, 0)
	    });
	}

	function getLocation() {
	    db.ref('locations/' + $scope.cityId).once('value', function(snapshot) {
	        $timeout(function() {

	            for (key in snapshot.val()) {

	                $scope.locations[snapshot.val()[key].locationName] = snapshot.val()[key].locationId;

	            }
	            // console.log($scope.locations);

	        }, 0)
	    });
	}

	function getBuilders() {
	    db.ref('builders').once('value', function(snapshot) {
	        $timeout(function() {
	            if (snapshot.val()) {

	                for (key in snapshot.val()) {
	                    $scope.builders[snapshot.val()[key].builderName] = snapshot.val()[key].builderId;

	                }
	                // console.log($scope.builders);
	            }
	        }, 0);
	    })
	}

    mapParameters();

    function mapParameters(){
    	if($stateParams.segment){
    		$scope.filters.style = $stateParams.segment;
    	}
    	if($stateParams.bhk){
    		$scope.filters.bhk = $stateParams.bhk;
    	}
    	if($stateParams.price_range){
    		$scope.filters.price_range = $stateParams.price_range;
    	}
    	if($stateParams.area_range){
    		$scope.filters.area_range = $stateParams.area_range;
    	}
    	if($stateParams.locationId){
    		$scope.filters.locationId = $stateParams.locationId;
    	}
    	if($stateParams.details_builder){
    		$scope.filters.details_builder = $stateParams.details_builder;
    	}
    	console.log($scope.filters);
    	loading(false);
    	fetchProjects();
    }


    function fetchProjects(){
		$http({
			url: 'http://35.154.60.19/api/residential',
	        method : 'GET',
	        params: {
	        	style: $scope.filters.style,
	        	bhk: $scope.filters.bhk,
	        	price_range: $scope.filters.price_range,
	        	area_range: $scope.filters.area_range,
	        	locationId: $scope.filters.locationId,
	        	details_builder: $scope.filters.details_builder,
	        	page_start: page_start,
	        	page_size: page_size
	        }
	    }).then(function mySucces(response) {
	    	console.log(response);
	    	totalProjects = response.data.hits;
	    	totalProjectsFetched += Object.keys(response.data.details).length;
	    	$scope.dataFetched = true;
	    	$scope.projects = response.data.details;

	        for(key in $scope.projects){
	        	if($scope.projects[key].cover.indexOf('http') == -1){
	        		$scope.projects[key].cover = "http://cdn.roofpik.com/roofpik/projects/"+$scope.cityId+'/residential/'+$scope.projects[key].id+'/images/coverPhoto/'+$scope.projects[key].cover+'-s.jpg';
	      		}
	      		$scope.projectList.push($scope.projects[key]);
	        }
	    	loading(false);
	    }, function myError(err) {
	    	console.log(err);
	    })
    }

	$scope.applyFilters = function() {

	    $scope.style = ""
	    if (Object.keys($scope.selected.segment).length != 0) {
	        for (key in $scope.selected.segment) {
	            if ($scope.selected.segment[key]) {
	                $scope.style += reverseCamelCase(key) + '$';
	            }
	        }
	    } else {
	        delete $scope.style
	    }
	    $scope.locality = "";
	    if (Object.keys($scope.selected.localities).length != 0) {
	        for (key in $scope.selected.localities) {
	            if ($scope.localities[key]) {
	                $scope.locality += $scope.localities[key] + '$'
	            }
	        }
	    } else {
	        delete $scope.locality;
	    }

	    $scope.location = "";
	    if (Object.keys($scope.selected.locations).length != 0) {
	        for (key in $scope.selected.locations) {
	            if ($scope.locations[key]) {
	                $scope.location += $scope.locations[key] + '$'
	            }
	        }
	    } else {
	        delete $scope.location;
	    }

	    $scope.builder = "";
	    if (Object.keys($scope.selected.builders).length != 0) {
	        for (key in $scope.selected.builders) {
	            if ($scope.builders[key]) {
	                $scope.builder += $scope.builders[key] + '$'
	            }
	        }
	    } else {
	        delete $scope.builder;
	    }

	    $scope.bhk = ""
	    if (Object.keys($scope.selected.bhk).length != 0) {
	        for (key in $scope.selected.bhk) {
	            if (key == "one") {
	                key = 1;
	                $scope.bhk += key + '$'
	            }
	            if (key == "two") {
	                key = 2;
	                $scope.bhk += key + '$'
	            }
	            if (key == "three") {
	                key = 3;
	                $scope.bhk += key + '$'
	            }
	            if (key == "four") {
	                key = 4;
	                $scope.bhk += key + '$'
	            }
	            if (key == "five") {
	                key = 5;
	                $scope.bhk += key + '$'
	            }
	            if (key == "six") {
	                key = 6;
	                $scope.bhk += key + '$'
	            }
	        }
	    } else {
	        delete $scope.bhk;
	    }
	    if ($scope.style) {
	        $scope.style = $scope.style.substring(0, $scope.style.length - 1);
	    }
	    if ($scope.locality) {
	        $scope.locality = $scope.locality.substring(0, $scope.locality.length - 1);
	    }
	    if ($scope.location) {
	        $scope.location = $scope.location.substring(0, $scope.location.length - 1);
	    }
	    if ($scope.builder) {
	        $scope.builder = $scope.builder.substring(0, $scope.builder.length - 1);
	    }
	    if ($scope.bhk) {
	        $scope.bhk = $scope.bhk.substring(0, $scope.bhk.length - 1);
	    }

	    $scope.areaRange = $scope.minArea + '$' + $scope.maxArea
	    $scope.priceRange = $scope.minPrice + '$' + $scope.maxPrice;
	    if ($scope.locality) {
	        $scope.locality = $scope.locality.substring(0, $scope.locality.length - 1);
	        $scope.demo.localities = $scope.locality;
	    }
	    if ($scope.location) {
	        $scope.location = $scope.location.substring(0, $scope.location.length - 1);
	        $scope.demo.locations = $scope.location;
	    }

	    if ($scope.demo.localities && $scope.demo.locations) {
	        $scope.finalLocation = $scope.demo.localities + "$" + $scope.demo.locations;
	    } else if ($scope.demo.localities) {
	        $scope.finalLocation = $scope.demo.localities;
	    } else if ($scope.demo.locations) {
	        $scope.finalLocation = $scope.demo.locations;
	    }
	    console.log($scope.style);
	    console.log($scope.bhk);
	    console.log($scope.priceRange);
	    console.log($scope.areaRange);
	    console.log($scope.builder);
	    console.log($scope.finalLocation);
	    if(!$scope.style) {
	    	$scope.style = null;
	    }
	    if(!$scope.bhk) {
	    	$scope.bhk = null;
	    }
	    if(!$scope.priceRange) {
	    	$scope.priceRange = null;
	    }
	    if(!$scope.areaRange) {
	    	$scope.areaRange = null;
	    }
	    if(!$scope.builder) {
	    	$scope.builder = null;
	    }
	    if(!$scope.finalLocation) {
	    	$scope.finalLocation = null;
	    }

	    $state.go('projects', {segment: $scope.style, bhk: $scope.bhk, price_range: $scope.priceRange, area_range: $scope.areaRange, locationId: $scope.finalLocation, details_builder:$scope.builder});
	}

	function reverseCamelCase(str) {
	    return str
	        // insert a space between lower & upper
	        .replace(/([a-z])([A-Z])/g, '$1 $2')
	        // space before last upper in a sequence followed by lower
	        .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
	        // uppercase the first character
	        .replace(/^./, function(str) {
	            return str.toUpperCase();
	        })
	}


	window.onscroll = function(ev) {
		console.log('called');
		if($scope.dataFetched){
			if(totalProjectsFetched < totalProjects){
	    		if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
		    		if(totalProjects - totalProjectsFetched < 10){
		    			page_size = totalProjects - totalProjectsFetched;
		    		}
		    		page_start = totalProjectsFetched-1;
	    			loading(true);
	    			fetchProjects();
	    		}
			}
		}
	}
}]);
