angular.module('tugOfWarApp').controller('gameRoomController', function($cookies, $rootScope, $scope, $location) {
  console.log('array of students', $location.search().students);
  const studentsArr = $location.search().players;
  $scope.teamOneName = 'Pauls Team';
  $scope.teamTwoName = 'Jons Team';
  $scope.teamOne = [];
  $scope.teamTwo = [];
  var odd = false;

  studentsArr.forEach((student) => {
    if(odd) {
      $scope.teamOne.push(student.user_id);
      odd = !odd;
    } else {
      $scope.teamTwo.push(student.user_id);
      odd = !odd;
    }
  })
})
