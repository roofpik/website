app.controller('writeReviewCtrl', function($scope, $http, $timeout, $mdToast, $mdDialog, $rootScope) {

    $scope.stepsModel = [];
    var newKey = '';

    $scope.selectedFile;
    var basic;
    $scope.showMoreLess = 'Show More +';
    $scope.showMore = false;

    $scope.login = {};
    $scope.$watch('loginStatus', function() {
        $scope.login.status = $rootScope.loginStatus;
        console.log($scope.login.status);
    });

    $scope.showMoreFn = function(){
        $scope.showMore = !$scope.showMore;
        if($scope.showMore){
            $scope.showMoreLess = 'Show Less -';
        } else {
            $scope.showMoreLess = 'Show More +';
        }
    }

    $scope.showAdvanced = function(imageUrl) {
        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'templates/crop-image.html',
                parent: angular.element(document.body),
                // targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
                locals: {
                    imageUrl: imageUrl
                }
            })
            .then(function(answer) {
                $timeout(function() {
                }, 0);
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };

    $scope.getFileDetails = function(event) {
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

    $scope.imageIsLoaded = function(e) {
        $scope.stepsModel = [];
        $scope.$apply(function() {
            $scope.stepsModel.push(e.target.result);
            $timeout(function() {
                $scope.uploadedImage = $scope.stepsModel[0];
                $scope.showAdvanced($scope.uploadedImage);
            }, 0);
        });
    }


    function DialogController($scope, $mdDialog, locals) {
        $scope.locals = locals;
        $('.demo').croppie({
            url: $scope.locals.imageUrl,
        });

        $timeout(function() {
            cropImage($scope.locals.imageUrl);
        }, 0);

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

        function cropImage(source) {
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

        $scope.cropClick = function() {
            basic.croppie('result', {
                type: 'canvas',
                format: 'jpeg',
                square: true
            }).then(function(resp) {
                $timeout(function() {
                    $scope.answer(resp);
                }, 0);

            });
        }
    }

    $scope.createPath = function(review) {
        if ($scope.selectedProjectOrLocality.type == 'Project') {
            newKey = db.ref('reviews/-KPmH9oIem1N1_s4qpCv/residential/' + $scope.selectedProjectOrLocality.id).push().key;
            $scope.path = 'reviews/-KPmH9oIem1N1_s4qpCv/residential/' + $scope.selectedProjectOrLocality.id + '/' + newKey;
        } else if ($scope.selectedProjectOrLocality.type == 'Locality') {
            newKey = db.ref('reviews/-KPmH9oIem1N1_s4qpCv/residential/' + $scope.selectedProjectOrLocality.id).push().key;
            $scope.path = 'reviews/-KPmH9oIem1N1_s4qpCv/residential/' + $scope.selectedProjectOrLocality.id + '/' + newKey;
        }
        if ($scope.selectedFile) {
            $http({
                method: 'POST',
                url: 'http://139.162.3.205/api/createPath',
                params: {
                    path: $scope.path
                }
            }).then(function successCallback(response) {
                if (response.data.SuccessCode == 200) {
                    $scope.path = response.data.path;
                    console.log('Path Created');
                    $scope.upload(review, $scope.path);
                }
            }, function errorCallback(response) {
                sweetAlert("Cannot submit review", "Something went wrong!", "error");
            });
        } else {
            $scope.submitReview('no-image', review);
        }
    }

    $scope.size = '800x600';

    $scope.imageNames = '';

    $scope.size_url = [];
    $scope.upload = function(review, path) {
        $http.post("http://139.162.3.205/api/testupload", { path: JSON.stringify($scope.uploadedImage) })
            .success(function(response) {
                if (response.StatusCode == 200) {
                    $scope.submitReview(response.Message, review);
                }
            })
            .error(function(err) {
                sweetAlert("Cannot submit review", "Something went wrong!", "error");
            })
    }


    $scope.review = {
        ratings: {}
    }
    $scope.selectedItem = '';

    $scope.projectLocality = [];

    $scope.pushToProjectLocality = function(data) {
        $scope.projectLocality = [];
        angular.forEach(data, function(value, key) {
            if (value.type != 'Developer') {
                $scope.projectLocality.push(value);
            }
        })
    }
    if (!checkLocalStorage('search')) {
        db.ref('search').once('value', function(dataSnapshot) {
            console.log(dataSnapshot);
            $timeout(function() {
                $scope.searchObject = dataSnapshot.val();
                setLocalStorage('search', $scope.searchObject, 1);
                console.log($scope.searchObject);
                $scope.pushToProjectLocality($scope.searchObject);
            }, 0);
        })
    } else {
        var data = getLocalStorage('searchObject');
        console.log(data);
        $scope.pushToProjectLocality(data);
    }

    $scope.nameEntered = function() {
        if ($scope.selectedItem) {
            if ($scope.selectedItem.length > 0) {
                $scope.showList = true;
            } else {
                $scope.showList = false;
            }
        }
    }

    $scope.selectProjectLocality = function(val) {
        $scope.selectedItem = val.name;
        $scope.selectedProjectOrLocality = val;
        $scope.showList = false;
    }

    $scope.ratingsObject = {
        iconOnColor: 'rgb(255,87,34)', //Optional
        iconOffColor: 'rgb(140, 140, 140)', //Optional
        rating: 0, //Optional
        minRating: 0, //Optional
        readOnly: false, //Optional
        callback: function(rating, index) { //Mandatory    
            $scope.ratingsCallback(rating, index);
        }
    };


    $scope.ratingsCallback = function(rating, index) {
        // console.log('Selected rating is : ', rating, ' and index is ', index);

        if (index == 1) {
            $scope.review.overallRating = rating;
        } else if (index == 2) {
            $scope.review.ratings.security = rating;
        } else if (index == 3) {
            $scope.review.ratings.amenities = rating;
        } else if (index == 4) {
            $scope.review.ratings.openAndGreenAreas = rating;
        } else if (index == 5) {
            $scope.review.ratings.electricityAndWaterSupply = rating;
        } else if (index == 6) {
            $scope.review.ratings.convenienceOfHouseMaids = rating;
        } else if (index == 7) {
            $scope.review.ratings.convenienceOfParking = rating;
        } else if (index == 8) {
            $scope.review.ratings.infrastructure = rating;
        } else if (index == 9) {
            $scope.review.ratings.layoutOfApartment = rating;
        }
    };

    $scope.submitReview = function(imageUrl, review) {

        var user = firebase.auth().currentUser;
        $scope.review.userName = user.displayName;
        $scope.review.userId = user.uid;
        $scope.review.blocked = false;
        $scope.review.createdDate = new Date().getTime();
        $scope.review.status = 'live';
        if (imageUrl != 'no-image') {
            $scope.review.imageUrl = imageUrl;
        }
        if ($scope.selectedProjectOrLocality.type == 'Project') {
            var updates = {};
            $scope.useReviewData = {
                projectId: $scope.selectedProjectOrLocality.id,
                projectName: $scope.selectedProjectOrLocality.name,
                cityId: '-KPmH9oIem1N1_s4qpCv',
                cityName: 'Gurgaon',
                reviewTitle: $scope.review.reviewTitle,
                status: 'live',
                createdDate: $scope.review.createdDate
            }
            $scope.review.wordCount = ($scope.review.reviewText).length;
            updates['reviews/-KPmH9oIem1N1_s4qpCv/residential/' + $scope.selectedProjectOrLocality.id + '/' + newKey] = $scope.review;
            updates['userReviews/' + user.uid + '/residential/' + newKey] = $scope.useReviewData
            db.ref().update(updates).then(function() {
                console.log('review successfully submitted');
                $timeout(function() {
                    $scope.review = {};
                    $scope.selectedItem = '';
                    $scope.selectedProjectOrLocality = {};
                    swal({
                        title: "Done",
                        text: "Your review was successfully submitted!",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#AEDEF4",
                        confirmButtonText: "OK",
                        closeOnConfirm: false
                    }, function() {
                        window.location.reload(true);
                    });
                }, 50);
            })
        } else if ($scope.selectedProjectOrLocality.type == 'Locality') {
            var updates = {};
            $scope.useReviewData = {
                locationId: $scope.selectedProjectOrLocality.id,
                locationName: $scope.selectedProjectOrLocality.name,
                cityId: '-KPmH9oIem1N1_s4qpCv',
                cityName: 'Gurgaon',
                reviewTitle: $scope.review.reviewTitle,
                status: 'live',
                createdDate: $scope.review.createdDate
            }
            updates['reviews/-KPmH9oIem1N1_s4qpCv/locality/' + $scope.selectedProjectOrLocality.id + '/' + newKey] = $scope.review;
            updates['userReviews/' + user.uid + '/locality/' + newKey] = $scope.useReviewData;
            db.ref().update(updates).then(function() {
                console.log('review successfully submitted');
                $timeout(function() {
                    $scope.review = {};
                    $scope.selectedItem = '';
                    $scope.selectedProjectOrLocality = {};
                    swal({
                        title: "Done",
                        text: "Your review was successfully submitted!",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#AEDEF4",
                        confirmButtonText: "OK",
                        closeOnConfirm: false
                    }, function() {
                        window.location.reload(true);
                    });
                }, 50);
            })
        }
    }

    // $scope.openLogin = function() {
    //     $('#gl-side-menu-btn').click();
    // }

    $scope.uploadImage = function(){
        console.log('called');
        $( "#review-image" ).click();
    }
});
