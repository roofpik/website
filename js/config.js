app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'templates/home/home.html',
        controller: 'homeCtrl'
    });
    $stateProvider.state('projects', {
        url: '/projects',
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
        	'reviewRating@project-details' : {
        		templateUrl: 'templates/projects/project-review-ratings.html',
        		controller: 'projectReviewRatingCtrl'
        	}
        }
    })
    $stateProvider.state('commercial-details', {
        url: '/commercial-details',
        views: {
            '': {
                templateUrl: 'templates/projects/commercial-details.html',
                controller: 'commercialDetailsCtrl'
            },
            'reviewRating@commercial-details' : {
                templateUrl: 'templates/projects/commercial-review-ratings.html',
                controller: 'commercialReviewRatingCtrl'
            }
        }
    })
    $stateProvider.state('co-working-details', {
        url: '/co-working-details',
        views: {
            '': {
                templateUrl: 'templates/projects/co-working-details.html',
                controller: 'coWorkingDetailsCtrl'
            },
            'reviewRating@co-working-details' : {
                templateUrl: 'templates/projects/co-working-review-ratings.html',
                controller: 'coWorkingReviewRatingCtrl'
            }
        }
    })

    $urlRouterProvider.otherwise('/co-working-details');
}]);
