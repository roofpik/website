app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'templates/home/home.html',
			controller: 'homeCtrl'
		});

		$urlRouterProvider.otherwise('/home');


}]);