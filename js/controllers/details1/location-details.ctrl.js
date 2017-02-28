app.controller('locationDetailsCtrl', ['$scope', '$stateParams', '$rootScope', '$timeout', function($scope, $stateParams, $rootScope, $timeout) {
    console.log($stateParams);
    var parameters = decodeParams($stateParams.p);
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    console.log(parameters);
    $scope.locId = parameters.id;
    console.log($scope.locId);
    if (parameters.category == 'locations') {
        $timeout(function() {
            db.ref('locations/' + $scope.cityId + '/' + $scope.locId).once('value', function(response) {
                console.log(response.val());
                $scope.name = response.val().locationName;
                document.title = $scope.name;
            });
        }, 0)
    } else {
        $timeout(function() {
            db.ref('locality/' + $scope.cityId + '/' + $scope.locId).once('value', function(response) {
                console.log(response.val());
                $scope.name = response.val().localityName;
                document.title = $scope.name;
                // $scope.coverImage = "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/cghs/-KbT8haHPqV7gTy55f-x/images/coverPhoto/' + $scope.location.images.coverPhoto.url + '-m.jpg';
                // generateImageList($scope.location.images);
            });
        }, 0)
    }


    // function generateImageList(images) {
    //     var imageData = [];
    //     for (key in images) {
    //         if (key == 'coverPhoto') {
    //             var newImage = {
    //                 thumb: "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/cghs/-KbT8haHPqV7gTy55f-x/images/coverPhoto/' + images[key].url + '-s.jpg',
    //                 src: "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/cghs/-KbT8haHPqV7gTy55f-x/images/coverPhoto/' + images[key].url + '-m.jpg',
    //                 display: false
    //             }
    //             if (images[key].description) {
    //                 newImage.caption = images[key].description;
    //             }
    //             imageData.push(newImage);
    //         } else {
    //             for (key1 in images[key]) {
    //                 var newImage = {
    //                     thumb: "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/cghs/-KbT8haHPqV7gTy55f-x/images/' + key + '/' + key1 + '/' + images[key][key1].url + '-s.jpg',
    //                     src: "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/cghs/-KbT8haHPqV7gTy55f-x/images/' + key + '/' + key1 + '/' + images[key][key1].url + '-m.jpg',
    //                     display: false
    //                 }
    //                 if (images[key][key1].description) {
    //                     newImage.caption = images[key][key1].description;
    //                 }
    //                 imageData.push(newImage);
    //             }
    //         }
    //     }
    //     console.log(imageData);
    //     $rootScope.$broadcast('initGallery', imageData);
    // }
}])
