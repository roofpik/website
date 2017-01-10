app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            views: {
                '': {
                    templateUrl: 'templates/home/home.html',
                    controller: 'homeCtrl'
                },
                'search@home': {
                    templateUrl: 'templates/home/search-box.html',
                    controller: 'searchCtrl'
                },
                'topRatedProjects@home': {
                    templateUrl: 'templates/home/top-projects.html',
                    controller: 'topProjectsCtrl'
                },
                'writeReviewBox@home': {
                    templateUrl: 'templates/home/write-review-box.html',
                    controller: 'writeReviewBoxCtrl'
                }
            }
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
            views: {
                '': { templateUrl: 'templates/project-details/project-details.html',
                        controller: 'projectDetailsCtrl' 
                },
                'gallery@project-details': {
                    templateUrl: 'templates/project-details/project-gallery.html',
                    controller: 'basicDetailsCtrl'
                },
                'basic@project-details': {
                    templateUrl: 'templates/project-details/project-basic-details.html',
                    controller: 'basicDetailsCtrl'
                },
                'rating@project-details': {
                    templateUrl: 'templates/project-details/project-rating-details.html',
                    controller: 'ratingDetailsCtrl'
                },
                'review@project-details': {
                    templateUrl: 'templates/project-details/project-review-details.html',
                    controller: 'reviewDetailsCtrl'
                }
            }
        });

    $stateProvider
        .state('project-detail', {
            url: '/project-detail/:year/:city/:type/:project/:id',
            views: {
                '': { templateUrl: 'templates/project-details/project-details.html',
                        controller: 'projectDetailsCtrl' 
                },
                'gallery@project-detail': {
                    templateUrl: 'templates/project-details/project-gallery.html',
                    controller: 'basicDetailsCtrl'
                },
                'basic@project-detail': {
                    templateUrl: 'templates/project-details/project-basic-details.html',
                    controller: 'basicDetailsCtrl'
                },
                'rating@project-detail': {
                    templateUrl: 'templates/project-details/project-rating-details.html',
                    controller: 'ratingDetailsCtrl'
                },
                'review@project-detail': {
                    templateUrl: 'templates/project-details/project-review-details.html',
                    controller: 'reviewDetailsCtrl'
                }
            }
        });

    // $stateProvider
    //     .state('project-detail', {
    //         url: '/project-detail/:year/:city/:type/:project/:id',
    //         templateUrl: 'templates/project-details.html',
    //         controller: 'projectDetailsCtrl'
    //     });

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
            url: '/edit-review/:city/:type/:typeId/:typeName/:id/:reviewIn',
            templateUrl: 'templates/edit-review.html',
            controller: 'editReviewCtrl'
        });

    $stateProvider
        .state('cover-stories', {
            url: '/cover-stories/:city/:cityId/:from',
            views: {
                '': {
                    templateUrl: 'templates/cover-story/cover-stories.html',
                    controller: 'coverStoriesCtrl' 
                },
                'featuredStories@cover-stories': {
                    templateUrl: 'templates/cover-story/featured-stories.html',
                    controller: 'featuredStoriesCtrl'
                },
                'popularNlocationStories@cover-stories': {
                    templateUrl: 'templates/cover-story/popular-location-stories.html',
                    controller: 'popularNlocationStoriesCtrl'
                },
                'shortStories@cover-stories': {
                    templateUrl: 'templates/cover-story/short-stories.html',
                    controller: 'shortStoriesCtrl'
                }
            }
        });

    $stateProvider
        .state('cover-story', {
            url: '/cover-story/:city/:cityId/:from/:fromId',
            views: {
                '': {
                    templateUrl: 'templates/cover-story/cover-stories.html',
                    controller: 'coverStoriesCtrl' 
                },
                'featuredStories@cover-story': {
                    templateUrl: 'templates/cover-story/featured-stories.html',
                    controller: 'featuredStoriesCtrl'
                },
                'popularNlocationStories@cover-story': {
                    templateUrl: 'templates/cover-story/popular-location-stories.html',
                    controller: 'popularNlocationStoriesCtrl'
                },
                'shortStories@cover-story': {
                    templateUrl: 'templates/cover-story/short-stories.html',
                    controller: 'shortStoriesCtrl'
                }
            }
        });

    $stateProvider
        .state('story', {
            url: '/story/:city/:place/:title/:id',
            views: {
                '': {
                    templateUrl: 'templates/cover-story/story.html',
                    controller: 'storyCtrl' 
                },
                'popularNlocationStories@story': {
                    templateUrl: 'templates/cover-story/popular-location-stories.html',
                    controller: 'popularNlocationStoriesCtrl'
                }
            }
        });

    $stateProvider
        .state('blogs', {
            url: '/blogs/:city/:cityId/:from',
            views: {
                '': {
                    templateUrl: 'templates/blogs/blogs.html',
                    controller: 'blogsCtrl' 
                },
                'featuredBlogs@blogs': {
                    templateUrl: 'templates/blogs/featured-blogs.html',
                    controller: 'featuredBlogsCtrl'
                },
                'popularNlocalityBlogs@blogs': {
                    templateUrl: 'templates/blogs/popular-locality-blogs.html',
                    controller: 'popularNlocalityCtrl'
                },
                'shortBlogs@blogs': {
                    templateUrl: 'templates/blogs/short-blogs.html',
                    controller: 'shortBlogsCtrl'
                }
            }
        });

    $stateProvider
        .state('blog', {
            url: '/blog/:city/:cityId/:from/:fromId',
            views: {
                '': { 
                    templateUrl: 'templates/blogs/blogs.html',
                    controller: 'blogsCtrl' 
                },
                'featuredBlogs@blog': {
                    templateUrl: 'templates/blogs/featured-blogs.html',
                    controller: 'featuredStoriesCtrl'
                },
                'popularNlocalityBlogs@blog': {
                    templateUrl: 'templates/blogs/popular-locality-blogs.html',
                    controller: 'popularNlocalityCtrl'
                },
                'shortBlogs@blog': {
                    templateUrl: 'templates/blogs/short-blogs.html',
                    controller: 'shortBlogsCtrl'
                }
            }
        });

    $stateProvider
        .state('blog-details', {
            url: '/blog-details/:city/:title/:id',
            views: {
                '': { 
                    templateUrl: 'templates/blogs/blog-details.html',
                    controller: 'blogDetailsCtrl' 
                },
                'popularNlocalityBlogs@blog-details': {
                    templateUrl: 'templates/blogs/popular-locality-blogs.html',
                    controller: 'popularNlocalityCtrl'
                }
            }
        });

    $stateProvider
        .state('blog-detail', {
            url: '/blog-detail/:city/:place/:title/:id',
            views: {
                '': { 
                    templateUrl: 'templates/blogs/blog-details.html',
                    controller: 'blogDetailsCtrl' 
                },
                'popularNlocality@blog-detail': {
                    templateUrl: 'templates/blogs/popular-locality-blogs.html',
                    controller: 'popularNlocalityCtrl'
                }
            }
        });

    $stateProvider
        .state('about-us', {
            url: '/about-us',
            templateUrl: 'templates/about-us.html',
            controller: 'aboutUsCtrl'
        });

    $stateProvider
        .state('contact-us', {
            url: '/contact-us',
            templateUrl: 'templates/contact-us.html',
            controller: 'contactUsCtrl'
        });

    $stateProvider
        .state('faq', {
            url: '/faq',
            templateUrl: 'templates/faq.html',
            controller: 'faqCtrl'
        });

        $urlRouterProvider.otherwise('/');
}]);