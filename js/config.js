app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $stateProvider.state('home', {
        url: '/home',
        views: {
            '': {
                templateUrl: 'templates/home/home.html',
                controller: 'homeCtrl'
            },
            'search@home': {
                templateUrl: 'templates/home/search.html',
                controller: 'searchCtrl'
            },
            'microMarkets@home': {
                templateUrl: 'templates/home/micro-markets.html',
                controller: 'microMarketsCtrl'
            },
            'popularProjects@home': {
                templateUrl: 'templates/home/popular-projects.html',
                controller: 'popularProjectsCtrl'
            },
            'popularSearches@home': {
                templateUrl: 'templates/home/popular-searches.html',
                controller: 'popularSearchCtrl'
            }
        }
    });

    $stateProvider.state('write-review', {
        url: '/write-review?id&type',
        templateUrl: 'templates/review/write-review.html',
        controller: 'writeReviewCtrl'
    })

    $stateProvider.state('project-details',{
        url: '/project-details?city&micro&locality&id',
        templateUrl: 'templates/projects/project-details.html',
        controller: 'projectDetailsCtrl'
    })

    $stateProvider.state('listing',{
        url: '/listing?category&bhk&micro&loc&builder&rent&ptype',
        templateUrl: 'templates/projects/listing.html',
        controller: 'listingCtrl'
    })

    $stateProvider.state('micromarket-details',{
        url: '/micromarket-details?city&micro',
        templateUrl: 'templates/location/micromarket-details.html',
        controller: 'micromarketDetailsCtrl'
    })

    $stateProvider.state('locality-details',{
        url: '/locality-details?city&micro&loc',
        templateUrl: 'templates/location/locality-details.html',
        controller: 'localityDetailsCtrl'
    })

    $stateProvider.state('city-details',{
        url: '/city-details?city',
        templateUrl: 'templates/location/city-details.html',
        controller: 'cityDetailsCtrl'
    })

    $urlRouterProvider.otherwise('/home');
}]);
