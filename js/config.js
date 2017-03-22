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

    $urlRouterProvider.otherwise('/home');
}]);
