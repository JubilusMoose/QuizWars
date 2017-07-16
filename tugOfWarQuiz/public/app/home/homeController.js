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
      console.log(`joining ${roomName}!`, resp);
      let gameId = resp.data[0].game_id;
      if(resp.data !== 'room does not exist') {
        $rootScope.gameRooms[gameId].students = resp.data;
        $location.search({ players: $rootScope.gameRooms[gameId].students });
        $location.path('/gameRoom');
        $rootScope.$apply();
      } else {
        console.log('room does not exist');
        let inputText = document.querySelectorAll('.homeInput');
        let footerDiv = document.querySelector('.footerDiv');
        let para = document.createElement("P");
        let failMessage = document.createTextNode("Game Does Not Exist");
        
        inputText.forEach((ele) => {
          ele.value = '';
        });

        para.appendChild(failMessage);

        if(footerDiv.childNodes[0].innerText !== "Game Does Not Exist") {
          footerDiv.insertBefore(para, footerDiv.firstChild);
        }
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
