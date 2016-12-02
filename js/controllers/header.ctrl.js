app.controller('headerCtrl', function($scope, $mdDialog){
	$scope.user = false;
	$scope.showAdvanced = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: '/templates/dialogs/auth.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };
});