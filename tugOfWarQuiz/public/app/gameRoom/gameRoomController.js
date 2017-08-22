angular.module('tugOfWarApp').controller('gameRoomController', function($cookies, $timeout, $rootScope, $scope, $location) {
  $scope.game = $cookies.get('currentGame');
  $scope.teamOneName = $cookies.get('teamOne');
  $scope.teamTwoName = $cookies.get('teamTwo');

  let studentsArr = JSON.parse($cookies.get('students'));
  let questions = JSON.parse($cookies.get('questions'));

  /////////////////////////////////////////////////////////////////////
  // Need to set teams in DB and retrieve them from DB

  // Set up who is on each team
  $scope.teamOne = [];
  $scope.teamTwo = [];

  // Keeps track of points and how far the image is left or right
  $scope.points = 0;


  // Offsets each student
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

  if($cookies.get('creatorId') === $cookies.get('id')) {
    $scope.creator = false;
  } else {
    $scope.creator = true;
  }

  /////////////////////////////////////////////////////////////////////
  //Display first question
  var questionNumber = 0;
  $scope.question = questions[questionNumber].question;

  // Submits an answer
  $scope.submitAnswer = (answer) => {
    console.log('answer', answer);
  }
  /////////////////////////////////////////////////////////////////////


  // Allows creator to go to the next question
  $scope.nextQuestion = () => {
    questionNumber++;
    if (questions[questionNumber]) {
      $scope.question = questions[questionNumber].question;
    }
  }

  // Sends user to home page
  $scope.goToHomePage = () => {
    $location.path('/home');
  }

  // Logs user out and erases cookies
  $scope.logout = () => {
    for(var x in $cookies.getAll()  ) {
      $cookies.remove(x);
    }

    $location.path('/login');
  }
})
