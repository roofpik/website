app.controller('pgDetailsCtrl', ['$scope', '$timeout', '$stateParams', '$rootScope', '$state', function($scope, $timeout, $stateParams, $rootScope, $state){
	console.log('pg');
	loading(false, 2000);
	$('ul.tabs').tabs();
}]);


app.controller('pgReviewRatingCtrl', ['$scope', '$timeout', '$stateParams', '$rootScope', '$state', function($scope, $timeout, $stateParams, $rootScope, $state){
	console.log('pg 1');
}]);