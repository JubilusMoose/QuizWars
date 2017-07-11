angular.module('tugOfWarApp').controller('newGameController', function($cookies, $scope, $location) {
  $scope.createGame = (gameName) => {
    axios.post('/createGame', {
      gameName,
      userId: $cookies.get('id')
    })
    .then((resp) => {
      console.log(resp);
      $location.path('/gameRoom');
    })
    .catch((err) => {
      console.log('error in createGame call', err);
    })
  }

  $scope.goToHomePage = () => {
    $location.path('/home');
    $rootScope.apply();
  }

  $scope.logout = () => { 
    for(var x in $cookies.getAll()  ) { 
      $cookies.remove(x); 
    }

    $location.path('/login');
    $rootScope.apply();
  }
})
