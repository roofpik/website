app.controller('profileCtrl', function($scope) {
    document.title = "My Profile";

    $scope.userId = '2GajtmSmqWaz6iLxOMyRV7xqGhy1';
    $scope.user = {};
    $scope.user.userId = $scope.userId;
    $scope.disableFirstName = true;
    $scope.disableLastName = true;
    $scope.disablePhoneNumber = true;
    $scope.disableAddress = true;
    $scope.disableCity = true;
    console.log('called');
    getUserData();

    function getUserData() {
        db.ref('users/' + $scope.userId).once('value', function(snapshot) {
            console.log(snapshot.val());
            $scope.user.firstName = snapshot.val().fname;
            $scope.user.lastName = snapshot.val().lname;
            $scope.user.password = snapshot.val().tempPassword;
            $scope.user.address = snapshot.val().address.addressLine1;
            $scope.user.city = snapshot.val().address.cityName;
            $scope.user.emailId = snapshot.val().email.emailAddress;
            $scope.user.phoneNumber = snapshot.val().mobile.mobileNum;
            $scope.password = $scope.user.password;
        });
    }

    $scope.enableFirstName = function() {
        $scope.disableFirstName = false;
    }
    $scope.enableLastName = function() {
        $scope.disableLastName = false;
    }
    $scope.enablePhoneNumber = function() {
        $scope.disablePhoneNumber = false;
    }
    $scope.enableAddress = function() {
        $scope.disableAddress = false;
    }
    $scope.enableCity = function() {
        $scope.disableCity = false;
    }
    $scope.blurFirstName = function() {
        console.log($scope.user.firstName)
        db.ref('users/' + $scope.userId + '/' + 'fname').set($scope.user.firstName);
        $scope.disableFirstName = true;
    }
    $scope.blurLastName = function() {
        db.ref('users/' + $scope.userId + '/' + 'lname').set($scope.user.lastName);
        $scope.disableLastName = true;
    }
    $scope.blurPhoneNumber = function() {
        db.ref('users/' + $scope.userId + '/' + 'mobile/mobileNum').set($scope.user.lastName);
        $scope.disablePhoneNumber = true;
    }
    $scope.blurAddress = function() {
        db.ref('users/' + $scope.userId + '/' + 'address/addressLine1').set($scope.user.lastName);
        $scope.disableAddress = true;
    }
    $scope.blurCity = function() {
        db.ref('users/' + $scope.userId + '/' + 'address/city').set($scope.user.lastName);
        $scope.disableCity = true;
    }
})
