angular.module('tugOfWarApp').controller('gameRoomController', function($cookies, $timeout, $rootScope, $scope, $location) {
  $scope.game = $cookies.get('currentGame');
  $scope.teamOneName = $cookies.get('teamOne');
  $scope.teamTwoName = $cookies.get('teamTwo');

  let studentsArr = JSON.parse($cookies.get('students'));
  let questions = JSON.parse($cookies.get('questions'));

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

  if($cookies.get('creatorId') !== $cookies.get('id')) {
    $scope.creator = false;
  } else {
    $scope.creator = true;
  }

  //Display first question
  var questionNumber = 0;
  $scope.question = questions[questionNumber].question;

  // Set "rope" image position
  document.getElementsByClassName('gameRoomPic')[0].style.marginLeft = $cookies.get('ropePosition') + 'vw';

  // Submits an answer
  $scope.submitAnswer = (answer) => {
    console.log('cookies', $cookies.getAll());

    // Find team number
    if ($scope.teamOne.indexOf($cookies.get('name')) >= 0) {
      var team = 1;
    } else {
      var team = 2;
    }

    axios.post('/answer', {
      question: $scope.question,
      answer,
      game: $scope.game,
      user: $cookies.get('id'),
      team
    })
    .then((resp) => {
      console.log('response', resp.data);
      // Move tug of war rope towards their team
      $scope.rope = resp.data['rope_position'] + 'vw';
      console.log('scope.rope', $scope.rope);
      document.getElementsByClassName('gameRoomPic')[0].style.marginLeft = $scope.rope;

      // Displays next question
      questionNumber++;
      console.log('questionNumber', questionNumber);
      console.log('questions', questions);
      if (questions[questionNumber]) {
        console.log('here');
        $scope.question = questions[questionNumber].question;
        $scope.$apply();
      } else {
        $scope.question = 'Quiz Complete!';
        document.querySelector('.gameRoomAnswerInput').style.display = "none";
        document.querySelector('.gameRoomSubmitButton').style.display = "none";
        $scope.$apply();
      } 

      // Make answer box empty
      document.querySelector('.gameRoomAnswerInput').value = '';
    })
  }


  // Allows creator to go to the next question
  $scope.nextQuestion = () => {
    questionNumber++;
    if (questions[questionNumber]) {
      $scope.question = questions[questionNumber].question;
    } else {
      $scope.question = 'Quiz Complete!'
      document.querySelectorAll('.gameRoomSubmitButton')[1].style.display = "none";
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
