app.controller('storyListCtrl', function($scope, $timeout, $state) {
    var allStory;
    // ga('send', 'story');
    var storyLink = 'story/data/country/-K_43TEI8cBodNbwlKqJ/city/-KYJONgh0P98xoyPPYm9';
    $scope.stories = {};
    $scope.featuredsmall = {};
    db.ref(storyLink).once('value', function(snapshot) {
        $timeout(function() {


            allStory = snapshot.val();
            for (type in allStory) {
                for (proj in allStory[type]) {
                    project = allStory[type][proj].items
                    for (story in project) {
                        $scope.stories[story] = project[story];
                        console.log($scope.stories);

                        if (project[story]['cover-image']) {
                            db.ref('images/' + project[story]['cover-image']).once('value', function(data) {
                                $timeout(function() {
                                    img = data.val();
                                    $scope.stories[img.parentKey].imgsrc = 'http://cdn.roofpik.com/image/' + img.path  + img.imgName + '-m.jpg';
                                }, 0);
                            })
                        }
                    }

                }
            }


            count = 0
            for (story in $scope.stories) {
                if (count == 0) {
                    $scope.featuredlarge = $scope.stories[story];
                }
                if (count == 1 || count == 2) {
                    $scope.featuredsmall[story] = $scope.stories[story];
                }

                count++;
            }





        }, 500);
    });


    $scope.showStory = function(key){

        $state.go('story-details', {'key': key})

    }


});



app.controller('storyDetailsCtrl', function($scope, $timeout, $location, $window, $state) {
    var allStory;
    var storykey = $location.search().key;


    var storyLink = 'story/data/country/-K_43TEI8cBodNbwlKqJ/city/-KYJONgh0P98xoyPPYm9';
    $scope.stories = {};
    $scope.featuredsmall = {};
    db.ref(storyLink).once('value', function(snapshot) {
        $timeout(function() {


            allStory = snapshot.val();
            for (type in allStory) {
                for (proj in allStory[type]) {
                    project = allStory[type][proj].items
                    for (story in project) {
                        $scope.stories[story] = project[story];

                        if (project[story]['cover-image']) {
                            db.ref('images/' + project[story]['cover-image']).once('value', function(data) {
                                $timeout(function() {
                                    img = data.val();
                                    $scope.stories[img.parentKey].imgsrc = 'http://cdn.roofpik.com/image/' + img.path  + img.imgName + '-l.jpg';;
                                    setMetaTags();
                                }, 0);
                            })
                        }
                    }

                }
            }

            $scope.story = $scope.stories[storykey];
            document.getElementById("details").innerHTML = $scope.stories[storykey].description;

            count = 0
            for (story in $scope.stories) {
                if (count < 3 && story != storykey) {
                    $scope.featuredsmall[story] = $scope.stories[story];
                }
                count++;
            }



            function setMetaTags() {
                var date=new Date($scope.story.date);  
                var date1=date.toUTCString();
                $window.document.title = $scope.story.meta.title;
                $window.document.getElementsByName('description')[0].content = $scope.story.meta.desc;
                $window.document.getElementsByName('keywords')[0].content = $scope.story.meta.key;
                $(document).ready(function() {
                    $("head").append('<meta property="og:title" content="'+$scope.story.meta.title +'"/>');
                    $("head").append('<meta property="og:type" content="article" />');
                    $("head").append('<meta property="og:site_name" content="Roofpik - Property for Rent in Gurgaon" />');
                    $("head").append('<meta property="article:published_time" content="'+date1+'"/>');
                    $("head").append('<meta property="article:modified_time" content="'+date1+'"/>');
                    $("head").append('<meta property="og:title" content="'+$scope.story.meta.title +'"/>');
                    $("head").append('<meta property="og:description" content="'+$scope.story.meta.desc+'"/>');
                    $("head").append('<meta property="og:url" content="'+window.location.href+'"/>');
                    $("head").append('<meta property="og:image" content="'+$scope.story.imgsrc+'" />');


                });
            }

        }, 200);
    });


    $scope.showStory = function(key){
          $state.go('story-details', {'key': key});
    }


});
