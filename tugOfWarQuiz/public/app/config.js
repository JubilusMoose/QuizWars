angular.module('tugOfWarApp')
.config(function($routeProvider) {
  $routeProvider
    .when('/newGame', {
      templateUrl: './app/newGame/newGame.html',
      controller: './app/newGame/newGameController.js'
    })
    .otherwise({
      templateUrl: './app/home/home.html',
      controller: 'homeController'
    })
})
