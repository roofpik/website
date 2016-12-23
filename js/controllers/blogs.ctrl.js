app.controller('blogsCtrl', function($scope, $timeout, $state, $mdSidenav, $sce, $stateParams, UserTokenService, $location) {
    var timestamp = new Date().getTime();
    var urlInfo = {
        url: $location.path()
    }
    UserTokenService.checkToken(urlInfo, timestamp, 1);
    

    $scope.showNoBlogs = false;
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    $scope.featuredBlogs = [];
    $scope.popularBlogs = {};

    db.ref('featuredBlogs/' + $scope.cityId).once('value', function(data) {
        $timeout(function() {
            if (data.val()) {
                angular.forEach(data.val(), function(value, key) {
                    value.coverPhoto = 'http://cdn.roofpik.com/roofpik/blogs/allBlogs/'+$scope.cityId+'/'+value.blogId+'/coverPhoto/'+value.coverPhoto+'-m.jpg';
                    $scope.featuredBlogs.push(value);
                })
            }
        }, 0);
    })

    db.ref('shortBlogs/' + $scope.cityId).once('value', function(snapshot) {
        $timeout(function() {
            if (snapshot.val()) {
                $scope.allBlogs = snapshot.val();
                console.log($scope.allBlogs);
                angular.forEach($scope.allBlogs, function(value, key) {
                    value.coverPhoto = 'http://cdn.roofpik.com/roofpik/blogs/allBlogs/'+$scope.cityId+'/'+value.blogId+'/coverPhoto/'+value.coverPhoto+'-m.jpg';
                    value.selected = true;
                })
            } else {
                $scope.showNoBlogs = true;
            }
            if ($stateParams.from == 3) {
                $scope.getLocalityBlogs($stateParams.id);
            } else if ($stateParams.from == 2) {
                $scope.getRelatedBlogs($stateParams.id);
            } else if ($stateParams.from == 1) {
                $scope.showAllBlogs();
            }
        })
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

    db.ref('tagCloud').once('value', function(snapshot) {
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

    $scope.toTrustedHTML = function(html) {
        return $sce.trustAsHtml(html);
    }

    $scope.showAllBlogs = function() {
        console.log($scope.allBlogs);
        angular.forEach($scope.allBlogs, function(value, key) {
            value.selected = true;
        })
    }

    $scope.getRelatedBlogs = function(tag) {
        console.log(tag);
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
                            console.log('blogCount ', blogCount);
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
            }, 50);
        })
    }

    $scope.getLocalityBlogs = function(locality) {
        var count = 0;
        var localityBlogCount = 0;
        console.log(locality);
        angular.forEach($scope.allBlogs, function(value, key) {
            count++;
            if (value.placeId == locality) {
                value.selected = true;
                localityBlogCount++;
            } else {
                value.selected = false;
            }
            if (count == Object.keys($scope.allBlogs).length) {
                console.log('localityBlogCount ', localityBlogCount);
                if (localityBlogCount == 0) {
                    $scope.showNoBlogs = true;
                } else {
                    $scope.showNoBlogs = false;
                }
            }
        })
    }

    $scope.goToBlogDetails = function(id) {
        $state.go('blog-details', { id: id });
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

    loading(false);

})
