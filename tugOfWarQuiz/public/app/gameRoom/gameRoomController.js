angular.module('tugOfWarApp').controller('gameRoomController', function($cookies, $rootScope, $scope, $location) {
  let gameId = $cookies.get('currentGame');
  let studentsArr = JSON.parse($cookies.get('students'));
  let questions = JSON.parse($cookies.get('questions'));

  console.log('gameId', gameId);  
  console.log('students arr', studentsArr);

  //////////////////////////////////////////
  // Need to get team names from created //
  $scope.teamOneName = 'Pauls Team';
  $scope.teamTwoName = 'Jons Team';
  //////////////////////////////////////////

  // Set up who is on each team
  $scope.teamOne = [];
  $scope.teamTwo = [];
  var odd = false;

  studentsArr.forEach((student) => {

    // Don't add creator on a team
    if($cookies.get('creatorId') !== student.id.toString()) {
      if(!odd) {
        if (student.name) {
          $scope.teamOne.push(student.name);
        } else {
          // Name student anonymous if they haven't set up a name yet
          $scope.teamOne.push('anonymous');
        }
        odd = !odd;
      } else {
        if (student.name) {
          $scope.teamTwo.push(student.name);
        } else {
          // Name student anonymous if they haven't set up a name yet
          $scope.teamTwo.push('anonymous');
        }
        odd = !odd;
      }
    }
  })

  //Display first question
  $scope.question = questions[0].question;
  console.log(questions[0].question);

  $scope.submitAnswer = (answer) => {
    console.log('answer', answer);
  }

  // Sends user to home page
  $scope.goToHomePage = () => {
    $location.path('/home');
    $rootScope.apply();
  }

  // Logs user out and erases cookies
  $scope.logout = () => { 
    for(var x in $cookies.getAll()  ) { 
      $cookies.remove(x); 
    }

    $location.path('/login');
  }
})
