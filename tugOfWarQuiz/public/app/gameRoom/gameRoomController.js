angular.module('tugOfWarApp').controller('gameRoomController', function($cookies, $rootScope, $scope, $location) {
  let gameId = $cookies.get('currentGame');
  let studentsArr = JSON.parse($cookies.get('students'));

  console.log('gameId', gameId);  
  console.log('students arr', studentsArr);

  $scope.teamOneName = 'Pauls Team';
  $scope.teamTwoName = 'Jons Team';
  $scope.teamOne = [];
  $scope.teamTwo = [];
  var odd = false;

  studentsArr.forEach((student) => {
    if($cookies.get('creatorId') !== student.id) {
      if(!odd) {
        $scope.teamOne.push(student.name);
        odd = !odd;
      } else {
        $scope.teamTwo.push(student.name);
        odd = !odd;
      }
    }
  })

  $scope.goToHomePage = () => {
    $location.path('/home');
    $rootScope.apply();
  }

  $scope.logout = () => { 
    for(var x in $cookies.getAll()  ) { 
      $cookies.remove(x); 
    }

    $location.path('/login');
  }
})
