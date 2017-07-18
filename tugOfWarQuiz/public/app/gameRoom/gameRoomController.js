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
    if(!odd) {
      $scope.teamOne.push(student.user_id);
      odd = !odd;
    } else {
      $scope.teamTwo.push(student.user_id);
      odd = !odd;
    }
  })
})
