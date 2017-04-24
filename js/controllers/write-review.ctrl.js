app.controller('writeReviewCtrl', function($scope, $timeout, $stateParams, $rootScope, $http, $location, $state) {
    var user;
    var cityId = '-KYJONgh0P98xoyPPYm9';
    var countryId = '-K_43TEI8cBodNbwlKqJ';
    // ga('send', 'write');


    function initialize() {
        $scope.data = {};
        $scope.data.textlength = 0;
        $scope.data.text = '';
        $scope.data.textcount = false;
        $scope.review = {};
        $scope.review.main = {};
        $scope.review.closeby = {};
        $scope.review.extra = {};
        $scope.review.mainrating = {};
        $scope.review.other = {};
        $scope.review.project = {};
        $scope.review.user = {};
        user = {}
        $scope.validate = false;
        $scope.data.textcount = true;
    }


    initialize();


    if ($location.search().key) {
        allReviews();
        $scope.review.project.key = $location.search().key;
        $scope.review.project.type = 'residential'
    }
    if ($location.search().name) {
        $scope.review.project.name = $location.search().name;
        $scope.projectsData = false;
        $scope.searchtxt = $location.search().name;
        $timeout(function() {
            Materialize.updateTextFields();
        }, 500);

    }
    if ($location.search().tyep) {
        $scope.review.project.type = $location.search().type;
    }
    $scope.allReviews = {};

    function allReviews() {
        $http({
            url: 'http://139.162.9.71/api/v1/reviewSearch',
            method: 'GET',
            params: { pkey: $scope.review.project.key }
        }).then(function mySucces(response) {
            for (i in response.data.items) {
                if (parseInt(i) < 3) {
                    $scope.allReviews[i] = response.data.items[i];
                }
            }
        });
    }



    var user;

    firebase.auth().onAuthStateChanged(function(data) {
        if (data) {
            // data is signed in.
            user = data;
            console.log(user);

            if ($scope.review.project.key) {
                allReviews();
                getExistingReview();
            }


        } else {
            // No user is signed in.
            $scope.review.user = {};
            $timeout(function() {
                $('#login_signup_popup').modal({
                    dismissible: false
                });

                $('#login_signup_popup').modal('open');
                $('.modal-close').hide()
            }, 2000)

        }
    });


    function getProjects() {
        $scope.review.project = {};
        $http({
            url: 'http://139.162.9.71/api/v1/projLocSearch',
            method: 'GET',
            params: { val: $scope.searchtxt }
        }).then(function(response) {
            $scope.projectsData = true;
            $scope.allData = response.data.items.data;
        })

    }


    function getExistingReview() {
        link = 'allreviews/data/country/-K_43TEI8cBodNbwlKqJ/city/-KYJONgh0P98xoyPPYm9/' + $scope.review.project.type + '/' + $scope.review.project.key + '/' + user.uid;
        db.ref(link).on('value', function(snapshot) {
            if (snapshot.val()) {
                $scope.review = snapshot.val();
                $timeout(function() {
                    Materialize.updateTextFields();
                }, 500)
            }
        })
    }

    $scope.searchData = function() {
        // console.log($scope.searchtxt)
        getProjects();
    }

    $scope.selectedProj = function(item) {
        $scope.projectsData = false;
        $scope.searchtxt = item.name;
        $scope.review.project.key = item.key;
        $scope.review.project.name = item.name;
        $scope.review.project.type = item.category;
        allReviews();
        getExistingReview();
        Materialize.updateTextFields();


    }

    $scope.data.textcount = true;
    $scope.reviewText = function() {
        if ($scope.review.main.detail) {
            $scope.data.textlength = $scope.review.main.detail.length;

            if ($scope.data.textlength >= 100) {
                $scope.data.textcount = true;

                $("#textarea1").removeClass("validate")
                $("#textcount").removeClass("validate")
            } else {
                $scope.data.textcount = false;
                $("#textarea1").addClass("validate")
                $("#textcount").addClass("validate")
            }
        } else {
            $scope.data.textcount = false;
            $scope.data.textlength = 0;
        }
    }

    cityId = '-KYJONgh0P98xoyPPYm9';
    countryId = '-K_43TEI8cBodNbwlKqJ';

    ratingTxtVal = ['Click to rate', 'Terrible', 'Poor', 'Average', 'Good', 'Excellent']
    $scope.ratingParams = [{
        name: 'Security',
        id: 2,
        rtxt: ratingTxtVal[0],
        val: 'security'
    }, {
        name: 'Amenities',
        id: 3,
        rtxt: ratingTxtVal[0],
        val: 'amenities'
    }, {
        name: 'Open and green areas',
        id: 4,
        rtxt: ratingTxtVal[0],
        val: 'greenry'
    }, {
        name: 'Convenience of parking',
        id: 5,
        rtxt: ratingTxtVal[0],
        val: 'parking'
    }, {
        name: 'Infrastructure',
        id: 6,
        rtxt: ratingTxtVal[0],
        val: 'infrastructure'
    }];



    $scope.ratingTxt = {
        overall: ratingTxtVal[0],
        security: ratingTxtVal[0],
        amenities: ratingTxtVal[0],
        green: ratingTxtVal[0],
        parking: ratingTxtVal[0],
        infrastructure: ratingTxtVal[0]
    }
    $scope.ratingsObject = {
        iconOnColor: 'rgb(43, 187, 173)', //Optional
        iconOffColor: 'rgb(140, 140, 140)', //Optional
        rating: 0, //Optional
        minRating: 0, //Optional
        readOnly: false, //Optional
        callback: function(rating, index) { //Mandatory    
            $scope.ratingsCallback(rating, index);
        }
    };
    $scope.ratingsCallback = function(rating, index) {
        if (index == 1) {
            $scope.review.main.rating = rating;
            $scope.ratingTxt.overall = ratingTxtVal[rating];
        } else if (index == 2) {
            $scope.review.mainrating.security = rating;
            $scope.ratingParams[index - 2].rtxt = ratingTxtVal[rating];
        } else if (index == 3) {
            $scope.review.mainrating.amenities = rating;
            $scope.ratingParams[index - 2].rtxt = ratingTxtVal[rating];
        } else if (index == 4) {
            $scope.review.mainrating.greenry = rating;
            $scope.ratingParams[index - 2].rtxt = ratingTxtVal[rating];
        } else if (index == 5) {
            $scope.review.mainrating.parking = rating;
            $scope.ratingParams[index - 2].rtxt = ratingTxtVal[rating];
        } else if (index == 6) {
            $scope.review.mainrating.infrastructure = rating;
            $scope.ratingParams[index - 2].rtxt = ratingTxtVal[rating];
        }
    };


    $scope.submitReview = function() {

        checkcloseby();
        checkmainrating();
        checkextra();
        checkmain();

        validate = checkmandatory();

        if (validate) {
            $scope.review.user.uname = user.displayName;
            $scope.review.user.uid = user.uid;
            $scope.review.user.photoURL = user.photoURL;

            var updates = {};
            url = 'allreviews/data/country/' + countryId + '/city/' + cityId + '/' + $scope.review.project.type + '/' + $scope.review.project.key
            updates[url + '/' + user.uid] = $scope.review;
            updates['allreviews/users/' + user.uid + '/' + $scope.review.project.key] = $scope.review.project;
            db.ref().update(updates).then(function() {
                $timeout(function() {

                    swal({
                            title: "Review Submitted",
                            text: "Your review has been successfully submitted!",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Avail Offers",
                            closeOnConfirm: true
                        },
                        function() {
                            $timeout(function() {
                                $state.go('offers');
                            }, 1000);

                        });


                }, 0);


            });


            $http({
                url: 'http://139.162.9.71/api/v1/emailReview',
                method: 'POST',
                params: { email: user.email, name: user.displayName }
            }).then(function mySucces(response) {

            });

            db.ref('users/' + user.uid + '/mobile/number/').once('value', function(snapshot) {
                $timeout(function() {

                    $http({
                        url: 'http://139.162.9.71/api/v1/writeReviewSms',
                        method: 'POST',
                        params: { mobile: snapshot.val(), name: user.displayName }
                    }).then(function mySucces(response) {
                        $state.go('offers');
                    });

                }, 500)

            });


        } else {
            console.log('error');
        }

    }

    function checkcloseby() {
        var d = ['hospital', 'market', 'school'];
        for (i in d) {
            if (!$scope.review.closeby[d[i]]) {
                $scope.review.closeby[d[i]] = false;
            }
        }
    }

    function checkmainrating() {
        var d = ['amenities', 'greenry', 'infrastructure', 'parking', 'security'];
        for (i in d) {
            if (!$scope.review.mainrating[d[i]]) {
                $scope.review.mainrating[d[i]] = false;
            }
        }
    }

    function checkextra() {
        var d = ['electricity', 'layout', 'location', 'transport', 'water'];
        for (i in d) {
            if (!$scope.review.extra[d[i]]) {
                $scope.review.extra[d[i]] = false;
            }
        }
    }

    function checkmain() {
        $scope.review.main.anonymous = false;
        $scope.review.main.block = false;
        if (!$scope.review.main.created) {
            $scope.review.main.created = new Date().getTime();
            $scope.review.main.updated = $scope.review.main.created;
        } else {
            $scope.review.main.updated = new Date().getTime();
        }
        $scope.review.main.source = 'website';
        $scope.review.main.status = 'uploaded';
        $scope.review.main.mode = 'desktop';
        $scope.review.main.key = user.uid;
    }

    function checkmandatory() {
        $scope.validate = true;
        result = true;

        if ($scope.review.user.type == null || $scope.review.user.age == null ||
            $scope.review.user.gender == null || $scope.review.user.livedwith == null ||
            $scope.review.user.house == null || $scope.review.user.block == null ||
            $scope.review.main.rating == null || $scope.review.main.title == null ||
            $scope.review.main.detail == null
        ) {


            result = false;
            $('html, body').animate({ scrollTop: 0 }, 'fast');

        };


        if ($scope.review.user.age == '' ||
            $scope.review.user.house == '' || $scope.review.user.block == '' ||
            $scope.review.main.title == '' ||
            $scope.review.main.detail == ''
        ) {
            result = false;
            $('html, body').animate({ scrollTop: 0 }, 'fast');
        };

        if (result) {
            if ($scope.review.main.detail == null) {
                result = false;
                swal({
                    title: "Required data Missing",
                    text: "Minimum 100 charactes required in review text",
                    type: "error"
                });

            } else if ($scope.review.main.detail.length < 100) {
                result = false;
                $('html, body').animate({ scrollTop: 0 }, 'fast');
                swal({
                    title: "Required data Missing",
                    text: "Minimum 100 charactes required in review text",
                    type: "error"
                });

            } else if ($scope.review.project.key == null) {
                result = false;
                $('html, body').animate({ scrollTop: 0 }, 'fast');
            } else if (user.uid == null) {
                result = false;
                $('html, body').animate({ scrollTop: 0 }, 'fast');
            }
        }
        return result
    }


    $('select').material_select();

});


app.filter('iif', function() {
    return function(input, trueValue, falseValue) {
        return input ? trueValue : falseValue;
    };
});
