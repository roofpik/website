app.controller('home-ctrl', function($scope){

	$('#location').click(function() {
		console.log("called");
	});
	    $('input.autocompletefind').autocomplete({
	    	limit: 10,
         data: {
             "Apple": null,
             "App": null,
             "Ap": '',
             "Microsoft": 'http://placehold.it/250x250'
         }
         
     });

$('input.autocompletenear').autocomplete({
	    	getData: function (value, callback) {

	    	};
	    	
         data:  {
             "Apple Near": null,
             "App": null,
             "Ap": '',
             "Microsoft": 'http://placehold.it/250x250'
             
         }
    
     });

})
