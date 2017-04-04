app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  $stateProvider.state('home', {
    url: '/home',
    views: {
      '': {
        templateUrl: 'resources/home/views/home.html',
        controller: 'homeCtrl'
      },
      'search@home': {
        templateUrl: 'resources/home/views/search.html',
        controller: 'searchCtrl'
      },
      'microMarkets@home': {
        templateUrl: 'resources/home/views/micro-markets.html',
        controller: 'microMarketsCtrl'
      },
      'popularSearches@home': {
        templateUrl: 'resources/home/views/popular-searches.html',
        controller: 'popularSearchCtrl'
      }
    }
  });


  // static pages start    
  $stateProvider.state('story', {
    url: '/story/gurgaon',
    templateUrl: 'resources/story/story.html'
  })







  $stateProvider.state('write-review', {
    url: '/write-review?key&name&type',
    templateUrl: 'resources/review/views/write-review.html',
    controller: 'writeReviewCtrl'
  })

  // static pages start    
  $stateProvider.state('about-us', {
    url: '/about-us',
    templateUrl: 'resources/static/about.html'
  })

  $stateProvider.state('advertise', {
    url: '/advertise',
    templateUrl: 'resources/static/advertise.html'
  })

  $stateProvider.state('business-advantage', {
    url: '/business-advantage',
    templateUrl: 'resources/static/business-advantage.html'
  })

  $stateProvider.state('careers', {
    url: '/careers',
    templateUrl: 'resources/static/careers.html'
  })

  $stateProvider.state('comparison', {
    url: '/comparison',
    templateUrl: 'resources/static/comparison.html'
  })

  $stateProvider.state('contact-us', {
    url: '/contact-us',
    templateUrl: 'resources/static/contact-us.html'
  })

  $stateProvider.state('corporate', {
    url: '/corporate',
    templateUrl: 'resources/static/corporate.html'
  })

  $stateProvider.state('guidelines', {
    url: '/guidelines',
    templateUrl: 'resources/static/guidelines.html'
  })

  $stateProvider.state('homecoverstories', {
    url: '/homecoverstories',
    templateUrl: 'resources/static/homecoverstories.html'
  })

  $stateProvider.state('location', {
    url: '/location',
    templateUrl: 'resources/static/location.html'
  })

  $stateProvider.state('marketing', {
    url: '/marketing',
    templateUrl: 'resources/static/marketing.html'
  })

  $stateProvider.state('requirement', {
    url: '/requirement',
    templateUrl: 'resources/static/requirement.html'
  })

  $stateProvider.state('verified', {
    url: '/verified',
    templateUrl: 'resources/static/verified.html'
  })

  // static pages end



  $stateProvider.state('project-details', {
    url: '/rent/property/2017/gurgaon/residential/:micro/:locality/:builder/:project',
    templateUrl: 'resources/project/views/project-details.html',
    controller: 'projectDetailsCtrl'
  })

  $stateProvider.state('listing', {
    url: '/search/2017/property/gurgaon/residential/:location',
    templateUrl: 'resources/project/views/listing.html',
    controller: 'listingCtrl'
  })

  $stateProvider.state('micromarket-details', {
    url: '/micromarket-details?city&micro',
    templateUrl: 'resources/location/views/micromarket-details.html',
    controller: 'micromarketDetailsCtrl'
  })

  $stateProvider.state('locality-details', {
    url: '/locality-details?city&micro&loc',
    templateUrl: 'resources/location/views/locality-details.html',
    controller: 'localityDetailsCtrl'
  })

  $stateProvider.state('city-details', {
    url: '/city-details?city',
    templateUrl: 'resources/location/views/city-details.html',
    controller: 'cityDetailsCtrl'
  })


  // $stateProvider.state('test', {
  //     url: '/test',
  //     templateUrl: 'resources/test.html',
  //     controller: 'testCtrl'
  // })
  // $stateProvider.state('testLogin', {
  //     url: '/test-login',
  //     templateUrl: 'resources/test-login.html',
  //     controller: 'testLoginCtrl'
  // })

  // $stateProvider.state('testreview', {
  //     url: '/test-review',
  //     templateUrl: 'resources/review/views/test-review.html',
  //     controller: 'testReviewCtrl'
  // })

  $urlRouterProvider.otherwise('/home');
}]);
