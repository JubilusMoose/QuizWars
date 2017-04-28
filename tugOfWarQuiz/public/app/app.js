angular.module('tugOfWarApp', ['ngRoute'])
.config(function($routeProvider) {
  $routeProvider
    .when('/newGame', {
      redirectTo: '/newGame'
    })
    .otherwise({
      redirectTo: '/home'
    })
})
