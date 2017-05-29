angular.module('tugOfWarApp').controller('loginController', function($rootScope, $scope, $location) {
  console.log('inside login controller');
  $scope.access = 'student';
  $scope.loginAttempt = function(email, password) {
    var access = $scope.access;
    axios.post('/login', {
      email,
      password,
      access
    })
    console.log(email, password, access)
    $rootScope.loggedIn = true;
    $location.path('/home')
  }

  $scope.signupAttempt = function(email, password) {
    var access = $scope.access;
    axios.post('/signup', {
      email,
      password,
      access
    })
    console.log(email, password, access)
    $rootScope.loggedIn = true;
    $location.path('/home')
  }
});
