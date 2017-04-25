app.controller('projectDetailsCtrl', function($scope, $timeout, $q, imageUrl, $stateParams, $location, $http, $state) {


    $scope.countryId = '-K_43TEI8cBodNbwlKqJ';
    $scope.cityId = '-KYJONgh0P98xoyPPYm9';
    $scope.micromarketId = $location.search().m;
    $scope.localityId = $location.search().l;
    $scope.projectId = $location.search().p;
    gp = 'project-'+$scope.projectId;
    // ga('send', gp);
    $scope.pros = [];
    $scope.cons = [];
    $scope.specifications = {};
    $scope.shortspecifications = {};
    $scope.allAmenities = amenities;
    $scope.amenitiesType = amenitiesType;
    $timeout(function() {
        $("html, body").animate({ scrollTop: 0 }, "fast");
    }, 500);


    function getProjects() {

        $http({
            url: 'http://139.162.9.71/api/v1/projectDetails',
            method: 'GET',
            params: { 'key': $scope.projectId }
        }).then(function mySucces(response) {
            // $scope.loading = false;
            $scope.projectsummary = response.data.items[0].data;

        })

    }

    getProjects();

    $scope.getNumber = function(num) {
        return new Array(num);
    }

 $('.scrollspy').scrollSpy();


    // getReviewSummary();

    db.ref('project/country/' + $scope.countryId + '/city/' + $scope.cityId + '/residential/micromarket/' + $scope.micromarketId + '/locality/' + $scope.localityId + '/projects/' + $scope.projectId).once('value', function(snapshot) {
        $scope.project = snapshot.val();
        $scope.images = {}
        for (img in $scope.project.images) {
            db.ref('images/' + img).once('value', function(data) {
                item = data.val()
                $scope.images[item['key']] = { 'url': 'http://cdn.roofpik.com/image/' + item['path'] + item['imgName'] + '-l.jpg' };
                if (item['imgCat'] == 'cover') {
                    // $('#cover-m').hide();
                    // $('#cover-l').hide();
                    // $scope.xscover = 'http://cdn.roofpik.com/image/' + item['path'] + item['imgName'] + '-xs.jpg';
                    $scope.cover = 'http://cdn.roofpik.com/image/' + item['path'] + item['imgName'] + '-xs.jpg';

                    $scope.coverl = 'http://cdn.roofpik.com/image/' + item['path'] + item['imgName'] + '-xl.jpg';

                    $('#cover-l').on('load', function() {
                        $('#cover-xs').addClass('hidden');
                        $('#cover-l').removeClass('hidden');

                    });

                    $('#zoomIn').on('load', function() {
                        $('#zoomIn').removeClass('hidden');
                    });

                }

                $('.gallery').each(function() { // the containers for all your galleries
                    $(this).magnificPopup({
                        delegate: 'a', // the selector for gallery item
                        type: 'image',
                        gallery: {
                            enabled: true
                        }
                    });
                });
            });


        }





        $scope.writeReview = function() {

            $state.go('write-review', { 'key': $scope.project.key, 'name': $scope.project.name, 'type': 'residential' });

        }

        $scope.showSpecifications = function() {
                $('#more_specifications').modal();
                $('#more_specifications').modal('open');

            }
            // Images needs to binded

        if ($scope.project.amenities) {
            generateAmenitiesList($scope.project.amenities);
        }
        if ($scope.project.units) {
            generateConfigurations($scope.project.units);
        }

        counts = 0;
        for (key in $scope.project.specifications) {



            if (counts < 2) {
                var x = camelCaseToTitleCase(key);
                $scope.specifications[x] = {};
                $scope.shortspecifications[x] = {};
                for (key1 in $scope.project.specifications[key]) {
                    var y = camelCaseToTitleCase(key1);

                    $scope.shortspecifications[x][y] = $scope.project.specifications[key][key1];
                    $scope.specifications[x][y] = $scope.project.specifications[key][key1];

                    // $scope.specifications[x][y] = $scope.project.specifications[key][key1];
                }

                counts = counts + 1;

                // console.log(key, $scope.project.specifications[key]);
            } else {
                var x = camelCaseToTitleCase(key);
                $scope.specifications[x] = {};
                for (key1 in $scope.project.specifications[key]) {
                    var y = camelCaseToTitleCase(key1);

                    $scope.specifications[x][y] = $scope.project.specifications[key][key1];
                    // $scope.specifications[x][y] = $scope.project.specifications[key][key1];
                }

                counts = counts + 1;


            }
        }



        // console.log($scope.project.specifications);
        if ($scope.project.highlights) {
            if ($scope.project.highlights.pros) {
                $scope.pros = $scope.project.highlights.pros.split("*");
            }
            if ($scope.project.highlights.cons) {
                $scope.cons = $scope.project.highlights.cons.split("*");
            }


        }
        if ($scope.project.general.about) {
            // console.log($scope.project.general.about.length);
            if ($scope.project.general.about.length > 500) {
                $scope.project.general.about1 = $scope.project.general.about.substring(0, 500);
                $scope.project.general.about2 = $scope.project.general.about.substring(501, $scope.project.general.about.length);
            } else {
                $scope.project.general.about1 = $scope.project.general.about;
            }
        }

    })

    $scope.configurations = {};

    function reviewsShort() {
        var showChar = 400; // How many characters are shown by default
        var ellipsestext = "...";
        var moretext = "Show more";
        var lesstext = "Show less";


        $('.more').each(function() {
            var content = $(this).html();

            if (content.length > showChar) {

                var c = content.substr(0, showChar);
                var h = content.substr(showChar, content.length - showChar);

                var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';

                $(this).html(html);
            }

        });

        $(".morelink").click(function() {
            if ($(this).hasClass("less")) {
                $(this).removeClass("less");
                $(this).html(moretext);
            } else {
                $(this).addClass("less");
                $(this).html(lesstext);
            }
            $(this).parent().prev().toggle();
            $(this).prev().toggle();
            return false;
        });
    }

    function generateConfigurations(config) {
        for (key in config) {

            if ($scope.configurations[config[key].bhk]) {
                if (config[key].type == $scope.configurations[config[key].bhk].type) {
                    config[key].hrefLink = '#area' + config[key].area;
                    $scope.configurations[config[key].bhk].units[config[key].area] = config[key];
                } else {
                    $scope.configurations[config[key].bhk + 'a'] = {
                        bhk: config[key].bhk,
                        type: config[key].type,
                        hrefLink: '#bhk' + config[key].bhk + 'a',
                        units: {}
                    }
                    config[key].hrefLink = '#area' + config[key].area;
                    $scope.configurations[config[key].bhk].units[config[key].area] = config[key];
                }
            } else {
                $scope.configurations[config[key].bhk] = {
                    bhk: config[key].bhk,
                    type: config[key].type,
                    hrefLink: '#bhk' + config[key].bhk,
                    units: {}
                }
                config[key].hrefLink = '#area' + config[key].area;
                $scope.configurations[config[key].bhk].units[config[key].area] = config[key];
            }
        }
        // console.log($scope.configurations);
        var start = 0;
        var unitStart = 0;
        for (key in $scope.configurations) {
            if (start == 0) {
                $scope.configurations[key].selected = true;
                for (key1 in $scope.configurations[key].units) {
                    if (unitStart == 0) {
                        $scope.configurations[key].units[key1].selected = true;
                        unitStart = 1;
                    } else {
                        $scope.configurations[key].units[key1].selected = false;
                    }
                }
                start = 1;
            } else {
                $scope.configurations[key].selected = false;
                for (key1 in $scope.configurations[key].units) {
                    if (unitStart == 0) {
                        $scope.configurations[key].units[key1].selected = true;
                        unitStart = 1;
                    } else {
                        $scope.configurations[key].units[key1].selected = false;
                    }
                }
            }
        }
        var fconf = $scope.configurations[Object.keys($scope.configurations)[0]];
        $scope.currentconfig = fconf.bhk + fconf.type;
    }

    $scope.showConfig = function(config) {
        $scope.currentconfig = config.bhk + config.type;
    }

    $scope.currentconfig = '3apartment';

    $scope.selectConfig = function(config) {
        unitStart = 0;
        for (key in $scope.configurations) {
            if (config.hrefLink == $scope.configurations[key].hrefLink) {
                $scope.configurations[key].selected = true;
                for (key1 in $scope.configurations[key].units) {
                    if (unitStart == 0) {
                        $scope.configurations[key].units[key1].selected = true;
                        unitStart = 1;
                    } else {
                        $scope.configurations[key].units[key1].selected = false;
                    }
                }
            } else {
                $scope.configurations[key].selected = false;
                for (key1 in $scope.configurations[key].units) {
                    $scope.configurations[key].units[key1].selected = false;
                }
            }
        }

        c

        $timeout(function() {

            $('ul.tabs').tabs();
        }, 500);
    }

    $scope.selectUnit = function(config, unit) {

        for (key in $scope.configurations) {
            if (config.hrefLink == $scope.configurations[key].hrefLink) {
                for (key1 in $scope.configurations[key].units) {
                    if (unit.hrefLink == $scope.configurations[key].units[key1].hrefLink) {
                        $scope.configurations[key].units[key1].selected = true;
                    } else {
                        $scope.configurations[key].units[key1].selected = false;
                    }
                }
            }
        }
    }

    function generateAmenitiesList(amenities) {
        for (key in amenities) {
            for (key1 in amenities[key]) {
                if (amenities[key][key1] != 'NA' || amenities[key][key1] != 'No') {
                    try {
                        $scope.amenitiesType[key].present = true;
                    } catch (err) {
                        // console.log(key, key1) ;
                    }
                }
            }
        }

        for (key in $scope.amenitiesType) {
            if ($scope.amenitiesType[key].present) {
                $scope.showAmenities = true;
            }
        }
        $timeout(function() {
            $('.tabam').tabs();
            $scope.displayAmenities = true;
            $('.tabam').tabs('select_tab', 'basic');
        }, 500);
    }

    $scope.visit = {};
    $scope.visit.project = {};


    $scope.submitQuery = function() {
        $scope.visit.project.projectId = $scope.projectId;
        $scope.visit.project.projectName = $scope.project.name;
        $scope.visit.project.cityId = $scope.cityId;
        $scope.visit.project.micromarketId = $scope.micromarketId;
        $scope.visit.project.localityId = $scope.localityId;
        updates = {}
        var newPostKey = firebase.database().ref().child('enquiry').push().key;
        $scope.visit.created = new Date().getTime();
        $scope.visit.status = 'submitted';
        $scope.visit.type = 'project';
        updates['/enquiry/' + newPostKey] = $scope.visit;
        Materialize.toast('Your query have been successfully submit!', 1000, 'rounded');
        db.ref().update(updates).then(function() {

        });
    }


    function reviewSummary() {

        $http({
            url: 'http://139.162.9.71/api/v1/projKeyRatings',
            method: 'GET',
            params: { 'pkey': $scope.projectId }
        }).then(function mySucces(response) {

            $scope.reviewsummary = response.data.items[0];
            console.log($scope.reviewsummary);
            $scope.stars = {};
            $scope.stars.full = Math.floor($scope.reviewsummary.avg_star);

            halfstar = Math.round($scope.reviewsummary.avg_star - $scope.stars.full);
            if (halfstar == 1) {
                $scope.stars.half = true;
            }
            $scope.stars.none = 5 - Math.floor($scope.reviewsummary.avg_star) - halfstar;
            orsum = 0
            for (key in $scope.reviewsummary.type) {
                orsum = orsum + $scope.reviewsummary.type[key];
            }
            oratings = [1, 2, 3, 4, 5]
            for (index in oratings) {
                if ($scope.reviewsummary.star_rating[oratings[index] + '_star']) {
                    $('#prog' + oratings[index]).css('width', $scope.reviewsummary.star_rating[oratings[index] + '_star'] / orsum * 100 + '%');
                    $('#progc' + oratings[index]).html($scope.reviewsummary.star_rating[oratings[index] + '_star']);
                }
            }

            // $scope.projectsummary.review.count = orsum


        })
    }

    reviewSummary();



    $scope.filters = {
        pkey: $scope.projectId,
        userType: '',
        ratings: '',
        pagination: 1
    };

    $scope.ratingf = {}
    var rtfv = { 'exc': 5, 'vg': 4, 'good': 3, 'avg': 2, 'bad': 1 }

    $scope.ratingFilter = function() {
        $scope.filters.ratings = '';
        for (key in $scope.ratingf) {
            if ($scope.ratingf[key]) {
                if ($scope.filters.ratings == '') {
                    $scope.filters.ratings = rtfv[key];
                } else {
                    $scope.filters.ratings = $scope.filters.ratings + ',' + rtfv[key];
                }
            }

        }
        allReviews();
    }
    $scope.userTypef = {};
    $scope.userTypeFilter = function() {
        $scope.filters.userType = '';
        for (key in $scope.userTypef) {
            if ($scope.userTypef[key]) {
                if ($scope.filters.userType == '') {
                    $scope.filters.userType = key;
                } else {
                    $scope.filters.userType = $scope.filters.userType + ',' + key;
                }
            }

        }
        console.log($scope.filters);
        allReviews();
    }
    $scope.reviewsProcess = true;


    function allReviews() {
        $scope.filters.pagination = 1;
        $scope.reviewsProcess = true;
        $scope.reviewsEnd = false;
        $http({
            url: 'http://139.162.9.71/api/v1/reviewSearch',
            method: 'GET',
            params: $scope.filters
        }).then(function mySucces(response) {
            $scope.allReviews = response.data.items;
            if (response.data.items.length != 10) {
                $scope.reviewsEnd = true;
            }
            $timeout(function() {
                reviewsShort();
                $scope.reviewsProcess = false;
            }, 1000)
        });
    }

    allReviews();
    var pagreview = 1;
    $scope.showMoreReviews = function() {

        loadNextReviews();

    };

    function loadNextReviews() {

        $scope.filters.pagination = $scope.filters.pagination + 1;
        $http({
            url: 'http://139.162.9.71/api/v1/reviewSearch',
            method: 'GET',
            params: $scope.filters
        }).then(function mySucces(response) {
            if (response.data.items.length != 10) {
                $scope.reviewsEnd = true;
            }
            currlen = $scope.allReviews.length;
            for (i in response.data.items) {
                item = parseInt(i) + parseInt(currlen);
                $scope.allReviews[item] = response.data.items[i];
            }
        });

    }



})



app.directive('ratings', function() {
    return {
        restrict: 'EA', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true, // This is one of the cool things :). Will be explained in post.
        template: '<p>' +
            '<i class="material-icons green-text" ng-repeat="i in getNumber(stars.full)  track by $index">star</i>' +
            '<i class="material-icons green-text" ng-show="stars.half">star_half</i>' +
            '<i class="material-icons" ng-repeat="i in getNumber(stars.none)  track by $index">star_border</i>' +
            '</p>',
        controller: 'ratingCtrl',
        scope: {
            ratingval: '@ratingval'
        }
    }
});


app.controller('ratingCtrl', function($scope) {
    $scope.stars = {};

    $scope.$watch('ratingval', function() {
        $scope.stars.full = Math.floor($scope.ratingval);

        halfstar = Math.round($scope.ratingval - $scope.stars.full);
        if (halfstar == 1) {
            $scope.stars.half = true;
        }
        $scope.stars.none = 5 - Math.floor($scope.ratingval) - halfstar;
    });



    $scope.getNumber = function(num) {
        return new Array(num);
    }
});



app.filter('capitalize', function() {
    return function(input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});
