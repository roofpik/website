app.directive('imageUpload', function() {
    return {
        restrict: 'AE', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        scope: {
            maxHeight: '@maxHeight',
            maxWidth: '@maxWidth',
            cropping: '@cropping',
            viewPortWidth: '@viewPortWidth',
            viewPortHeight: '@viewPortHeight',
            boundryWidth: '@boundryWidth',
            boundryHeight: '@boundryHeight',
            imageType: '@imageType',
            minHeight: '@minHeight',
            minWidth: '@minWidth',
            uploadPath: '@uploadPath',
            imageName: '@imageName',
            imageType: '@imageType',
            imageUploadResponse: "="
        },
        templateUrl: 'js/directives/upload/imageUpload.html',
        controller: 'imageUploadCtrl'
    }
});
app.controller('imageUploadCtrl', function($scope, $timeout, uploadImage, $q, $http) {
    var can = document.getElementById('img-canvas');
    var ctx = can.getContext('2d');
    var img = new Image();
    var origImg = new Image();
    var origImg64, croppyImg;
    var allScopeVar = [
        ['maxHeight', 400],
        ['maxWidth', 400],
        ['cropping', true],
        ['viewPortWidth', 400],
        ['viewPortHeight', 400],
        ['boundryWidth', 600],
        ['boundryHeight', 600],
        ['imageType', 'general'],
        ['imageName', null],
        ['uploadPath', 'imageUpload']
    ];
    for (var i = 0, len = allScopeVar.length; i < len; i++) {
        initializeScopeVar(allScopeVar[i][0], allScopeVar[i][1]);
    }

    $timeout(function() {

        $("#crop-dialog").dialog({
            autoOpen: false,
            minHeight: ($scope.boundryHeight * 1.2),
            minWidth: ($scope.boundryWidth * 1.2),
            modal: true,
            close: clearFile

        });
        $("#upload-dialog").dialog({
            autoOpen: false,
            modal: true,
            close: clearFile,
        });
    }, 50);


    document.getElementById("img-file").addEventListener("change", readFile, false);

    function readFile() {

        if (this.files && this.files[0]) {
            var FR = new FileReader();
            FR.onload = function(e) {
                origImg64 = e.target.result;
                origImg.src = e.target.result;
                var checkSize = checkImageSize();
                if (checkSize) {
                    if ($scope.cropping == 'true') {
                        cropBind();
                    } else {
                        img.src = e.target.result;
                    }
                } else {
                    clearFile();
                    swal({
                        title: "Image too small!!",
                        text: "Please upload image bigger than size (height x width): " + $scope.minHeight + "px X " + $scope.minWidth + "px",
                        type: "error",
                        confirmButtonText: "Close"
                    });
                }
            };
            FR.readAsDataURL(this.files[0]);

        }
    }



    function checkImageSize() {
        if (origImg.height > $scope.minHeight && origImg.width > $scope.minWidth) {
            return true
        } else {
            return false
        }
    }

    function cropBind() {

        var el = document.getElementById('crop-cont');
        el.innerHTML = "";
        croppyImg = new Croppie(el, {
            viewport: { width: $scope.viewPortWidth, height: $scope.viewPortHeight },
            boundary: { width: $scope.boundryWidth, height: $scope.boundryHeight },
            showZoomer: true
        });
        croppyImg.bind({
            url: origImg64
        });
        $(function() {
            $("#crop-dialog").dialog("open");
        });
    }

     $('#cancelCrop').on('click', function() {
        clearFile();
        $("#crop-dialog").dialog("close");

    });

    $('#cancelUpload').on('click', function() {
        clearFile();
        $("#upload-dialog").dialog("close");
    });

    function clearFile() {
        $("#img-file").val('');
        $('#file-name').text('Choose a file');
    }

    $('#cropImage').on('click', function() {
        croppyImg.result({
            type: 'canvas',
            format: 'jpeg',
            size: 'orignal'
        }).then(function(resp) {
            img.src = resp;
        });
    });

    img.onload = function() {
        // lets resize it to 1/4 original size
        var wratio = img.width / $scope.maxWidth;
        var hratio = img.height / $scope.maxHeight;
        var ratio;
        if (wratio > 1 || hratio > 1) {
            if (wratio > hratio) {
                can.width = $scope.maxWidth;
                can.height = img.height / wratio;
                ratio = 1 / wratio;
            } else {
                can.height = $scope.maxHeight;
                can.width = img.width / hratio;
                ratio = 1 / hratio;
            }
        } else {
            can.width = img.width;
            can.height = img.height;
        }

        ctx.scale(ratio, ratio);
        ctx.drawImage(img, 0, 0);
        $("#crop-dialog").dialog("close");
        $("#upload-dialog").dialog({
            minHeight: 600,
            minWidth: 650
        });
        $("#upload-dialog").dialog("open");

    }

    $('#uploadImage').on('click', function() {
        loading(true);
        q = $q.defer();
        var upload = uploadImage.upload($scope.uploadPath, can.toDataURL(), $scope.imageType, $scope.imageName, q);
        upload.then(function(response) {
            clearFile();
            loading(false);
            $scope.imageUploadResponse(response.imgUrl);
        }, function(error) {
            clearFile();
            loading(false);
        });
    });

    function initializeScopeVar(scopeVar, defaultVal) {
        if (!$scope[scopeVar]) {
            $scope[scopeVar] = defaultVal;
        }
    }


    'use strict';
    (function(document, window, index) {
        var inputs = document.querySelectorAll('.inputfile');
        Array.prototype.forEach.call(inputs, function(input) {
            var label = input.nextElementSibling,
                labelVal = label.innerHTML;

            input.addEventListener('change', function(e) {
                var fileName = '';
                if (this.files && this.files.length > 1)
                    fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
                else
                    fileName = e.target.value.split('\\').pop();

                if (fileName)
                    label.querySelector('span').innerHTML = fileName;
                else
                    label.innerHTML = labelVal;
            });

            // Firefox bug fix
            input.addEventListener('focus', function() { input.classList.add('has-focus'); });
            input.addEventListener('blur', function() { input.classList.remove('has-focus'); });
        });
    }(document, window, 0));


});


app.service('uploadImage', function($http) {

    return {
        upload: function(path, image, imgType, imgName, q) {
            console.log(imgName);
            $http({
                    url: 'http://139.162.9.71/api/uploadImage',
                    method: "POST",
                    data: {
                        'path': path,
                        'img': image,
                        'imgType': imgType,
                        'imgName': imgName
                    }
                })
                .then(function(response) {
                        // success
                        console.log(response);
                        if (response.data.status == 200) {
                            q.resolve({
                                imgUrl: response.data.imageName
                            });
                        } else {
                            // sweetAlert("Error", "Profile image cannot be uploaded!", "error");
                            q.reject({
                                imgUrl: 'NA'
                            });
                        }
                    },
                    function(response) { // optional
                        // failed
                        console.log(response);
                        q.reject({
                            imgUrl: 'NA'
                        });


                    });

            return q.promise;
        }

    }
});
