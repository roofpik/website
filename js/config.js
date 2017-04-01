app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $stateProvider.state('home', {
        url: '/home',
        views: {
            '': {
                templateUrl: 'templates/home/home.html',
                controller: 'homeCtrl'
            },
            'search@home': {
                templateUrl: 'templates/home/search.html',
                controller: 'searchCtrl'
            },
            'microMarkets@home': {
                templateUrl: 'templates/home/micro-markets.html',
                controller: 'microMarketsCtrl'
            },
            'popularProjects@home': {
                templateUrl: 'templates/home/popular-projects.html',
                controller: 'popularProjectsCtrl'
            },
            'popularSearches@home': {
                templateUrl: 'templates/home/popular-searches.html',
                controller: 'popularSearchCtrl'
            }
        }
    });

    $stateProvider.state('write-review', {
        url: '/write-review?id&type',
        templateUrl: 'templates/review/write-review.html',
        controller: 'writeReviewCtrl'
    })

    // static pages start    
    $stateProvider.state('about-us', {
        url: '/about-us',
        templateUrl: 'templates/static/about.html'      
    })

    $stateProvider.state('advertise', {
        url: '/advertise',
        templateUrl: 'templates/static/advertise.html'      
    })

    $stateProvider.state('business-advantage', {
        url: '/business-advantage',
        templateUrl: 'templates/static/business-advantage.html'      
    })

    $stateProvider.state('careers', {
        url: '/careers',
        templateUrl: 'templates/static/careers.html'      
    })

    $stateProvider.state('comparison', {
        url: '/comparison',
        templateUrl: 'templates/static/comparison.html'      
    })

    $stateProvider.state('contact-us', {
        url: '/contact-us',
        templateUrl: 'templates/static/contact-us.html'      
    })

    $stateProvider.state('corporate', {
        url: '/corporate',
        templateUrl: 'templates/static/corporate.html'      
    })

    $stateProvider.state('guidelines', {
        url: '/guidelines',
        templateUrl: 'templates/static/guidelines.html'      
    })
   
   $stateProvider.state('homecoverstories', {
        url: '/homecoverstories',
        templateUrl: 'templates/static/homecoverstories.html'      
    })    

    $stateProvider.state('location', {
        url: '/location',
        templateUrl: 'templates/static/location.html'      
    }) 

    $stateProvider.state('marketing', {
        url: '/marketing',
        templateUrl: 'templates/static/marketing.html'      
    })

    $stateProvider.state('requirement', {
        url: '/requirement',
        templateUrl: 'templates/static/requirement.html'      
    })  

    $stateProvider.state('verified', {
        url: '/verified',
        templateUrl: 'templates/static/verified.html'      
    })   
    
   // static pages end
            
     

    $stateProvider.state('project-details',{
        url: '/rent/property/2017/gurgaon/residential/:micro/:locality/:builder/:project',
        templateUrl: 'templates/projects/project-details.html',
        controller: 'projectDetailsCtrl'
    })

    $stateProvider.state('listing',{
        url: '/search/2017/property/gurgaon/residential/:location',
        templateUrl: 'templates/projects/listing.html',
        controller: 'listingCtrl'
    })

    $stateProvider.state('micromarket-details',{
        url: '/micromarket-details?city&micro',
        templateUrl: 'templates/location/micromarket-details.html',
        controller: 'micromarketDetailsCtrl'
    })

    $stateProvider.state('locality-details',{
        url: '/locality-details?city&micro&loc',
        templateUrl: 'templates/location/locality-details.html',
        controller: 'localityDetailsCtrl'
    })

    $stateProvider.state('city-details',{
        url: '/city-details?city',
        templateUrl: 'templates/location/city-details.html',
        controller: 'cityDetailsCtrl'
    })


      $stateProvider.state('test',{
        url: '/test',
        templateUrl: 'templates/test.html',
        controller: 'testCtrl'
    })
      $stateProvider.state('testLogin',{
        url: '/test-login',
        templateUrl: 'templates/test-login.html',
        controller: 'testLoginCtrl'
    })

        $stateProvider.state('testreview',{
        url: '/test-review',
        templateUrl: 'templates/review/test-review.html',
        controller: 'testReviewCtrl'
    })

    $urlRouterProvider.otherwise('/home');
}]);
