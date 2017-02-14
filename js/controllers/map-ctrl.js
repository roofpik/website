 app.controller('MapCtrl', function() {

    console.log('Working');
$('.draggable').attr('draggable', true);
     $('.collapsible').collapsible();
     $('input.autocomplete').autocomplete({
         data: {
             "Apple": null,
             "App": null,
             "Ap": null,
             "Microsoft": null,
             "Google": 'http://placehold.it/250x250'
         }
     });


     function initMap() {

         var map;
         var bounds = new google.maps.LatLngBounds();
         var mapOptions = {
             mapTypeId: 'roadmap'

         };


         // Display a map on the web page
         map = new google.maps.Map(document.getElementById("mapCanvas"), mapOptions);
         map.setTilt(50);

         // Multiple markers location, latitude, and longitude

         var markers = [

             ['Vipul Trade Center, NY', 28.406909, 77.042623],
             ['Shona Road, NY', 28.416920, 77.042746, 'images/home/marker1.png'],
             ['IFFCO Chowk Metro Station, NY', 28.471623, 77.072390, 'images/home/marker2.png'],
             ['Huda Metro Station, NY', 28.459552, 77.072430, 'images/home/marker3.png']

         ];



         // Info window content
         var infoWindowContent = [

             ['<div class="info_content">' +
                 '<div class="card info_content mg0">' +
                 '<div class="card-image">' +
                 '<img src="images/sohna.jpg">' +
                 '<a href="" class="btn red absbtn"><i class="material-icons left">details</i>See Details</a>' +
                 '</div>' +
                 '<div class="cardTitle row mgbn bdbtm">' +
                 '<a class="col m8 black-text text-lighten-4 pd5 pd-tspanmap">' +
                 '<span class="b">Bestech Park View City 1</span>' +
                 '<span class="ft12">Sohna Road, Sector 48 Gurgaon</span>' +
                 '</a>' +
                 '<div class="col m4 right-align pd5 ft12i">' +
                 '<span class="block b">5 Reviews</span>' +
                 '<span class="block">' +
                 '<i class="material-icons blue-text">star</i><i class="material-icons blue-text">star</i><i class="material-icons blue-text">star</i><i class="material-icons blue-text">star</i><i class="material-icons blue-text">star</i>' +
                 '</span>' +
                 '</div>' +
                 '</div>' +                 
                 '<div class="row mg0 ht50">' +
                 '<div class="col m6 pd5 dis-tab center ht50">' +
                 '<span class="block b ellipsis">Rent Price</span>' +
                 '<span class="ft12 block ellipsis">₹28000 - ₹55000</span>' +
                 '</div>' +
                 '<div class="col m6 pd5 center ht50">' +
                 '<span class="block b ellipsis">2, 3, 4 BHK</span>' +
                 '<span class="ft12 block ellipsis">1776 Sq. Ft. - 2345 Sq. </span>' +
                 '</div>' +
                 '</div>' +                
                 '</div>' +
                 '</div>'
             ]
             
         ];


         // Add multiple markers to map
         var infoWindow = new google.maps.InfoWindow({  
    
}), marker, i;

         // Place each marker on the map  
         for (i = 0; i < markers.length; i++) {
             var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
             bounds.extend(position);
             marker = new google.maps.Marker({
                 position: position,
                 map: map,
                 title: markers[i][0],
                 icon: markers[i][3],
                 animation: google.maps.Animation.DROP

             });
             google.maps.event.addListener(infoWindow, 'closeclick', function() {
                 $('.LeftBox').css('left', '10px');
             });


             // Add info window to marker    
             google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
                 return function() {
                     infoWindow.setContent(infoWindowContent[i][0]);
                     
                     infoWindow.open(map, marker);

                     $('.LeftBox').css('left', '-500px');


                 }
             })(marker, i));



             // Center the map to fit all markers on the screen
             map.fitBounds(bounds);
         }

google.maps.event.addListener(infowindow, 'domready', function() {

   // Reference to the DIV which receives the contents of the infowindow using jQuery
   var iwOuter = $('.gm-style-iw');

   /* The DIV we want to change is above the .gm-style-iw DIV.
    * So, we use jQuery and create a iwBackground variable,
    * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
    */
   var iwBackground = iwOuter.prev();

   // Remove the background shadow DIV
   iwBackground.children(':nth-child(2)').css({'display' : 'none'});

   // Remove the white background DIV
   iwBackground.children(':nth-child(4)').css({'display' : 'none'});

});
         // Set zoom level
         var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
             this.setZoom(13);
             google.maps.event.removeListener(boundsListener);

         });


     }

     // Load initialize function
     google.maps.event.addDomListener(window, 'load', initMap);

 });
