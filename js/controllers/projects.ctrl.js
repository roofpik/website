app.controller('projectsCtrl', function($scope, $timeout, $stateParams, $state, UserTokenService,$location){
    var timestamp = new Date().getTime();
    var urlInfo = {
        url: $location.path()
    }
    UserTokenService.checkToken(urlInfo, timestamp, 1);

    var type = $stateParams.type || null;
    var id = $stateParams.id || null;
    var name = $stateParams.name || null;

    $scope.category = $stateParams.category || null;
    $scope.filterPath = [];
    $scope.bhk = ['1', '2', '3', '4', '5', '6', '6+'];
    $scope.ratings = [1, 2, 3, 4, 5];
    $scope.filters = {
      status: [],
      bhk: [],
      ratings: [],
      locality: [],
      price: {
        buy: {},
        rent: {}
      }
    }
    $scope.projectList = [];
    $scope.projects = [];
    $scope.dataVersions = {};
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';

    if($stateParams.category == 'family'){
      $scope.category = 'family';
    } else if($stateParams.category == 'elderly'){
      $scope.category = 'elders';
    } else if($stateParams.category == 'bachelors'){
      $scope.category = 'singles';
    } else if($stateParams.category == 'children'){
      $scope.category = 'kids';
    } else if($stateParams.category == 'married') {
      $scope.category = 'lifestyle';
    } else if($stateParams.category == 'pets'){
      $scope.category = 'pets';
    } else if($stateParams.category == 'top-rated'){
      $scope.category = 'Top Rated'
    }

    db.ref('locality/-KYJONgh0P98xoyPPYm9').once('value', function(snapshot){
      $timeout(function(){
        $scope.localities = snapshot.val();
      }, 0);
    })

    $scope.projectList = getLocalStorage('projectList').value;
    for(key in $scope.projectList){
      if($scope.projectList[key].imgUrl.indexOf('http') == -1){
          $scope.projectList[key].imgUrl = "http://cdn.roofpik.com/roofpik/projects/"+$scope.cityId+'/residential/'+$scope.projectList[key].projectId+'/images/coverPhoto/'+$scope.projectList[key].imgUrl+'-s.jpg';
      }
    }
    preprocessData($scope.projectList);


    function preprocessData(projectList){
      if($stateParams.id == 1){
        for(key in projectList){
            projectList[key].show= true;
            $scope.projects.push(projectList[key]);
        }
        getSortingParam();
      } else if($stateParams.id == 2){
        for(key in projectList){
          if(projectList[key].builderId == $stateParams.categoryId){
            projectList[key].show= true;
            $scope.projects.push(projectList[key]);
          }
        }
        $scope.filterPath = ["Gurgaon",">","Residential",">", convertHyphenSeparatedToNormal($stateParams.category)];
      } else if($stateParams.id == 3){
        for(key in projectList){
          if(projectList[key].localityId == $stateParams.categoryId){
            projectList[key].show= true;
            $scope.projects.push(projectList[key]);
          }
        }
        $scope.filterPath = ["Gurgaon",">","Residential",">", convertHyphenSeparatedToNormal($stateParams.category)];
      }
      $scope.showCount = $scope.projects.length;
      $scope.numProjects = $scope.projects.length;
    }

    function getSortingParam() {
      if($stateParams.id == 1){
        if($stateParams.category == 'top-rated'){
          $scope.sortByParam = '-overallRating';
          $scope.filterPath = ["Gurgaon",">","Residential",">", "Top Rated"];
        } else {
          $scope.sortByParam = '-'+$scope.category;
          $scope.filterPath = ["Gurgaon",">","Residential",">", firstCapital($stateParams.category)];
        }
      }
    }

    function firstCapital(str){
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    $scope.takeToHome = function(){
        $state.go('home');
    }

    $scope.selectProject = function(id, name) {
        var year = new Date().getFullYear();
        // $state.go('project-details', { id: id, name: name, path: JSON.stringify($scope.filterPath) });
        $state.go('project-details', {year: year, city: 'gurgaon', type:'residential-projects', category:$stateParams.category, project:convertToHyphenSeparated(name), id:id});
    }

 //    function convertCurrency(value){
 //        valueLen = getlength(value);
 //        var denomination = '';

 //        if(valueLen <= 5){
 //            return value;
 //        } else if(valueLen> 5 && valueLen <= 7){
 //            denomination = ' L';
 //            value = value/100000;
 //            value = parseFloat(Math.round(value * 100) / 100).toFixed(2);
 //            return value+denomination;
 //        } else if(valueLen> 7 && valueLen <= 9){
 //            denomination = ' Cr';
 //            value = value/10000000;
 //            value = parseFloat(Math.round(value * 100) / 100).toFixed(2);
 //            return value+denomination;
 //        }
 //   }

  // function getlength(number) {
  //    return number.toString().length;
  // }

   function filterStatus(filters){
     for(key in $scope.projects){
       if(filters.indexOf($scope.projects[key].projectStatus) > -1){
         $scope.projects[key].show = true
       } else {
         $scope.projects[key].show = false;
       }
     }
   }

 //   function filterBhk(filters){
 //       for(key in $scope.projects){
 //         if($scope.projects[key].show){
 //           var exists = false;
 //           for(key1 in $scope.projects[key].bhk){
 //             if($scope.projects[key].bhk[key1]){
  //          if(filters.indexOf(key1) > -1){
 //                 exists = true;
 //               }
 //             }
 //           }
 //           if(exists){
 
 //           } else {
 //             $scope.projects[key].show = false;
 //           }
 //         }
 //     }
 //   }

   function filterLocality(filters){
     for(key in $scope.projects){
       if($scope.projects[key].show){
       if(filters.indexOf($scope.projects[key].localityId) > -1){
         $scope.projects[key].show = true;
       } else {
         $scope.projects[key].show = false;
       }
     }
     }
   }

   function filterRatings(filters){
     var minKey = (($scope.filters.ratings).sort())[0];
     for(key in $scope.projects){
       if($scope.projects[key].show){
         if($scope.projects[key].overallRating >= minKey){
           $scope.projects[key].show = true;
         } else {
           $scope.projects[key].show = false;
         }
       }
     }
   }

 //   function filterPriceBuy(filters){
 //     for(key in $scope.projects){
 //       if($scope.projects[key].show){
  //      if($scope.projects[key].price.buy.min>= filters.min && $scope.projects[key].price.buy.max <= filters.max){
  //        $scope.projects[key].show = true;
  //      } else {
  //        $scope.projects[key].show = false;
  //      }
  //    }
 //     }
 //   }

 //   function filterPriceRent(filters){
 //     for(key in $scope.projects){
 //       if($scope.projects[key].show){
  //      if($scope.projects[key].price.rent.min>= filters.min && $scope.projects[key].price.rent.max <= filters.max){
  //        $scope.projects[key].show = true;
  //      } else {
  //        $scope.projects[key].show = false;
  //      }
  //    }
 //     }
 //   }

    function findShowCount(){
      $scope.showCount = 0;
      for(key in $scope.projects){
        if($scope.projects[key].show){
          $scope.showCount++;
        }
      }
    }

   function filterList(){
     if($scope.filters.status.length){
       filterStatus($scope.filters.status);
     }else {
       for(key in $scope.projects){
         $scope.projects[key].show = true;
       }
     }

     if($scope.filters.bhk.length){
       filterBhk($scope.filters.bhk);
     }

     if($scope.filters.locality.length){
       filterLocality($scope.filters.locality);
     }

     if($scope.filters.ratings.length){
       filterRatings($scope.filters.ratings.length);
     }

     if($scope.filters.price.buy.min < $scope.filters.price.buy.max){
       filterPriceBuy($scope.filters.price.buy);
     }

     if($scope.filters.price.rent.min < $scope.filters.price.rent.max){
       filterPriceRent($scope.filters.price.rent);
     }
      findShowCount();
   }

  $scope.exists = function (item) {
     return $scope.filters.status.indexOf(item) > -1;
   };

  $scope.toggle = function (item) {
   var idx = $scope.filters.status.indexOf(item);
   if (idx > -1) {
     $scope.filters.status.splice(idx, 1);
   }
   else {
     $scope.filters.status.push(item);
   }
   filterList();
  };

  // $scope.existsBhk = function (item) {
 //     return $scope.filters.bhk.indexOf(item) > -1;
 //   };

  // $scope.toggleBhk = function (item) {
  //  var idx = $scope.filters.bhk.indexOf(item);
  //  if (idx > -1) {
  //    $scope.filters.bhk.splice(idx, 1);
  //  }
  //  else {
  //    $scope.filters.bhk.push(item);
  //  }
  //  filterList();
  // };

  $scope.existsLocality = function (item) {
     return $scope.filters.locality.indexOf(item.localityId) > -1;
   };

  $scope.toggleLocality = function (item) {
   var idx = $scope.filters.locality.indexOf(item.localityId);
   if (idx > -1) {
     $scope.filters.locality.splice(idx, 1);
   }
   else {
     $scope.filters.locality.push(item.localityId);
   }
   filterList();
  };

  $scope.existsRatings = function (item) {
     return $scope.filters.ratings.indexOf(item) > -1;
   };

  $scope.toggleRatings = function (item) {
   var idx = $scope.filters.ratings.indexOf(item);
   if (idx > -1) {
     for(var i = 1; i <= item; i++){
       var index = $scope.filters.ratings.indexOf(i);
       if(index > -1){
         $scope.filters.ratings.splice(index, 1);
       }
     }
   }
   else {
     for(var i = item; i <=5; i++){
       if($scope.filters.ratings.indexOf(i) > -1){

       } else {
         $scope.filters.ratings.push(i);
       }
     }

   }
   filterList();
  };

  // $scope.applyPriceFilter = function(){
  //  if($scope.filters.price.buy.min && $scope.filters.price.buy.max){
  //    filterList();
  //  }
  //  if($scope.filters.price.rent.min && $scope.filters.price.rent.max){
  //    filterList();
  //  }
  // }

 //  $scope.clearPriceFilter = function(){
 //    $scope.filters.price.buy = {};
 //    $scope.filters.price.rent = {};
 //    filterList();
 //  }

 loading(false);

})