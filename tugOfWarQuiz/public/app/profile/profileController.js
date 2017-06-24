angular.module('tugOfWarApp').controller('profileController', function($rootScope, $scope, $location) {
  console.log('inside profileController');
  $scope.changeName = (name) => {
    console.log('name', name);
    $rootScope.name = name;
    $scope.name = name;
  }
})