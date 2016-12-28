app.factory('appLoad', function($q) {
    return {
        localObjects: function(val) {
            var deferred = $q.defer();
            var urlCalls = [];
            var dataVersions = val;
            var projectList = [];
            var searchList = [];
            function getProjectList() {
                return db.ref('projectList/-KYJONgh0P98xoyPPYm9/residential').once('value', function(snapshot) {
                    for (key in snapshot.val()) {
                        projectList.push(snapshot.val()[key]);
                    }
                    setLocalStorage(projectList, 'projectList', dataVersions.projectList);
                });
            };

            function getSearchList() {
             return db.ref('search').once('value', function(snapshot) {
                    for (key in snapshot.val()) {
                        searchList.push(snapshot.val()[key]);
                    };
                    setLocalStorage(searchList, 'searchList', dataVersions.searchList);
                });
            };


            if (checkLocalStorage('projectList')) {
                if (getLocalStorage('projectList').version != dataVersions.projectList) {
                    urlCalls.push(getProjectList());
                }
            } else {
                urlCalls.push(getProjectList());
            };

            if (checkLocalStorage('searchList')) {
                if (getLocalStorage('searchList').version != dataVersions.searchList) {
                    urlCalls.push(getSearchList());
                }
            } else {
                urlCalls.push(getSearchList());
            };


            $q.all(urlCalls)
                .then(function(result) {
                    var values = [];
                    for (index in urlCalls) {
                        values.push(result[index].val());
                    }
                    deferred.resolve(values);
                });

            return deferred.promise;
        }
    }
});
