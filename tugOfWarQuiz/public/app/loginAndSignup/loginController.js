angular.module('tugOfWarApp').controller('loginController', function($cookies, $rootScope, $scope, $location) {

  // Logs in user
  $scope.loginAttempt = function(email, password) {
    if(!email) {
      // If the email input is not in email form do not do anything
      console.log('not an email address');
      $location.path('/login');
    } else {

      // Attempt to log in the user
      axios.post('/login', {
        email,
        password
      })
      .then((resp) => {

        // Check if user is in our system
        console.log('resp.data', resp.data);
        if(resp.data !== 'user not in system') {

          // Set cookies for this user
          var now = new Date();
          var expireDate = new Date(now.getTime() + 10 * 60 * 60 * 1000);

          $cookies.put('id', resp.data.id);
          $cookies.put('name', resp.data.name);
          $cookies.put('email', email, {expires: expireDate});
          $cookies.put('password', password, {expires: expireDate});

          // Send user to home page
          $location.path('/home');
          $rootScope.$apply();
        } else {
          // Tell the user if they are not in the system
          console.log('student/teacher not in system');
          let inputText = document.querySelectorAll('.loginInput');
          let loginDiv = document.querySelector('.headerDiv');
          let para = document.createElement("P");
          let failMessage = document.createTextNode("Incorrect username or password");
          
          inputText.forEach((ele) => {
            ele.value = '';
          });
          
          para.appendChild(failMessage);

          // If there is a different error override it
          if(loginDiv.childNodes[0].innerText === "Email is already in use") {
            loginDiv.removeChild(loginDiv.childNodes[0]);
          } 

          // If there is a different error override it
          if(loginDiv.childNodes[0].innerText !== "Incorrect username or password") {
            loginDiv.insertBefore(para, loginDiv.firstChild);
          }
        }
      })
      .catch((err) => {
        console.log('error retrieving student', err);
      })
    }
  }

  // Sign up the user
  $scope.signupAttempt = function(email, password) {

    // Send user data to the server
    axios.post('/signup', {
      email,
      password
    })
    .then((resp) => {

      // Check if user already exists
      console.log('resp.data', resp);
      if(resp.data !== 'email in system') {

        // Set cookies for this user
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1);

        $cookies.put('id', resp.data.id);
        $cookies.put('name', 'Friend');
        $cookies.put('email', email, {expires: expireDate});
        $cookies.put('password', password);

        // Send user to home page
        $location.path('/home');
        $rootScope.$apply();
      } else {

        // Tell the user that the email is already in use
        console.log('Student/Teacher email already in use');
        const inputText = document.querySelectorAll('.loginInput');
        const loginDiv = document.querySelector('.headerDiv');
        const para = document.createElement("P");
        const failMessage = document.createTextNode("Email is already in use");
        
        inputText.forEach((ele) => {
          ele.value = '';
        });
        
        para.appendChild(failMessage);

        // If there is a different error override it
        if(loginDiv.childNodes[0].innerText === "Incorrect username or password"){
            loginDiv.removeChild(loginDiv.childNodes[0]);
          } 

        // If there is a different error override it 
        if(loginDiv.childNodes[0].innerText !== "Email is already in use") {
          loginDiv.insertBefore(para, loginDiv.firstChild);
        }

        // Do not send the user anywhere
        $location.path('/login');
      }
    })
    .catch((err) => {
      console.log('error signing up', err);
    })
  }
});
