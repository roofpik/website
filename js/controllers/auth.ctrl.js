  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };

    $scope.login = function(){
      console.log('login');
    };

     $scope.signUp = function(){
      console.log('signup');
    }
  };