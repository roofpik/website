app.controller('coverStoriesCtrl', function($scope, $timeout, $state, $mdSidenav, $sce, $stateParams){

  $scope.showNoStories = false;

  $scope.close = function () {
    // Component lookup should always be available since we are not using `ng-if`
    $mdSidenav('right').close()
      .then(function () {
        $log.debug("close RIGHT is done");
      });
  };

  $scope.toggleRight = function(){
  	$mdSidenav('right').open()
  }
  $scope.featuredStories = [];

  db.ref('featuredStories/-KYJONgh0P98xoyPPYm9').once('value', function(data){
    $timeout(function(){
      if(data.val()){
        angular.forEach(data.val(), function(value, key){
          $scope.featuredStories.push(value);
        })
      }
    },0);
  })

  db.ref('shortStories/-KYJONgh0P98xoyPPYm9').once('value', function(snapshot){
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
      if($stateParams.from == 'locality'){
        $scope.getLocalityPosts($stateParams.id);
      } else if($stateParams.from == 'tag'){
        $scope.getRelatedStories($stateParams.id);
      } else if($stateParams.from == 'home'){
        $scope.showAllStories();
      }
    })
  })

  db.ref('popularStories/-KYJONgh0P98xoyPPYm9').once('value', function(snapshot){
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

  db.ref('popularLocalities/-KYJONgh0P98xoyPPYm9').once('value', function(snapshot){
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
    $state.go('story-details', {id: id});
  }

})