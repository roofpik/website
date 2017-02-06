app.controller('projectsCtrl', ['$scope', '$http', '$timeout', '$interval' , function($scope, $http, $timeout, $interval) {
    $('.modal').modal();
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    $scope.projectList = [];
    var page_start = 0;
    var page_size = 0;
    var totalProjects = 0;
    var totalProjectsFetched = 0;
    $scope.dataFetched = false;
    $scope.filters = {
    	segment:{

    	}
    }
    loading(true);
	$http({
		url: 'http://139.162.57.58/api/residential',
        method : 'GET'
    }).then(function mySucces(response) {
        $scope.projects = response.data.details;
        totalProjects = response.data.hits;
        totalProjectsFetched = Object.keys($scope.projects).length;
        for(key in $scope.projects){
        	if($scope.projects[key].cover.indexOf('http') == -1){
        		$scope.projects[key].cover = "http://cdn.roofpik.com/roofpik/projects/"+$scope.cityId+'/residential/'+$scope.projects[key].id+'/images/coverPhoto/'+$scope.projects[key].cover+'-s.jpg';
      		}
      		$scope.projectList.push($scope.projects[key]);
        }
        console.log(response);
        $scope.dataFetched = true;
        loading(false);
    }, function myError(err) {
        console.log(err);
        loading(false);
    });

    window.onscroll = function(ev) {
    	if($scope.dataFetched){
    		// console.log(totalProjects, totalProjectsFetched);
	    	if(totalProjectsFetched < totalProjects){
	    		var fetchCount = 10;
	    		if(totalProjects - totalProjectsFetched < 10){
	    			fetchCount = totalProjects - totalProjectsFetched;
	    		}
		        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
		          $timeout(function(){
		          	loading(true);
					$http({
						url: 'http://139.162.57.58/api/residential',
				        method : 'GET',
				        params: {
				        	bhk: 2,
				        	page_start: totalProjectsFetched-1,
				        	page_size: fetchCount
				        }
				    }).then(function mySucces(response) {
				    	$scope.projects = {};
				        $scope.projects = response.data.details;
				        totalProjectsFetched += Object.keys($scope.projects).length;
				        for(key in $scope.projects){
				        	if($scope.projects[key].cover.indexOf('http') == -1){
				        		$scope.projects[key].cover = "http://cdn.roofpik.com/roofpik/projects/"+$scope.cityId+'/residential/'+$scope.projects[key].id+'/images/coverPhoto/'+$scope.projects[key].cover+'-s.jpg';
				      		}
				      		$scope.projectList.push($scope.projects[key]);
				        }
				        console.log(response);
				        loading(false);
				    }, function myError(err) {
				        console.log(err);
				        loading(false);
				    });

		          },300);
		        } 		
	    	} else {
	    		console.log('no more projects');
	    	}
    	}
    }

    $scope.applyFilters = function(){
    	console.log($scope.filters);
    	$scope.style = '';
    	if(Object.keys($scope.filters.segment).length != 0){
    		for(key in $scope.filters.segment){
    			if($scope.filters.segment[key]){
    				$scope.style += key+'$';
    			}
    		}
    	}
    	
    	$scope.style= $scope.style.substring(0, $scope.style.length - 1);
    	console.log($scope.style);
    	var fetchCount = 10;
		if(totalProjects - totalProjectsFetched < 10){
			fetchCount = totalProjects - totalProjectsFetched;
		}
		$http({
			url: 'http://139.162.57.58/api/residential',
	        method : 'GET',
	        params: {
	        	style: $scope.style,
	        	details_builder: $scope.builders,
	        	locationId: $scope.locations,
	        	propertyType: $scope.propertyTypes,
	        	page_start: totalProjectsFetched-1,
	        	page_size: fetchCount
	        }
	    }).then(function mySucces(response) {
	    	if(response.data != null){
		    	$scope.projects = {};
		    	$scope.projectList = [];
		        $scope.projects = response.data.details;
		        totalProjectsFetched += Object.keys($scope.projects).length;
		        for(key in $scope.projects){
		        	if($scope.projects[key].cover.indexOf('http') == -1){
		        		$scope.projects[key].cover = "http://cdn.roofpik.com/roofpik/projects/"+$scope.cityId+'/residential/'+$scope.projects[key].id+'/images/coverPhoto/'+$scope.projects[key].cover+'-s.jpg';
		      		}
		      		$scope.projectList.push($scope.projects[key]);
		        }
	    	}
	        loading(false);
	    }, function myError(err) {
	        console.log(err);
	        loading(false);
	    });
    }

    // $interval(function() {
    //     console.log($scope.filters);
    //   }, 10000);
}]);
