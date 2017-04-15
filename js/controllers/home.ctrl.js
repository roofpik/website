app.controller('homeCtrl', function($scope, $state, $timeout) {
    ga('send', 'home');
    $('.modal').modal('close');
    $('.parallax').parallax();
    $timeout(function() {
        $('.carousel.carousel-slider').carousel({
            full_width: true
        });
    }, 1000)


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


    $scope.search = function() {
        $('#projsearch').focus();
    }

    $scope.projsearchFocus = function() {
        $scope.projsearch.status = true;
        if (!$scope.projsearch.txt && !$scope.projsearch.locfilter) {
            $scope.projsearch.data = projdefault;
        }
    }

    $scope.projsearchBlur = function() {
        $timeout(function() {
            $scope.projsearch.status = false;
        }, 200)

    }

    $scope.getprojitem = function(item) {

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

            if (!$scope.projsearch.locfilter) {
                $http({
                    url: 'http://139.162.9.71/api/v1/mainSearch',
                    method: 'GET',
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
            } else {
                $http({
                    url: 'http://139.162.9.71/api/v1/mainSearchByLoc',
                    method: 'GET',
                    params: {
                        val: $scope.projsearch.txt,
                        type: $scope.projsearch.locCat,
                        key: $scope.projsearch.locKey
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
        }
    }

    $scope.locsearchBlur = function() {
        $timeout(function() {
            $scope.locsearch.status = false;
        }, 200)

    }

    var selectLocation;

    $scope.writeReview = function() {
        $state.go('write-review');
    }

    $scope.getlocitem = function(item) {

        if (item.category == 'micro') {
            filter = 'micro';
            $scope.projsearch.locCat = 'micromarket';
        } else if (item.category == 'locality') {
            filter = 'loc';
            $scope.projsearch.locCat = 'locality';
        }
        selectLocation = item;
        $scope.locsearch.txt = item.name;
        for (locProjItem in locProjTxt) {
            locProjTxt[locProjItem].subtitle = item.name;
            locProjTxt[locProjItem].url = '/#/search/2017/property/gurgaon/residential/all?' + filter + '=' + item.key
        }
        $scope.projsearch.locfilter = true;
        $scope.projsearch.locKey = item.key;
        $scope.projsearch.data = locProjTxt;
        $("#projsearch").focus();

    }

    var textStart = 0;

    $scope.getlocsearch = function() {
        $scope.projsearch.locfilter = false;
        if ($scope.locsearch.txt.length > 2 && textStart == 0) {
            $scope.locsearch.loading = true;
            $http({
                url: 'http://139.162.9.71/api/v1/searchLocation',
                method: 'GET',
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
