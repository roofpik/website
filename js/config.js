app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    // $locationProvider.hashPrefix('');
    // $locationProvider.html?v65Mode(true);
    $stateProvider.state('home', {
        url: '/home',
        views: {
            '': {
                templateUrl: 'templates/home/home.html?v6',
                controller: 'homeCtrl'
            },
            'search@home': {
                templateUrl: 'templates/home/search.html?v6',
                controller: 'searchCtrl'
            },
            'microMarkets@home': {
                templateUrl: 'templates/home/micro-markets.html?v6',
                controller: 'microMarketsCtrl'
            },
            'popularSearches@home': {
                templateUrl: 'templates/home/popular-searches.html?v6',
                controller: 'popularSearchCtrl'
            }
            ,
            'newcontent@home': {
                templateUrl: 'templates/home/newcontent.html?v6'
            }
        }
    });


    // static pages start    
    $stateProvider.state('story', {
        url: '/story/gurgaon',
        templateUrl: 'templates/story/story.html?v6',
        controller: 'storyListCtrl'
    })

    $stateProvider.state('story-details', {
        url: '/story/details?key',
        templateUrl: 'templates/story/story-details.html?v6',
        controller: 'storyDetailsCtrl'
    })



    $stateProvider.state('blog', {
        url: '/blog/gurgaon',
        templateUrl: 'templates/blog/blog.html?v6',
        controller: 'blogListCtrl'
    })

    $stateProvider.state('blog-details', {
        url: '/blog/gurgaon/details/:url?key',
        templateUrl: 'templates/blog/blog-details.html?v6',
        controller: 'blogDetailsCtrl'
    })



    $stateProvider.state('write-review', {
        url: '/write-review',
        templateUrl: 'templates/review/write-review.html?v6',
        controller: 'writeReviewCtrl'
    })


    $stateProvider.state('review', {
        url: '/review',
        templateUrl: 'templates/review/write-review-new.html?v6',
        controller: 'writeReviewNewCtrl'
    })

    // static pages start    
    $stateProvider.state('about-us', {
        url: '/about-us',
        templateUrl: 'templates/static/about.html?v6',
        controller: 'aboutCtrl'
    })

    $stateProvider.state('advertise', {
        url: '/advertise',
        templateUrl: 'templates/static/advertise.html?v6'
    })

    $stateProvider.state('business-advantage', {
        url: '/business-advantage',
        templateUrl: 'templates/static/business-advantage.html?v6',
        controller: 'businessAdvantageCtrl'
    })

    $stateProvider.state('business-advantage-form', {
        url: '/business-advantage-form',
        templateUrl: 'templates/static/business-advantage-form.html?v6'
    })

    $stateProvider.state('offers', {
        url: '/offers',
        templateUrl: 'templates/static/offers.html?v6',
        controller: 'offersCtrl'
    })
    $stateProvider.state('offer-details', {
        url: '/offer-details?key',
        templateUrl: 'templates/static/offer-details.html?v6',
        controller: 'offerDetailsCtrl'
    })
    $stateProvider.state('offers-filter', {
        url: '/offers-filter',
        templateUrl: 'templates/static/offers-filter.html?v6',
        controller: 'OffersCtrl'
    })

    $stateProvider.state('careers', {
        url: '/careers',
        templateUrl: 'templates/static/careers.html?v6',
        controller: 'careerCtrl'
    })

    $stateProvider.state('comparison', {
        url: '/comparison',
        templateUrl: 'templates/static/comparison.html?v6'
    })

    $stateProvider.state('contact-us', {
        url: '/contact-us',
        templateUrl: 'templates/static/contact-us.html?v6',
        controller: 'contactCtrl'
    })

    $stateProvider.state('corporate', {
        url: '/corporate',
        templateUrl: 'templates/static/corporate.html?v6'
    })

    $stateProvider.state('guidelines', {
        url: '/guidelines',
        templateUrl: 'templates/static/guidelines.html?v6',
        controller: 'guidelinesCtrl'
    })

    $stateProvider.state('homecoverstories', {
        url: '/homecoverstories',
        templateUrl: 'templates/static/homecoverstories.html?v6'
    })

    $stateProvider.state('location', {
        url: '/location',
        templateUrl: 'templates/static/location.html?v6'
    })

    $stateProvider.state('marketing', {
        url: '/marketing',
        templateUrl: 'templates/static/marketing.html?v6'
    })

    $stateProvider.state('requirement', {
        url: '/requirement',
        templateUrl: 'templates/static/requirement.html?v6'
    })

    $stateProvider.state('verified', {
        url: '/verified',
        templateUrl: 'templates/static/verified.html?v6',
        controller: 'verifiedCtrl'
    })

    $stateProvider.state('terms', {
        url: '/terms',
        templateUrl: 'templates/static/terms.html?v6',
        controller: 'termsCtrl'
    })

    // static pages end



    $stateProvider.state('project-details', {
        url: '/rent/property/2017/gurgaon/residential/:micro/:locality/:builder/:project',
        templateUrl: 'templates/projects/project-details.html?v6',
        controller: 'projectDetailsCtrl'
    })

    $stateProvider.state('listing', {
        url: '/search/2017/property/gurgaon/residential/',
        templateUrl: 'templates/projects/listing.html?v6',
        controller: 'listingCtrl'
    })

    $stateProvider.state('micromarket-details', {
        url: '/micromarket-details?city&micro',
        templateUrl: 'templates/location/micromarket-details.html?v6',
        controller: 'micromarketDetailsCtrl'
    })

    $stateProvider.state('locality-details', {
        url: '/locality-details?city&micro&loc',
        templateUrl: 'templates/location/locality-details.html?v6',
        controller: 'localityDetailsCtrl'
    })

    $stateProvider.state('city-details', {
        url: '/city-details?city',
        templateUrl: 'templates/location/city-details.html?v6',
        controller: 'cityDetailsCtrl'
    })


    $stateProvider.state('test', {
        url: '/test',
        templateUrl: 'templates/test.html?v6',
        controller: 'testCtrl'
    })
    $stateProvider.state('testLogin', {
        url: '/test-login',
        templateUrl: 'templates/test-login.html?v6',
        controller: 'testLoginCtrl'
    })

    $stateProvider.state('testreview', {
        url: '/test-review',
        templateUrl: 'templates/review/test-review.html?v6',
        controller: 'testReviewCtrl'
    })

    $urlRouterProvider.otherwise('/home');
}]);
