app.controller('profileCtrl', ['$scope', function($scope) {
    document.title = "My Profile";

    $scope.userId = '2GajtmSmqWaz6iLxOMyRV7xqGhy1';
    $scope.user = {};
    $scope.image = "http://icons.iconseeker.com/png/fullsize/crystal-clear-actions/thumbnail.png"
    $scope.newPassword = '';
    $scope.newPasswordVerification = '';
    $scope.user.userId = $scope.userId;
    $scope.disableFirstName = true;
    $scope.disablePwd = true;
    $scope.disableRePwd = true;
    $scope.disableLastName = true;
    $scope.disablePhoneNumber = true;
    $scope.disableAddress = true;
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
        });
    }

    $scope.enableFirstName = function() {
        $scope.disableFirstName = false;
    }
    $scope.enablePwd = function() {
        $scope.disablePwd = false;
    }
    $scope.enableRePwd = function() {
        $scope.disableRePwd = false;
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
    $scope.blurFirstName = function() {
        console.log($scope.user.firstName)
        $scope.disableFirstName = true;
        db.ref('users/' + $scope.userId + '/' + 'fname').set($scope.user.firstName);
    }
    $scope.blurLastName = function() {
        $scope.disableLastName = true;
        db.ref('users/' + $scope.userId + '/' + 'lname').set($scope.user.lastName);
    }
    $scope.blurPhoneNumber = function() {
        $scope.disablePhoneNumber = true;
        db.ref('users/' + $scope.userId + '/' + 'mobile/mobileNum').set($scope.user.mobileNum);
    }
    $scope.blurAddress = function() {
        $scope.disableAddress = true;
        db.ref('users/' + $scope.userId + '/' + 'address/addressLine1').set($scope.user.address);
    }
    $scope.blurPwd = function() {
        $scope.disablePwd = true;
        if ($scope.newPassword == $scope.password) {
            swal("New Password Can't Be The Same As The Old Password", "Try Again");
        }
        if ($scope.newPassword.length < 8) {
            swal("The Password Must Be Atleast 8 Characters Long", "Try Again");
        }
    }
    $scope.blurRePwd = function() {
        $scope.disableRePwd = true;
        if ($scope.newPassword != $scope.newPasswordVerification) {
            swal("Passwords Don't Match", "Try Again");
        } else {
            db.ref('users/' + $scope.userId + '/' + 'tempPassword').set($scope.newPassword)
            swal("Password Successfully Changed", "Congratulations!", "success")
        }
    }

    $scope.getFileDetails = function(file) {
        var file = file.files[0];
        var image = "https://getuikit.com/v2/docs/images/" + file.name;
        changeImage(image);
    }

    function changeImage(image) {
        $scope.image = image;
    }
}])
