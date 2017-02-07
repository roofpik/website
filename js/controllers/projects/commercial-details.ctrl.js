app.controller('commercialDetailsCtrl', ['$scope', '$timeout', '$stateParams', '$rootScope', function($scope, $timeout, $stateParams, $rootScope){
	loading(false, 2000);
	$('ul.tabs').tabs();
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    $scope.projectId = '-KbKY_kJ45SDRm24gyDH';
    $scope.path = [];
    db.ref('projects/-KYJONgh0P98xoyPPYm9/commercial/' + $scope.projectId).once('value', function(snapshot) {
        $timeout(function() {
        	console.log(snapshot.val());
            $scope.project = snapshot.val();
            $scope.projectName = $scope.project.projectName;
            document.title=$scope.projectName;
            $scope.coverImage = "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/commercial/' + $scope.project.projectId + '/images/coverPhoto/' + $scope.project.images.coverPhoto.url + '-m.jpg';
            $scope.path = ["Gurgaon", "Commercial"];
            generateImageList($scope.project.images);
            // $scope.buyMin = convertCurrency($scope.project.price.buy.min);
            // $scope.buyMax = convertCurrency($scope.project.price.buy.max);
            $scope.rentMin = parseInt($scope.project.projectDetails.rentPerSqFt) * parseInt($scope.project.projectDetails.area.min);
            $scope.rentMax = parseInt($scope.project.projectDetails.rentPerSqFt) * parseInt($scope.project.projectDetails.area.max);
            $scope.rentMin = convertCurrency($scope.rentMin);
            $scope.rentMax = convertCurrency($scope.rentMax);
            if (angular.isDefined($stateParams.category)) {
                $scope.path.push(($stateParams.category).capitalize());
            }
            $scope.path.push($scope.projectName);
        }, 100);
    })

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

    function generateImageList(images) {
        var imageData = [];
        for (key in images) {
            if (key == 'coverPhoto') {
                var newImage = {
                    thumb: "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/commercial/' + $scope.project.projectId + '/images/coverPhoto/' + images[key].url + '-s.jpg',
                    src: "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/commercial/' + $scope.project.projectId + '/images/coverPhoto/' + images[key].url + '-m.jpg',
                    display: false
                }
                if (images[key].description) {
                    newImage.caption = images[key].description;
                }
                imageData.push(newImage);
            } else {
                for (key1 in images[key]) {
                    var newImage = {
                        thumb: "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/commercial/' + $scope.project.projectId + '/images/' + key + '/' + key1 + '/' + images[key][key1].url + '-s.jpg',
                        src: "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/commercial/' + $scope.project.projectId + '/images/' + key + '/' + key1 + '/' + images[key][key1].url + '-m.jpg',
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

	$scope.provideDetails = function(data){
		loading(true);
		console.log(data);
		db.ref('queries/'+$scope.cityId+'/commercial/'+$scope.projectId).push(data).then(function(){
			loading(false);
			swal('Request Logged', 'You will recieve the details in your mail', 'success');
			$timeout(function(){
				$scope.query = {};
				$scope.contactForm.$setPristine();
        		$scope.contactForm.$setUntouched();
			},1000);
		})
	}

}]);

app.controller('commercialReviewRatingCtrl', ['$scope', '$timeout', '$stateParams', '$rootScope', function($scope, $timeout, $stateParams, $rootScope){
	
}]);