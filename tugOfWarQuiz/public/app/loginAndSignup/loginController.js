angular.module('tugOfWarApp').controller('loginController', function($rootScope, $scope, $location) {
  console.log('inside login controller');
  $scope.loginAttempt = function(email, password) {
      $rootScope.loggedIn = true;
      $location.path('/home')
  }
});
