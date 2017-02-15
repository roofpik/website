app.controller('listingCtrl', ['$scope', '$timeout', function($scope, $timeout) {

    // console.log("called");
    $scope.cityId = '-KYJONgh0P98xoyPPYm9'
    $scope.details = {
        amenities: {}
    }
    $scope.reviews = {
        locality: {},
        location: {},
        projects: {
            commercial: {},
            cghs: {},
            pg: {},
            residential: {},
            coWorking: {}
        }
    }

    getParams();




    function getParams() {
        $scope.Id = '-KYMt4pSYjIUsknqZ6Qr';
        $scope.type = 'project';
        $scope.vertical = 'residential';
        fetchDetails();
    }

    function fetchDetails() {
        if ($scope.type == 'locality') {
            db.ref('locality/' + $scope.cityId).once('value', function(snapshot) {
                $timeout(function() {
                    if (key == $scope.Id) {
                        for (key in snapshot.val()) {
                            $scope.details.localityId = snapshot.val()[key].localityId;
                            $scope.details.localityName = snapshot.val()[key].localityName;
                            if (snapshot.val()[key].amenities) {
                                $scope.details.amenities.general = snapshot.val()[key].amenities;
                            }
                            if (snapshot.val()[key].images) {
                                $scope.details.images = snapshot.val()[key].images;
                            }
                        }
                    }
                }, 0)
                bindData();
            });
        }

        if ($scope.type == 'location') {
            db.ref('locations/' + $scope.cityId).once('value', function(snapshot) {
                $timeout(function() {
                    if (key == $scope.Id) {
                        for (key in snapshot.val()) {
                            $scope.details.locationId = snapshot.val()[key].locationId;
                            $scope.details.locationName = snapshot.val()[key].locationName;
                            if (snapshot.val()[key].amenities) {
                                $scope.details.amenities.general = snapshot.val()[key].amenities;
                            }
                            if (snapshot.val()[key].images) {
                                $scope.details.images = snapshot.val()[key].images;
                            }
                        }
                    }
                    bindData();
                }, 0)
            });
        }
        if ($scope.vertical == 'commercial') {
            db.ref('projects/' + $scope.cityId + '/commercial').once('value', function(snapshot) {
                $timeout(function() {
                    for (key in snapshot.val()) {
                        if (key == $scope.Id) {
                            $scope.details.projects.projectId = snapshot.val()[key].projectId;
                            $scope.details.projects.projectName = snapshot.val()[key].projectName;

                            if (snapshot.val()[key].facilities) {
                                $scope.details.amenities.general = snapshot.val()[key].facilities;
                            }
                            if (snapshot.val()[key].images) {
                                $scope.details.images = snapshot.val()[key].images;
                            }
                        }
                    }
                    bindData();
                }, 0)
            });
        }
        if ($scope.vertical == 'coWorking') {
            db.ref('projects/' + $scope.cityId + '/coWorking').once('value', function(snapshot) {
                $timeout(function() {
                    for (key in snapshot.val()) {
                        if (key == $scope.Id) {
                            $scope.details.projects.projectId = snapshot.val()[key].projectId;
                            $scope.details.projects.projectName = snapshot.val()[key].projectName;

                            if (snapshot.val()[key].facilities) {
                                $scope.details.amenities.general = snapshot.val()[key].facilities;
                            }
                            if (snapshot.val()[key].images) {
                                $scope.details.images = snapshot.val()[key].images;
                            }
                        }
                    }
                    bindData();
                }, 0)
            });
        }
        if ($scope.vertical == 'pg') {
            db.ref('projects/' + $scope.cityId + '/pg').once('value', function(snapshot) {
                $timeout(function() {
                    for (key in snapshot.val()) {
                        if (key == $scope.Id) {
                            $scope.details.projectId = snapshot.val()[key].projectId;
                            $scope.details.projectName = snapshot.val()[key].projectName;

                            if (snapshot.val()[key].commonFacilities) {
                                $scope.details.amenities.general = snapshot.val()[key].commonFacilities;
                            }
                            if (snapshot.val()[key].images) {
                                $scope.details.images = snapshot.val()[key].images;
                            }
                        }
                    }
                    bindData();
                }, 0)
            });
        }
        if ($scope.vertical == 'residential') {
            db.ref('projects/' + $scope.cityId + '/residential').once('value', function(snapshot) {
                $timeout(function() {
                    if (key == $scope.Id) {
                        for (key in snapshot.val()) {

                            $scope.details.projectId = snapshot.val()[key].projectId;
                            $scope.details.projectName = snapshot.val()[key].projectName;

                            if (snapshot.val()[key].amenities) {
                                $scope.details.amenities = snapshot.val()[key].amenities;
                            }
                            if (snapshot.val()[key].images) {
                                $scope.details.images = snapshot.val()[key].images;
                            }
                        }
                    }
                    bindData();
                }, 0)
            });
        }
    }

    // function fetchReviews() {
    //     if ($scope.type == 'location') {
    //         db.ref('reviews/' + $scope.cityId + '/location').once('value', function(snapshot) {
    //             $timeout(function() {
    //                 for (key in snapshot.val()) {
    //                     if (key == $scope.Id) {
    //                         if (snapshot.val()[key]) {
    //                             $scope.reviews.location[key] = snapshot.val()[key]
    //                         }
    //                     }
    //                 }

    //             }, 0)
    //         });
    //     }
    //     if ($scope.type == 'locality') {
    //         db.ref('reviews/' + $scope.cityId + '/locality').once('value', function(snapshot) {
    //             $timeout(function() {
    //                 for (key in snapshot.val()) {
    //                     if (key == $scope.Id) {
    //                         if (snapshot.val()[key]) {
    //                             $scope.reviews.locality[key] = snapshot.val()[key]
    //                         }
    //                     }
    //                 }
    //             }, 0)
    //         });
    //     }

    //     if ($scope.vertical == 'cghs') {
    //         db.ref('reviews/' + $scope.cityId + '/cghs').once('value', function(snapshot) {
    //             $timeout(function() {
    //                 for (key in snapshot.val()) {
    //                     if (key == $scope.Id) {
    //                         if (snapshot.val()[key]) {
    //                             $scope.reviews.projects.cghs[key] = snapshot.val()[key]
    //                         }
    //                     }
    //                 }

    //             }, 0)
    //         });
    //     }
    //     if ($scope.vertical == 'pg') {
    //         db.ref('reviews/' + $scope.cityId + '/pg').once('value', function(snapshot) {
    //             $timeout(function() {
    //                 for (key in snapshot.val()) {
    //                     if (key == $scope.Id) {
    //                         if (snapshot.val()[key]) {
    //                             $scope.reviews.projects.pg[key] = snapshot.val()[key]
    //                         }
    //                     }
    //                 }

    //             }, 0)
    //         });
    //     }
    //     if ($scope.vertical == 'commercial') {
    //         db.ref('reviews/' + $scope.cityId + '/commercial').once('value', function(snapshot) {
    //             $timeout(function() {
    //                 for (key in snapshot.val()) {
    //                     if (key == $scope.Id) {
    //                         if (snapshot.val()[key]) {
    //                             $scope.reviews.projects.commercial[key] = snapshot.val()[key]
    //                         }
    //                     }
    //                 }

    //             }, 0)
    //         });
    //     }
    //     if ($scope.vertical == 'residential') {
    //         db.ref('reviews/' + $scope.cityId + '/residential').once('value', function(snapshot) {
    //             $timeout(function() {
    //                 for (key in snapshot.val()) {
    //                     if (key == $scope.Id) {
    //                         if (snapshot.val()[key]) {
    //                             $scope.reviews.projects.residential[key] = snapshot.val()[key]
    //                         }
    //                     }
    //                 }

    //             }, 0)
    //         });
    //     }
    //     if ($scope.vertical == 'coWorking') {
    //         db.ref('reviews/' + $scope.cityId + '/coWorking').once('value', function(snapshot) {
    //             $timeout(function() {
    //                 for (key in snapshot.val()) {
    //                     if (key == $scope.Id) {
    //                         if (snapshot.val()[key]) {
    //                             $scope.reviews.projects.coWorking[key] = snapshot.val()[key]
    //                         }
    //                     }
    //                 }

    //             }, 0)
    //         });
    //         bindData();
    //     }
    // }

    function bindData() {
        console.log('called');
        console.log($scope.details);
    }

}]);
