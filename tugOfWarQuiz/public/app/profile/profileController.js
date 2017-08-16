angular.module('tugOfWarApp').controller('profileController', function($cookies, $rootScope, $scope, $location) {
  console.log('inside profileController');
  $scope.name = $cookies.get('name');
  
  // Changes name of the user
  $scope.changeName = (name) => {

    // Find value of input and reset it to empty
    const newNameInputEle = document.querySelector('.newName');

    // Change name in DB
    axios.post('/changeName', {
      name,
      email: $cookies.get('email')
    })
    .then((resp) => {

      // Change cookies to represent new name
      console.log('response from changeName', resp.data);
      const expirationDate = new Date();
      expirationDate.setTime(2144232732000);

      newNameInputEle.value = '';
      $cookies.put('name', name, {expires: expirationDate});
      $scope.name = name;
      $rootScope.$apply();
    })
    .catch((err) => {
      console.log('error in posting to change name', err);
    })
  }

  // Send user to home page
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
    $rootScope.apply();
  }
})