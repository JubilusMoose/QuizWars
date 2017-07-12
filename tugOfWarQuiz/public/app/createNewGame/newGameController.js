angular.module('tugOfWarApp').controller('newGameController', function($cookies, $rootScope, $scope, $location) {
  $scope.createGame = (gameName) => {
    axios.post('/createGame', {
      gameName,
      userId: $cookies.get('id')
    })
    .then((resp) => {
      console.log('resp data', resp.data);
      console.log('cookies.get(id)', $cookies.get('id'));
      axios.post('/joinRoom', {
        roomName: gameName,
        userId: $cookies.get('id')
      })
      .then((resp) => {
        console.log('resp', resp.data);
        $location.path('/home');
        $rootScope.$apply()
      })
    })
    .catch((err) => {
      console.log('error in createGame call', err);
    })
  }

  $scope.goToHomePage = () => {
    $location.path('/home');
    $rootScope.$apply();
  }

  $scope.logout = () => { 
    for(var x in $cookies.getAll()  ) { 
      $cookies.remove(x); 
    }

    $location.path('/login');
    $rootScope.apply();
  }
})
