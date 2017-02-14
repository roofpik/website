
app.controller('projectsCtrl', ['$scope', '$http', '$timeout', '$stateParams', '$state', '$interval', '$window', function($scope, $http, $timeout, $stateParams, $state, $interval, $window) {
    console.log($stateParams);
    document.title = "Projects"
    $('.modal').modal();
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    loading(true);
    $scope.projectList = [];
    var page_start = 0;
    var page_size = 10;
    var totalProjects = 0;
    var totalProjectsFetched = 0;
    $scope.dataFetched = false;
    $scope.selected = {
        segment: {},
        type: {},
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
    $scope.builders = {};
    $scope.locations = {};
    $scope.localities = {};
    $scope.builders2 = {}; //needed for reverse binding
    $scope.locations2 = {}; //needed for reverse binding
    $scope.localities2 = {}; //needed for reverse binding

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

    getLocality();
    function getLocality() {
        db.ref('locality/' + $scope.cityId).once('value', function(snapshot) {
            $timeout(function() {
                for (key in snapshot.val()) {
                    $scope.localities[snapshot.val()[key].localityName] = snapshot.val()[key].localityId;
                    $scope.localities2[snapshot.val()[key].localityId] = snapshot.val()[key].localityName;
                }
                getLocation();
                // console.log($scope.localities);
            }, 0)
        });
    }

    function getLocation() {
        db.ref('locations/' + $scope.cityId).once('value', function(snapshot) {
            $timeout(function() {
                for (key in snapshot.val()) {
                    $scope.locations[snapshot.val()[key].locationName] = snapshot.val()[key].locationId;
                    $scope.locations2[snapshot.val()[key].locationId] = snapshot.val()[key].locationName;
                }
                getBuilders();
            }, 0)
        });
    }

    function getBuilders() {
        db.ref('builders').once('value', function(snapshot) {
            $timeout(function() {
                if (snapshot.val()) {
                    for (key in snapshot.val()) {
                        $scope.builders[snapshot.val()[key].builderName] = snapshot.val()[key].builderId;
                        $scope.builders2[snapshot.val()[key].builderId] = snapshot.val()[key].builderName;
                    }
                    reverseBindCheckboxes();
                }
            }, 0);
        })
    }

    mapParameters();

    function mapParameters() {
        if ($stateParams.segment) {
            $scope.filters.style = $stateParams.segment;
        }
        if ($stateParams.bhk) {
            $scope.filters.bhk = $stateParams.bhk;
        }
        if ($stateParams.price_range) {
            $scope.filters.price_range = $stateParams.price_range;
        }
        if ($stateParams.area_range) {
            $scope.filters.area_range = $stateParams.area_range;
        }
        if ($stateParams.location && $stateParams.locality) {
            $scope.filters.locationId = $stateParams.location + "$" + $stateParams.locality;
        }
        if ($stateParams.location && !$stateParams.locality) {
            $scope.filters.locationId = $stateParams.location;
        }
        if ($stateParams.locality && !$stateParams.location) {
            $scope.filters.locationId = $stateParams.locality;
        }
        if ($stateParams.details_builder) {
            $scope.filters.details_builder = $stateParams.details_builder;
        }
        if ($stateParams.propertyType) {
            $scope.filters.propertyType = $stateParams.propertyType;
        }
        fetchProjects();
    }


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
                propertyType : $scope.filters.propertyType,
                page_start: page_start,
                page_size: page_size
            }
        }).then(function mySucces(response) {
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
            loading(false);
        }, function myError(err) {
            console.log(err);
        })
    }


    function reverseBindCheckboxes() {

        // console.log($scope.builders2);
        if ($stateParams.segment) {
            var segment = $stateParams.segment.split("$");
            // conso    le.log(segment);
            for (i = 0; i < segment.length; i++) {
                var key = toCamelCase(segment[i]);
                $scope.selected.segment[key] = true;
            }
        }

        if ($stateParams.propertyType) {
            var type = $stateParams.propertyType.split("$");
            for (i = 0; i < type.length; i++) {
                var key = type[i];
                if (key == "Villas / Row-houses") {
                    $scope.selected.type['villas'] = true;
                } else if (key == "Penthouses / Duplexes") {
                    $scope.selected.type['penthouses'] = true;
                } else {
                    $scope.selected.type[toCamelCase(key)] = true;
                }
            }
        }
        if ($stateParams.bhk) {
            var bhk = $stateParams.bhk.split("$");
            var key; // console.log(bhk);
            for (i = 0; i < bhk.length; i++) {
                if (bhk[i] == 1) {
                    key = "one"
                    $scope.selected.bhk[key] = true;
                }
                if (bhk[i] == 2) {
                    key = "two"
                    $scope.selected.bhk[key] = true;
                }
                if (bhk[i] == 3) {
                    key = "three"
                    $scope.selected.bhk[key] = true;
                }
                if (bhk[i] == 4) {
                    key = "four"
                    $scope.selected.bhk[key] = true;
                }
                if (bhk[i] == 5) {
                    key = "five"
                    $scope.selected.bhk[key] = true;
                }
                if (bhk[i] == 6) {
                    key = "six"
                    $scope.selected.bhk[key] = true;
                }
            }
        }

        if ($stateParams.price_range) {
            var key = $stateParams.price_range.split('$');
            $scope.minPrice = parseInt(key[0]);
            $scope.maxPrice = parseInt(key[1]);
        }
        if ($stateParams.area_range) {
            var key = $stateParams.area_range.split('$');
            $scope.minArea = parseInt(key[0]);
            $scope.maxArea = parseInt(key[1]);
        }

        if ($stateParams.details_builder) {

            var key = {};
            key = $stateParams.details_builder.split("$");

            for (i = 0; i < key.length; i++) {
                var bId = key[i];
                var bldr = $scope.builders2[bId];
                $scope.selected.builders[bldr] = true;

            }
        }

        if ($stateParams.location) {
            var key = $stateParams.location.split("$");
            for (i = 0; i < key.length; i++) {
                var locId = key[i];
                var location = $scope.locations2[locId];
                $scope.selected.locations[location] = true;
            }
        }
        if ($stateParams.locality) {
            var key = $stateParams.locality.split("$");
            for (i = 0; i < key.length; i++) {
                var localId = key[i];
                var locality = $scope.localities2[localId];
                $scope.selected.localities[locality] = true;
            }
        }

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

        $scope.type = "";
        if (Object.keys($scope.selected.type).length != 0) {

            for (key in $scope.selected.type) {
                if (key == "penthouses") {
                    key = "Penthouses / Duplexes"
                    $scope.type += key + "$"
                } else if (key == "villas") {
                    key = "Villas / Row-houses"
                    $scope.type += key + "$"
                } else {
                    $scope.type += reverseCamelCase(key) + "$"
                }
            }
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

        if ($scope.type) {
            $scope.type = $scope.type.substring(0, $scope.type.length - 1);
        }

        $scope.areaRange = $scope.minArea + '$' + $scope.maxArea
        $scope.priceRange = $scope.minPrice + '$' + $scope.maxPrice;


        // if ($scope.demo.localities && $scope.demo.locations) {
        //     $scope.finalLocation = $scope.demo.localities + "$" + $scope.demo.locations;
        // } else if ($scope.demo.localities) {
        //     $scope.finalLocation = $scope.demo.localities;
        // } else if ($scope.demo.locations) {
        //     $scope.finalLocation = $scope.demo.locations;
        // }
        // console.log($scope.style);
        // console.log($scope.bhk);
        // console.log($scope.priceRange);
        // console.log($scope.areaRange);
        // console.log($scope.builder);
        // console.log($scope.finalLocation);

        // console.log($scope.locality, $scope.location);
        if (!$scope.style) {
            $scope.style = null;
        }
        if (!$scope.bhk) {
            $scope.bhk = null;
        }
        if (!$scope.priceRange) {
            $scope.priceRange = null;
        }
        if (!$scope.areaRange) {
            $scope.areaRange = null;
        }
        if (!$scope.builder) {
            $scope.builder = null;
        }
        if (!$scope.location) {
            $scope.location = null;
        }
        if (!$scope.locality) {
            $scope.locality = null;
        }
        if (!$scope.type) {
            $scope.type = null;
        }


        // $window.location.href = "http://127.0.0.1:37210/#/projects?segment=Economy&price_range=0$1500000&area_range=0$5000&propertyType=Independent%20Floors";

        $state.go('projects', { segment: $scope.style, bhk: $scope.bhk, price_range: $scope.priceRange, area_range: $scope.areaRange, location: $scope.location, locality: $scope.locality, details_builder: $scope.builder, propertyType: $scope.type });
        $window.location.reload();

    }

    $scope.resetFilters = function(){
        $state.go('projects', { segment: null, bhk: null, price_range: null, area_range: null, location: null, locality: null, details_builder: null, propertyType: null });
        $window.location.reload();
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
    }

    function toCamelCase(str) {
        newStr = str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
            return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
        }).replace(/\s+/g, '');
        // Join by dash
        newStr2 = newStr.split('_').join('');
        // Convert first letter to lowercase
        newStr3 = newStr2.charAt(0).toLowerCase() + newStr2.slice(1);
        // Remove any special characte
        return newStr3.replace(/[^a-zA-Z1-9 ]/g, "")
    }



    // }
    // for (key in $stateParams.segment){
    //  $scope.selected.segment.key = true;
    // }


}]);
