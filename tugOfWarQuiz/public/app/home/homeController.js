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
    axios.post('/joinRoom', {
      roomName,
      name: $cookies.get('name'),
      userId: $cookies.get('id')
    })
    .then((resp) => {
      if(resp.data !== 'room does not exist') {
        $cookies.putObject('students', resp.data.users);
        $cookies.put('currentGame', resp.data.id);
        $cookies.put('creatorId', resp.data.creator);

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
