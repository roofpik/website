app.controller('homeCtrl', ['$scope', '$http', function($scope, $http, $state, $stateParams) {

    var page_size = 10;
    var page_start = 0;
    var totalProjects = 0;
    var totalProjectsFetched = 0;
    $scope.projectList = [];
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    $scope.projectList = [];
    $scope.dataFetched = false;
    $scope.filters = {
        bhk: null,
        price_range: null,
        area_range: null,
        locationId: null,
        propertyType: null,
        style: null,
        page_start: $scope.page_start,
        page_size: $scope.page_size
    }

    fetchProjects()

    function fetchProjects() {
        $http({
            url: 'http://35.154.60.19/api/GetResidential_1.0',
            method: 'GET',
            params: {
                style: $scope.filters.style,
                bhk: $scope.filters.bhk,
                price_range: $scope.filters.price_range,
                area_range: $scope.filters.area_range,
                locationId: $scope.filters.locationId,
                details_builder: $scope.filters.details_builder,
                // propertyType : $scope.filters.propertyType,
                page_start: page_start,
                page_size: page_size
            }
        }).then(function mySucces(response) {
            console.log(response);
            totalProjects = response.data.hits;
            // if(totalProjects == 0){
            //  swal('No Projects To Display!');
            // }
            totalProjectsFetched += Object.keys(response.data.details).length;
            $scope.dataFetched = true;
            $scope.projects = response.data.details;

            for (key in $scope.projects) {
                if ($scope.projects[key].cover.indexOf('http') == -1) {
                    $scope.projects[key].cover = "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/residential/' + $scope.projects[key].id + '/images/coverPhoto/' + $scope.projects[key].cover + '-s.jpg';
                }
                $scope.projectList.push($scope.projects[key]);
            }
            console.log($scope.projectList)
            loading(true);
        }, function myError(err) {
            console.log(err);
        })

    }



}]);
