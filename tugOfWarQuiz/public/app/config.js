angular.module('tugOfWarApp')
.config(function($routeProvider) {
  $routeProvider
    .when('/newGame', {
      templateUrl: './app/newGame/newGame.html'
    })
    .otherwise({
      templateUrl: './app/home/home.html',
      controller: 'homeController'
    })
})
