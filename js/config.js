
var app = angular.module("mroofpik", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "../templates/home.htm",
        controller: 'home-ctrl'
        
    })
    .when("/projects", {
        templateUrl : "../templates/projects.htm",
          controller: 'projects-Ctrl'
        
    })
     .when("/project-details", {
        templateUrl : "../templates/project-details.htm",
         controller: 'project-details-Ctrl'
        
    })
     .when("/commercial-details", {
        templateUrl : "../templates/commercial-details.htm",
         controller: 'commercial-details-Ctrl'
        
    })
     .when("/pg-details", {
        templateUrl : "../templates/pg-details.htm",
         controller: 'pg-details-Ctrl'
        
    })
     .when("/co-working-details", {
        templateUrl : "../templates/co-working-details.htm",
         controller: 'co-working-details-ctrl'
        
    })
      .when("/write-review", {
        templateUrl : "../templates/write-review.htm"        
        
    })
      .when("/cover-stories", {
        templateUrl : "../templates/cover-stories.htm",
        controller: 'cover-stories-ctrl'        
        
    })
      .when("/cover-stories-details", {
        templateUrl : "../templates/cover-stories-details.htm"              
        
    })
      .when("/blogs", {
        templateUrl : "../templates/blogs.htm",
        controller: 'blogs-ctrl'       
        
    })
      .when("/blog-details", {
        templateUrl : "../templates/blog-details.htm"              
        
    })
      .when("/about-us", {
        templateUrl : "../templates/about-us.htm"                     
        
    })
      .when("/faq", {
        templateUrl : "../templates/faq.htm",
        controller: 'faq-ctrl'                     
        
    })
      .when("/contact-us", {
        templateUrl : "../templates/contact-us.htm",
        controller: 'contactUsCtrl'                 
        
    })
 
      
    .otherwise({redirectTo : '/'})
    
});




  
