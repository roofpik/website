app.controller('storyCtrl', function($scope, $timeout, $stateParams, $sce, $state){
	console.log($stateParams);
	$scope.featuredStories = [];
	db.ref('coverStory/stories/'+$stateParams.id).once('value', function(snapshot){
		console.log(snapshot.val());
		$timeout(function(){
			$scope.story = snapshot.val();
		},50);
	})

	db.ref('featuredStories/-KYJONgh0P98xoyPPYm9').once('value', function(data){
		$timeout(function(){
			if(data.val()){
				angular.forEach(data.val(), function(value, key){
					$scope.featuredStories.push(value);
				})
			}
		},0);
	})
	db.ref('popularStories/-KYJONgh0P98xoyPPYm9').once('value', function(snapshot){
		$timeout(function(){
			if(snapshot.val()){
				$scope.popularStories = snapshot.val();
			}''
		},0);
	})

	db.ref('tagCloud').once('value', function(snapshot){
		$timeout(function(){
			if(snapshot.val()){
				$scope.tagCloudData = snapshot.val();
			}
		},0);
	})

	db.ref('popularLocalities/-KYJONgh0P98xoyPPYm9').once('value', function(snapshot){
		$timeout(function(){
			$scope.popularLocalities = snapshot.val();
		},0)
	})

	$scope.toTrustedHTML = function( html ){
		return $sce.trustAsHtml( html );
	}

	$scope.goToStoryDetails = function(id){
		console.log(id);
		$state.go('story', {id: id});
	}

	$scope.getLocalityPosts = function(locality){
		// console.log(locality);
		$state.go('cover-stories', {from:'locality', id: locality.locationId});
	}

	$scope.getRelatedStories = function(tag){
		// console.log(tag);
		$state.go('cover-stories', {from:'tag', id: tag.tagId});
	}
})