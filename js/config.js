app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'templates/home.html',
            controller: 'homeCtrl'
        });

        $urlRouterProvider.otherwise('/');
}]);
