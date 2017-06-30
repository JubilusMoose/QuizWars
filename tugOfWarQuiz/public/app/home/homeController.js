angular.module('tugOfWarApp').controller('homeController', function($cookies, $rootScope, $scope, $location) {
  $scope.name = $cookies.get('name') || 'Friend';

  $scope.changeNameButton = () => {
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
    for(var x in $cookies.getAll()  ) { 
      if (x !== 'name') {
        $cookies.remove(x); 
      } 
    }

    $location.path('/login');
  }
})
