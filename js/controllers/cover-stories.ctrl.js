app.controller('coverStoriesCtrl', function($scope, $timeout, $state, $mdSidenav, $sce, $stateParams, UserTokenService, $location) {

    var timestamp = new Date().getTime();
    var urlInfo = {
        url: $location.path()
    }
    UserTokenService.checkToken(urlInfo, timestamp, 1);

    $scope.showNoStories = false;
    $scope.featuredStories = [];
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';;
    $scope.popularStories = {};
    loading(true);
})


app.controller('featuredStoriesCtrl', function($scope, $timeout,$stateParams) {
    db.ref('featuredStories/' + $scope.cityId).once('value', function(data) {
        $timeout(function() {
            if (data.val()) {
                angular.forEach(data.val(), function(value, key) {
                    value.redirectionUrl = '/#/story/gurgaon/' + convertToHyphenSeparated(value.placeName) + '/' + convertToHyphenSeparated(value.title) + '/' + value.storyId;
                    value.redirectionUrl = value.redirectionUrl.replace(/[?=]/g, "");
                    value.coverPhoto = 'http://cdn.roofpik.com/roofpik/coverStory/stories/' + $scope.cityId + '/' + value.storyId + '/coverPhoto/' + value.coverPhoto + '-m.jpg';
                    $scope.featuredStories.push(value);
                })
            }
        }, 0);
    })
})

app.controller('popularNlocationStoriesCtrl', function($scope, $timeout, $stateParams) {
    db.ref('popularStories/' + $scope.cityId).once('value', function(snapshot) {
        $timeout(function() {
            if (snapshot.val()) {
                var coverStoryData = snapshot.val();
                for (key in coverStoryData) {
                    coverStoryData[key].redirectionUrl = '/#/story/gurgaon/' + convertToHyphenSeparated(coverStoryData[key].placeName) + '/' + convertToHyphenSeparated(coverStoryData[key].title) + '/' + coverStoryData[key].storyId;
                    coverStoryData[key].redirectionUrl = coverStoryData[key].redirectionUrl.replace(/[?=]/g, "");
                    coverStoryData[key].coverPhoto = 'http://cdn.roofpik.com/roofpik/coverStory/stories/' + $scope.cityId + '/' + coverStoryData[key].storyId + '/coverPhoto/' + coverStoryData[key].coverPhoto + '-m.jpg';
                    $scope.popularStories[key] = coverStoryData[key];
                }
            }
        }, 0);
    })
    db.ref('tagCloud/' + $scope.cityId + '/coverStory').once('value', function(snapshot) {
        $timeout(function() {
            if (snapshot.val()) {
                $scope.tagCloudData = snapshot.val();
            }
        }, 0);
    })

    db.ref('popularLocations/' + $scope.cityId).once('value', function(snapshot) {
        $timeout(function() {
            $scope.popularLocations = snapshot.val();
        }, 0)
    })
})

app.controller('shortStoriesCtrl', function($scope, $sce, $timeout, $stateParams) {
    console.log('called');
    db.ref('shortStories/' + $scope.cityId).once('value', function(snapshot) {
        $timeout(function() {
            if (snapshot.val()) {
                $scope.allStories = snapshot.val();
                angular.forEach($scope.allStories, function(value, key) {
                    value.redirectionUrl = '/#/story/gurgaon/' + convertToHyphenSeparated(value.placeName) + '/' + convertToHyphenSeparated(value.title) + '/' + value.storyId;
                    value.redirectionUrl = value.redirectionUrl.replace(/[?=]/g, "");
                    value.coverPhoto = 'http://cdn.roofpik.com/roofpik/coverStory/stories/' + $scope.cityId + '/' + value.storyId + '/coverPhoto/' + value.coverPhoto + '-m.jpg';
                    value.selected = true;
                })
            } else {
                $scope.showNoStories = true;
            }
            if ($stateParams.from == 3) {
                $scope.getLocationPosts($stateParams.fromId);
            } else if ($stateParams.from == 2) {
                $scope.getRelatedStories($stateParams.fromId);
            } else if ($stateParams.from == 1) {
                $scope.showAllStories();
            }
        }, 0);
    })



    $scope.toTrustedHTML = function(html) {
        return $sce.trustAsHtml(html);
    }

    $scope.showAllStories = function() {
        angular.forEach($scope.allStories, function(value, key) {
            value.selected = true;
            $scope.selectedStory = value.data;
        })
        loading(false);
    }

    $scope.getRelatedStories = function(tag) {
        db.ref('coverStory/hashtags/' + tag + '/stories').once('value', function(snapshot) {
            $timeout(function() {
                if (snapshot.val()) {
                    var storyCount = 0;
                    var count = 0;
                    angular.forEach($scope.allStories, function(value, key) {
                        count++;
                        if (snapshot.val()[key]) {
                            value.selected = true;
                            storyCount++;
                        } else {
                            value.selected = false;
                        }
                        if (count == Object.keys($scope.allStories).length) {
                            if (storyCount == 0) {
                                $scope.showNoStories = true;
                            } else {
                                $scope.showNoStories = false;
                            }
                        }
                    })
                } else {
                    angular.forEach($scope.allStories, function(value, key) {
                        value.selected = false;
                    })
                    $scope.showNoStories = true;
                }
                loading(false);
            }, 50);
        })
    }

    $scope.getLocationPosts = function(location) {
        var count = 0;
        var locationStoryCount = 0;
        angular.forEach($scope.allStories, function(value, key) {
            count++;
            if (value.placeId == location) {
                locationStoryCount++;
                value.selected = true;
            } else {
                value.selected = false;
            }
            if (count == Object.keys($scope.allStories).length) {
                if (locationStoryCount == 0) {
                    $scope.showNoStories = true;
                } else {
                    $scope.showNoStories = false;
                }
            }
        });
        loading(false);
    }

    $scope.shareonfb = function(story) {
        FB.ui({
            method: 'feed',
            name: story.storyTitle,
            link: 'http://roofpik.com' + story.redirectionUrl,
            picture: story.coverPhoto,
            caption: story.placeName,
            description: story.userName
        });
    }
})
