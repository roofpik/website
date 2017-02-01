
var app = angular.module("roofpik-map", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "../templates/map.html",
        controller: 'MapCtrl'
        
    })
  
      
    .otherwise({redirectTo : '/'})
    
});




  
