angular.module('tugOfWarApp').controller('newGameController', function($cookies, $rootScope, $scope, $location) {

  $scope.addQuestion = () => {

    ///////////////////////////////////////////
    // Need to allow creation of team names //
    //////////////////////////////////////////

    // Create new elements and nodes
    $scope.questionNumber = $scope.questionNumber || 2;
    let questionDiv = document.querySelector('.newGameQuestionDiv');
    let newTitleP = document.createElement("P");
    let newQuestionTextarea = document.createElement("Textarea");
    let newAnswerTextarea = document.createElement("Textarea");
    let question = document.createTextNode("Question " + $scope.questionNumber);

    // Add class to textareas
    newQuestionTextarea.classList.add('newGameQuestion');
    newAnswerTextarea.classList.add('newGameAnswer');

    // Create Title
    newTitleP.appendChild(question);

    // Add placeholders
    newQuestionTextarea.placeholder = "Insert Question Here";
    newAnswerTextarea.placeholder = "Insert Answer Here";
    
    // Put new question on page
    questionDiv.appendChild(newTitleP);
    questionDiv.appendChild(newQuestionTextarea);
    questionDiv.appendChild(newAnswerTextarea);

    // Increase question number for next addQuestion call
    $scope.questionNumber++;
  }

  $scope.createGame = (gameName) => {

    // Get questions from form and send to server
    var questions = [];
    var getQuestions = document.querySelectorAll('.newGameQuestion');
    getQuestions.forEach((question) => {
      questions.push(question.value); 
    })

    // Get questions from form and send to server
    var answers = [];
    var getAnswers = document.querySelectorAll('.newGameAnswer');
    getAnswers.forEach((answer) => {
      answers.push(answer.value); 
    })

    // Send game to server to be saved in DB
    axios.post('/createGame', {
      gameName,
      userId: $cookies.get('id'),
      questions,
      answers
    })
    .then((resp) => {

      // If game has not already been created
      if(resp.data !== 'game already created') {
        $cookies.put('creator', $cookies.get('id'));

        $location.path('/home');
        $rootScope.$apply();
      
      // Game already exists
      } else {

        // Create elements
        let inputText = document.querySelectorAll('.newGameInput');
        let titleDiv = document.querySelector('.titleDiv');
        let para = document.createElement("P");
        let failMessage = document.createTextNode("Game Already Created");
        
        // Reset values
        inputText.forEach((ele) => {
          ele.value = '';
        });

        // Attach message
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

  // Sends user to the homePage
  $scope.goToHomePage = () => {
    $location.path('/home');
    $rootScope.$apply();
  }

  // Logs user out and removes cookies
  $scope.logout = () => { 
    for(var x in $cookies.getAll()  ) { 
      $cookies.remove(x); 
    }

    $location.path('/login');
    $rootScope.apply();
  }
})
