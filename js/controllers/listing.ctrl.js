app.controller('listingCtrl', function($scope, $timeout, $stateParams, $http, $state, $location, $window) {
   
    $scope.data = JSON.parse($window.localStorage.getItem('project'));
    $scope.proj = {};
    $scope.proj.name = $scope.data.query.split(',')[0];
    $scope.query = {};
    $('.parallax').parallax();

    // jdenticon.update(".review-img");
    console.log($scope.proj.name);

    $scope.updatePerson = function(person) {
        console.log(person);
    }

    $scope.gotoWrite = function(){
        $state.go('write-review')
    }


    $scope.openQuesModal = function() {
        $('.modal').modal();
        $('#modalQues').modal('open');
    }

    $scope.submitQuery = function() {
      // console.log($scope.query);
        var key = db.ref().child('test').push().key;
        db.ref('test/questions/' + key).set($scope.query);
        $('#modalQues').modal('close');
        Materialize.toast('Your query is successfully submitted', 4000)

    }

})


app.directive('starratings', function() {
    return {
        restrict: 'EA', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true, // This is one of the cool things :). Will be explained in post.
        template: '<p>' +
            '<i class="material-icons green-text" ng-repeat="i in getNumber(stars.full)  track by $index">star</i>' +
            '<i class="material-icons green-text" ng-show="stars.half">star_half</i>' +
            '<i class="material-icons grey-text" ng-repeat="i in getNumber(stars.none)  track by $index">star_border</i>' +
            '</p>',
        controller: 'ratingCtrl',
        scope: {
            ratingval: '@ratingval'
        }
    }
});


app.controller('ratingCtrl', function($scope) {
    $scope.stars = {};

    $scope.$watch('ratingval', function() {
        $scope.stars.full = Math.floor($scope.ratingval);

        halfstar = Math.round($scope.ratingval - $scope.stars.full);
        if (halfstar == 1) {
            $scope.stars.half = true;
        }
        $scope.stars.none = 5 - Math.floor($scope.ratingval) - halfstar;
    });



    $scope.getNumber = function(num) {
        return new Array(num);
    }
});