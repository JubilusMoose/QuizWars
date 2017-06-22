angular.module('tugOfWarApp').controller('homeController', function($rootScope, $scope, $location) {
  $scope.name = "Friend";

  $scope.changeName = () => {
    $location.path('/profile');
  }

  $scope.displayTeams = function(teamOne, teamTwo) {
    $rootScope.teamOne = teamOne;
    $rootScope.teamTwo = teamTwo;
  }

  $scope.startNewGame = (roomName) => {
    axios.get('/newGame')
      .then(function(res) {
        console.log(`new game ready for ${roomName}!`, res);
        $scope.displayTeams(['jon', 'jimmy'], ['jane', 'jasmine'])
        $location.path('/newGame');
        $rootScope.$apply();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  $scope.logout = () => {
    $rootScope.loggedIn = false;
    $location.path('/login');
  }
})
