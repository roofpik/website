app.controller('homeCtrl', function($scope, $state, $timeout) {
    // $timeout(function(){
    //     $state.go('project-details', {city: '-KYJONgh0P98xoyPPYm9', micro: '-KfM5tQ-UKt6DtrWtzeE', locality: '-KfRC32KzT4Tjo0O14kI', id:'-Kfp4KJG2TlJYKI6-iZ0'});
    // }, 5000);
    // anychart.onDocumentReady(function() {
    //     // create pie chart with passed data
    //     chart = anychart.pie([
    //         ['Department Stores', 6371664],
    //         ['Discount Stores', 7216301],
    //         ['Men\'s/Women\'s Stores', 1486621],
    //         ['Juvenile Specialty Stores', 786622],
    //         ['All other outlets', 900000]
    //     ]);

    //     // set container id for the chart
    //     chart.container('chart1');

    //     // set chart title text settings
    //     chart.legend(false);

    //     //set chart radius
    //     chart.radius('50%');

    //     // create empty area in pie chart
    //     chart.innerRadius('40%');

    //     // initiate chart drawing
    //     chart.draw();
    // });
    $('.modal').modal();
    $('ul.tabs').tabs();
    Materialize.updateTextFields();

    $('.button-collapse').sideNav({
        menuWidth: 300, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true // Choose whether you can drag to open on touch screens
    });
    $('select').material_select();
    $('.slider').slider();
    $('.dropdown-button').dropdown();
    $('.carousel').carousel();
});

app.controller('searchCtrl', function($scope, $timeout, $http) {
    $('.modal').modal();
    $('ul.tabs').tabs();
    Materialize.updateTextFields();

    $('.button-collapse').sideNav({
        menuWidth: 300, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true // Choose whether you can drag to open on touch screens
    });
    $('select').material_select();
    $('.slider').slider();
    $('.dropdown-button').dropdown();
    $('.carousel').carousel();

    $scope.defaultList = [{
        name: 'Apartment',
        category: 'default',
        key: '1'
    }, {
        name: 'Villa',
        category: 'default',
        key: '2'
    }, {
        name: 'Row House',
        category: 'default',
        key: '3'
    }, {
        name: 'Penthouse',
        category: 'default',
        key: '4'
    }];

    $scope.afterLocationDefaultList = [{
        type: 'Overview of ',
        key: 'overview',
        category: 'default1'
    }, {
        type: 'All Projects in ',
        key: '',
        category: 'default1'
    }, {
        type: 'Apartment in ',
        key: '',
        category: 'default1'
    }, {
        type: 'Villa in ',
        key: '',
        category: 'default1'
    }, {
        type: 'Penthouse in ',
        key: '',
        category: 'default1'
    }, {
        type: 'Row House in ',
        key: '',
        category: 'default1'
    }];

    $scope.searchedLocation = '';
    $scope.searchedText = '';
    $scope.showSearch = false;
    $scope.showSearch1 = false;
    $scope.searchingLocation = false;
    $scope.searchingProject = false;
    $scope.locationNameAdded = false;
    $scope.searchTitle = 'Basic Search';
    $scope.showBasicSearch = false;

    $("#type-selection").focusin(function() {
        $timeout(function() {
            $scope.showSearch = true;
            if ($scope.searchedText.length == 0) {
                $scope.getSearchData();
            }
        }, 100);
    });
    $("#type-selection").focusout(function() {
        $timeout(function() {
            $scope.showSearch = false;
        }, 500);
    });
    $("#location-selection").focusin(function() {
        $timeout(function() {
            $scope.showSearch1 = true;
            if ($scope.searchedLocation.length == 0) {
                $scope.searchLocations();
            }
        }, 100);
    });
    $("#location-selection").focusout(function() {
        $timeout(function() {
            $scope.showSearch1 = false;
        }, 500);
    });

    // get search results based on the string in input box
    $scope.getSearchData = function() {
        if ($scope.selectedLocation) {
            if ($scope.searchedText.length > 2) {
                $scope.searchingProject = true;
                $scope.searchList = [];
                console.log($scope.selectedLocation);
                $http({
                    url: 'http://139.162.9.71/api/mainSearchByLoc',
                    method: 'POST',
                    params: {
                        val: $scope.searchedText,
                        lockey: $scope.selectedLocation.key,
                        loctype: $scope.selectedLocation.category
                    }
                }).then(function mySucces(response) {
                    console.log(response);
                    $scope.searchList = response.data.data.data;
                    $scope.searchingProject = false;
                }, function myError(err) {
                    // console.log(err);
                    $scope.searchingProject = false;
                })
            } else {
                if (!$scope.locationNameAdded) {
                    $scope.searchList = $scope.afterLocationDefaultList;
                    for (key in $scope.searchList) {
                        $scope.searchList[key].name = $scope.searchList[key].type + $scope.selectedLocation.name;
                    }
                    $scope.locationNameAdded = true;
                }
            }
        } else {
            if ($scope.searchedText.length > 2) {
                $scope.searchingProject = true;
                $scope.searchList = [];
                $http({
                    url: 'http://139.162.9.71/api/mainSearch',
                    method: 'POST',
                    params: {
                        val: $scope.searchedText
                    }
                }).then(function mySucces(response) {
                    console.log(response);
                    if (response.data.status == 200) {
                        $scope.searchList = response.data.items;
                    }
                    $scope.searchingProject = false;
                }, function myError(err) {
                    // console.log(err);
                    $scope.searchingProject = false;
                })
            } else {
                $scope.searchList = $scope.defaultList;
            }
        }
    }

    $scope.searchLocations = function() {
        if ($scope.searchedLocation.length > 2) {
            $scope.searchingLocation = true;
            $scope.locations = [];
            $http({
                url: 'http://139.162.9.71/api/searchLocation',
                method: 'POST',
                params: {
                    val: $scope.searchedLocation
                }
            }).then(function mySucces(response) {
                console.log(response);
                if (response.data.status == 200) {
                    $scope.locations = response.data.items;
                }
                console.log($scope.locations);
                $scope.searchingLocation = false;
            }, function myError(err) {
                // console.log(err);
                $scope.searchingLocation = false;
            })
        } else {
            $scope.locations = [];
            $http({
                url: 'http://139.162.9.71/api/searchLocation',
                method: 'POST',
                params: {
                    val: 'Gurgaon'
                }
            }).then(function mySucces(response) {
                console.log(response);
                if (response.data.status == 200) {
                    $scope.locations = response.data.items;
                }
                $scope.searchingLocation = false;
            }, function myError(err) {
                // console.log(err);
                $scope.searchingLocation = false;
            })
        }
    }

    $scope.selectProject = function(item) {
        console.log(item);
        $scope.projectSelected = true;
        $timeout(function() {
            $scope.showSearch = false;
        }, 500);
        $scope.searchedText = item.name;
        if (item.category == 'residential') {
            //take to project details page
        } else if (item.category == 'builder') {
            //take to project list with the builder as filter
        } else if (item.category == 'default') {
            // take to project list with the property type as filter
        } else if(item.category == 'default1'){
            console.log($scope.selectedLocation);
            // take to differnet views based on type
        }
    }

    $scope.selectLocation = function(loc) {
        console.log('called');
        $scope.locationNameAdded = false;
        $scope.searchedLocation = loc.name;
        $scope.selectedLocation = loc;
        if(!$scope.projectSelected){
            $('#type-selection').focus();
        }
        $timeout(function() {
            $scope.showSearch1 = false;
        }, 500);
    }

    $scope.toggleSearch = function(){
        $scope.showBasicSearch = !$scope.showBasicSearch;
        if ($scope.showBasicSearch) {
            $scope.searchTitle = 'Guided Search';
        } else {
            $scope.searchTitle = 'Basic Search';
        }
    }
});

