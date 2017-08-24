angular.module('tugOfWarApp').controller('homeController', function($cookies, $rootScope, $scope, $location) {

  //Set default name to Friend
  if($cookies.get('name') === 'null' || !$cookies.get('name')) {
    $scope.name = 'Friend'
  } else {
    $scope.name = $cookies.get('name');
  }

  // Sends user to profile page
  $scope.changeNameButton = () => {
    $location.path('/profile');
  }

  // Joins an existing game
  $scope.joinRoom = (roomName) => {
    // Add user to game and gets back details of the game
    axios.post('/joinRoom', {
      roomName,
      name: $cookies.get('name'),
      userId: $cookies.get('id')
    })
    .then((resp) => {
      //Check if game exists
      if(resp.data !== 'room does not exist') {
        console.log('resp.data', resp.data);

        // Set cookies to the joined game
        $cookies.putObject('students', resp.data.users);
        $cookies.putObject('questions', resp.data.questions);
        $cookies.put('currentGame', resp.data.name);
        $cookies.put('teamOne', resp.data.team_one);
        $cookies.put('teamTwo', resp.data.team_two);
        $cookies.put('creatorId', resp.data.creator);
        $cookies.put('ropePosition', resp.data['rope_position']);

        // Send user to the game
        $location.path('/gameRoom');
        $rootScope.$apply();
      } else {

        // Tell user if the game does not exist
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

  // Send user to create new game
  $scope.createNewRoom = () => {
    $location.path('/createNewGame');
  }

  // Logs user out and erases cookies
  $scope.logout = () => {
    for(var x in $cookies.getAll()  ) {
      $cookies.remove(x);
    }

    $location.path('/login');
  }
})
