app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'templates/home/home.html',
            controller: 'homeCtrl'
        })
        .state('projects', {
            url: '/projects',
            templateUrl: 'templates/projects/projects.html',
            controller: 'projectsCtrl'
        });

    $urlRouterProvider.otherwise('/projects');
}]);
