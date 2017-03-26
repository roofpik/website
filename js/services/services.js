app.service('imageUrl', function() {
    return {
        'getUrl': function(id, defer) {
            db.ref('images/' + id).once('value', function(snapshot) {
                //console.log(snapshot.val());
                var url = '';
                if (snapshot.val()) {
                    if (snapshot.val().cdn) {
                        //console.log('http://cdn.roofpik.com/image/' + snapshot.val().path + '/' + snapshot.val().imgName + '.jpg');
                        url = 'http://cdn.roofpik.com/image/' + snapshot.val().path + '/' + snapshot.val().imgName + '-m.jpg';
                        defer.resolve(url);
                    } else {
                        //console.log('139.162.9.71/images/' + snapshot.val().imgName + '.jpg');
                        url = 'http://139.162.9.71/images/' + snapshot.val().imgName + '.jpg';
                        defer.resolve(url);
                    }
                }
            })
            return defer.promise;
        }
    }
})
