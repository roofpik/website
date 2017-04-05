app.controller('storyListCtrl', function($scope, $timeout) {
    var allStory;
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
                                    $scope.stories[img.parentKey].imgsrc = 'http://139.162.9.71/images/' + img.imgName + '.jpg';
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


})
