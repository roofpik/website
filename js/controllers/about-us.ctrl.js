app.controller('aboutUsCtrl', function($scope, $timeout, UserTokenService, $location){
	console.log('called');
    var timestamp = new Date().getTime();
    var urlInfo = {
        url: $location.path()
    }
    UserTokenService.checkToken(urlInfo, timestamp, 1);
    
})