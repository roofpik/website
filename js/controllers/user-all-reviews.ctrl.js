app.controller('userAllReviewsCtrl', function($scope, $timeout, $state, $rootScope, UserTokenService, $location){
	// var user = firebase.auth().currentUser;
    var timestamp = new Date().getTime();
    var urlInfo = {
        url: $location.path()
    }
    UserTokenService.checkToken(urlInfo, timestamp, 1);
    
	$scope.allReviews = {};
	var count = 0;
	$scope.dataloaded = false;
	var user;
    $rootScope.$watch('loginStatus', function(){
        if($rootScope.loginStatus){
            user = firebase.auth().currentUser;
            console.log(user);
            fetchReviews();
        }
    });

    function fetchReviews(){
		db.ref('userReviews/'+user.uid).once('value', function(snapshot){
		// db.ref('userReviews/2cQ2XQ7w7pdT9WGq2nyGJhrPSOo2').once('value', function(snapshot){
			console.log(snapshot.val());
			if(snapshot.val()){
				$timeout(function(){
					angular.forEach(snapshot.val(), function(value, key){
						count++;
						// console.log(value, key);
						angular.forEach(value, function(value1, key1){
							if(key == 'residential'){
								value1.type = 'residential',
								value1.id = key1;
								$scope.allReviews[key1] = value1;
							} else if(key == 'locality'){
								value1.type = 'locality',
								value1.id = key1;
								$scope.allReviews[key1] = value1;
							}
						})
						if(count == Object.keys(snapshot.val()).length){
							$scope.dataloaded = true;
							$scope.noReviews = false;
						}
					})
				},0);
			} else {
				console.log('else called');
				$timeout(function(){
					$scope.dataloaded = true;
					$scope.noReviews = true;
				}, 0);
			}
		});
    }

	$scope.editReview = function(review){
		// console.log(review.id);
		var reviewTypeId = '';
		var reviewTypeName = '';
		var reviewIn = '';
		if(review.type == 'residential'){
			reviewTypeId = review.projectId;
			reviewTypeName = review.projectName;
			if(review.status == 'uploaded'){
				reviewIn = '1';
			} else {
				reviewIn = '2';
			}
		} else {
			reviewTypeId = review.localityId;
			reviewTypeName = review.localityName;
			if(review.status == 'uploaded'){
				reviewIn = '1';
			} else {
				reviewIn = '2';
			}
		}
		$state.go('edit-review', {city:review.cityId, type:review.type, typeId:reviewTypeId, typeName:reviewTypeName, id:review.id, reviewIn: reviewIn});
	};

	loading(false);
})