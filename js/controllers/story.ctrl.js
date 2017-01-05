app.controller('storyCtrl', function($scope, $timeout, $stateParams, $sce, $state, UserTokenService, $location) {
    var timestamp = new Date().getTime();
    ga('set', 'page', '/cover-story.html');
    ga('send', 'pageview');
    
    var urlInfo = {
        url: $location.path()
    }
    UserTokenService.checkToken(urlInfo, timestamp, 1);
    loading(true);
    $scope.featuredStories = [];
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    $scope.popularStories = {};
    db.ref('coverStory/stories/'+ $scope.cityId + '/' + $stateParams.id).once('value', function(snapshot) {
        $timeout(function() {
            $scope.story = snapshot.val();
            $scope.story.redirectionUrl = '/#/story/gurgaon/'+convertToHyphenSeparated($scope.story.placeName)+'/'+convertToHyphenSeparated($scope.story.title)+'/'+$scope.story.storyId;
            $scope.story.redirectionUrl = $scope.story.redirectionUrl.replace(/[?=]/g, "");
            $scope.story.coverPhoto = 'http://cdn.roofpik.com/roofpik/coverStory/stories/' + $scope.cityId + '/' + $scope.story.storyId + '/coverPhoto/' + $scope.story.coverPhoto + '-m.jpg';
            loading(false);
        }, 50);
    })

    $scope.toTrustedHTML = function(html) {
        return $sce.trustAsHtml(html);
    }

    $scope.goToStoryDetails = function(id) {
        $state.go('story', { id: id });
    }

    $scope.getLocalityPosts = function(locality) {
        $state.go('cover-story', { city: 'gurgaon', cityId: $scope.cityId, from: 3, fromId: locality });
    }

  $scope.shareonfb = function(story){
    FB.ui({
        method: 'feed',
        name: story.storyTitle,
        link: 'http://roofpik.com'+story.redirectionUrl,
        picture: story.coverPhoto,
        caption: story.placeName,
        description: story.userName
    });
  }
})
