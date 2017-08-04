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
    console.log('student', student);
    console.log('creatorId', $cookies.get('creatorId'));
    console.log('studentId', student.id);
    if($cookies.get('creatorId') !== student.id.toString()) {
      if(!odd) {
        if (student.name) {
          console.log('here');
          $scope.teamOne.push(student.name);
        } else {
          console.log('here');
          $scope.teamOne.push('anonymous');
        }
        odd = !odd;
      } else {
        if (student.name) {
          $scope.teamTwo.push(student.name);
        } else {
          $scope.teamTwo.push('anonymous');
        }
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
