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
      userName: $cookies.id
    })
    .then((resp) => {
      console.log(`new game ready for ${roomName}!`, resp);
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
