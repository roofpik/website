app.controller('locationDetailsCtrl', function($scope, $stateParams, $rootScope){
	console.log($stateParams);
	$scope.cityId = '-KYJONgh0P98xoyPPYm9';
	if($stateParams.category == 'locations'){
		db.ref('locations/'+$scope.cityId+ '/'+$stateParams.id).once('value', function(response){
			console.log(response);
		})
	} else {
		db.ref('locality/'+$scope.cityId+ '/'+$stateParams.id).once('value', function(response){
			console.log(response.val());
			$scope.location = response.val();
			$scope.name = $scope.location.localityName;
			document.title=$scope.name;
            $scope.coverImage = "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/cghs/-KbT8haHPqV7gTy55f-x/images/coverPhoto/' + $scope.location.images.coverPhoto.url + '-m.jpg';
			generateImageList($scope.location.images);
		})
	}


    function generateImageList(images) {
        var imageData = [];
        for (key in images) {
            if (key == 'coverPhoto') {
                var newImage = {
                    thumb: "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/cghs/-KbT8haHPqV7gTy55f-x/images/coverPhoto/' + images[key].url + '-s.jpg',
                    src: "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/cghs/-KbT8haHPqV7gTy55f-x/images/coverPhoto/' + images[key].url + '-m.jpg',
                    display: false
                }
                if (images[key].description) {
                    newImage.caption = images[key].description;
                }
                imageData.push(newImage);
            } else {
                for (key1 in images[key]) {
                    var newImage = {
                        thumb: "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/cghs/-KbT8haHPqV7gTy55f-x/images/' + key + '/' + key1 + '/' + images[key][key1].url + '-s.jpg',
                        src: "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/cghs/-KbT8haHPqV7gTy55f-x/images/' + key + '/' + key1 + '/' + images[key][key1].url + '-m.jpg',
                        display: false
                    }
                    if (images[key][key1].description) {
                        newImage.caption = images[key][key1].description;
                    }
                    imageData.push(newImage);
                }
            }
        }
        console.log(imageData);
        $rootScope.$broadcast('initGallery', imageData);
    }
})