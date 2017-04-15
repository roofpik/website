app.controller('listingCtrl', function($scope, $timeout, $stateParams, $http, $state, $location, $window) {
    ga('send', 'projectlist');
    $('html,body').scrollTop(0);
    $('.button-collapse1').sideNav({
        menuWidth: 300, // Default is 300
        edge: 'right', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true // Choose whether you can drag to open on touch screens
    });

    $scope.showMore = true;


    $scope.gotoReviews = function() {
        $state.go('write-review');
    }

    $timeout(function() {
        $("html, body").animate({ scrollTop: 0 }, "fast");
    }, 500);



    $timeout(function() {

        var slider = document.getElementById('price');
        var slider2 = document.getElementById('price2');

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


        noUiSlider.create(slider2, {
            start: [rstart, rend],
            tooltips: true,
            connect: true,
            step: 5000,
            range: {
                'min': 5000,
                'max': 200000
            }
        });

        slider2.noUiSlider.on('change', function() {
            val = slider2.noUiSlider.get();

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
        category: '',
        pagination: 1
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


    $(window).scroll(function() {
        if ($(window).scrollTop() + $(window).height() >= ($(document).height() - 1000)) {

            loadNextproj();
        }
    });



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
        console.log($scope.selected)
            // $scope.loading = true;
        fil = ''
        for (key in $scope.data) {
            if ($scope.data[key] && key != 'pagination') {
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
            console.log(fil);
            var newurl = window.location.href.split('?')[0] + fil;

            window.history.pushState({ path: newurl }, '', newurl);
        }

        getProjects();

    }



    function getProjects() {
        $scope.showMore = true;
        $scope.data.pagination = 1;

        $http({
            url: 'http://139.162.9.71/api/v1/projectFilter',
            method: 'GET',
            params: $scope.data
        }).then(function mySucces(response) {
            // $scope.loading = false;
            $scope.ln = true;
            $('.fd-load').removeClass('blur');
            $scope.projects = response.data.items;
            $timeout(function() {
                // $('input#date').characterCounter();
            }, 1000)

        })

    }


    getProjects();
    $scope.visit = {};

    $scope.visitDate = function() {
        console.log($scope.visit.date);
    }


    function loadNextproj() {
        if ($scope.ln) {
            $scope.ln = false;
            $scope.data.pagination = parseInt($scope.data.pagination) + 1;
            $http({
                url: 'http://139.162.9.71/api/v1/projectFilter',
                method: 'GET',
                params: $scope.data
            }).then(function mySucces(response) {
                // $scope.loading = false;
                // console.log(response)
                console.log(response);
                console.log($scope.projects);
                len = $scope.projects.length;
                if (response.data.items.length != 10) {
                    $scope.showMore = false;
                } else {
                    $scope.ln = true;
                }
                for (i in response.data.items) {
                    // console.log(response.data.items[i])
                    ind = len + parseInt(i);
                    $scope.projects[ind] = response.data.items[i];
                }

            })
        }
    }
    $scope.showNext = function() {
        loadNextproj();
    };




    var count = 0;
    $scope.addFilter = function(id, type) {
        console.log(id, type);
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
    $scope.dtstatus = false;

    $scope.scheduleVisit = function(proj) {
        $scope.visit.project = {};
        $scope.visit.project.key = proj.key;
        $scope.visit.project.location = proj.location;
        $scope.visit.project.location = proj.location;
        $scope.visit.project.name = proj.name;

        if (!$scope.dtstatus) {
            $('#schedule_visit').modal('open');
        } else {
            submitquery();
        }
    }


    function submitquery() {

        updates = {}
        var newPostKey = firebase.database().ref().child('enquiry').push().key;
        $scope.visit.created = new Date().getTime();
        $scope.visit.status = 'submitted';
        $scope.visit.type = 'project';
        updates['/enquiry/' + newPostKey] = $scope.visit;
        Materialize.toast('Your query have been successfully submit!', 1000, 'rounded');
        db.ref().update(updates).then(function() {

        });
        $scope.dtstatus = true;
        $('#schedule_visit').modal('close');

    }


    $scope.submitQuickQuery = function() {
        submitquery();
        $scope.dtstatus = false;

    }

    $scope.submitQuery = function() {
        submitquery();

    }

    $scope.writeReview = function(proj) {
        $state.go('write-review', { 'key': proj.key, 'name': proj.name, 'type': 'residential' })
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
