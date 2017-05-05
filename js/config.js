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
            'popularSearches@home': {
                templateUrl: 'templates/home/popular-searches.html',
                controller: 'popularSearchCtrl'
            }
        }
    });




    //  $stateProvider.state('blog', {
    //     url: '/blog/:city/:cityId/:from/:fromId',
    //     views: {
    //         '': {
    //             templateUrl: 'templates/blogs/blogs.html',
    //             controller: 'blogsCtrl'
    //         },
    //         'featuredBlogs@blog': {
    //             templateUrl: 'templates/blogs/featured-blogs.html',
    //             controller: 'featuredBlogsCtrl'
    //         },
    //         'popularLocalityBlogs@blog': {
    //             templateUrl: 'templates/blogs/popular-locality-blogs.html',
    //             controller: 'popularLocalityCtrl'
    //         },
    //         'shortBlogs@blog': {
    //             templateUrl: 'templates/blogs/short-blogs.html',
    //             controller: 'shortBlogsCtrl'
    //         }
    //     }
    // });





    // static pages start    
    $stateProvider.state('story', {
        url: '/story/gurgaon',
        templateUrl: 'templates/story/story.html',
        controller: 'storyListCtrl'
    })

     $stateProvider.state('story-details', {
        url: '/story/details?key',
        templateUrl: 'templates/story/story-details.html',
        controller:'storyDetailsCtrl'
    })



  $stateProvider.state('blog', {
        url: '/blog/gurgaon',
        templateUrl: 'templates/blog/blog.html',
        controller: 'blogListCtrl'
    })

     $stateProvider.state('blog-details', {
        url: '/blog/gurgaon/details/:url?key',
        templateUrl: 'templates/blog/blog-details.html',
        controller:'blogDetailsCtrl'
    })



    $stateProvider.state('write-review', {
        url: '/write-review?key&name&type',
        templateUrl: 'templates/review/write-review.html',
        controller: 'writeReviewCtrl'
    })

    // static pages start    
    $stateProvider.state('about-us', {
        url: '/about-us',
        templateUrl: 'templates/static/about.html',
        controller: 'aboutCtrl'
    })

    $stateProvider.state('advertise', {
        url: '/advertise',
        templateUrl: 'templates/static/advertise.html'
    })

    $stateProvider.state('business-advantage', {
        url: '/business-advantage',
        templateUrl: 'templates/static/business-advantage.html',
        controller: 'businessAdvantageCtrl'
    })

    $stateProvider.state('business-advantage-form', {
        url: '/business-advantage-form',
        templateUrl: 'templates/static/business-advantage-form.html'
    })

    $stateProvider.state('offers', {
        url: '/offers',
        templateUrl: 'templates/static/offers.html',
         controller: 'offersCtrl'
    })
     $stateProvider.state('offer-details', {
        url: '/offer-details?key',
        templateUrl: 'templates/static/offer-details.html',
         controller: 'offerDetailsCtrl'
    })
    $stateProvider.state('offers-filter', {
        url: '/offers-filter',
        templateUrl: 'templates/static/offers-filter.html',
         controller: 'OffersCtrl'
    })

    $stateProvider.state('careers', {
        url: '/careers',
        templateUrl: 'templates/static/careers.html',
        controller: 'careerCtrl'
    })

    $stateProvider.state('comparison', {
        url: '/comparison',
        templateUrl: 'templates/static/comparison.html'
    })

    $stateProvider.state('contact-us', {
        url: '/contact-us',
        templateUrl: 'templates/static/contact-us.html',
         controller: 'contactCtrl'
    })

    $stateProvider.state('corporate', {
        url: '/corporate',
        templateUrl: 'templates/static/corporate.html'
    })

    $stateProvider.state('guidelines', {
        url: '/guidelines',
        templateUrl: 'templates/static/guidelines.html',
         controller: 'guidelinesCtrl'
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
        templateUrl: 'templates/static/verified.html',
        controller: 'verifiedCtrl'
    })

     $stateProvider.state('terms', {
        url: '/terms',
        templateUrl: 'templates/static/terms.html',
         controller: 'termsCtrl'
    })

      $stateProvider.state('faq', {
        url: '/faq',
        templateUrl: 'templates/static/faq.html'
      
    })

     $stateProvider.state('all-news', {
        url: '/all-news',
        templateUrl: 'templates/static/all_news.html'
         // controller: 'termsCtrl'
    })

     $stateProvider.state('pladge', {
        url: '/pladge',
        templateUrl: 'templates/static/take-pladge.html'
         
    })

      $stateProvider.state('news-details', {
        url: '/news-details',
        templateUrl: 'templates/static/news_details.html'
         
    })


    // static pages end
// new pages

 $stateProvider.state('tenants', {
        url: '/tenants',
        templateUrl: 'templates/static/tenants.html',
        controller: 'propertymanagementCtrl'         
    })
  $stateProvider.state('property-management', {
        url: '/property-management',
        templateUrl: 'templates/static/property-management.html',
        controller: 'propertymanagementCtrl'         
    })
   $stateProvider.state('maintenance', {
        url: '/maintenance',
        templateUrl: 'templates/static/maintenance.html',
        controller: 'propertymanagementCtrl'         
    })
    $stateProvider.state('rent', {
        url: '/rent',
        templateUrl: 'templates/static/rent.html',
        controller: 'propertymanagementCtrl'         
    })
    $stateProvider.state('compliance', {
        url: '/compliance',
        templateUrl: 'templates/static/compliance.html',
        controller: 'propertymanagementCtrl'         
    })
    $stateProvider.state('emergencies', {
        url: '/emergencies',
        templateUrl: 'templates/static/emergencies.html',
        controller: 'propertymanagementCtrl'         
    })
    $stateProvider.state('pricing', {
        url: '/pricing',
        templateUrl: 'templates/static/pricing.html',
        controller: 'propertymanagementCtrl'         
    })


// new pages end


    $stateProvider.state('project-details', {
        url: '/rent/property/2017/gurgaon/residential/:micro/:locality/:builder/:project',
        templateUrl: 'templates/projects/project-details.html',
        controller: 'projectDetailsCtrl'
    })

    $stateProvider.state('listing', {
        url: '/search/2017/property/gurgaon/residential/:location',
        templateUrl: 'templates/projects/listing.html',
        controller: 'listingCtrl'
    })

    $stateProvider.state('micromarket-details', {
        url: '/micromarket-details?city&micro',
        templateUrl: 'templates/location/micromarket-details.html',
        controller: 'micromarketDetailsCtrl'
    })

    $stateProvider.state('locality-details', {
        url: '/locality-details?city&micro&loc',
        templateUrl: 'templates/location/locality-details.html',
        controller: 'localityDetailsCtrl'
    })

    $stateProvider.state('city-details', {
        url: '/city-details?city',
        templateUrl: 'templates/location/city-details.html',
        controller: 'cityDetailsCtrl'
    })


    $stateProvider.state('test', {
        url: '/test',
        templateUrl: 'templates/test.html',
        controller: 'testCtrl'
    })
    $stateProvider.state('testLogin', {
        url: '/test-login',
        templateUrl: 'templates/test-login.html',
        controller: 'testLoginCtrl'
    })

    $stateProvider.state('testreview', {
        url: '/test-review',
        templateUrl: 'templates/review/test-review.html',
        controller: 'testReviewCtrl'
    })

    $urlRouterProvider.otherwise('/home');
}]);
