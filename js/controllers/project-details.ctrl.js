app.controller('projectDetailsCtrl', function($scope, $timeout, $stateParams, $rootScope, $state, $sce, $mdDialog, UserTokenService, $location){

    var timestamp = new Date().getTime();
    var urlInfo = {
        url: $location.path()
    }
    UserTokenService.checkToken(urlInfo, timestamp, 1);
    
    var rates = [1, 2, 3, 4, 5];
    $scope.projectId = $stateParams.id;
    $scope.reviews = [];
    $scope.dataLoaded = false;
    $scope.isActive = '';
    $scope.viewReviews = 5;

    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    db.ref('projects/-KYJONgh0P98xoyPPYm9/residential/'+$scope.projectId).once('value', function(snapshot) {
        // console.log(snapshot.val());
        $timeout(function() {
            $scope.project = snapshot.val();
            console.log($scope.project.images);
            console.log($scope.project.images.main['2100x800']);
            $scope.projectName = $scope.project.projectName;
            $scope.path = [">","Gurgaon", ">","Residential", ">"];
            if(angular.isDefined($stateParams.category)){
                $scope.path.push(($stateParams.category).capitalize());
                $scope.path.push(">");
            }
            $scope.path.push($scope.projectName);
        }, 100);
    }).then(function() {
        db.ref('reviews/-KYJONgh0P98xoyPPYm9/residential/'+$scope.projectId)
        .orderByChild('wordCount')
        .once('value', function(snapshot) {
            console.log(snapshot.val());
            var allReviewsCount = Object.keys(snapshot.val()).length;
            $timeout(function(){
                var reviewCount = 0;
                snapshot.forEach(function(childSnapshot){
                    reviewCount++;
                    // console.log(childSnapshot.val().wordCount);
                    $scope.reviews.push(childSnapshot.val());
                    if(reviewCount == allReviewsCount){
                        if(reviewCount > 5){
                            $scope.showReviewBtn = true;
                        }
                    }
                });
                console.log($scope.reviews);
            },0);

        }).then(function() {
            db.ref('ratingReview/-KYJONgh0P98xoyPPYm9/residential/'+$scope.projectId).once('value', function(snapshot) {
                $timeout(function() {
                    console.log(snapshot.val());
                    $scope.allRatings = snapshot.val();
                    $("#excellentStar").css("width", ($scope.allRatings.fiveStar / $scope.allRatings.overallRatingNum) * 100 + '%');
                    $("#veryGoodStar").css("width", ($scope.allRatings.fourStar / $scope.allRatings.overallRatingNum) * 100 + '%');
                    $("#goodStar").css("width", ($scope.allRatings.threeStar / $scope.allRatings.overallRatingNum) * 100 + '%');
                    $("#averageStar").css("width", ($scope.allRatings.twoStar / $scope.allRatings.overallRatingNum) * 100 + '%');
                    $("#badStar").css("width", ($scope.allRatings.oneStar / $scope.allRatings.overallRatingNum) * 100 + '%');
                    if($scope.allRatings.amenities){
                       $scope.allRatings.amenities1 = Math.round($scope.allRatings.amenities); 
                    }
                    if($scope.allRatings.security){
                       $scope.allRatings.security1 = Math.round($scope.allRatings.security); 
                    }
                    if($scope.allRatings.openAndGreenAreas){
                       $scope.allRatings.openAndGreenAreas1 = Math.round($scope.allRatings.openAndGreenAreas); 
                    }
                    if($scope.allRatings.electricityAndWaterSupply){
                       $scope.allRatings.electricityAndWaterSupply1 = Math.round($scope.allRatings.electricityAndWaterSupply); 
                    }
                    if($scope.allRatings.convenienceOfHouseMaids){
                       $scope.allRatings.convenienceOfHouseMaids1 = Math.round($scope.allRatings.convenienceOfHouseMaids); 
                    }
                    if($scope.allRatings.convenienceOfParking){
                       $scope.allRatings.convenienceOfParking1 = Math.round($scope.allRatings.convenienceOfParking); 
                    }
                    $scope.dataLoaded = true;
                }, 50);
            })
        })
    })


    $scope.showMoreReviews = function(){
        $scope.viewReviews += 5;
        if($scope.reviews.length > $scope.viewReviews){
            $scope.showReviewBtn = true;
        } else {
            $scope.showReviewBtn = false;
        }
    }

    $scope.starrating = function(rating) {
        rating = Math.round(rating);
        return new Array(rating); //ng-repeat will run as many times as size of array
    }

    $scope.buySelected = true;
    $scope.rentSelected = false;

    $scope.takeToHome = function(){
        $state.go('home');
    }

    $scope.toTrustedHTML = function( html ){
        return $sce.trustAsHtml( html );
    }

})





