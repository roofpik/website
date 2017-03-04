app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $stateProvider.state('home', {
        url: '/home',
        views: {
            '': {
                templateUrl: 'templates/home/home.htm',
                controller: 'homeCtrl'
            },
            'coverStories@home': {
                templateUrl: 'templates/home/cover-story.html',
                controller: 'coverStoryHomeCtrl'
            }
        }
    });

    $stateProvider.state('contact-us', {
        url: '/contact-us',
        templateUrl: 'templates/general/contact-us.html',
        controller: 'contactUsCtrl'
    });
    $stateProvider.state('profile', {
        url: '/profile?id',
        templateUrl: 'templates/profile/profile.html',
        controller: 'profileCtrl'
    });

    $stateProvider.state('faq', {
        url: '/faq',
        templateUrl: 'templates/general/faq.htm',
        controller: 'faq-ctrl'
    });

    $stateProvider.state('about-us', {
        url: '/about-us',
        templateUrl: 'templates/general/about-us.htm',
        controller: 'aboutUsCtrl'
    });

    $stateProvider.state('projects', {
        url: '/projects?segment&bhk&price_range&area_range&location&locality&details_builder$propertyType',
        templateUrl: 'templates/projects/projects.html',
        controller: 'projectsCtrl'
    });

    $stateProvider.state('project-details', {
        url: '/project-details/:p',
        views: {
            '': {
                templateUrl: 'templates/details1/project-details.html',
                controller: 'projectDetailsCtrl'
            },
            'reviewRating@project-details': {
                templateUrl: 'templates/details1/project-review-ratings.html',
                controller: 'projectReviewRatingCtrl'
            }
        }
    });

    $stateProvider.state('location-details', {
        url: '/location-details/:p',
        views: {
            '': {
                templateUrl: 'templates/details1/location-details.html',
                controller: 'locationDetailsCtrl'
            },
            'reviewRating@location-details': {
                templateUrl: 'templates/details1/project-review-ratings.html',
                controller: 'locationReviewRatingCtrl'
            },
            'relatedProjectsSection@location-details':{
                templateUrl: 'templates/details1/related-projects.html',
                controller: 'relatedProjectsCtrl'
            }
        }
    });

    // $stateProvider.state('cghs', {
    //     url: '/cghs?bhk&price_range&area_range&location&locality&propertyType',
    //     templateUrl: 'templates/projects/cghs.html',
    //     controller: 'cghsCtrl'
    // });

    // $stateProvider.state('commercial-details', {
    //     url: '/commercial-details',
    //     views: {
    //         '': {
    //             templateUrl: 'templates/projects/commercial-details.html',
    //             controller: 'commercialDetailsCtrl'
    //         },
    //         'reviewRating@commercial-details': {
    //             templateUrl: 'templates/projects/commercial-review-ratings.html',
    //             controller: 'commercialReviewRatingCtrl'
    //         }
    //     }
    // });

    // $stateProvider.state('co-working-details', {
    //     url: '/co-working-details',
    //     views: {
    //         '': {
    //             templateUrl: 'templates/projects/co-working-details.html',
    //             controller: 'coWorkingDetailsCtrl'
    //         },
    //         'reviewRating@co-working-details': {
    //             templateUrl: 'templates/projects/co-working-review-ratings.html',
    //             controller: 'coWorkingReviewRatingCtrl'
    //         }
    //     }
    // });

    // $stateProvider.state('pg-details', {
    //     url: '/pg-details',
    //     views: {
    //         '': {
    //             templateUrl: 'templates/projects/pg-details.html',
    //             controller: 'pgDetailsCtrl'
    //         },
    //         'reviewRating@pg-details': {
    //             templateUrl: 'templates/projects/pg-review-ratings.html',
    //             controller: 'pgReviewRatingCtrl'
    //         }
    //     }
    // });


    $stateProvider.state('blogs', {
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
            'popularLocalityBlogs@blogs': {
                templateUrl: 'templates/blogs/popular-locality-blogs.html',
                controller: 'popularLocalityCtrl'
            },
            'shortBlogs@blogs': {
                templateUrl: 'templates/blogs/short-blogs.html',
                controller: 'shortBlogsCtrl'
            }
        }
    });

    $stateProvider.state('blog', {
        url: '/blog/:city/:cityId/:from/:fromId',
        views: {
            '': {
                templateUrl: 'templates/blogs/blogs.html',
                controller: 'blogsCtrl'
            },
            'featuredBlogs@blog': {
                templateUrl: 'templates/blogs/featured-blogs.html',
                controller: 'featuredBlogsCtrl'
            },
            'popularLocalityBlogs@blog': {
                templateUrl: 'templates/blogs/popular-locality-blogs.html',
                controller: 'popularLocalityCtrl'
            },
            'shortBlogs@blog': {
                templateUrl: 'templates/blogs/short-blogs.html',
                controller: 'shortBlogsCtrl'
            }
        }
    });
    $stateProvider.state('blog-details', {
        url: '/blog-details/:city/:title/:id',
        views: {
            '': {
                templateUrl: 'templates/blogs/blog-details.html',
                controller: 'blogDetailsCtrl'
            },
            'popularLocalityBlogs@blog-details': {
                templateUrl: 'templates/blogs/popular-locality-blogs.html',
                controller: 'popularLocalityCtrl'
            }
        }
    });

    $stateProvider.state('blog-detail', {
        url: '/blog-detail/:city/:place/:title/:id',
        views: {
            '': {
                templateUrl: 'templates/blogs/blog-details.html',
                controller: 'blogDetailsCtrl'
            },
            'popularLocalityBlogs@blog-detail': {
                templateUrl: 'templates/blogs/popular-locality-blogs.html',
                controller: 'popularLocalityCtrl'
            }
        }
    });

    $stateProvider.state('cover-stories', {
        url: '/cover-stories/:city/:cityId/:from',
        views: {
            '': {
                templateUrl: 'templates/cover-story/cover-stories.htm',
                controller: 'coverStoriesCtrl'
            },
            'featuredStories@cover-stories': {
                templateUrl: 'templates/cover-story/featured-stories.html',
                controller: 'featuredStoriesCtrl'
            },
            'popularLocationStories@cover-stories': {
                templateUrl: 'templates/cover-story/popular-location-stories.html',
                controller: 'popularLocationStoriesCtrl'
            },
            'shortStories@cover-stories': {
                templateUrl: 'templates/cover-story/short-stories.html',
                controller: 'shortStoriesCtrl'
            }
        }
    });

    $stateProvider.state('cover-story', {
        url: '/cover-story/:city/:cityId/:from/:fromId',
        views: {
            '': {
                templateUrl: 'templates/cover-story/cover-stories.htm',
                controller: 'coverStoriesCtrl'
            },
            'featuredStories@cover-story': {
                templateUrl: 'templates/cover-story/featured-stories.html',
                controller: 'featuredStoriesCtrl'
            },
            'popularLocationStories@cover-story': {
                templateUrl: 'templates/cover-story/popular-location-stories.html',
                controller: 'popularLocationStoriesCtrl'
            },
            'shortStories@cover-story': {
                templateUrl: 'templates/cover-story/short-stories.html',
                controller: 'shortStoriesCtrl'
            }
        }
    });
    $stateProvider.state('story', {
        url: '/story/:city/:place/:title/:id',
        views: {
            '': {
                templateUrl: 'templates/cover-story/story.html',
                controller: 'storyCtrl'
            },
            'popularLocationStories@story': {
                templateUrl: 'templates/cover-story/popular-location-stories.html',
                controller: 'popularLocationStoriesCtrl'
            }
        }
    });

    $stateProvider.state('write-review', {
        url: '/write-review?id?n>t',
        templateUrl: 'templates/review/write-review.html',
        controller: 'writeReviewCtrl'
    });


    $stateProvider.state('list', {
            url: '/list?p',
            templateUrl: 'templates/projects/listing.html',
            controller: 'listCtrl'
        })
        // $stateProvider.state('listing', {
        //     url: '/listing?parameters',
        //     templateUrl: 'templates/details/listing.html',
        //     controller: 'listingCtrl'
        // })

    $urlRouterProvider.otherwise('/home');
}]);
