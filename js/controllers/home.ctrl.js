app.controller('homeCtrl', function($scope, $state, $timeout) {

    var allcookies = document.cookie;

    var loadTime = 6000;
    cookiearray = allcookies.split(';');
    console.log(cookiearray)
    for (var i = 0; i < cookiearray.length; i++) {
        name = cookiearray[i].split('=')[0];
        value = cookiearray[i].split('=')[1];
        if (name == 'user') {
            showLoading();
            loadTime = 1000;
        }
    }

    if (cookiearray[0] == "") {
        showLoading('stext');
        document.cookie = "user=true";
    }



    $timeout(function() {
         $('.parallax').parallax();
        hideLoading();
    }, loadTime);

});

app.controller('searchCtrl', function($scope, $timeout, $http, $state, $window) {


    $scope.projsearch = {};
    $scope.projsearch.status = false;
    var projdefault = [{
        name: 'Apartments',
        subtitle: 'in Gurgaon',
        key: 'apartment',
        category: 'default'
    }, {
        name: 'Villa',
        subtitle: 'in Gurgaon',
        key: 'villa',
        category: 'default'
    }, {
        name: 'Row House',
        subtitle: 'in Gurgaon',
        key: 'rowhouse',
        category: 'default'
    }, {
        name: 'Penthouse',
        subtitle: 'in Gurgaon',
        key: 'penthouse',
        category: 'default'
    }];



    $scope.projsearchFocus = function() {
        $scope.projsearch.status = true;
        if (!$scope.projsearch.txt && !$scope.projsearch.locfilter) {
            $scope.projsearch.data = projdefault;
        } else {

        }

    }

    $scope.projsearchBlur = function() {
        $timeout(function() {
            $scope.projsearch.status = false;
        }, 200)

    }

    $scope.getprojitem = function(item) {
        showLoading();

        if (item.category == 'default' || item.category == 'residential') {
            $scope.projsearch.txt = item.name;
        } else if (item.category == 'locSearch') {
            $scope.projsearch.txt = item.name + ' ' + item.subtitle;
        }



        $timeout(function() {
            if (item.category == 'default') {
                $window.location.href = '/#/search/2017/property/gurgaon/residential/all?ptype=' + item.key;
            } else if (item.category == 'residential') {
                $window.location.href = item.url;
            } else if (item.category == 'locSearch') {
                $window.location.href = item.url + '&ptype=' + item.ptype;
            }

        }, 500);

    }

    var textStart = 0;

    $scope.getprojsearch = function() {
        if ($scope.projsearch.txt.length > 0 && textStart == 0) {
            $scope.projsearch.loading = true;
            $http({
                url: 'http://139.162.9.71/api/mainSearch',
                method: 'POST',
                params: {
                    val: $scope.projsearch.txt
                }
            }).then(function(response) {
                textStart = 0;
                $scope.projsearch.loading = false;
                if (response.data.status == 200) {
                    $scope.projsearch.data = response.data.items;
                }
            });

        }
    }






    $scope.locsearch = {}
    $scope.locsearch.status = false;

    var locdefault = [{
        name: 'Sohna Road',
        subtitle: 'in Gurgaon',
        key: '-KfM5tQ-UKt6DtrWtzeE',
        category: 'micro'
    }, {
        name: 'Golf Course Extn Road',
        subtitle: 'in Gurgaon',
        key: '-KfQiNMHw7UE1alv1hSr',
        category: 'micro'
    }, {
        name: 'Sector 49',
        subtitle: 'in Gurgaon',
        key: '-KfRCJ0c4jveG4gkRj2_',
        category: 'locality'
    }, {
        name: 'Sector 48',
        subtitle: 'in Gurgaon',
        key: '-KfRC32KzT4Tjo0O14kI',
        category: 'locality'
    }];


    var locProjTxt = [{
        name: 'All Projects in',
        subtitle: '',
        url: '',
        category: 'locSearch',
        ptype: ''
    }, {
        name: 'Apartments in',
        subtitle: '',
        url: '',
        category: 'locSearch',
        ptype: 'apartment'
    }, {
        name: 'Villas in',
        subtitle: '',
        url: '',
        category: 'locSearch',
        ptype: 'villa'
    }, {
        name: 'Pent House in',
        subtitle: '',
        url: '',
        category: 'locSearch',
        ptype: 'penthouse'
    }, {
        name: 'Row House in',
        subtitle: '',
        url: '',
        category: 'locSearch',
        ptype: 'rowhouse'
    }];


    $scope.locsearchFocus = function() {

        $scope.locsearch.status = true;
        if (!$scope.locsearch.txt) {
            $scope.locsearch.data = locdefault;
            $scope.projsearch.locfilter = false;
        } else {

        }

    }

    $scope.locsearchBlur = function() {
        $timeout(function() {
            $scope.locsearch.status = false;
        }, 200)

    }

    var selectLocation;

    $scope.getlocitem = function(item) {

        if (item.category == 'micro') {
            filter = 'micro'
        } else if (item.category == 'locality') {
            filter = 'loc'
        }
        selectLocation = item;
        $scope.locsearch.txt = item.name;
        for (locProjItem in locProjTxt) {
            locProjTxt[locProjItem].subtitle = item.name;
            locProjTxt[locProjItem].url = '/#/search/2017/property/gurgaon/residential/all?' + filter + '=' + item.key
        }
        $scope.projsearch.locfilter = true;
        $scope.projsearch.data = locProjTxt;
        $("#projsearch").focus();

    }

    var textStart = 0;

    $scope.getlocsearch = function() {
        $scope.projsearch.locfilter = false;
        if ($scope.locsearch.txt.length > 2 && textStart == 0) {
            $scope.locsearch.loading = true;
            $http({
                url: 'http://139.162.9.71/api/searchLocation',
                method: 'POST',
                params: {
                    val: $scope.locsearch.txt
                }
            }).then(function(response) {
                textStart = 0;
                $scope.locsearch.loading = false;
                if (response.data.status == 200) {
                    $scope.locsearch.data = response.data.items;
                }
            });

        }
    }

});

app.controller('popularSearchCtrl', function($scope) {
    // console.log('popular working');
});

app.controller('microMarketsCtrl', function($scope, $timeout) {
    $timeout(function(){


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

    }, 500);

      },4000);
});

app.controller('popularProjectsCtrl', function($scope) {
   
})
