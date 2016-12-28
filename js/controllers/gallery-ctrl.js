app.controller('galleryCtrl', function($scope, $timeout) {
    $scope.showGallery = true;
    $scope.$on('initGallery', function(event, data) {
        $scope.images = data;
        $timeout(function() {
            var gallery = $('a[data-imagelightbox="a"]').imageLightbox({
                activity: true,
                arrows: true,
                button: true,
                caption: true,
                navigation: false,
                overlay: true
            });

            $('.trigger_gallery').on('click', function() {
                gallery.startImageLightbox();
            });
            $scope.showGallery = true;

        }, 500)
    });
})