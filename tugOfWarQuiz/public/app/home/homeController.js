angular.module('tugOfWarApp').controller('homeController', function($cookies, $rootScope, $scope, $location) {
  
  if($cookies.get('name') === 'null' || !$cookies.get('name')) {
    $scope.name = 'Friend'
  } else {
    $scope.name = $cookies.get('name');
  }

  $scope.changeNameButton = () => {
    $location.path('/profile');
  }

  $scope.joinRoom = (roomName) => {
    console.log('roomName', roomName);

    axios.post('/joinRoom', {
      roomName,
      userId: $cookies.get('id')
    })
    .then((resp) => {
      console.log(`new game ready for ${roomName}!`, resp);
      let gameId = resp.data[0].game_id;
      if(resp.data !== 'room does not exist') {
          $location.search({ students: $rootScope.gameRooms[gameId] });
          $location.path('/gameRoom');
          $rootScope.$apply();
      } else {
        console.log('room does not exist');
      }
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
