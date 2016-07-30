 var config = {
     apiKey: "AIzaSyD_4bPp5HKryXDzaQwfRhqAU5SsSAdDIJ0",
     authDomain: "roofpik-948d0.firebaseapp.com",
     databaseURL: "https://roofpik-948d0.firebaseio.com",
     storageBucket: "roofpik-948d0.appspot.com",
 };
 firebase.initializeApp(config);



 function contactUs() {

     var postData = {
         name: $('#uname').val(),
         email: $('#uemail').val(),
         message: $('#umessage').val()
     };
     // Get a key for a new Post.
     var newPostKey = firebase.database().ref().child('contactUs').push().key;

     $('#thankYouModal').modal('show');
     console.log(newPostKey);
     // Write the new post's data simultaneously in the posts list and the user's post list.
     var updates = {};
     updates['/contactUs/' + newPostKey] = postData;
     firebase.database().ref().update(updates);

     $('#uname').val("");
        $('#uemail').val("");
        $('#umessage').val("");


 }


 function showModal(package) {
     $('#custName').val("");
     $('#mobileNo').val("");
     $('#custEmail').val("");
     $('#addLine1').val("");
     $('#addLine2').val("");
     $("#optionsRadios" + package).prop("checked", true);
     $('#termsCheck').attr('checked', false);

     $('#myModal').modal('show');
 }


 $(document).ready(function() {
     $('input[type=radio][name=optionsRadios]').change(function() {

     });


 });

 function makePayment() {
     // deleteAllCookies();


     var payment = true;

     if ($("#myModal input:checkbox:checked").length > 0) {
         $('.terms-error').hide();
         payment = true;

     } else {
         $('.terms-error').show();
         payment = false;
     }

     if ($('#custName').val() != "") {
         if (payment) {
             payment = true;
         }
         $('.name-error').hide();
     } else {
         payment = false;
         $('.name-error').show();
     }

     if ($('#mobileNo').val() != "") {
         if (payment) {
             payment = true;
         }
         $('.mobile-error').hide();
     } else {
         payment = false;
         $('.mobile-error').show();
     }

     if ($('#custEmail').val() != "") {
         if (payment) {
             payment = true;
         }
         $('.email-error').hide();
     } else {
         payment = false;
         $('.email-error').show();
     }

     if ($('#addLine1').val() != "") {
         if (payment) {
             payment = true;
         }
         $('.add-error').hide();
     } else {
         payment = false;
         $('.add-error').show();
     }


     // document.cookie = "username=John Doe";
     var x = document.cookie;
     console.log(x);

     if (payment) {
         $('.modal-body').hide();
         $('.modal-footer').hide();
         $('.modal-loading').show();
         var d = new Date();
         var postData = {
             name: $('#custName').val(),
             email: $('#custEmail').val(),
             mobile: $('#mobileNo').val(),
             addLine1: $('#addLine1').val(),
             addLine2: $('#addLine2').val(),
             city: $('#city').val(),
             plan: $('input[name=optionsRadios]:checked', '#selPlan').val(),
             time: d.getTime()
         };
         // Get a key for a new Post.
         var newPostKey = firebase.database().ref().child('contactUs').push().key;
         console.log(newPostKey);
         // Write the new post's data simultaneously in the posts list and the user's post list.
         console.log(postData)
         var updates = {};
         updates['/keyper/' + newPostKey] = postData;
         firebase.database().ref().update(updates).then(function() {
             document.cookie = "transaction=" + newPostKey;

             if ($('input[name=optionsRadios]:checked', '#selPlan').val() == 'option0') {
                 window.location = 'https://www.payumoney.com/paybypayumoney/#/155995';
             } else if ($('input[name=optionsRadios]:checked', '#selPlan').val() == 'option1') {
                 window.location = 'https://www.payumoney.com/paybypayumoney/#/162327';
             } else if ($('input[name=optionsRadios]:checked', '#selPlan').val() == 'option2') {
                 window.location = 'https://www.payumoney.com/paybypayumoney/#/163107';
             } else if ($('input[name=optionsRadios]:checked', '#selPlan').val() == 'option3') {
                 window.location = 'https://www.payumoney.com/paybypayumoney/#/163111';
             } else if ($('input[name=optionsRadios]:checked', '#selPlan').val() == 'option4') {
                 window.location = 'https://www.payumoney.com/paybypayumoney/#/163119';
             }

         })



     } else {
         // var x = document.cookie;
         // console.log(x);
     }
 }


 function deleteAllCookies() {
     var cookies = document.cookie.split(";");

     for (var i = 0; i < cookies.length; i++) {
         var cookie = cookies[i];
         var eqPos = cookie.indexOf("=");
         var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
         document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
     }
 }
