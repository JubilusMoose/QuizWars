angular.module('tugOfWarApp').controller('newGameController', function($cookies, $rootScope, $scope, $location) {
  $scope.createGame = (gameName) => {
    axios.post('/createGame', {
      gameName,
      userId: $cookies.get('id')
    })
    .then((resp) => {
      console.log('resp data', resp.data);
      console.log('cookies.get(id)', $cookies.get('id'));
      if(resp.data !== 'game already created') {
        const gameId = resp.data.id;
        $cookies.put('creator', $cookies.get('id'));
        console.log('resp', resp.data);
        
        /////////////////////////////////
        ////// SEND TO JOIN ROOM ///////
        ////////////////////////////////

        $location.path('/home');
        $rootScope.$apply()
      } else {
        console.log('game already created');
        let inputText = document.querySelectorAll('.newGameInput');
        let titleDiv = document.querySelector('.titleDiv');
        let para = document.createElement("P");
        let failMessage = document.createTextNode("Game Already Created");
        
        inputText.forEach((ele) => {
          ele.value = '';
        });

        para.appendChild(failMessage);

        if(titleDiv.childNodes[0].innerText !== "Game Already Created") {
          titleDiv.insertBefore(para, titleDiv.firstChild);
        }
      }
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
