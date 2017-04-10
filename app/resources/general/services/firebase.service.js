  angular
    .module('roofpikWeb')
    .factory('Firebase', firebaseDataService);

  function firebaseDataService() {
    var db = firebase.database().ref();

    var service = {
      db: db,
      update: update,
      once: once,
      push: push
    };

    return service;


    function update(updates) {
      return db.update(updates);
    }

    function once(url, callback) {
      var db = firebase.database().ref(url);
      return db.once('value', callback);
    }

    function push(url,data) {
      var db = firebase.database().ref(url);
      return db.push(data);
    }
  };
