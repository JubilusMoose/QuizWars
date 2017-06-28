angular.module('tugOfWarApp')
  .config(($routeProvider) => {
    $routeProvider
      .when('/', {
        templateUrl: './app/loginAndSignup/login.html',
        controller: 'loginController'
      })
      .when('/newGame', {
        templateUrl: './app/newGame/newGame.html',
        controller: 'newGameController'
      })
      .when('/login', {
        templateUrl: './app/loginAndSignup/login.html',
        controller: 'loginController'
      })
      .when('/home', {
        templateUrl: './app/home/home.html',
        controller: 'homeController'
      })
      .when('/profile', {
        templateUrl: './app/profile/profile.html',
        controller: 'profileController'
      })
      .otherwise({
        templateUrl: './app/home/home.html',
        controller: 'homeController'
      })
  })
  .run(($cookies, $rootScope, $location) => {
    // Delete this after testing
    // $rootScope.loggedIn = true;

    window.checkLoggedIn = function() {
      console.log('checkedLoggedIn', $cookies.get('email'));
      console.log('cookies', $cookies.getAll());
      if($cookies.get('email') === undefined) {
        $location.path('/login');
      }
    }

    $rootScope.$on('$routeChangeStart', function() {
      window.checkLoggedIn();
    })


  })
