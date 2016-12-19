app.controller('profileCtrl', function($scope, $timeout, $state, $mdDialog, $http, UserTokenService, $location){
    var timestamp = new Date().getTime();
    var urlInfo = {
        url: $location.path()
    }
    UserTokenService.checkToken(urlInfo, timestamp, 1);
    
    var uid = '8XGzXWp7l8RzbiCCfFv5GEzx6Mw2';
    $scope.cities = [];
    $scope.dataloaded = false;
    $scope.fileName = 'No Image Selected';
    $scope.uploadedImage = 'http://www.e-codices.unifr.ch/documents/media/Collections/img-not-available_en.jpg';
    $scope.allGenders = ['Gender', 'Male', 'Female', 'Other'];
    $scope.allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $scope.allDates = [];
    $scope.allYears = [];

    var currentYear = new Date().getFullYear();

    $('.profile-page').hide();

    db.ref('city').once('value', function(snapshot){
        $timeout(function(){
            $scope.cities.push('Select City');
            $scope.city = 'Select City';
            angular.forEach(snapshot.val(), function(value, key){
                $scope.cities.push(value.cityName);
            })
        },0);
    })

    db.ref('users/'+uid).once('value', function(snapshot){
        console.log(snapshot.val());
        $timeout(function(){
            $scope.user = snapshot.val();
            if(!$scope.user.gender){
                $scope.user.gender = 'Gender';
            }
            if(!$scope.user.birthDay){
                $scope.user.birthDay = {};
                $scope.user.birthDay.date = '1';
                $scope.user.birthDay.month = 'December';
                $scope.user.birthDay.year = '1999';
            }
            if($scope.user.mobile.mobileProvided == false){
                $scope.showAddMobile = true;
            }
            if($scope.user.profileImage){
                $scope.uploadedImage = $scope.user.profileImage;
            }
            if($scope.user.address){
                $scope.city = $scope.user.address.cityName;
            }
        }, 0);
    }).then(function(){
        $scope.dataloaded = true;
        $('.profile-page').fadeIn();
    })

    for(var i = 1; i <=31; i++){
        $scope.allDates.push(i);
    }

    for(var i = 0; i < 100; i++){
        $scope.allYears.push(currentYear-100);
        currentYear++;
    }

    $scope.addMobile = function(){
        console.log('add mobile called');
        $scope.addMobileClicked = true;
    }

    $scope.addMobileNumber = function(mob){
        swal({
          title: "Sending OTP",
          text: "Please wait...",
          imageUrl: "https://d1ow200m9i3wyh.cloudfront.net/img/assets/common/images/loader.gif",
          showConfirmButton: false
        });
        var verificationCode = Math.floor(1000 + Math.random() * 9000);
        console.log(verificationCode);

        $http({
            url: 'http://139.162.27.64/api/resend-otp',
            method: 'POST',
            params: {
                otp: verificationCode,
                mobile: mob
            }
        }).success(function(response){
            console.log(response);
            if(response.status == 200){
                swal({
                    title: "OTP Sent",
                    text: "Enter OTP to verify your mobile number",
                    type: "input",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    inputPlaceholder: "Enter OTP"
                },
                function(inputValue){
                    console.log(inputValue.length);
                    if (inputValue === false){
                        console.log('cancel');
                        $timeout(function(){
                           $scope.addMobileClicked = false; 
                        }, 10);
                        return false;
                    }
                    if (inputValue.length == '') {
                        swal.showInputError("Code not entered!");
                        return false;
                    }
                    else if(inputValue.length == 4 && inputValue == verificationCode){
                        mobileVerified(mob);
                    } else {
                        swal.showInputError("Incorrect Code");
                        return false;
                    }
                });
            }
        }).error(function(err){
            console.log(err);
            sweetAlert("Error", "Error sending code, please try again later", "error");
            $timeout(function(){
               $scope.addMobileClicked = false; 
           }, 10);
        })
    }

    function mobileVerified(mob){
        swal({
          title: "Mobile Verified",
          text: "Updating mobile number",
          imageUrl: "https://d1ow200m9i3wyh.cloudfront.net/img/assets/common/images/loader.gif",
          showConfirmButton: false
        });
        var updates = {};
        db.ref('userRegistration/mobile/'+$scope.user.mobile.mobileNum).remove();
        updates['users/'+uid+'/mobile/mobileNum'] = mob;
        updates['users/'+uid+'/mobile/mobileProvided'] = true;
        updates['users/'+uid+'/mobile/mobileVerified'] = true;
        updates['userRegistration/mobile/'+mob] = $scope.user.uid;
        console.log(updates);
        db.ref().update(updates).then(function(){
            $timeout(function(){
                $scope.user.mobile.mobileNum = mob;
                $scope.user.mobile.mobileProvided = true;
                updates = {};
                sweetAlert("Successful", "Mobile Number Successfully Added", "success");
            }, 0);
            // window.location.reload(true);
        })
        $scope.addMobileClicked = false;
    }

    $scope.submit = function(){
        swal({
          title: "Saving",
          imageUrl: "https://d1ow200m9i3wyh.cloudfront.net/img/assets/common/images/loader.gif",
          showConfirmButton: false
        });
        // swal({ title: "Saving...", text: "Please wait.", showConfirmButton: false });
        console.log($scope.user);
        if($scope.city){
            if($scope.city == 'Gurgaon'){
                $scope.user.address ={};
                $scope.user.address = {
                    cityName: 'Gurgaon',
                    cityId: '-KYJONgh0P98xoyPPYm9'
                }
            }
        }
        var updates = {};
        updates['users/'+uid] = $scope.user;
        db.ref().update(updates).then(function(){
            swal({
                title: "Saved",
                text: "Your information was successfully saved!",
                type: "success",
                showCancelButton: false,
                confirmButtonColor: "#AEDEF4",
                confirmButtonText: "OK",
                closeOnConfirm: false
            }, function() {
                window.location.reload(true);
            });
        })
    }

    $scope.showUserReviews = function(){
        $state.go('user-all-reviews');
    }

    $scope.createPath = function(imgUrl) {
        swal({
          title: "Uploading",
          imageUrl: "https://d1ow200m9i3wyh.cloudfront.net/img/assets/common/images/loader.gif",
          showConfirmButton: false
        });
        $scope.path = 'users/'+uid+'/profileImage';

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
                $scope.upload($scope.path, imgUrl);
            }
        }, function errorCallback(response) {
            sweetAlert("Error", "Profile image cannot be uploaded!", "error");
        });
    }

    $scope.size = '200x200';

    $scope.upload = function(path, imgUrl) {
        $http.post("http://139.162.3.205/api/testupload", { path: JSON.stringify(imgUrl) })
            .success(function(response) {
                if (response.StatusCode == 200) {
                    db.ref('users/'+uid+'/profileImage').set(response.Message).then(function(){
                        sweetAlert("Success", "Profile image successfully uploaded!", "success");
                    })
                }
            })
            .error(function(err) {
                sweetAlert("Error", "Profile image cannot be uploaded!", "error");
            })
    }

    function DialogController($scope, $mdDialog, locals) {
        $scope.locals = locals;
        // console.log($scope.locals);
        $('.demo').croppie({
            url: $scope.locals.imageUrl,
        });

        // console.log($('.demo').html());
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
                    width: 200,
                    height: 200,
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
                    $scope.uploadedImage = answer;
                    $scope.createPath(answer);
                }, 0);
            }, function() {
                console.log('Dialog cancelled');
            });
    };

    $scope.getFileDetails = function(event) {
        $scope.selectedFile;
        $scope.uploadedImage = '';

        var files = event.target.files; //FileList object
        $scope.selectedFile = files[0];
        $scope.fileName = files[0].name;
        console.log(files[0]);
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
                console.log($scope.uploadedImage);
                // $scope.createPath($scope.uploadedImage);
                $scope.showAdvanced($scope.uploadedImage);
            }, 0);
        });
    }

    $scope.uploadImage = function(){
        console.log('called');
        $( "#profile-image-test" ).click();
    }
});