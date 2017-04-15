app.controller('blogListCtrl', function($scope, $timeout, $state) {
    // ga('send', 'blog');
    var allblog;
    var blogLink = 'blog/main/';
    $scope.stories = {};
    $scope.featuredsmall = {};

    db.ref(blogLink).once('value', function(snapshot) {
        $timeout(function() {

            $scope.blogs = snapshot.val();


            for (key in $scope.blogs) {

                if ($scope.blogs[key]['cover-image']) {
                    db.ref('images/' + $scope.blogs[key]['cover-image']).once('value', function(data) {
                        $timeout(function() {
                            img = data.val();
                            $scope.blogs[img.parentKey].imgsrc = 'http://cdn.roofpik.com/image/' + img.path  + img.imgName + '-m.jpg';
                        }, 0);
                    })
                }
            }

            count = 0
            for (blog in $scope.blogs) {
                if (count == 0) {
                    $scope.featuredlarge = $scope.blogs[blog];
                }
                if (count == 1 || count == 2) {
                    $scope.featuredsmall[blog] = $scope.blogs[blog];
                }

                count++;
            }


        }, 500);
    });

    function rspec(val) {
        return val.replace(/[^\w\s]/gi, '-')
    }

    $scope.showblog = function(data) {
        console.log(data)
        $state.go('blog-details', { 'url': rspec(data.url), 'key': data.key })

    }


});





app.controller('blogDetailsCtrl', function($scope, $timeout, $location, $window, $state) {

    var blogkey = $location.search().key;


    var blogMainLink = 'blog/main/';
    var blogDetailLink = 'blog/content/'

    db.ref(blogMainLink + blogkey).once('value', function(snapshot) {

        $scope.blogMain = snapshot.val();

        $timeout(function() {
            $scope.blogMain = snapshot.val();
            setMetaTags();
        }, 200);

    });


    db.ref(blogDetailLink + blogkey + '/section').once('value', function(snapshot) {
        $scope.blogDetail = snapshot.val();

        for (key in $scope.blogMain.images) {
            db.ref('images/' + key).once('value', function(snapshot) {
                var img = snapshot.val();
                $timeout(function() {
                    for (key in $scope.blogDetail) {

                        if (img.imgCat == 'cover') {
                            $scope.blogMain.imgsrc = 'http://cdn.roofpik.com/image/' + img.path  + img.imgName + '-l.jpg';;
                        }
                        if ($scope.blogDetail[key].image == img.key) {
                            $scope.blogDetail[key].imgsrc = 'http://cdn.roofpik.com/image/' + img.path  + img.imgName + '-l.jpg';;
                        }
                    }
                    console.log($scope.blogDetail);
                }, 0);
            });
        };

        $timeout(function() {
            $scope.blogDetail = snapshot.val();
        }, 200);
    });





    $scope.showStory = function(key) {
        $state.go('story-details', { 'key': key });
    }


    function setMetaTags() {
        var date = new Date($scope.blogMain.created);
        var date1 = date.toUTCString();
        $window.document.title = $scope.blogMain.meta.title;
        $window.document.getElementsByName('description')[0].content = $scope.blogMain.meta.desc;
        $window.document.getElementsByName('keywords')[0].content = $scope.blogMain.meta.key;
        $(document).ready(function() {
            $("head").append('<meta property="og:title" content="' + $scope.blogMain.meta.title + '"/>');
            $("head").append('<meta property="og:type" content="article" />');
            $("head").append('<meta property="og:site_name" content="Roofpik - Property for Rent in Gurgaon" />');
            $("head").append('<meta property="article:published_time" content="' + date1 + '"/>');
            $("head").append('<meta property="article:modified_time" content="' + date1 + '"/>');
            $("head").append('<meta property="og:title" content="' + $scope.blogMain.meta.title + '"/>');
            $("head").append('<meta property="og:description" content="' + $scope.blogMain.meta.desc + '"/>');
            $("head").append('<meta property="og:url" content="' + window.location.href + '"/>');
            $("head").append('<meta property="og:image" content="' + $scope.blogMain.imgsrc + '" />');
        });
    }



});
