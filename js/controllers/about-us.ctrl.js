app.controller('aboutUsCtrl', function($scope, $timeout, UserTokenService, $location){
	document.title = 'About Roofpik';
    var timestamp = new Date().getTime();
    var urlInfo = {
        url: $location.path()
    }
    UserTokenService.checkToken(urlInfo, timestamp, 1);
    loading(false);
});