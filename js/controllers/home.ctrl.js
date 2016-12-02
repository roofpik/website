app.controller('homeCtrl', function($scope, $timeout, $mdDialog) {

    $scope.showSearch = function(ev) {
        $mdDialog.show({
                controller: searchController,
                templateUrl: 'templates/dialogs/search.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };


    function searchController($scope, $mdDialog) {
        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    }
    $timeout(function() {

        $('.projects-wrapper').slick({
            dots: false,
            infinite: true,
            prevArrow: '<button type="button" class="prev-proj arrows"><i class="material-icons">navigate_before</i></button>',
            nextArrow: '<button type="button" class="next-proj arrows"><i class="material-icons">navigate_next</i></button>',
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 3,
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
            prevArrow: '<button type="button" class="prev-proj arrows"><i class="material-icons">navigate_before</i></button>',
            nextArrow: '<button type="button" class="next-proj arrows"><i class="material-icons">navigate_next</i></button>',
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 3,
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
    }, 2000);

});
