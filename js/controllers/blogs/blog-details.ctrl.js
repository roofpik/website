app.controller('blogDetailsCtrl', function($scope, $timeout, $stateParams, $sce, $state, $location) {
    var timestamp = new Date().getTime();
    // var urlInfo = {
    //     url: $location.path()
    // }
    // UserTokenService.checkToken(urlInfo, timestamp, 1);
    // console.log($stateParams);
    $scope.showNoBlogs = false;
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    $scope.city = 'gurgaon';
        $scope.from = 1;
    $scope.popularBlogs = {};
    loading(true);
    db.ref('blogs/allBlogs/' + $scope.cityId + '/' + $stateParams.id).once('value', function(snapshot) {
        $timeout(function() {
            $scope.blog = snapshot.val();
            document.title = $scope.blog.title;
            if ($scope.blog.placeId) {
                $scope.blog.redirectionUrl = '/#/blog-detail/gurgaon/' + convertToHyphenSeparated($scope.blog.placeName) + '/' + convertToHyphenSeparated($scope.blog.title) + '/' + $scope.blog.blogId;
            } else {
                $scope.blog.redirectionUrl = '/#/blog-details/gurgaon/' + convertToHyphenSeparated($scope.blog.title) + '/' + $scope.blog.blogId;
            }
            $scope.blog.redirectionUrl = $scope.blog.redirectionUrl.replace(/[?=]/g, "");
            $scope.blog.coverPhoto = 'http://cdn.roofpik.com/roofpik/blogs/allBlogs/' + $scope.cityId + '/' + $scope.blog.blogId + '/coverPhoto/' + $scope.blog.coverPhoto + '-l.jpg'
            loading(false);
        }, 0);

        function convertToHyphenSeparated(data) {
            if (data == null || data == "") {
                return data;
            }

            data = data.trim();
            return data.split(" ").join("-").toLowerCase();
        }
    })

    $scope.toTrustedHTML = function(html) {
        return $sce.trustAsHtml(html);
    }

    $scope.shareonfb = function(blog) {
        var hashtag = '';
        for (key in blog.hashtags) {
            hashtag += ' #' + blog.hashtags[key].tag;
        }
        FB.ui({
            method: 'feed',
            name: blog.blogTitle,
            link: 'http://roofpik.com' + blog.redirectionUrl,
            picture: blog.coverPhoto,
            caption: hashtag,
            description: blog.adminName
        });
    }
})
