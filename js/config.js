app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'templates/home.html',
            controller: 'homeCtrl'
        });

    $stateProvider
        .state('projects', {
            url: '/projects/:year/:city/:type/:category/:categoryId/:id',
            templateUrl: 'templates/projects.html',
            controller: 'projectsCtrl'
        });

    $stateProvider
        .state('project-details', {
            url: '/project-details/:year/:city/:type/:category/:project/:id',
            templateUrl: 'templates/project-details.html',
            controller: 'projectDetailsCtrl'
        });

    $stateProvider
        .state('project-detail', {
            url: '/project-detail/:year/:city/:type/:project/:id',
            templateUrl: 'templates/project-details.html',
            controller: 'projectDetailsCtrl'
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

    $stateProvider
        .state('cover-stories', {
            url: '/cover-stories/:city/:cityId/:from',
            templateUrl: 'templates/cover-stories.html',
            controller: 'coverStoriesCtrl'
        });

    $stateProvider
        .state('cover-story', {
            url: '/cover-story/:city/:cityId/:from/:fromId',
            templateUrl: 'templates/cover-stories.html',
            controller: 'coverStoriesCtrl'
        });

    $stateProvider
        .state('story', {
            url: '/story/:id',
            templateUrl: 'templates/story.html',
            controller: 'storyCtrl'
        });

    $stateProvider
        .state('blogs', {
            url: '/blogs/:city/:cityId/:from',
            templateUrl: 'templates/blogs.html',
            controller: 'blogsCtrl'
        });

    $stateProvider
        .state('blog', {
            url: '/blog/:city/:cityId/:from/:fromId',
            templateUrl: 'templates/blogs.html',
            controller: 'blogsCtrl'
        });

    $stateProvider
        .state('blog-details', {
            url: '/blog-details/:id',
            templateUrl: 'templates/blog-details.html',
            controller: 'blogDetailsCtrl'
        });

        $urlRouterProvider.otherwise('/');
}]);
