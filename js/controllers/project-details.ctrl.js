app.controller('projectDetailsCtrl', function($scope, $timeout, $q, imageUrl, $stateParams, $location) {

    // Load initialize function
    // google.maps.event.addDomListener(window, 'load', initMap);

    $scope.countryId = '-K_43TEI8cBodNbwlKqJ';
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    $scope.micromarketId = $location.search().m;
    $scope.localityId = $location.search().l;
    $scope.projectId = $location.search().p;
    $scope.pros = [];
    $scope.cons = [];
    $scope.specifications = {};
    $scope.allAmenities = amenities;

    $scope.amenitiesType = amenitiesType;

    db.ref('project/country/' + $scope.countryId + '/city/' + $scope.cityId + '/residential/micromarket/' + $scope.micromarketId + '/locality/' + $scope.localityId + '/projects/' + $scope.projectId).once('value', function(snapshot) {

        $scope.project = snapshot.val();
        console.log($scope.project.images)
        $scope.img = {}
        for (img in $scope.project.images) {
            db.ref('images/' + img).once('value', function(data) {
                item = data.val()
                $scope.img[item['key']] = item;
                if (item['imgCat'] == 'cover') {
                    $scope.xscover = 'http://cdn.roofpik.com/image/' + item['path'] + item['imgName'] + '-xs.jpg';

                    // $scope.mcover = 'http://cdn.roofpik.com/image/' + item['path'] + item['imgName'] + '-m.jpg';
                    // $("<img/>")
                    //     .on('load', function() { console.log("image loaded correctly"); })

                    // $scope.lcover = 'http://cdn.roofpik.com/image/' + item['path'] + item['imgName'] + '-l.jpg';
                }
            });
            hideLoading();
        }
        // Images needs to binded

        if ($scope.project.amenities) {
            generateAmenitiesList($scope.project.amenities);
        }
        if ($scope.project.units) {
            generateConfigurations($scope.project.units);
        }
        for (key in $scope.project.specifications) {
            var x = camelCaseToTitleCase(key);
            $scope.specifications[x] = {};
            for (key1 in $scope.project.specifications[key]) {
                var y = camelCaseToTitleCase(key1);
                $scope.specifications[x][y] = $scope.project.specifications[key][key1];
            }
        }
        // console.log($scope.project.specifications);
        if ($scope.project.highlights) {
            if ($scope.project.highlights.pros) {
                $scope.pros = $scope.project.highlights.pros.split("*");
            }
            if ($scope.project.highlights.cons) {
                $scope.cons = $scope.project.highlights.cons.split("*");
            }

        }
        if ($scope.project.general.about) {
            // console.log($scope.project.general.about.length);
            if ($scope.project.general.about.length > 500) {
                $scope.project.general.about1 = $scope.project.general.about.substring(0, 500);
                $scope.project.general.about2 = $scope.project.general.about.substring(501, $scope.project.general.about.length);
            } else {
                $scope.project.general.about1 = $scope.project.general.about;
            }
        }

    })

    $scope.configurations = {};

    function generateConfigurations(config) {
        for (key in config) {
            if ($scope.configurations[config[key].bhk]) {
                if (config[key].type == $scope.configurations[config[key].bhk].type) {
                    config[key].hrefLink = '#area' + config[key].area;
                    $scope.configurations[config[key].bhk].units[config[key].area] = config[key];
                } else {
                    $scope.configurations[config[key].bhk + 'a'] = {
                        bhk: config[key].bhk,
                        type: config[key].type,
                        hrefLink: '#bhk' + config[key].bhk + 'a',
                        units: {}
                    }
                    config[key].hrefLink = '#area' + config[key].area;
                    $scope.configurations[config[key].bhk].units[config[key].area] = config[key];
                }
            } else {
                $scope.configurations[config[key].bhk] = {
                    bhk: config[key].bhk,
                    type: config[key].type,
                    hrefLink: '#bhk' + config[key].bhk,
                    units: {}
                }
                config[key].hrefLink = '#area' + config[key].area;
                $scope.configurations[config[key].bhk].units[config[key].area] = config[key];
            }
        }
        console.log($scope.configurations);
        var start = 0;
        var unitStart = 0;
        for (key in $scope.configurations) {
            if (start == 0) {
                $scope.configurations[key].selected = true;
                for (key1 in $scope.configurations[key].units) {
                    if (unitStart == 0) {
                        $scope.configurations[key].units[key1].selected = true;
                        unitStart = 1;
                    } else {
                        $scope.configurations[key].units[key1].selected = false;
                    }
                }
                start = 1;
            } else {
                $scope.configurations[key].selected = false;
                for (key1 in $scope.configurations[key].units) {
                    if (unitStart == 0) {
                        $scope.configurations[key].units[key1].selected = true;
                        unitStart = 1;
                    } else {
                        $scope.configurations[key].units[key1].selected = false;
                    }
                }
            }
        }
        $timeout(function() {
            $('ul.tabs').tabs();
        }, 100);
    }

    $scope.selectConfig = function(config) {
        unitStart = 0;
        for (key in $scope.configurations) {
            if (config.hrefLink == $scope.configurations[key].hrefLink) {
                $scope.configurations[key].selected = true;
                for (key1 in $scope.configurations[key].units) {
                    if (unitStart == 0) {
                        $scope.configurations[key].units[key1].selected = true;
                        unitStart = 1;
                    } else {
                        $scope.configurations[key].units[key1].selected = false;
                    }
                }
            } else {
                $scope.configurations[key].selected = false;
                for (key1 in $scope.configurations[key].units) {
                    $scope.configurations[key].units[key1].selected = false;
                }
            }
        }

        $timeout(function() {
            $('ul.tabs').tabs();
        }, 500);
    }

    $scope.selectUnit = function(config, unit) {
        for (key in $scope.configurations) {
            if (config.hrefLink == $scope.configurations[key].hrefLink) {
                for (key1 in $scope.configurations[key].units) {
                    if (unit.hrefLink == $scope.configurations[key].units[key1].hrefLink) {
                        $scope.configurations[key].units[key1].selected = true;
                    } else {
                        $scope.configurations[key].units[key1].selected = false;
                    }
                }
            }
        }
    }

    function generateAmenitiesList(amenities) {
        for (key in amenities) {
            for (key1 in amenities[key]) {
                if (amenities[key][key1] != 'NA' || amenities[key][key1] != 'No') {
                    try {
                        $scope.amenitiesType[key].present = true;
                    } catch (err) { console.log(key, key1) }
                }
            }
        }

        for (key in $scope.amenitiesType) {
            if ($scope.amenitiesType[key].present) {
                $scope.showAmenities = true;
            }
        }
        $timeout(function() {
            $('ul.tabs').tabs();
        }, 500);
    }



    $scope.submitQuery = function() {
        console.log($scope.query);
        $scope.query.projectId = $scope.projectId;
        $scope.query.projectName = $scope.project.name;
        $scope.query.cityId = $scope.cityId;
        $scope.query.micromarketId = $scope.micromarketId;
        $scope.query.localityId = $scope.localityId;
        db.ref('query').push($scope.query).then(function() {
            swal('Query Submitted', 'Our executives will call you back', 'success');
        })
    }

    $scope.openModal = function() {
        $('#view_map_popup').modal('open');
        initMap();
    }
})
