app.controller('homeCtrl', function($scope, $timeout, $mdDialog, $state, UserTokenService, $location, $rootScope, appLoad) {
    $scope.projectList = [];
    $scope.searchList = [];
    $scope.dataVersions = {};
    $scope.localities = {};
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    var year = new Date().getFullYear();

    var timestamp = new Date().getTime();
    var urlInfo = {
        url: $location.path()
    }
    UserTokenService.checkToken(urlInfo, timestamp, 1);
    loading(false);
    db.ref('dataVersions').once('value', function(response) {
        appLoad.localObjects(response.val())
        .then(function(result){
            $scope.projectList = getLocalStorage('projectList').value;
            $scope.searchList = getLocalStorage('searchList').value;
            getLocalities($scope.searchList);
            for(key in $scope.projectList){
                if($scope.projectList[key].imgUrl.indexOf('http') == -1){
                    $scope.projectList[key].imgUrl = "http://cdn.roofpik.com/roofpik/projects/"+$scope.cityId+'/residential/'+$scope.projectList[key].projectId+'/images/coverPhoto/'+$scope.projectList[key].imgUrl+'-s.jpg';
                };
            };
            $timeout(function(){
                $scope.makeTopRated();
            }, 2000);
            

        });
    });



    // $rootScope.$watch('localStorageCount', function() {
    //     if ($rootScope.localStorageCount == 2) {
    //         $scope.projectList = getLocalStorage('projectList').value;
    //         for(key in $scope.projectList){
    //             if($scope.projectList[key].imgUrl.indexOf('http') == -1){
    //                 $scope.projectList[key].imgUrl = "http://cdn.roofpik.com/roofpik/projects/"+$scope.cityId+'/residential/'+$scope.projectList[key].projectId+'/images/coverPhoto/'+$scope.projectList[key].imgUrl+'-s.jpg';
    //             }
    //             console.log($scope.projectList[key].imgUrl);
    //         }
    //         $timeout(function() {
    //             $scope.makeTopRated();
    //         }, 1000);
    //         $scope.searchList = getLocalStorage('searchList').value;
    //         getLocalities($scope.searchList);
    //     };
    // });


    function getLocalities(list) {
        for (key in list) {
            if (list[key].type == 'Locality') {
                $scope.localities[list[key].name] = list[key].id;
            }
        }
    };

    $scope.showSearch = function(ev) {
        $mdDialog.show({
                controller: searchController,
                templateUrl: 'templates/dialogs/search.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
                locals: {
                    version: $scope.dataVersions.searchList
                }
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };


    function searchController($scope, $mdDialog, locals) {
        $scope.searchList = [];
        $scope.searchText = '';
        $scope.cityId = '-KYJONgh0P98xoyPPYm9';
        var version = locals.version;
        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };

        $scope.searchList = getLocalStorage('searchList').value;
        filterList();

        function filterList() {
            for (key in $scope.searchList) {
                if ($scope.searchList[key].type == 'Project') {
                    if ($scope.searchList[key].img.indexOf("http") == -1) {
                        $scope.searchList[key].img = "http://cdn.roofpik.com/roofpik/projects/" + $scope.cityId + '/residential/' + $scope.searchList[key].id + '/images/coverPhoto/' + $scope.searchList[key].img + '-s.jpg';
                    }
                    if ($scope.searchList[key].live) {
                        $scope.searchList[key].show = true;
                    } else {
                        $scope.searchList[key].show = false;
                    }
                } else {
                    $scope.searchList[key].show = true;
                }
            }
        }

        function printSearchText() {}

        $scope.selectItem = function(val) {
            var timestamp = new Date().getTime();
            if (val.type == 'Builder') {
                $scope.cancel();
                var searchData = {
                    searchKeyword: $scope.searchText || null,
                    url: '/projects/' + year + '/gurgaon/residential-projects/' + convertToHyphenSeparated(val.name) + '/' + val.id + '/' + 2
                }
                UserTokenService.checkToken(searchData, timestamp, 3);
                $state.go('projects', { year: year, city: 'gurgaon', type: 'residential-projects', category: convertToHyphenSeparated(val.name), categoryId: val.id, id: 2 });
            } else if (val.type == 'Locality') {
                $scope.cancel();
                var searchData = {
                    searchKeyword: $scope.searchText || null,
                    url: '/projects/' + year + '/gurgaon/residential-projects/' + convertToHyphenSeparated(val.name) + '/' + val.id + '/' + 3
                }
                UserTokenService.checkToken(searchData, timestamp, 3);
                $state.go('projects', { year: year, city: 'gurgaon', type: 'residential-projects', category: convertToHyphenSeparated(val.name), categoryId: val.id, id: 3 });
            } else {
                $scope.cancel();
                var searchData = {
                    searchKeyword: $scope.searchText || null,
                    url: '/project-detail/' + year + '/gurgaon/residential-projects/' + convertToHyphenSeparated(val.name) + '/' + val.id
                }
                UserTokenService.checkToken(searchData, timestamp, 3);
                $state.go('project-detail', { year: year, city: 'gurgaon', type: 'residential-projects', project: convertToHyphenSeparated(val.name), id: val.id });
            }
        }
    }

    $scope.makeTopRated = function() {
        $('.projects-wrapper').slick({
            dots: false,
            infinite: true,
            prevArrow: '<button type="button" class="prev-proj arrows"><i class="material-icons">navigate_before</i></button>',
            nextArrow: '<button type="button" class="next-proj arrows"><i class="material-icons">navigate_next</i></button>',
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
        $('.top-projects-loading').hide();
    };

    // $timeout(function() {

    //     $('.blogs-wrapper').slick({
    //         dots: false,
    //         infinite: true,
    //         prevArrow: '<button type="button" class="prev-blog arrows"><i class="material-icons">navigate_before</i></button>',
    //         nextArrow: '<button type="button" class="next-blog arrows"><i class="material-icons">navigate_next</i></button>',
    //         speed: 300,
    //         slidesToShow: 4,
    //         slidesToScroll: 4,
    //         responsive: [{
    //                 breakpoint: 1024,
    //                 settings: {
    //                     slidesToShow: 3,
    //                     slidesToScroll: 3
    //                 }
    //             }, {
    //                 breakpoint: 600,
    //                 settings: {
    //                     slidesToShow: 2,
    //                     slidesToScroll: 2
    //                 }
    //             }, {
    //                 breakpoint: 480,
    //                 settings: {
    //                     slidesToShow: 1,
    //                     slidesToScroll: 1
    //                 }
    //             }
    //             // You can unslick at a given breakpoint now by adding:
    //             // settings: "unslick"
    //             // instead of a settings object
    //         ]
    //     });

    //     // $('.story-wrapper').slick({
    //     //     dots: false,
    //     //     infinite: true,
    //     //     autoplay: true,
    //     //     arrows: false,
    //     //     speed: 300,
    //     //     slidesToShow: 1,
    //     //     slidesToScroll: 1,
    //     //     responsive: [{
    //     //         breakpoint: 1024,
    //     //         settings: {
    //     //             slidesToShow: 1,
    //     //             slidesToScroll: 1
    //     //         }
    //     //     }, {
    //     //         breakpoint: 600,
    //     //         settings: {
    //     //             slidesToShow: 1,
    //     //             slidesToScroll: 1
    //     //         }
    //     //     }, {
    //     //         breakpoint: 480,
    //     //         settings: {
    //     //             slidesToShow: 1,
    //     //             slidesToScroll: 1
    //     //         }
    //     //     }]
    //     // });
    // }, 2000);

    $scope.gotoWriteReviews = function() {
        $state.go('write-review');
    }

    $scope.takeToProjects = function(val) {
        $state.go('projects', { year: year, city: 'gurgaon', type: 'residential-projects', category: val, categoryId: '-KQ9cIdfaoKpCj34yAWC', id: 1 });
    }

    $scope.takeToLocalityProjects = function(val) {
        var valId = $scope.localities[val];
        $state.go('projects', { year: year, city: 'gurgaon', type: 'residential-projects', category: convertToHyphenSeparated(val), categoryId: valId, id: 3 });
    }

    $scope.takeToDetails = function(val) {
        $state.go('project-detail', { year: year, city: 'gurgaon', type: 'residential-projects', project: convertToHyphenSeparated(val.projectName), id: val.projectId });
    }



    $scope.cityClicked = function(city) {
        if (city != 'Gurgaon') {
            swal("Currently we are only present in Gurgaon", "Please stay tuned.")
        }
        var timestamp = new Date().getTime();
        var data = {
            cityName: city
        }
        UserTokenService.checkToken(data, timestamp, 2);
    }




});
