app.controller('listCtrl', ['$scope', '$http', '$timeout', '$stateParams', function($scope, $http, $timeout, $stateParams){
	var parameters = decodeParams($stateParams.p);
	// console.log(parameters);
    $scope.filters = {
        style: null,
        bhk: null,
        price_range: null,
        area_range: null,
        locationId: null,
        details_builder: null,
        propertyType : null,
        page_size: null,
        page_start: null
    }

    var page_start = 0;
    var page_size = 10;
    var totalProjects = 0;
    var totalProjectsFetched = 0;
    $scope.dataFetched = false;
    $scope.projectList = [];
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    $scope.currentPage = 1;
    $scope.pages = [];

    mapParameters();

    function mapParameters() {
        if (parameters.segment) {
            $scope.filters.style = parameters.segment;
        }
        if (parameters.bhk) {
            $scope.filters.bhk = parameters.bhk;
        }
        if (parameters.price_range) {
            $scope.filters.price_range = parameters.price_range;
        }
        if (parameters.area_range) {
            $scope.filters.area_range = parameters.area_range;
        }
        if (parameters.location && parameters.locality) {
            $scope.filters.locationId = parameters.location + "$" + parameters.locality;
        }
        if (parameters.location && !parameters.locality) {
            $scope.filters.locationId = parameters.location;
        }
        if (parameters.locality && !parameters.location) {
            $scope.filters.locationId = parameters.locality;
        }
        if (parameters.details_builder) {
            $scope.filters.details_builder = parameters.details_builder;
        }
        if(parameters.propertyType){
            $scope.filters.propertyType = parameters.propertyType;
        }
        console.log($scope.filters);
        if(parameters.vertical == 'residential' || parameters.vertical == 'commercial' || parameters.vertical == 'pg'){
        	fetchProjects();
        }
    }

    function fetchProjects() {
    	console.log(parameters);
    	var data = {
    		'vertical': parameters.vertical,
    		'category': parameters.category,
    		// 'style': 'Economy',
            // 'style': $scope.filters.style,
            // 'bhk': $scope.filters.bhk,
            // 'price_range': $scope.filters.price_range,
            // 'area_range': $scope.filters.area_range,
            // 'locationId': $scope.filters.locationId
            // 'details_builder': $scope.filters.details_builder,
            // // propertyType : $scope.filters.propertyType,
            // 'page_start': page_start,
            // 'page_size': page_size
    	}

    	data = encodeParams(data);
    	console.log(data);
    	console.log(decodeParams(data));
        $http({
            url: 'http://35.154.60.19/api/GetListing_1.0',
            method: 'GET',
            params: {
            	args: data
            }
        }).then(function mySucces(response) {
            console.log(response);
            totalProjects = response.data.hits;
            if($scope.pages.length == 0){
	            if(totalProjects/page_size  > parseInt(totalProjects/10)){
	            	for(var i = 1; i <= (parseInt(totalProjects/10)+1); i++){
	            		$scope.pages.push(i);
	            	}
	            }
            }
            totalProjectsFetched += Object.keys(response.data.details).length;
            $scope.dataFetched = true;
            $scope.projects = response.data.details;

            for (key in $scope.projects) {
                if ($scope.projects[key].cover.indexOf('http') == -1) {
                    $scope.projects[key].cover = "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/residential/' + $scope.projects[key].id + '/images/coverPhoto/' + $scope.projects[key].cover + '-s.jpg';
                }
                $scope.projectList.push($scope.projects[key]);
            }
        }, function myError(err) {
            console.log(err);
        })
    }

    // window.onscroll = function(ev) {
        console.log('called');
        if ($scope.dataFetched) {
            if (totalProjectsFetched < totalProjects) {
                if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
                    if (totalProjects - totalProjectsFetched < 10) {
                        page_size = totalProjects - totalProjectsFetched;
                    }
                    page_start = totalProjectsFetched;
                    loading(true);
                    fetchProjects();
                }
            }
        }
    // }

}]);