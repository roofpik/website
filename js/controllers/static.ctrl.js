app.controller('businessAdvantageCtrl', function($scope) {
    $scope.data = {};
    $scope.businessEnquiry = function() {
        var updates = {};
        $scope.data.created = new Date().getTime();
        $scope.data.type = 'business'
        $scope.data.enquiryNo = Math.floor((Math.random() * 1000000) + 9999);
        url = '/enquiry';
        var newPostKey = db.ref().child(url).push().key;
        $scope.data.key = newPostKey;
        updates[url + '/' + newPostKey] = $scope.data;
        db.ref().update(updates).then(function() {
            swal("Enquiry Submitted", "Your enquiry has been successfully submitted", "success");
             $scope.data = {};
        });
    }
});



app.controller('aboutCtrl', function($scope) {
    $scope.data = {};
    $scope.sendEnquiry = function() {
        var updates = {};
        $scope.data.created = new Date().getTime();
        $scope.data.enquiryNo = Math.floor((Math.random() * 1000000) + 9999);
         $scope.data.type = 'general'
        url = '/enquiry';
        var newPostKey = db.ref().child(url).push().key;
        $scope.data.key = newPostKey;
        updates[url + '/' + newPostKey] = $scope.data;
        db.ref().update(updates).then(function() {
            swal("Thank you for contacting us", "Your enquiry has been successfully submitted", "success");
             $scope.data = {};
        });
    }
});


app.controller('careerCtrl', function($scope) {
    $scope.data = {};
    $scope.sendEnquiry = function() {
        var updates = {};
        $scope.data.created = new Date().getTime();
        $scope.data.enquiryNo = Math.floor((Math.random() * 1000000) + 9999);
        $scope.data.type = 'career'
        url = '/enquiry/';
        var newPostKey = db.ref().child(url).push().key;
        $scope.data.key = newPostKey;
        updates[url + '/' + newPostKey] = $scope.data;
        db.ref().update(updates).then(function() {
            swal("Thank you for contacting us", "Your details has been successfully submitted", "success");
             $scope.data = {};
        });
    }
});

// dg add 12 static pages controller start

app.controller('advertiseCtrl', function($scope) {
  
});
app.controller('BusinessAdvantageFormCtrl', function($scope) {
  
});
app.controller('comparisonCtrl', function($scope) {
  
});
app.controller('contactCtrl', function($scope) {
     
});

app.controller('corporateCtrl', function($scope) {
  
});
app.controller('guidelinesCtrl', function($scope) {
  
});
varapp.controller('homecoverstoriesCtrl', function($scope) {
  
});
app.controller('locationCtrl', function($scope) {
  
});
app.controller('marketingCtrl', function($scope) {
  
});
app.controller('requirementCtrl', function($scope) {
  
});
app.controller('verifiedCtrl', function($scope) {
  
});
app.controller('termsCtrl', function($scope) {
  
});






