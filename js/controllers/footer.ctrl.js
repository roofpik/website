app.controller('footerCtrl', ['$scope', '$timeout', '$state', function($scope, $timeout, $state) {
    $(document).ready(function() {
        Materialize.updateTextFields();
        $(".dropdown-button").dropdown();
    })

    $scope.forms = {};

    $scope.submitQuery = function(user) {
        console.log(user);
        db.ref('contactUs').push($scope.user).then(function() {
            $timeout(function() {
                $scope.user = {};
                $scope.forms.contactUs.$setUntouched();
                $scope.forms.contactUs.$setPristine();
            }, 100);
            // Materialize.toast('Request successfully submitted', 4000)
            swal({
                title:"",
                text: "Request successfully submitted",
                // text: "I will close in 2 seconds.",
                timer: 3000,
                showConfirmButton: false,
                type: 'success'
            });
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
                $scope.forms.newsletter.$setPristine();
                $scope.forms.newsletter.$setUntouched();
            }, 100);
            // Materialize.toast('You have successfully subscribed to our newsletters.', 4000)
            swal({
                title: "",
                text: "You have successfully subscribed to our newsletters",
                // text: "I will close in 2 seconds.",
                timer: 3000,
                showConfirmButton: false,
                type: 'success'
            });
        })
    }

    // $scope.response = null;
    // $scope.widgetId = null;

    // $scope.model = {
    //     key: '6LfkohYUAAAAADwVTV8HDQMM6r9Yxl-xz5Wns63C'
    // };

    // $scope.setResponse = function(response) {
    //     console.log(response);
    //     console.info('Response available');

    //     $scope.response = response;
    // };

    // $scope.setWidgetId = function(widgetId) {
    //     console.info('Created widget ID: %s', widgetId);

    //     $scope.widgetId = widgetId;
    // };

    // $scope.cbExpiration = function() {
    //     console.info('Captcha expired. Resetting response object');

    //     vcRecaptchaService.reload($scope.widgetId);

    //     $scope.response = null;
    // };

    // $scope.submit = function() {
    //     var valid;

    //     /**
    //      * SERVER SIDE VALIDATION
    //      *
    //      * You need to implement your server side validation here.
    //      * Send the reCaptcha response to the server and use some of the server side APIs to validate it
    //      * See https://developers.google.com/recaptcha/docs/verify
    //      */
    //     console.log('sending the captcha response to the server', $scope.response);

    //     if (valid) {
    //         console.log('Success');
    //     } else {
    //         console.log('Failed validation');

    //         // In case of a failed validation you need to reload the captcha
    //         // because each response can be checked just once
    //         vcRecaptchaService.reload($scope.widgetId);
    //     }
    // }

}]);
