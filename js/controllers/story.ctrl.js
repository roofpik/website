app.controller('storyCtrl', function($scope, $timeout, $stateParams, $sce, $state){
	console.log($stateParams);
	$scope.featuredStories = [];
	$scope.cityId = '-KYJONgh0P98xoyPPYm9';
	db.ref('coverStory/stories/'+$stateParams.id).once('value', function(snapshot){
		console.log(snapshot.val());
		$timeout(function(){
			$scope.story = snapshot.val();
		},50);
	})

	db.ref('popularStories/'+$scope.cityId).once('value', function(snapshot){
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

	db.ref('popularLocalities/'+$scope.cityId).once('value', function(snapshot){
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
		$state.go('cover-story', {city:'gurgaon', cityId: $scope.cityId, from:3, fromId: locality});
	}

	$scope.getRelatedStories = function(tag){
		console.log(tag);
		$state.go('cover-story', {city:'gurgaon', cityId: $scope.cityId, from:2, fromId: tag});
	}

  $scope.shareonfb = function(story){
  	console.log(story);
    FB.ui({
        method: 'feed',
        name: story.storyTitle,
        link: 'http://test.roofpik.com/#/story/'+story.storyId,
        picture: story.coverImage['700x500'],
        caption: story.placeName,
        description: story.userName
    });
  }
})