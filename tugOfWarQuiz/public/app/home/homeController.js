angular.module('tugOfWarApp').controller('homeController', function($cookies, $rootScope, $scope, $location) {
  $scope.name = $cookies.get('name') || 'Friend';

  $scope.changeNameButton = () => {
    $location.path('/profile');
  }

  $scope.displayTeams = function(teamOne, teamTwo) {
    $rootScope.teamOne = teamOne;
    $rootScope.teamTwo = teamTwo;
  }

  $scope.joinRoom = (roomName) => {
    console.log('roomName', roomName);

    axios.post('/joinRoom', {
      roomName,
      userName: $cookies.id
    })
    .then((resp) => {
      console.log(`new game ready for ${roomName}!`, resp);
      $scope.displayTeams(['jon', 'jimmy'], ['jane', 'jasmine'])
      $location.path('/createNewGame');
      $rootScope.$apply();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  $scope.createNewRoom = () => {
    $location.path('/createNewGame');
  }

  $scope.logout = () => { 
    for(var x in $cookies.getAll()  ) { 
      $cookies.remove(x); 
    }

    $location.path('/login');
  }
})
