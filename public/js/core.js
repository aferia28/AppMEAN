var app = angular.module('VistasApp', ['ngRoute','satellizer','ngAnimate','ngMessages']);
app.config(function($routeProvider, $authProvider)
{

  $authProvider.signupUrl   = 'http://localhost:8080/auth/signup';
  $authProvider.loginUrl    = 'http://localhost:8080/auth/login';
  $authProvider.tokenName   = 'token';
  $authProvider.tokenPrefix = 'authenticationApp',

	$routeProvider
    .when('/',{
      controller: 'homeController',
      templateUrl: 'views/content.html',
  })
  	.when('/winesearcher',{
  		controller: 'wineSearcherController',
    	templateUrl: 'views/wines.html',
      resolve: {
        authenticated: ["$location", '$auth', function($location, $auth){
          if(!$auth.isAuthenticated()){
            return $location.path('/signup');
          }
        }]
      }
  })
    .when('/ownwines',{
      controller: '',
      templateUrl: 'views/ownwines.html',
      resolve: {
        authenticated: ["$location", '$auth', function($location, $auth){
          if(!$auth.isAuthenticated()){
            return $location.path('/signup');
          }
        }]
      }
  })
    .when('/login',{
      controller: 'LoginController',
      templateUrl: 'views/login.html'
  })
    .when('/signup',{
      controller: 'SignUpController',
      templateUrl: 'views/signup.html'
  })
  	.when('/product/:wineCode',{
  		controller: 'productSearcherController',
    	templateUrl: 'views/product.html'
  })
    .when('/private',{
      controller: '',
      templateUrl: 'views/private.html',
      resolve: {
        authenticated: ["$location", '$auth', function($location, $auth){
          if(!$auth.isAuthenticated()){
            return $location.path('/signup');
          }
        }]
      }
  })
    .when('/perfil/:id',{
      controller: 'profileController',
      templateUrl: 'views/perfil.html',
      resolve: {
        authenticated: ["$location", '$auth', function($location, $auth){
          if(!$auth.isAuthenticated()){
            return $location.path('/signup');
          }
        }]
      }
  })
    .when('/logout',{
      controller: 'LogoutController',
      templateUrl: 'views/login.html'
  })
    .when('/admin/perfiles',{
      controller: '',
      templateUrl: 'views/adminperfiles.html'
  })
  	.otherwise({
  		redirectTo: '/'
  });
});
