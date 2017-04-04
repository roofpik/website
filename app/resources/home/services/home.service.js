angular.module('roofpikWeb')

.factory('Home', function($rootScope, $http) {

  return {

    index: function() {

      return $http({
        method: 'GET',
        crossDomain: true,
        dataType: "JSONP",
        url: 'http://' + $rootScope.domain + '/api/v1/branches',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }

      });

    },

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

    },
    get: function(id) {
      return $http({
        method: 'GET',
        crossDomain: true,
        dataType: "JSONP",
        url: 'http://' + $rootScope.domain + '/api/v1/branches/' + id,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }

      });

    },


    save: function(data) {

      return $http({
        method: 'POST',
        crossDomain: true,
        dataType: "JSONP",
        url: 'http://' + $rootScope.domain + '/api/v1/branches',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: $.param(data)

      });

    },
    patch: function(data, id) {

      return $http({
        method: 'PUT',
        crossDomain: true,
        dataType: "JSONP",
        url: 'http://' + $rootScope.domain + '/api/v1/branches/' + data.id,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: $.param(data)

      });

    },

    destroy: function(id) {
      return $http({
        method: 'DELETE',
        crossDomain: true,
        dataType: "JSONP",
        url: 'http://' + $rootScope.domain + '/api/v1/branches/' + id,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }

      });
    },

  }
})
