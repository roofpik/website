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
        	// 'projectRatings@project-details': {
        	// 	templateUrl: 'templates/project-details/project-ratings.html',
        	// 	controller: 'projectRatingsCtrl'
        	// },
        	// 'projectBasics@project-details': {
        	// 	templateUrl: 'templates/project-details/project-basics.html',
        	// 	controller: 'projectBasicDetailsCtrl'
        	// },
        	// 'gallery@project-details': {
        	// 	templateUrl: 'templates/project-details/project-gallery.html',
        	// 	controller: 'projectGalleryCtrl'
        	// }
        }
    })

    $urlRouterProvider.otherwise('/projects');
}]);
