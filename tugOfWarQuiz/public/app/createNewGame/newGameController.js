angular.module('tugOfWarApp').controller('newGameController', function($cookies, $scope) {
  $scope.createGame = (gameName) => {
    axios.post('/createGame', {
      gameName,
      userId: $cookies.get('id')
    })
    .then((resp) => {
      console.log(resp)
    })
    .catch((err) => {
      console.log('error in createGame call', err);
    })
  }
})
