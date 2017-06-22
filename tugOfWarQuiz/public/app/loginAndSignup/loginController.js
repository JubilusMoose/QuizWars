angular.module('tugOfWarApp').controller('loginController', function($rootScope, $scope, $location) {
  console.log('inside login controller');
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
          console.log('student not in system');
          const inputText = document.querySelectorAll('.loginInput');
          const loginDiv = document.querySelector('.loginDiv');
          const para = document.createElement("P");
          const failMessage = document.createTextNode("Incorrect username or password");
          
          inputText.forEach((ele) => {
            ele.value = '';
          });
          
          para.appendChild(failMessage);

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
    console.log(email, password, access)
    $rootScope.loggedIn = true;
    $location.path('/home')
  }
});
