angular.module('tugOfWarApp').controller('newGameController', function($cookies, $rootScope, $scope, $location) {

  $scope.addQuestion = () => {
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
    
    questionDiv.appendChild(newTitleP);
    questionDiv.appendChild(newQuestionTextarea);
    questionDiv.appendChild(newAnswerTextarea);

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
    getQAnswers.forEach((answer) => {
      answers.push(answer.value); 
    })

    axios.post('/createGame', {
      gameName,
      userId: $cookies.get('id'),
      questions,
      answers
    })
    .then((resp) => {
      console.log('resp data', resp.data);
      console.log('cookies.get(id)', $cookies.get('id'));
      if(resp.data !== 'game already created') {
        const gameId = resp.data.id;
        $cookies.put('creator', $cookies.get('id'));
        console.log('resp', resp.data);

        console.log('response from server', resp);
        $location.path('/home');
        $rootScope.$apply();
        
        /////////////////////////////////
        ////// SEND TO JOIN ROOM ///////
        ////////////////////////////////
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