app.controller('popularSearchCtrl', function($scope) {
    // console.log('popular working');
});

app.controller('microMarketsCtrl', function($scope) {
    // console.log('micro working');
    Highcharts.chart('chart1', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            margin: [0, 0, 0, 0],
            spacingTop: 0,
            spacingBottom: 0,
            spacingLeft: 0,
            spacingRight: 0
        },
        title: {
            text: null
        },
        tooltip: {
            pointFormat: ' <b>{point.y}</b>'
        },
        plotOptions: {
            pie: {
                size: '100%',
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Villas',
                y: 22,
                sliced: true,
                selected: true
            }, {
                name: 'Apartments',
                y: 70
            }, {
                name: 'Penthouse',
                y: 18
            }, {
                name: 'Row House',
                y: 15
            }]
        }]
    });


    Highcharts.chart('chart2', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            margin: [0, 0, 0, 0],
            spacingTop: 0,
            spacingBottom: 0,
            spacingLeft: 0,
            spacingRight: 0
        },
        title: {
            text: null
        },
        tooltip: {
            pointFormat: ' <b>{point.y}</b>'
        },
        plotOptions: {
            pie: {
                size: '100%',
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Villas',
                y: 18,
                sliced: true,
                selected: true
            }, {
                name: 'Apartments',
                y: 22
            }, {
                name: 'Penthouse',
                y: 19
            }, {
                name: 'Row House',
                y: 10
            }]
        }]
    });

    setTimeout(function() {
        $('#chart1').css('position', 'absolute');
        $('#chart1').css('top', '-18px');
        $('#chart2').css('position', 'absolute');
        $('#chart2').css('top', '-18px');
    }, 1000);
});

app.controller('popularProjectsCtrl', function($scope) {
    $('.slider').slider();
})
