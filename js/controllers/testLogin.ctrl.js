app.controller('testLoginCtrl', function($scope) {

    $scope.status = 'login';

    $scope.fbLogin = function() {

        var provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('email');

        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;

            $scope.data = {}
            $scope.data.email = {}
            $scope.data.facebook = {}

            $scope.data.fname = user.displayName;
            $scope.data.uid = user.uid;
            $scope.data.profileImage = user.photoURL;
            $scope.data.createdDate = new Date().getTime();
            $scope.data.registeredFlag = true;
            $scope.data.welcomeEmailSent = false;

            $scope.data.email.emailAddress = user.providerData[0].email;
            $scope.data.email.emailVerified = true;
            $scope.data.facebook.active = true;
            $scope.data.facebook.fid = user.providerData[0].uid;
            $scope.data.facebook.photoURL = user.providerData[0].photoURL;
            if (user.providerData[0].email) {
                user.updateEmail(user.providerData[0].email).then(function() {
                    // Update successful.
                    $scope.status = 'mobile';
                }, function(error) {
                    console.log(error)
                        // An error happened.
                });
            }

            updates = {};
            updates['users/' + $scope.data.uid] = $scope.data;
            db.ref().update(updates).then(function() {
                sweetAlert('Success', 'Thanks for Registering with Roofpik', "success");

                $scope.data = {};
            });

            // ...
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            sweetAlert('error', error.message, "error");
            // ...
        });
    }

    $scope.googleLogin = function() {

        firebase.auth().signOut();

      
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/plus.login');
            provider.addScope('email');

            firebase.auth().signInWithPopup(provider).then(function(result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;

                $scope.data = {}
                $scope.data.email = {}
                $scope.data.google = {}

                $scope.data.fname = user.displayName;
                $scope.data.uid = user.uid;
                $scope.data.profileImage = user.photoURL;
                $scope.data.createdDate = new Date().getTime();
                $scope.data.registeredFlag = true;
                $scope.data.welcomeEmailSent = false;

                $scope.data.email.emailAddress = user.providerData[0].email;
                $scope.data.email.emailVerified = true;
                $scope.data.google.active = true;
                $scope.data.google.gid = user.providerData[0].uid;
                $scope.data.google.photoURL = user.providerData[0].photoURL;
                if (user.providerData[0].email) {
                    user.updateEmail(user.providerData[0].email).then(function() {
                        // Update successful.
                    }, function(error) {
                        console.log(error)
                            // An error happened.
                    });
                }

                updates = {};
                updates['users/' + $scope.data.uid] = $scope.data;
                db.ref().update(updates).then(function() {
                    sweetAlert('Success', 'Thanks for Registering with Roofpik', "success");
                    $scope.data = {};
                });


                // ...
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                sweetAlert(error.code, error.message, "error");
                // ...
            });
     }
});


app.controller('testReviewCtrl', function($scope){
    console.log('k');
    $('select').material_select();
    $scope.change = function(){
        console.log($scope.data);
    }
})
