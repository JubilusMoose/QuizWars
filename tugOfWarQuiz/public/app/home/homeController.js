angular.module('tugOfWarApp').controller('homeController', function($rootScope, $scope, $location) {
  $scope.startNewGame = (roomName) => {
    axios.get('/newGame')
      .then(function(res) {
        console.log(`new game ready for ${roomName}!`, res);
        $rootScope.newGame = true;
        $location.path('/newGame');
        $rootScope.$apply();
      })
      .catch((err) => {
        console.log(err);
      })
  }
})
