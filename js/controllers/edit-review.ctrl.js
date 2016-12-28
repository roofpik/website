app.controller('editReviewCtrl', function($scope, $http, $timeout, $mdToast, $stateParams, $mdDialog, UserTokenService, $location){
    var timestamp = new Date().getTime();
    var urlInfo = {
        url: $location.path()
    }
    UserTokenService.checkToken(urlInfo, timestamp, 1);
    
    $scope.dataloaded = false;
    $scope.reviewName = $stateParams.typeName;
    $scope.showMoreLess = 'Show More +';
    $scope.ratingsObject1 = {};
    $scope.ratingsObject2 = {};
    $scope.ratingsObject3 = {};
    $scope.ratingsObject4 = {};
    $scope.ratingsObject5 = {};
    $scope.ratingsObject6 = {};
    $scope.ratingsObject7 = {};
    $scope.ratingsObject8 = {};
    $scope.ratingsObject9 = {};

    $scope.cityId = '-KYJONgh0P98xoyPPYm9';

    $scope.yesNoParam = [
        {
            ques: 'Is the project conveniently located ?',
            id: 'projectConvenientlyLocated'
        },
        {
            ques: 'Do you have easy access to public transport ?',
            id: 'easyAccessToPublicTransport'
        },
        {
            ques: 'Do you have good schools nearby ?',
            id: 'goodSchools'
        },
        {
            ques: 'Do you have markets nearby ?',
            id: 'markets'
        },
        {
            ques: 'Do you have good hospitals nearby ?',
            id: 'goodHospitals'
        }
    ];
    $scope.stepsModel = [];
    var newKey = '';
    $scope.selectedFile;
    var basic;
    $scope.uploadedImage = '';

    $scope.showMoreFn = function(){
        $scope.showMore = !$scope.showMore;
        if($scope.showMore){
            $scope.showMoreLess = 'Show Less -';
        } else {
            $scope.showMoreLess = 'Show More +';
        }
    }
    if($stateParams.reviewIn == 1){
        db.ref('websiteReviews/'+$stateParams.city+'/'+$stateParams.type+'/'+$stateParams.typeId+'/'+$stateParams.id).once('value', function(snapshot){
            $timeout(function(){
                $scope.review = snapshot.val();
                initializeValues();
            },0);
            
        })        
    } else {
        db.ref('reviews/'+$stateParams.city+'/'+$stateParams.type+'/'+$stateParams.typeId+'/'+$stateParams.id).once('value', function(snapshot){
            $timeout(function(){
                $scope.review = snapshot.val();
                initializeValues();
            },0);
        })
    }

    function initializeValues(){
        if($scope.review.imageUrl){
            $scope.uploadedImage = $scope.review.imageUrl;
        }
        $scope.ratingsObject1 = {
            iconOnColor: 'rgb(255,87,34)', //Optional
            iconOffColor: 'rgb(140, 140, 140)', //Optional
            rating: $scope.review.overallRating || 0, //Optional
            minRating: 0, //Optional
            readOnly: false, //Optional
            callback: function(rating, index) { //Mandatory    
                $scope.ratingsCallback1(rating, 1);
            }
        };
        if(!$scope.review.ratings){
            $scope.review.ratings = {};
        }
        $scope.ratingsObject2 = {
            iconOnColor: 'rgb(255,87,34)', //Optional
            iconOffColor: 'rgb(140, 140, 140)', //Optional
            rating: $scope.review.ratings.security || 0, //Optional
            minRating: 0, //Optional
            readOnly: false, //Optional
            callback: function(rating, index) { //Mandatory    
                $scope.ratingsCallback2(rating, 2);
            }
        };
        $scope.ratingsObject3 = {
            iconOnColor: 'rgb(255,87,34)', //Optional
            iconOffColor: 'rgb(140, 140, 140)', //Optional
            rating: $scope.review.ratings.amenities || 0, //Optional
            minRating: 0, //Optional
            readOnly: false, //Optional
            callback: function(rating, index) { //Mandatory    
                $scope.ratingsCallback3(rating, 3);
            }
        };
        $scope.ratingsObject4 = {
            iconOnColor: 'rgb(255,87,34)', //Optional
            iconOffColor: 'rgb(140, 140, 140)', //Optional
            rating: $scope.review.ratings.openAndGreenAreas || 0, //Optional
            minRating: 0, //Optional
            readOnly: false, //Optional
            callback: function(rating, index) { //Mandatory    
                $scope.ratingsCallback4(rating, 4);
            }
        };

        $scope.ratingsObject5 = {
            iconOnColor: 'rgb(255,87,34)', //Optional
            iconOffColor: 'rgb(140, 140, 140)', //Optional
            rating: $scope.review.ratings.electricityAndWaterSupply || 0, //Optional
            minRating: 0, //Optional
            readOnly: false, //Optional
            callback: function(rating, index) { //Mandatory    
                $scope.ratingsCallback5(rating, 5);
            }
        };
        $scope.ratingsObject6 = {
            iconOnColor: 'rgb(255,87,34)', //Optional
            iconOffColor: 'rgb(140, 140, 140)', //Optional
            rating: $scope.review.ratings.convenienceOfHouseMaids || 0, //Optional
            minRating: 0, //Optional
            readOnly: false, //Optional
            callback: function(rating, index) { //Mandatory    
                $scope.ratingsCallback6(rating, 6);
            }
        };
        $scope.ratingsObject7 = {
            iconOnColor: 'rgb(255,87,34)', //Optional
            iconOffColor: 'rgb(140, 140, 140)', //Optional
            rating: $scope.review.ratings.convenienceOfParking || 0, //Optional
            minRating: 0, //Optional
            readOnly: false, //Optional
            callback: function(rating, index) { //Mandatory    
                $scope.ratingsCallback7(rating, 7);
            }
        };
        $scope.ratingsObject8 = {
            iconOnColor: 'rgb(255,87,34)', //Optional
            iconOffColor: 'rgb(140, 140, 140)', //Optional
            rating: $scope.review.ratings.infrastructure || 0, //Optional
            minRating: 0, //Optional
            readOnly: false, //Optional
            callback: function(rating, index) { //Mandatory    
                $scope.ratingsCallback8(rating, 8);
            }
        };
        $scope.ratingsObject9 = {
            iconOnColor: 'rgb(255,87,34)', //Optional
            iconOffColor: 'rgb(140, 140, 140)', //Optional
            rating: $scope.review.ratings.layoutOfApartment || 0, //Optional
            minRating: 0, //Optional
            readOnly: false, //Optional
            callback: function(rating, index) { //Mandatory    
                $scope.ratingsCallback9(rating, 9);
            }
        };
        $scope.dataloaded = true;
    }

    $scope.ratingsCallback1 = function(rating, index) {
        $scope.review.overallRating = rating;

    };
    $scope.ratingsCallback2 = function(rating, index) {
        $scope.review.ratings.security = rating;
    };
    $scope.ratingsCallback3 = function(rating, index) {
        $scope.review.ratings.amenities = rating;
    };

    $scope.ratingsCallback4 = function(rating, index) {
        $scope.review.ratings.openAndGreenAreas = rating;
    };

    $scope.ratingsCallback5 = function(rating, index) {
        $scope.review.ratings.electricityAndWaterSupply= rating;
    };

    $scope.ratingsCallback6 = function(rating, index) {
        $scope.review.ratings.convenienceOfHouseMaids= rating;
    };

    $scope.ratingsCallback7 = function(rating, index) {
        $scope.review.ratings.convenienceOfParking= rating;
    };

    $scope.ratingsCallback8 = function(rating, index) {
        $scope.review.ratings.infrastructure= rating;
    };

    $scope.ratingsCallback9 = function(rating, index) {
        $scope.review.ratings.layoutOfApartment= rating;
    };

    $scope.showAdvanced = function(imageUrl) {
        $mdDialog.show({
            controller: cropImageCtrl,
            templateUrl: 'templates/crop-image.html',
            parent: angular.element(document.body),
            // targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
            locals:{
                imageUrl: imageUrl
            }
        })
        .then(function(answer) {
            $timeout(function(){
                $scope.uploadedImage = answer;
                // alert(JSON.stringify($scope.uploadedImage));
            },0);
            $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
            $scope.status = 'You cancelled the dialog.';
        });
    };


    $scope.getFileDetails = function(event){
        $scope.selectedFile;
        $scope.uploadedImage = '';
         var files = event.target.files; //FileList object
         $scope.selectedFile = files[0];
         for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var reader = new FileReader();
            reader.onload = $scope.imageIsLoaded; 
            reader.readAsDataURL(file);
         }
    }

    $scope.imageIsLoaded = function(e){
        $scope.stepsModel = [];
        $scope.$apply(function() {
            $scope.stepsModel.push(e.target.result);
            $timeout(function(){
                $scope.uploadedImage = $scope.stepsModel[0];
                $scope.showAdvanced($scope.uploadedImage);
            },0);
        });
    }

    function cropImageCtrl($scope, $mdDialog, locals) {
        $scope.locals = locals;
        $('.demo').croppie({
            url: $scope.locals.imageUrl,
        });

        $timeout(function(){
            cropImage($scope.locals.imageUrl);
        },0);

        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };

        var basic;

        function cropImage(source){
             basic = $('.demo').croppie({
                viewport: {
                width: 250,
                height: 250,
                type: 'square'
                }
            });
            basic.croppie('bind', {
                url: source
            });
        }

        $scope.cropClick = function(){
            basic.croppie('result', {
                type: 'canvas',
                format: 'jpeg',
                square: true
            }).then(function (resp) {
                $timeout(function(){
                    $scope.answer(resp);
                    // $scope.uploadedImage = resp;
                },0);
                
            });
        }
    }
    

    $scope.createPath = function(review){

        $scope.path = 'reviews/'+$scope.cityId+'/'+$stateParams.type+'/'+$stateParams.typeId+'/'+$stateParams.id;
        // $scope.path = ''
        if($scope.selectedFile){
            $http({
                method:'POST',
                url:'http://139.162.3.205/api/createPath',
                params: {
                    path: $scope.path
                }
            }).then(function successCallback(response){
                if(response.data.SuccessCode == 200){
                    $scope.path = response.data.path;
                    $scope.upload(review, $scope.path);
                }
            }, function errorCallback(response){
                sweetAlert("Cannot submit review", "Something went wrong!", "error");
            });
        } else {
            $scope.submitReview('no-image', review);
        }
    }

    $scope.size= '800x600';

    $scope.imageNames = '';

    $scope.size_url = [];
    $scope.upload = function(review, path){
        $http.post("http://139.162.3.205/api/testupload", {path: JSON.stringify($scope.uploadedImage)})
        .success(function(response){
            if(response.StatusCode == 200){
                $scope.submitReview(response.Message, review);
            }
        })
        .error(function(err){
            sweetAlert("Cannot submit review", "Something went wrong!", "error");
        })
    }

    $scope.submitReview = function(imageUrl, review){
        if(imageUrl != 'no-image'){
            review.imageUrl = imageUrl;
        }
        review.createdDate = new Date().getTime();
        review.status = 'uploaded';
        var updates = {};
        updates['websiteReviews/'+$scope.cityId+'/'+$stateParams.type+'/'+$stateParams.typeId+'/'+$stateParams.id] = review;
        updates['userReviews/'+review.userId+'/'+$stateParams.type+'/'+$stateParams.id+'/createdDate'] = review.createdDate;
        updates['userReviews/'+review.userId+'/'+$stateParams.type+'/'+$stateParams.id+'/reviewTitle'] = review.reviewTitle;
        updates['userReviews/'+review.userId+'/'+$stateParams.type+'/'+$stateParams.id+'/status'] = 'uploaded';
        db.ref().update(updates).then(function(){
            swal({
                title: "Done",
                text: "Your review was successfully submitted!",
                type: "success",
                showCancelButton: false,
                confirmButtonColor: "#AEDEF4",
                confirmButtonText: "OK",
                closeOnConfirm: false }, function(){   
                    window.location.reload(true);
                });
        });
    }

    loading(false);

})