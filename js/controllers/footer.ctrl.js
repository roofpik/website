app.controller('footerCtrl', ['$scope', '$timeout', function($scope, $timeout) {
    $(document).ready(function() {
        Materialize.updateTextFields();
        $(".dropdown-button").dropdown();
    })

    $scope.submitQuery = function(user) {
        console.log(user);
        db.ref('contactUs').push($scope.user).then(function() {
            $timeout(function() {
                $scope.user = {};
                $scope.contactUs.$setUntouched();
                $scope.contactUs.$setPristine();
            }, 100);
            Materialize.toast('Request successfully submitted', 4000)
        })
    }

    $scope.addSubscriber = function(emailAddress) {
    	var data = {
    		email: emailAddress,
    		type: 'newsLetter'
    	}
        db.ref('contactUs').push(data).then(function() {
            $timeout(function() {
            	$scope.mail = '';
            }, 100);
            Materialize.toast('You have successfully subscribed to our newsletters.', 4000)
        })	
    }
}]);
