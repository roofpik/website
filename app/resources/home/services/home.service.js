angular.module('roofpikWeb')

.factory('Home', function($rootScope, $http) {

  return {

    mainSearch: function(data) {

      return $http({
        method: 'POST',
        crossDomain: true,
        dataType: "JSONP",
        url: 'http://' + $rootScope.domain + '/api/mainSearch',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: $.param(data)

      });

    },

    searchLocation: function(data) {

      return $http({
        method: 'POST',
        crossDomain: true,
        dataType: "JSONP",
        url: 'http://' + $rootScope.domain + '/api/searchLocation',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: $.param(data)

      });

    }
  }
})
