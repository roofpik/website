app.controller('blogsCtrl', function($scope, $timeout, $state, $mdSidenav, $sce, $stateParams, UserTokenService, $location) {
    document.title="Blogs";
    var timestamp = new Date().getTime();
    var urlInfo = {
        url: $location.path()
    }
    UserTokenService.checkToken(urlInfo, timestamp, 1);
    loading(true);

    $scope.showNoBlogs = false;
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    $scope.popularBlogs = {};
    $scope.featuredBlogs = [];
})

app.controller('featuredBlogsCtrl', function($scope, $timeout, $stateParams){
    $scope.featuredBlogs = [];
    db.ref('featuredBlogs/' + $scope.cityId).once('value', function(data) {
        $timeout(function() {
            if (data.val()) {
                angular.forEach(data.val(), function(value, key) {
                    if(value.placeId){
                        value.redirectionUrl ='/#/blog-detail/gurgaon/'+convertToHyphenSeparated(value.placeName)+'/'+convertToHyphenSeparated(value.title)+'/'+value.blogId;
                    } else {
                        value.redirectionUrl ='/#/blog-details/gurgaon/'+convertToHyphenSeparated(value.title)+'/'+value.blogId;
                    }
                    value.redirectionUrl = value.redirectionUrl.replace(/[?=]/g, "");
                    value.redirectionUrl = value.redirectionUrl.replace(/[!=]/g, "");
                    value.redirectionUrl = value.redirectionUrl.replace(/[.=]/g, "");
                    value.coverPhoto = 'http://cdn.roofpik.com/roofpik/blogs/allBlogs/'+$scope.cityId+'/'+value.blogId+'/coverPhoto/'+value.coverPhoto+'-m.jpg';
                    $scope.featuredBlogs.push(value);
                })
            }
        }, 0);
    })
});

app.controller('popularNlocalityCtrl', function($scope, $timeout, $stateParams){
    console.log('popular');
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
                    blogData[key].redirectionUrl = blogData[key].redirectionUrl.replace(/[!=]/g, "");
                    blogData[key].redirectionUrl = blogData[key].redirectionUrl.replace(/[.=]/g, "");
                    blogData[key].coverPhoto = 'http://cdn.roofpik.com/roofpik/blogs/allBlogs/'+$scope.cityId+'/'+blogData[key].blogId+'/coverPhoto/'+blogData[key].coverPhoto+'-m.jpg';
                    $scope.popularBlogs[key] = blogData[key];
                }
            }
        }, 0);
    })

    db.ref('tagCloud/'+$scope.cityId+'/blogs').once('value', function(snapshot) {
        $timeout(function() {
            if (snapshot.val()) {
                $scope.tagCloudData = snapshot.val();
            }
        }, 0);
    })

    db.ref('popularLocalities/' + $scope.cityId).once('value', function(snapshot) {
        $timeout(function() {
            $scope.popularLocalities = snapshot.val();
        }, 0)
    })
});

app.controller('shortBlogsCtrl', function($scope, $timeout, $sce, $stateParams){
    db.ref('shortBlogs/' + $scope.cityId).once('value', function(snapshot) {
        $timeout(function() {
            if (snapshot.val()) {
                $scope.allBlogs = snapshot.val();
                angular.forEach($scope.allBlogs, function(value, key) {
                    if(value.placeId){
                        value.redirectionUrl ='/#/blog-detail/gurgaon/'+convertToHyphenSeparated(value.placeName)+'/'+convertToHyphenSeparated(value.title)+'/'+value.blogId;
                    } else {
                        value.redirectionUrl ='/#/blog-details/gurgaon/'+convertToHyphenSeparated(value.title)+'/'+value.blogId;
                    }
                    value.redirectionUrl = value.redirectionUrl.replace(/[?=]/g, "");
                    value.redirectionUrl = value.redirectionUrl.replace(/[!=]/g, "");
                    value.redirectionUrl = value.redirectionUrl.replace(/[.=]/g, "");
                    value.coverPhoto = 'http://cdn.roofpik.com/roofpik/blogs/allBlogs/'+$scope.cityId+'/'+value.blogId+'/coverPhoto/'+value.coverPhoto+'-m.jpg';
                    value.selected = true;
                })
            } else {
                $scope.showNoBlogs = true;
            }
            if ($stateParams.from == 3) {
                $scope.getLocalityBlogs($stateParams.fromId);
            } else if ($stateParams.from == 2) {
                $scope.getRelatedBlogs($stateParams.fromId);
            } else if ($stateParams.from == 1) {
                $scope.showAllBlogs();
            }
        })
    })
    $scope.showAllBlogs = function() {
        angular.forEach($scope.allBlogs, function(value, key) {
            value.selected = true;
        });
        loading(false);
    }

    $scope.getRelatedBlogs = function(tag) {
        db.ref('blogs/hashtags/' + tag + '/blogs').once('value', function(snapshot) {
            $timeout(function() {
                if (snapshot.val()) {
                    var blogCount = 0;
                    var count = 0;
                    angular.forEach($scope.allBlogs, function(value, key) {
                        count++;
                        if (snapshot.val()[key]) {
                            value.selected = true;
                            blogCount++;
                        } else {
                            value.selected = false;
                        }
                        if (count == Object.keys($scope.allBlogs).length) {
                            if (blogCount == 0) {
                                $scope.showNoBlogs = true;
                            } else {
                                $scope.showNoBlogs = false;
                            }
                        }
                    })
                } else {
                    angular.forEach($scope.allBlogs, function(value, key) {
                        value.selected = false;
                    })
                    $scope.showNoBlogs = true;
                }
                loading(false);
            }, 50);
        })
    }

    $scope.getLocalityBlogs = function(locality) {
        var count = 0;
        var localityBlogCount = 0;
        angular.forEach($scope.allBlogs, function(value, key) {
            count++;
            if (value.placeId == locality) {
                value.selected = true;
                localityBlogCount++;
            } else {
                value.selected = false;
            }
            if (count == Object.keys($scope.allBlogs).length) {
                if (localityBlogCount == 0) {
                    $scope.showNoBlogs = true;
                } else {
                    $scope.showNoBlogs = false;
                }
            }
        });
        loading(false);
    }

    $scope.shareonfb = function(blog) {
        console.log(blog);
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

    $scope.toTrustedHTML = function(html) {
        return $sce.trustAsHtml(html);
    }
})
