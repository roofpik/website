app.controller('listCtrl', ['$scope', '$http', '$timeout', '$stateParams', '$state', function($scope, $http, $timeout, $stateParams, $state) {
    // console.log($stateParams.p);
    if ($stateParams.p) {
        var parameters = decodeParams($stateParams.p);
    } else {
        var parameters = {
            vertical: 'residential',
            category: 'all'
        }
    }
    // console.log(parameters);
    document.title = "Projects";
    $scope.loading = true;
    $scope.filters = {
        style: null,
        bhk: null,
        price_range: null,
        area_range: null,
        locationId: null,
        details_builder: null,
        propertyType: null,
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
    $scope.lastPage = 0;
    $scope.pages = [];
    $scope.localities = [];
    $scope.locations = [];
    $scope.builders = [];
    $scope.segments = [
        { name: 'Economy', id: 'economy' },
        { name: 'High End', id: 'highEnd' },
        { name: 'Luxury', id: 'luxury' },
        { name: 'Ultra Luxury', id: 'ultraLuxury' }
    ];
    $scope.selected = {};
    $scope.price = {};
    $scope.area = {};
    $scope.selectedView = "list";
    $scope.displayType = 'boxone';
    getLocality();

    function getLocality() {
        db.ref('locality/' + $scope.cityId).once('value', function(snapshot) {
            $timeout(function() {
                for (key in snapshot.val()) {
                    $scope.localities.push(snapshot.val()[key]);
                }
                getLocation();
            }, 0)
        });
    }

    function getLocation() {
        db.ref('locations/' + $scope.cityId).once('value', function(snapshot) {
            var data = snapshot.val();
            $timeout(function() {
                $scope.locations = [];
                for (key in data) {
                    $scope.locations.push(data[key]);
                }
                getBuilders();
            }, 10)
        });
    }

    function getBuilders() {
        db.ref('builders').once('value', function(snapshot) {
            $timeout(function() {
                if (snapshot.val()) {
                    for (key in snapshot.val()) {
                        $scope.builders.push(snapshot.val()[key]);
                    }
                }
                mapParameters();
            }, 0);
        })
    }

    function reverseBindParams(value, index) {
        var temp = value.split('$');
        for (key in temp) {
            if (!$scope.selected[index]) {
                $scope.selected[index] = {};
            }
            $scope.selected[index][temp[key]] = true;
        }
    }

    function mapParameters() {
        if (parameters.segment) {
            $scope.filters.style = parameters.segment;
            reverseBindParams(parameters.segment, 'segment');
        }
        if (parameters.bhk) {
            $scope.filters.bhk = parameters.bhk;
            reverseBindParams(parameters.bhk, 'bhk');
        }
        if (parameters.rating) {
            $scope.filters.rating = parameters.rating;
            $scope.selected.rating = {};
            for (var i = 5; i > 0; i--) {
                if (i >= parameters.rating) {
                    $scope.selected.rating[i] = true;
                }
            }
            // console.log($scope.selected.rating);
        }
        if (parameters.price_range) {
            $scope.filters.price_range = parameters.price_range;
            var temp = parameters[key].split('$');
            if (key == 'price_range') {
                if (temp[0] < temp[1]) {
                    $scope.price.min = temp[0];
                    $scope.price.max = temp[1];
                } else {
                    $scope.price.min = temp[1];
                    $scope.price.max = temp[0];
                }
            }
        }
        if (parameters.area_range) {
            $scope.filters.area_range = parameters.area_range;
            if (key == 'area_range') {
                if (temp[0] < temp[1]) {
                    $scope.area.min = temp[0];
                    $scope.area.max = temp[1];
                } else {
                    $scope.area.min = temp[1];
                    $scope.area.max = temp[0];
                }
            }
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
        if (parameters.location) {
            reverseBindParams(parameters.location, 'location');
        }
        if (parameters.locality) {
            reverseBindParams(parameters.locality, 'locality');
        }
        if (parameters.details_builder) {
            $scope.filters.details_builder = parameters.details_builder;
            // console.log(parameters.details_builder);
            reverseBindParams(parameters.details_builder, 'details_builder');
        }
        if (parameters.propertyType) {
            $scope.filters.propertyType = parameters.propertyType;
        }
        if (parameters.vertical) {
            $scope.filters.vertical = parameters.vertical;
        }
        if (parameters.category) {
            $scope.filters.category = parameters.category;
            if ($scope.filters.category == 'Penthouses / Duplexes$Villas / Row-houses') {
                $scope.propertyType = 'Penthouse / Villas';
            } else if ($scope.filters.category == 'Independent Floors') {
                $scope.propertyType = 'Low Rise / Independent Floors';
            } else if ($scope.filters.category == 'CGHS') {
                $scope.propertyType = 'CGHS';
            } else {
                $scope.propertyType = 'Apartments';
            }
        }
        fetchProjects();
    }

    function fetchProjects() {
        var data = {};
        $scope.loading = true;
        for (key in $scope.filters) {
            if ($scope.filters[key]) {
                data[key] = $scope.filters[key];
            }
        }
        data.page_start = page_start;
        data.page_size = page_size;
        console.log(data);
        $http({
            url: 'http://35.154.60.19/api/GetListing_1.0',
            method: 'GET',
            params: {
                args: encodeParams(data)
            }
        }).then(function mySucces(response) {
            console.log(response);
            $scope.projectList = [];
            totalProjects = response.data.hits;
            if (totalProjects == 0) {
                $scope.hasNoProjects = true;
            } else {
                $scope.hasNoProjects = false;
            }
            if ($scope.pages.length == 0) {
                var max = 0;
                if (totalProjects / page_size > parseInt(totalProjects / page_size)) {
                    max = parseInt(totalProjects / page_size) + 1;
                } else {
                    max = parseInt(totalProjects / page_size);
                }
                // console.log(max);
                for (var i = 1; i <= max; i++) {
                    $scope.pages.push(i);
                }
                $scope.lastPage = $scope.pages[$scope.pages.length - 1];
            }
            totalProjectsFetched += Object.keys(response.data.details).length;
            $scope.dataFetched = true;
            $scope.projects = response.data.details;
            // console.log($scope.projects);
            for (key in $scope.projects) {
                if ($scope.projects[key].cover.indexOf('http') == -1) {
                    // if ($scope.projects[key].type == 'C') {
                    //     $scope.projects[key].cover = "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/cghs/' + $scope.projects[key].id + '/images/coverPhoto/' + $scope.projects[key].cover + '-s.jpg';
                    // } else {
                    //     $scope.projects[key].cover = "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/residential/' + $scope.projects[key].id + '/images/coverPhoto/' + $scope.projects[key].cover + '-s.jpg';
                    // }
                    $scope.projects[key].cover = "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/' + $scope.projects[key].type + '/' + $scope.projects[key].id + '/images/coverPhoto/' + $scope.projects[key].cover + '-s.jpg';
                }
                $scope.projectList.push($scope.projects[key]);
            }
            // console.log($scope.projectList);
            $scope.loading = false;
        }, function myError(err) {
            // console.log(err);
            $scope.loading = false;
        })
    }

    $scope.getRedirectionString = function(id, type) {
        var data = {
                projectId: id,
                category: type
            }
            // if (parameters.category == 'CGHS') {
            //     data.category = 'cghs';
            // }
        return '../#/project-details/' + encodeParams(data);
    }

    $scope.goToPage = function(pageNum) {
        $('html,body').animate({
            scrollTop: 100
        }, 'slow');
        page_start = (pageNum - 1) * page_size;
        $scope.currentPage = pageNum;
        if (pageNum == $scope.pages[$scope.pages.length - 1]) {
            page_size = totalProjects - page_start;
        }
        fetchProjects();
    }

    $scope.changePage = function(val) {
        if (val == 1) {
            if ($scope.currentPage > 1) {
                $scope.goToPage($scope.currentPage - 1);
            }
        } else {
            if (val != $scope.lastPage) {
                $scope.goToPage($scope.currentPage + 1);
            }
        }
    }

    $scope.changeNumberOfProjects = function() {
        // console.log($scope.showProjects);
        if ($scope.showProjects) {
            if (page_size != $scope.showProjects) {
                page_size = $scope.showProjects;
                page_start = 0;
                $scope.pages = [];
                $scope.currentPage = 1;
                fetchProjects();
            }
        }
    }

    $scope.applyFilters = function() {
        var ratings = [];
        for (key in $scope.selected) {
            if ($scope.selected[key]) {
                parameters[key] = '';
                if (key == 'rating') {
                    for(key1 in Object.keys($scope.selected[key])){
                        if($scope.selected[key][Object.keys($scope.selected[key])[key1]]){
                            ratings.push(parseInt(Object.keys($scope.selected[key])[key1]));
                        }
                    }
                    ratings = ratings.sort();
                    parameters[key] = ratings[0];
                } else {
                    for (key1 in $scope.selected[key]) {
                        if ($scope.selected[key][key1]) {
                            if (parameters[key].length != 0) {
                                parameters[key] += '$'
                            }
                            parameters[key] += key1;
                        }
                    }
                }
            }
        }
        // console.log(parameters);
        if ($scope.price) {
            if ($scope.price.min && $scope.price.max) {
                parameters.price_range = $scope.price.min + '$' + $scope.price.max;
            }
        }
        if ($scope.area) {
            if ($scope.area.min && $scope.area.max) {
                parameters.area = $scope.area.min + '$' + $scope.area.max;
            }
        }
        // console.log(parameters);
        $state.go('list', { p: encodeParams(parameters) }, { reload: true });
    }

    $scope.changeView = function(val) {
        // console.log(val);
        if (val == 1) {
            $scope.selectedView = 'list';
            $scope.displayType = 'boxone';
        } else if (val == 2) {
            $scope.selectedView = 'grid1';
            $scope.displayType = 'boxtwo';
        } else {
            $scope.selectedView = 'grid2';
            $scope.displayType = 'boxthree';
        }
    }
}]);
