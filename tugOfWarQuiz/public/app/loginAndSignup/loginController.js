angular.module('tugOfWarApp').controller('loginController', function($rootScope, $scope, $location) {
  console.log('inside login controller');
  $scope.access = 'student';
  $scope.loginAttempt = function(email, password) {
      console.log(email, password, $scope.access)
      $rootScope.loggedIn = true;
      $location.path('/home')
  }
});
