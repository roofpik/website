app.controller('homeCtrl', function($scope, $timeout, $mdDialog, $state) {

    $scope.projectList = [];
    $scope.searchList = [];
    $scope.dataVersions = {};
    $scope.localities = {};
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    var year = new Date().getFullYear();
 
    db.ref('dataVersions').once('value', function(response){
        $scope.dataVersions = response.val();
    }).then(function(){
        $timeout(function(){
            if(checkLocalStorage('projectList')){
                var projectListVersion = (getLocalStorage('projectList')).version;
                if(projectListVersion == $scope.dataVersions.projectList){
                    $scope.projectList = getLocalStorage('projectList').value;
                    $timeout(function(){
                         $scope.makeTopRated();
                     }, 1000);
                } else {
                    getProjectList($scope.dataVersions.projectList);
                }
            } else {
                getProjectList($scope.dataVersions.projectList);
            }
            if(checkLocalStorage('searchList')){
                var searchListVersion = (getLocalStorage('searchList')).version;
                if(searchListVersion == $scope.dataVersions.searchList){
                    $scope.searchList = getLocalStorage('searchList').value;
                    getLocalities($scope.searchList);
                } else {
                    getSearchList($scope.dataVersions.searchList);
                }
            } else {
                getSearchList($scope.dataVersions.searchList);
            }
        }, 100);
    });

    function getProjectList(version){
        db.ref('projectList/'+$scope.cityId+'/residential').once('value', function(snapshot){
            $timeout(function(){
                for(key in snapshot.val()){
                    $scope.projectList.push(snapshot.val()[key]);
                }
                setLocalStorage($scope.projectList, 'projectList', version);
                $timeout(function(){
                     $scope.makeTopRated();
                 }, 1000)
               
            },100);
        })
    }

    function getSearchList(version){
        db.ref('search').once('value', function(snapshot){
            $timeout(function(){
                for(key in snapshot.val()){
                    $scope.searchList.push(snapshot.val()[key]);
                }
                getLocalities($scope.searchList);
                setLocalStorage($scope.searchList, 'searchList', version);
            },0);
        })  
    }

    function getLocalities(list){
        for(key in list){
            if(list[key].type == 'Locality'){
                $scope.localities[list[key].name] = list[key].id;
            }
        }
        console.log($scope.localities);
    }

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

        if(checkLocalStorage('searchList')){
            var searchListVersion = (getLocalStorage('searchList')).version;
            if(searchListVersion == version){
                $scope.searchList = getLocalStorage('searchList').value;
                filterList();
            } else {
                getSearchList(version);
            }
        } else {
            getSearchList(version);
        }

        function getSearchList(version){
            db.ref('search').once('value', function(snapshot){
                $timeout(function(){
                    for(key in snapshot.val()){
                        $scope.searchList.push(snapshot.val()[key]);
                    }
                    setLocalStorage($scope.searchList, 'searchList', version);
                    filterList();
                },0);
            })  
        }

        function filterList(){
            for(key in $scope.searchList){
                if($scope.searchList[key].type == 'Project'){
                    if($scope.searchList[key].live){
                        $scope.searchList[key].show = true;
                    } else {
                        $scope.searchList[key].show = false;
                    }
                } else {
                    $scope.searchList[key].show = true;
                }
            }
        }

        $scope.selectItem = function(val){
            console.log(val);
            console.log(val.name);

            if(val.type == 'Builder'){
                $scope.cancel();
                $state.go('projects', {year: year, city: 'gurgaon', type: 'residential-projects', category:convertToHyphenSeparated(val.name) , categoryId:val.id , id: 2});
            } else if(val.type == 'Locality'){
                $scope.cancel();
                $state.go('projects', {year: year, city: 'gurgaon', type: 'residential-projects', category:convertToHyphenSeparated(val.name) , categoryId:val.id , id: 3});
            } else {
                $scope.cancel();
                $state.go('project-detail', {year: year, city: 'gurgaon', type: 'residential-projects', project:convertToHyphenSeparated(val.name) , id: val.id});
            }
        }
    }

    $scope.makeTopRated = function(){
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
                }
            ]
        });
    }

    $timeout(function() {

         $('.blogs-wrapper').slick({
            dots: false,
            infinite: true,
            prevArrow: '<button type="button" class="prev-blog arrows"><i class="material-icons">navigate_before</i></button>',
            nextArrow: '<button type="button" class="next-blog arrows"><i class="material-icons">navigate_next</i></button>',
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
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });

        $('.story-wrapper').slick({
            dots: false,
            infinite: true,
            autoplay: true,
            arrows: false,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }, 2000);

    $scope.gotoWriteReviews = function(){
        $state.go('write-review');
    }

    $scope.takeToProjects = function(val){
        console.log(val);
        $state.go('projects', {year: year, city: 'gurgaon', type: 'residential-projects', category:val , categoryId:'-KQ9cIdfaoKpCj34yAWC' , id: 1});
    }

    $scope.takeToLocalityProjects = function(val){
        var valId = $scope.localities[val];
        $state.go('projects', {year: year, city: 'gurgaon', type: 'residential-projects', category:convertToHyphenSeparated(val) , categoryId: valId , id: 3});
    }

    $scope.takeToDetails = function(val){
        $state.go('project-detail', {year: year, city: 'gurgaon', type: 'residential-projects', project:convertToHyphenSeparated(val.projectName) , id: val.projectId});
    }

    $scope.goToCoverStories = function(){
        $state.go('cover-stories', {city: 'gurgaon', cityId: $scope.cityId, from:1});
    }

    $scope.goToBlogs = function(){
        $state.go('blogs', {city: 'gurgaon', cityId: $scope.cityId, from:1})
    }
});