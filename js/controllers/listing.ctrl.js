app.controller('listingCtrl', function($scope, $timeout, $stateParams, $http, $state, $location, $window) {
    $('html,body').scrollTop(0);
    $timeout(function() {

        var slider = document.getElementById('price');

        if ($location.search().rmin) {
            rstart = $location.search().rmin
        } else {
            rstart = 0
        }
        if ($location.search().rmax) {
            rend = $location.search().rmax
        } else {
            rend = 200000
        }

        noUiSlider.create(slider, {
            start: [rstart, rend],
            tooltips: true,
            connect: true,
            step: 5000,
            range: {
                'min': 5000,
                'max': 200000
            }
        });

        slider.noUiSlider.on('change', function() {
            val = slider.noUiSlider.get();

            var inputMin = $('#minP');
            inputMin.val(parseFloat(val[0], 10));
            inputMin.trigger('input');

            var inputMax = $('#maxP');
            inputMax.val(parseFloat(val[1], 10));
            inputMax.trigger('input');

        });

        $('.modal').modal();

    }, 500)

    $scope.data = {
        loc: '',
        micro: '',
        ptype: '',
        bhk: '',
        rmin: '',
        rmax: '',
        builder: '',
        category: ''
    };
    $scope.selected = {};

    for (key in $location.search()) {
        if ($location.search()[key]) {
            if (key == 'rmin' || key == 'rmax') {
                $scope.data[key] = parseInt($location.search()[key]);
            } else {
                $scope.data[key] = $location.search()[key];
            }

        }
    }



    $scope.moreFilters = function() {
        $('#modal1').modal('open');
    }

    $scope.closeFilter = function() {
        $('#modal1').modal('close');
    }

    $scope.minChange = function() {
        consFilter();


        // getProjects();

    }
    $scope.maxChange = function() {
        var f = consFilter();


        // getProjects();
    }

    for (key in $scope.data) {
        if ($scope.data[key]) {
            l = $scope.data[key].toString().split(',')
            $scope.selected[key] = {}
            for (i in l) {
                $scope.selected[key][l[i]] = true;
            }
        }
    }

    function consFilter() {
        $('.fd-load').addClass('blur');

        // $scope.loading = true;
        fil = ''
        for (key in $scope.data) {
            if ($scope.data[key]) {
                if (fil == '') {
                    fil = '?' + key + '=' + $scope.data[key];
                } else {
                    fil = fil + '&' + key + '=' + $scope.data[key];
                }
                if ($scope.selected[key]) {
                    $scope.selected[key][$scope.data[key]] = true;
                } else {
                    $scope.selected[key] = {}
                    $scope.selected[key][$scope.data[key]] = true;
                }
            }
        }

        if (history.pushState) {
            var newurl = window.location.href.split('?')[0] + fil;

            window.history.pushState({ path: newurl }, '', newurl);
        }

        getProjects();

    }



    function getProjects() {

        $http({
            url: 'http://139.162.9.71/api/projectFilter',
            method: 'POST',
            params: $scope.data
        }).then(function mySucces(response) {
            // $scope.loading = false;

            $('.fd-load').removeClass('blur');
            $scope.projects = response.data.items;
            $timeout(function(){
                hideLoading()
            }, 2000)
            
        })

    }

    getProjects()


    var count = 0;
    $scope.addFilter = function(id, type) {
        if (!$scope.data[type]) {
            $scope.data[type] = id.toString();

        } else {
            filter = $scope.data[type].split(',');
            for (index in filter) {
                if (filter[index] == id) {
                    count = count + 1
                    filter.splice(index, 1);
                }
            }
            if (count == 0) {
                filter.push(id.toString())
            }
            $scope.data[type] = filter.join();
        }
        consFilter();
    }

    $scope.categories = [
        { name: 'Best Amenities', id: 'bestAmenities' },
        { name: 'Luxury', id: 'luxury' },
        { name: 'Affordable', id: 'affordable' },
        { name: 'Ultra Luxury', id: 'ultraLuxury' },
        { name: 'Pet Friendly', id: 'petFriendly' },
        { name: 'Downtown', id: 'downtown' },
        { name: 'Bachelors', id: 'bachelors' },
        { name: 'Senior Living', id: 'seniorLiving' }
    ];


    $scope.propertyTypes = [
        { name: 'Apartments', id: 'apartment' },
        { name: 'Villas', id: 'villa' },
        { name: 'Penthouse', id: 'penthouse' },
        { name: 'Row House', id: 'rowhouse' }
    ];


    $scope.micromarkets = [];
    $scope.locations = [];
    $scope.builders = [];
    getLocations();

    function getLocations() {
        db.ref('locations/country/-K_43TEI8cBodNbwlKqJ/locality/city/-KYJONgh0P98xoyPPYm9/micromarket').once('value', function(snapshot) {
            $timeout(function() {
                for (key in snapshot.val()) {
                    for (key1 in snapshot.val()[key].places) {
                        $scope.locations.push(snapshot.val()[key].places[key1]);
                    }
                }
                getLocalities();
            }, 0)
        })
    }

    function getLocalities() {
        db.ref('locations/country/-K_43TEI8cBodNbwlKqJ/micromarket/city/-KYJONgh0P98xoyPPYm9/places').once('value', function(snapshot) {
            $timeout(function() {
                for (key in snapshot.val()) {
                    $scope.micromarkets.push(snapshot.val()[key]);
                }
                getBuilders();
            }, 0)
        })
    }

    function getBuilders() {
        db.ref('builder').once('value', function(snapshot) {
            $timeout(function() {
                for (key in snapshot.val()) {
                    $scope.builders.push(snapshot.val()[key]);
                }
            }, 0);
        })
    }

    function tspaces(val) {
        return val.replace(/\s+/g, '-').toLowerCase()

    }

    $scope.showProjDetails = function(item) {
        $window.location.href = '#/rent/property/2017/gurgaon/residential/' + tspaces(item.location.microname) + '/' + tspaces(item.location.locname) + '/' +
            tspaces(item.builder) + '/' + tspaces(item.name) +
            '-project?l=' + item.location.lockey + '&m=' + item.location.microkey + '&p=' + item.key;
        // sohna-road/sector-47/builder-unitech/unitech-uniworld-gardens-1-projectmb?l=-KfRBpXGseQp9wlIZ97e&m=-KfM5tQ-UKt6DtrWtzeE&p=-KYMv8uRJQMpqBa-I-hn"
    }

})
