angular.module('tugOfWarApp').controller('profileController', function($cookies, $rootScope, $scope, $location) {
  console.log('inside profileController');
  $scope.name = $cookies.get('name');
  
  $scope.changeName = (name) => {
    console.log('name', name);
    const newNameInputEle = document.querySelector('.newName');

    axios.post('/changeName', {
      name,
      email: $cookies.get('email')
    })
    .then((resp) => {
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

  $scope.goToHomePage = () => {
    $location.path('/home');
    $rootScope.apply();
  }

  $scope.logout = () => {
    for(var x in $cookies.getAll()  ) { 
      $cookies.remove(x); 
    }
    
    $location.path('/login');
    $rootScope.apply();
  }
})