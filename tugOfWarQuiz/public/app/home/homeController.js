angular.module('tugOfWarApp').controller('homeController', function($scope, $location) {
  $scope.startNewGame = function(roomName) {
    axios.get('/newGame')
      .then((res) => {
        console.log(`new game ready for ${roomName}!`);
        $location.path('/newGame');
      })
      .catch((err) => {
        console.log(err);
      })
  }
})
