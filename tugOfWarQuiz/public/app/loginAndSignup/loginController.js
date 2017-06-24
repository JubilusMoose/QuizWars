angular.module('tugOfWarApp').controller('loginController', function($rootScope, $scope, $location) {
  $scope.access = 'student';
  $scope.loginAttempt = function(email, password) {
    if(!email) {
      console.log('not an email address');
      $location.path('/login');
    } else {
      var access = $scope.access;
      axios.post('/login', {
        email,
        password,
        access
      })
      .then((resp) => {
        if(resp.data) {
          $rootScope.loggedIn = true;
          $location.path('/home');
          $rootScope.$apply();
        } else {
          console.log('student/teacher not in system');
          const inputText = document.querySelectorAll('.loginInput');
          const loginDiv = document.querySelector('.loginDiv');
          const para = document.createElement("P");
          const failMessage = document.createTextNode("Incorrect username or password");
          
          inputText.forEach((ele) => {
            ele.value = '';
          });
          
          para.appendChild(failMessage);

          if(loginDiv.childNodes[0].innerText === "Email is already in use"){
            loginDiv.removeChild(loginDiv.childNodes[0]);
          } 

          if(loginDiv.childNodes[0].innerText !== "Incorrect username or password") {
            loginDiv.insertBefore(para, loginDiv.firstChild);
          }

          $location.path('/login');
        }
      })
      .catch((err) => {
        console.log('error retrieving student', err);
      })
    }
  }

  $scope.signupAttempt = function(email, password) {
    var access = $scope.access;
    axios.post('/signup', {
      email,
      password,
      access
    })
    .then((resp) => {
      console.log('resp.data', resp.data);
      if(resp.data !== 'email in system') {
        $rootScope.loggedIn = true;
        $location.path('/home')
      } else {
        console.log('Student/Teacher email already in use');
        const inputText = document.querySelectorAll('.loginInput');
        const loginDiv = document.querySelector('.loginDiv');
        const para = document.createElement("P");
        const failMessage = document.createTextNode("Email is already in use");
        
        inputText.forEach((ele) => {
          ele.value = '';
        });
        
        para.appendChild(failMessage);

        if(loginDiv.childNodes[0].innerText === "Incorrect username or password"){
            loginDiv.removeChild(loginDiv.childNodes[0]);
          } 

        if(loginDiv.childNodes[0].innerText !== "Email is already in use") {
          loginDiv.insertBefore(para, loginDiv.firstChild);
        }

        $location.path('/login');
      }
    })
    .catch((err) => {
      console.log('error signing up', err);
    })
  }
});
