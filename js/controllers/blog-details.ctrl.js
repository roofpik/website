app.controller('blogDetailsCtrl', function($scope, $timeout, $stateParams, $sce, $state, UserTokenService, $location){
    var timestamp = new Date().getTime();
    var urlInfo = {
        url: $location.path()
    }
    UserTokenService.checkToken(urlInfo, timestamp, 1);
    console.log($stateParams);
	$scope.currentStory = {};
	$scope.cityId ='-KYJONgh0P98xoyPPYm9';
	$scope.popularBlogs = {};
	loading(true);
	db.ref('blogs/allBlogs/'+$scope.cityId+'/'+$stateParams.id).once('value', function(snapshot){
		$timeout(function(){
			$scope.blog = snapshot.val();
        	if($scope.blog.placeId){
				$scope.blog.redirectionUrl ='/#/blog-detail/gurgaon/'+convertToHyphenSeparated($scope.blog.placeName)+'/'+convertToHyphenSeparated($scope.blog.title)+'/'+$scope.blog.blogId;
        	} else {
				$scope.blog.redirectionUrl ='/#/blog-details/gurgaon/'+convertToHyphenSeparated($scope.blog.title)+'/'+$scope.blog.blogId;
        	}
			$scope.blog.redirectionUrl = $scope.blog.redirectionUrl.replace(/[?=]/g, "");
			$scope.blog.coverPhoto = 'http://cdn.roofpik.com/roofpik/blogs/allBlogs/'+$scope.cityId+'/'+$scope.blog.blogId+'/coverPhoto/'+$scope.blog.coverPhoto+'-l.jpg'
			loading(false);
		},0);
	})

    db.ref('popularBlogs/' + $scope.cityId).once('value', function(snapshot) {
        $timeout(function() {
            if (snapshot.val()) {
                var blogData = snapshot.val();
                for(key in blogData){
                	if(blogData[key].placeId){
    					blogData[key].redirectionUrl ='/#/blog-detail/gurgaon/'+convertToHyphenSeparated(blogData[key].placeName)+'/'+convertToHyphenSeparated(blogData[key].title)+'/'+blogData[key].blogId;
                	} else {
						blogData[key].redirectionUrl ='/#/blog-details/gurgaon/'+convertToHyphenSeparated(blogData[key].title)+'/'+blogData[key].blogId;
                	}
                	blogData[key].redirectionUrl = blogData[key].redirectionUrl.replace(/[?=]/g, "");
                    blogData[key].coverPhoto = 'http://cdn.roofpik.com/roofpik/blogs/allBlogs/'+$scope.cityId+'/'+blogData[key].blogId+'/coverPhoto/'+blogData[key].coverPhoto+'-m.jpg';
                    $scope.popularBlogs[key] = blogData[key];
                }
            }
        }, 0);
    })

	db.ref('tagCloud/'+$scope.cityId+'/blogs').once('value', function(snapshot){
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

	$scope.shareonfb = function(blog) {
	    var hashtag = '';
	    for (key in blog.hashtags) {
	        hashtag += ' #' + blog.hashtags[key].tag;
	    }
	    FB.ui({
	        method: 'feed',
	        name: blog.blogTitle,
	        link: 'http://roofpik.com'+blog.redirectionUrl,
	        picture: blog.coverPhoto,
	        caption: hashtag,
	        description: blog.adminName
	    });
	}
})