angular.module('roofpikWeb')
  .factory('imageUrl', function($rootScope) {
    return {
      getUrl: function(id, defer) {
        db.ref('images/' + id).once('value', function(snapshot) {
          //console.log(snapshot.val());
          var url = '';
          if (snapshot.val()) {
            if (snapshot.val().cdn) {
              url = $rootScope.cdn + '/image/' + snapshot.val().path + '/' + snapshot.val().imgName + '-m.jpg';
              defer.resolve(url);
            } else {
              url = $rootScope.domain + '/images/' + snapshot.val().imgName + '.jpg';
              defer.resolve(url);
            }
          }
        })
        return defer.promise;
      }
    }
  });
