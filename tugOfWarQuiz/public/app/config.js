angular.module('tugOfWarApp')
  .config(($routeProvider) => {
    $routeProvider
      .when('/newGame', {
        templateUrl: './app/newGame/newGame.html',
        controller: 'newGameController'
      })
      .when('/login', {
        templateUrl: './app/loginAndSignup/login.html',
        controller: 'loginController'
      })
      .otherwise({
        templateUrl: './app/home/home.html',
        controller: 'homeController'
      })
  })
  .run(($rootScope, $location) => {
    console.log('newGame', $rootScope.newGame);
    console.log('logged in', $rootScope.loggedIn);

    window.checkLoggedIn = function() {
      if($rootScope.newGame) {
        $location.path('/newGame');
      } else if ($rootScope.loggedIn) {
        $location.path('/')
      } else {
        $location.path('/login')
      }
    }

    $rootScope.$on('$routeChangeStart', function() {
      window.checkLoggedIn();
    })


  })
