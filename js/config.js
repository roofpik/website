app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    // $locationProvider.hashPrefix('');
    // $locationProvider.html?v55Mode(true);
    $stateProvider.state('home', {
        url: '/home',
        views: {
            '': {
                templateUrl: 'templates/home/home.html?v5',
                controller: 'homeCtrl'
            },
            'search@home': {
                templateUrl: 'templates/home/search.html?v5',
                controller: 'searchCtrl'
            },
            'microMarkets@home': {
                templateUrl: 'templates/home/micro-markets.html?v5',
                controller: 'microMarketsCtrl'
            },
            'popularSearches@home': {
                templateUrl: 'templates/home/popular-searches.html?v5',
                controller: 'popularSearchCtrl'
            }
            ,
            'newcontent@home': {
                templateUrl: 'templates/home/newcontent.html?v5'
            }
        }
    });


    // static pages start    
    $stateProvider.state('story', {
        url: '/story/gurgaon',
        templateUrl: 'templates/story/story.html?v5',
        controller: 'storyListCtrl'
    })

    $stateProvider.state('story-details', {
        url: '/story/details?key',
        templateUrl: 'templates/story/story-details.html?v5',
        controller: 'storyDetailsCtrl'
    })



    $stateProvider.state('blog', {
        url: '/blog/gurgaon',
        templateUrl: 'templates/blog/blog.html?v5',
        controller: 'blogListCtrl'
    })

    $stateProvider.state('blog-details', {
        url: '/blog/gurgaon/details/:url?key',
        templateUrl: 'templates/blog/blog-details.html?v5',
        controller: 'blogDetailsCtrl'
    })



    $stateProvider.state('write-review', {
        url: '/write-review',
        templateUrl: 'templates/review/write-review.html?v5',
        controller: 'writeReviewCtrl'
    })


    $stateProvider.state('review', {
        url: '/review',
        templateUrl: 'templates/review/write-review-new.html?v5',
        controller: 'writeReviewNewCtrl'
    })

    // static pages start    
    $stateProvider.state('about-us', {
        url: '/about-us',
        templateUrl: 'templates/static/about.html?v5',
        controller: 'aboutCtrl'
    })

    $stateProvider.state('advertise', {
        url: '/advertise',
        templateUrl: 'templates/static/advertise.html?v5'
    })

    $stateProvider.state('business-advantage', {
        url: '/business-advantage',
        templateUrl: 'templates/static/business-advantage.html?v5',
        controller: 'businessAdvantageCtrl'
    })

    $stateProvider.state('business-advantage-form', {
        url: '/business-advantage-form',
        templateUrl: 'templates/static/business-advantage-form.html?v5'
    })

    $stateProvider.state('offers', {
        url: '/offers',
        templateUrl: 'templates/static/offers.html?v5',
        controller: 'offersCtrl'
    })
    $stateProvider.state('offer-details', {
        url: '/offer-details?key',
        templateUrl: 'templates/static/offer-details.html?v5',
        controller: 'offerDetailsCtrl'
    })
    $stateProvider.state('offers-filter', {
        url: '/offers-filter',
        templateUrl: 'templates/static/offers-filter.html?v5',
        controller: 'OffersCtrl'
    })

    $stateProvider.state('careers', {
        url: '/careers',
        templateUrl: 'templates/static/careers.html?v5',
        controller: 'careerCtrl'
    })

    $stateProvider.state('comparison', {
        url: '/comparison',
        templateUrl: 'templates/static/comparison.html?v5'
    })

    $stateProvider.state('contact-us', {
        url: '/contact-us',
        templateUrl: 'templates/static/contact-us.html?v5',
        controller: 'contactCtrl'
    })

    $stateProvider.state('corporate', {
        url: '/corporate',
        templateUrl: 'templates/static/corporate.html?v5'
    })

    $stateProvider.state('guidelines', {
        url: '/guidelines',
        templateUrl: 'templates/static/guidelines.html?v5',
        controller: 'guidelinesCtrl'
    })

    $stateProvider.state('homecoverstories', {
        url: '/homecoverstories',
        templateUrl: 'templates/static/homecoverstories.html?v5'
    })

    $stateProvider.state('location', {
        url: '/location',
        templateUrl: 'templates/static/location.html?v5'
    })

    $stateProvider.state('marketing', {
        url: '/marketing',
        templateUrl: 'templates/static/marketing.html?v5'
    })

    $stateProvider.state('requirement', {
        url: '/requirement',
        templateUrl: 'templates/static/requirement.html?v5'
    })

    $stateProvider.state('verified', {
        url: '/verified',
        templateUrl: 'templates/static/verified.html?v5',
        controller: 'verifiedCtrl'
    })

    $stateProvider.state('terms', {
        url: '/terms',
        templateUrl: 'templates/static/terms.html?v5',
        controller: 'termsCtrl'
    })

    // static pages end



    $stateProvider.state('project-details', {
        url: '/rent/property/2017/gurgaon/residential/:micro/:locality/:builder/:project',
        templateUrl: 'templates/projects/project-details.html?v5',
        controller: 'projectDetailsCtrl'
    })

    $stateProvider.state('listing', {
        url: '/search/2017/property/gurgaon/residential/',
        templateUrl: 'templates/projects/listing.html?v5',
        controller: 'listingCtrl'
    })

    $stateProvider.state('micromarket-details', {
        url: '/micromarket-details?city&micro',
        templateUrl: 'templates/location/micromarket-details.html?v5',
        controller: 'micromarketDetailsCtrl'
    })

    $stateProvider.state('locality-details', {
        url: '/locality-details?city&micro&loc',
        templateUrl: 'templates/location/locality-details.html?v5',
        controller: 'localityDetailsCtrl'
    })

    $stateProvider.state('city-details', {
        url: '/city-details?city',
        templateUrl: 'templates/location/city-details.html?v5',
        controller: 'cityDetailsCtrl'
    })


    $stateProvider.state('test', {
        url: '/test',
        templateUrl: 'templates/test.html?v5',
        controller: 'testCtrl'
    })
    $stateProvider.state('testLogin', {
        url: '/test-login',
        templateUrl: 'templates/test-login.html?v5',
        controller: 'testLoginCtrl'
    })

    $stateProvider.state('testreview', {
        url: '/test-review',
        templateUrl: 'templates/review/test-review.html?v5',
        controller: 'testReviewCtrl'
    })

    $urlRouterProvider.otherwise('/home');
}]);
