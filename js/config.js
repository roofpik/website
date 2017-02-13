app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'templates/home/home.htm',
        controller: 'homeCtrl'
    });
    $stateProvider.state('projects', {
        url: '/projects?segment&bhk&price_range&area_range&location&locality&details_builder$propertyType',
        templateUrl: 'templates/projects/projects.html',
        controller: 'projectsCtrl'
    });
    $stateProvider.state('project-details', {
        url: '/project-details',
        views: {
            '': {
                templateUrl: 'templates/projects/project-details.html',
                controller: 'projectDetailsCtrl'
            },
            'reviewRating@project-details': {
                templateUrl: 'templates/projects/project-review-ratings.html',
                controller: 'projectReviewRatingCtrl'
            }
        }
    });
    $stateProvider.state('cghs', {
        url: '/cghs?bhk&price_range&area_range&location&locality&propertyType',
        templateUrl: 'templates/projects/cghs.html',
        controller: 'cghsCtrl'
    });

    $stateProvider.state('commercial-details', {
        url: '/commercial-details',
        views: {
            '': {
                templateUrl: 'templates/projects/commercial-details.html',
                controller: 'commercialDetailsCtrl'
            },
            'reviewRating@commercial-details': {
                templateUrl: 'templates/projects/commercial-review-ratings.html',
                controller: 'commercialReviewRatingCtrl'
            }
        }
    });
    $stateProvider.state('co-working-details', {
        url: '/co-working-details',
        views: {
            '': {
                templateUrl: 'templates/projects/co-working-details.html',
                controller: 'coWorkingDetailsCtrl'
            },
            'reviewRating@co-working-details': {
                templateUrl: 'templates/projects/co-working-review-ratings.html',
                controller: 'coWorkingReviewRatingCtrl'
            }
        }
    });

    $stateProvider.state('pg-details', {
        url: '/pg-details',
        views: {
            '': {
                templateUrl: 'templates/projects/pg-details.html',
                controller: 'pgDetailsCtrl'
            },
            'reviewRating@pg-details': {
                templateUrl: 'templates/projects/pg-review-ratings.html',
                controller: 'pgReviewRatingCtrl'
            }
        }
    });
    $stateProvider.state('filter', {
        url: '/filter',
        views: {
            '': {
                templateUrl: 'templates/projects/filter.html',
                controller: 'projectsCtrl'
            }
            
        }
    });

    $urlRouterProvider.otherwise('/pg-details');
}]);
