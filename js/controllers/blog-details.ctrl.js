app.controller('blogDetailsCtrl', function($scope, $timeout, $stateParams, $sce, $state, UserTokenService, $location){
    var timestamp = new Date().getTime();
    var urlInfo = {
        url: $location.path()
    }
    UserTokenService.checkToken(urlInfo, timestamp, 1);
    
	$scope.currentStory = {};
	$scope.cityId ='-KYJONgh0P98xoyPPYm9';
	$scope.popularBlogs = {};
	db.ref('blogs/allBlogs/'+$scope.cityId+'/'+$stateParams.id).once('value', function(snapshot){
		$timeout(function(){
			$scope.blog = snapshot.val();
			$scope.blog.coverPhoto = 'http://cdn.roofpik.com/roofpik/blogs/allBlogs/'+$scope.cityId+'/'+$scope.blog.blogId+'/coverPhoto/'+$scope.blog.coverPhoto+'-l.jpg'
			console.log($scope.blog);
		},0);
	})

    db.ref('popularBlogs/' + $scope.cityId).once('value', function(snapshot) {
        $timeout(function() {
            if (snapshot.val()) {
                console.log(snapshot.val());
                var blogData = snapshot.val();
                for(key in blogData){
                    console.log('http://cdn.roofpik.com/roofpik/blogs/allBlogs/'+$scope.cityId+'/'+blogData[key].blogId+'/coverPhoto/'+blogData[key].coverPhoto+'-m.jpg');
                    blogData[key].coverPhoto = 'http://cdn.roofpik.com/roofpik/blogs/allBlogs/'+$scope.cityId+'/'+blogData[key].blogId+'/coverPhoto/'+blogData[key].coverPhoto+'-m.jpg';
                    console.log(blogData[key]);
                    $scope.popularBlogs[key] = blogData[key];
                }
            }
        }, 0);
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
	        picture: blog.coverPhoto,
	        caption: hashtag,
	        description: blog.adminName
	    });
	}

	loading(false);
})