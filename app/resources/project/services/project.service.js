angular.module('roofpikWeb')

.factory('Project', function($rootScope, $http) {

  return {

    projectFilter: function(data) {

      return $http({
        method: 'POST',
        crossDomain: true,
        dataType: "JSONP",
        url: $rootScope.domain + '/api/projectFilter',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: $.param(data)

      });

    },
    projectSearchKey: function(data) {

      return $http({
        method: 'POST',
        crossDomain: true,
        dataType: "JSONP",
        url: $rootScope.domain + '/api/projectSearchKey',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: $.param(data)

      });

    },
    ProjKeyRatings: function(data) {

      return $http({
        method: 'POST',
        crossDomain: true,
        dataType: "JSONP",
        url: $rootScope.domain + '/api/ProjKeyRatings',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: $.param(data)

      });

    },
    reviewSearch: function(data) {

      return $http({
        method: 'POST',
        crossDomain: true,
        dataType: "JSONP",
        url: $rootScope.domain + '/api/reviewSearch?' + data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

    }
  }
})
