app.controller('locationDetailsCtrl', ['$scope', '$stateParams', '$rootScope', '$timeout', '$http', '$state', function($scope, $stateParams, $rootScope, $timeout, $http, $state) {
    console.log($stateParams);
    var parameters = decodeParams($stateParams.p);
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    $scope.loading = true;
    // console.log(parameters);
    $scope.locId = parameters.id;
    $scope.relatedProjects = {};
    console.log($scope.locId);
    if (parameters.category == 'locations') {
        $timeout(function() {
            db.ref('locations/' + $scope.cityId + '/' + $scope.locId).once('value', function(response) {
                console.log(response.val());
                $scope.name = response.val().locationName;
                $scope.id = response.val().locationId;
                document.title = $scope.name;
            });
        }, 0)
    } else {
        $timeout(function() {
            db.ref('locality/' + $scope.cityId + '/' + $scope.locId).once('value', function(response) {
                console.log(response.val());
                $scope.name = response.val().localityName;
                $scope.id = response.val().localityId;
                document.title = $scope.name;
                // $scope.coverImage = "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/cghs/-KbT8haHPqV7gTy55f-x/images/coverPhoto/' + $scope.location.images.coverPhoto.url + '-m.jpg';
                // generateImageList($scope.location.images);
            });
        }, 0)
        getRelatedProjects();
        getNearBy(); ///To Work On
    }

    function getNearBy(){
        // if (parameters.category == 'locations') {
        //     var data = {
        //         locationId: $scope.locId
        //     }
        // } else {
        //     var data = {
        //         locationId: $scope.locId
        //     }
        // }
        // var data = {
        //     locationId: '-Kc2BjFK-YABXahO8OnL   '
        // }
        // $http({
        //     url: 'http://107.23.243.89/api/GetNearby_1.0',
        //     method: 'GET',
        //     params: {
        //         args: encodeParams(data)
        //     }
        // }).then(function mySucces(response) {
        //     console.log(response);
            // var i = 0;
            // for (key in response.data.details) {
            //     $scope.relatedProjects[i] = {};
            //     $scope.relatedProjects[i].name = response.data.details[key].name;
            //     $scope.relatedProjects[i].id = response.data.details[key].id;
            //     $scope.relatedProjects[i].address = response.data.details[key].address;
            //     $scope.relatedProjects[i].overallRating = response.data.details[key].rating;
            //     $scope.relatedProjects[i].type = response.data.details[key].type;
            //     $scope.relatedProjects[i].coverImage = "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/' + $scope.relatedProjects[i].type + '/' + $scope.relatedProjects[i].id + '/images/coverPhoto/' + response.data.details[key].cover + '-s.jpg';
            //     i++;
            // }
            // $scope.loading = false;

        // })
    }

    function getRelatedProjects() {
        console.log($scope.locId);
        if (parameters.category == 'locations') {
            var data = {
                locationId: $scope.locId,
                vertical: 'residential',
                category: 'all',
                page_size: 100
            }
        } else {
            var data = {
                locationId: $scope.locId,
                category: 'all',
                vertical: 'residential',
                page_size: 100
            }
        }
        // console.log(encodeParams(data));
        $http({
            url: 'http://107.23.243.89/api/GetListing_1.0',
            method: 'GET',
            params: {
                args: encodeParams(data)
            }
        }).then(function mySucces(response) {
            console.log(response);
            var i = 0;
            for (key in response.data.details) {
                $scope.relatedProjects[i] = {};
                $scope.relatedProjects[i].name = response.data.details[key].name;
                $scope.relatedProjects[i].id = response.data.details[key].id;
                $scope.relatedProjects[i].address = response.data.details[key].address;
                $scope.relatedProjects[i].overallRating = response.data.details[key].rating;
                $scope.relatedProjects[i].type = response.data.details[key].type;
                $scope.relatedProjects[i].coverImage = "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/' + $scope.relatedProjects[i].type + '/' + $scope.relatedProjects[i].id + '/images/coverPhoto/' + response.data.details[key].cover + '-s.jpg';
                i++;
            }
            $scope.loading = false;

        })
        if (Object.keys($scope.relatedProjects).length == 0) {
            $scope.hideList = false;
        }

    }

    $scope.goToProjectsPage = function(key) {
            console.log(key)
            if (key.type == 'residential') {
                param = {
                    projectId: key.id
                }
                $state.go('project-details', { p: encodeParams(param) });
            } else if (key.type == 'cghs') {
                param = {
                    projectId: key.id,
                    category: 'cghs'
                }
                $state.go('project-details', { p: encodeParams(param) });
            }
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
