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

    }
  }
})
