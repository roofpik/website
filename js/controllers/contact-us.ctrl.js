app.controller('contactUsCtrl', ['$scope', '$timeout', function($scope, $timeout) {
	$timeout(function() {
        myMap();
    }, 100);
    document.title = 'Contact Us';
    $scope.user = {};


 function myMap() {
        var bounds = new google.maps.LatLngBounds();
        var mapCanvas = document.getElementById("map");
        var mapOptions = {
            center: new google.maps.LatLng(28.408844, 77.042313),
            zoom: 16
        }
        var map = new google.maps.Map(mapCanvas, mapOptions);
        var position = new google.maps.LatLng(28.406827,77.042364);
        bounds.extend(position);

        var contentString = '<div id="content">'+
            '<div id="bodyContent">'+
            '<div class="roofpik-logo">'+
            '<img src="images/general/logo.png"/>'+
            '</div>'+
            '<h3>250, Vipul Trade Center</h3>'+
            '<h3>Sector 48, Gurgaon, Haryana</h3>'+
            '</div>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        var marker = new google.maps.Marker({
            position: position,
            map: map,
            title: 'Roofpik'
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
    }


    $scope.submit = function(){
        swal({
          title: "Submitting Query",
          text: "Please wait...",
          imageUrl: "https://d1ow200m9i3wyh.cloudfront.net/img/assets/common/images/loader.gif",
          showConfirmButton: false
        });
        db.ref('contactUs').push($scope.user).then(function(){
            $timeout(function(){
                $scope.user = {};
                $scope.contactUs.$setUntouched();
                $scope.contactUs.$setPristine();
            },100);
            sweetAlert("Done!", "Your query was successfully submitted.", "success");
        })
        // console.log($scope.user);
        
    }
    loading(false);

   
}]);