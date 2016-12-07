app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'templates/home.html',
            controller: 'homeCtrl'
        });

    $stateProvider
        .state('profile', {
            url: '/profile',
            templateUrl: 'templates/profile.html',
            controller: 'profileCtrl'
        });

    $stateProvider
        .state('user-all-reviews', {
            url: '/user-all-reviews',
            templateUrl: 'templates/user-all-reviews.html',
            controller: 'userAllReviewsCtrl'
        });

    $stateProvider
        .state('write-review', {
            url: '/write-review',
            templateUrl: 'templates/write-review.html',
            controller: 'writeReviewCtrl'
        });

    $stateProvider
        .state('edit-review', {
            url: '/edit-review/:city/:type/:typeId/:typeName/:id',
            templateUrl: 'templates/edit-review.html',
            controller: 'editReviewCtrl'
        });

        $urlRouterProvider.otherwise('/');
}]);
