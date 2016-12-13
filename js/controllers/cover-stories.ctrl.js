app.controller('coverStoriesCtrl', function($scope, $timeout, $state, $mdSidenav, $sce, $stateParams){

  $scope.showNoStories = false;
  console.log($stateParams);
  $scope.featuredStories = [];
  $scope.cityId = $stateParams.cityId;

  db.ref('featuredStories/'+$scope.cityId).once('value', function(data){
    $timeout(function(){
      if(data.val()){
        angular.forEach(data.val(), function(value, key){
          $scope.featuredStories.push(value);
        })
      }
    },0);
  })

  db.ref('shortStories/'+$scope.cityId).once('value', function(snapshot){
    $timeout(function(){
      if(snapshot.val()){
        $scope.allStories = snapshot.val();
        console.log($scope.allStories);
        angular.forEach($scope.allStories, function(value, key){
          value.selected = true;
        })
      } else {
        $scope.showNoStories = true;
      }
      if($stateParams.from == 3){
      	console.log($stateParams.fromId);
        $scope.getLocalityPosts($stateParams.fromId);
      } else if($stateParams.from == 2){
        $scope.getRelatedStories($stateParams.fromId);
      } else if($stateParams.from == 1){
        $scope.showAllStories();
      }
    }, 0);
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

  $scope.showAllStories = function(){
    angular.forEach($scope.allStories, function(value, key){
      value.selected = true;
      $scope.selectedStory = value.data;
    })
  }

  $scope.getRelatedStories = function(tag){
    console.log(tag);
    db.ref('coverStory/hashtags/'+tag+'/stories').once('value', function(snapshot){
      $timeout(function(){
        if(snapshot.val()){
          console.log(snapshot.val());
          var storyCount = 0;
          var count = 0;
          angular.forEach($scope.allStories, function(value, key){
            count++;
            if(snapshot.val()[key]){
              value.selected = true;
              storyCount++;
            } else {
              value.selected = false;
            }
            if(count == Object.keys($scope.allStories).length){
              if(storyCount == 0){
                $scope.showNoStories = true;
              } else {
                $scope.showNoStories = false;
              }
            }
          })
        } else {
          angular.forEach($scope.allStories, function(value, key){
            value.selected = false;
          })
          $scope.showNoStories = true;
        }
      },50);
    })
  }

  $scope.getLocalityPosts = function(locality){
    console.log(locality);
    var count = 0;
    var localityStoryCount = 0;
    angular.forEach($scope.allStories, function(value, key){
      count++;
      if(value.placeId == locality){
        localityStoryCount++;
        value.selected = true;
      } else {
        value.selected = false;
      }
      if(count == Object.keys($scope.allStories).length){
        if(localityStoryCount == 0){
          $scope.showNoStories = true;
        } else {
          $scope.showNoStories = false;
        }
      }
    })
  }

  $scope.goToStoryDetails = function(id){
    console.log(id);
    $state.go('story', {id: id});
  }

  $scope.sharePost = function(post){
    console.log(post);
    FB.ui({
      method: 'feed',
      link: 'https://developers.facebook.com/docs/',
      caption: 'An example caption',
    }, function(response){
      console.log(response);
    });
  }

  $scope.shareonfb = function(story){
    FB.ui({
        method: 'feed',
        name: story.storyTitle,
        link: 'http://test.roofpik.com/#/story/'+story.storyId,
        picture: story.coverImage,
        caption: story.placeName,
        description: story.userName
    });
  }

})