app.controller('blogDetailsCtrl', function($scope, $timeout, $stateParams, $sce, $state, UserTokenService, $location){
    var timestamp = new Date().getTime();
    var urlInfo = {
        url: $location.path()
    }
    UserTokenService.checkToken(urlInfo, timestamp, 1);
    
	$scope.currentStory = {};
	$scope.cityId ='-KYJONgh0P98xoyPPYm9';
	db.ref('blogs/allBlogs/'+$stateParams.id).once('value', function(snapshot){
		$timeout(function(){
			$scope.blog = snapshot.val();
			console.log($scope.blog);
		},0);
	})

	db.ref('popularBlogs/'+$scope.cityId).once('value', function(snapshot){
		$timeout(function(){
		  if(snapshot.val()){
		    $scope.popularBlogs = snapshot.val();
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

	$scope.goToBlogDetails = function(id){
		$state.go('blog-details', {id: id});
	}

	$scope.getLocalityBlogs = function(locality){
		$state.go('blog', {city:'gurgaon', cityId: $scope.cityId, from:3, fromId: locality});
	}

	$scope.getRelatedBlogs = function(tag){
		$state.go('blog', {city:'gurgaon', cityId: $scope.cityId, from:2, fromId: tag});
	}

	$scope.shareonfb = function(blog) {
	    var hashtag = '';
	    for (key in blog.hashtags) {
	        hashtag += ' #' + blog.hashtags[key].tag;
	    }
	    FB.ui({
	        method: 'feed',
	        name: blog.blogTitle,
	        link: 'http://test.roofpik.com/#/blog/' + blog.blogId,
	        picture: blog.coverImage['700x500'],
	        caption: hashtag,
	        description: blog.adminName
	    });
	}

	
})