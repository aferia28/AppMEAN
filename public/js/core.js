var app = angular.module('VistasApp', ['ngRoute','satellizer','ngAnimate','ngMessages', 'ngCookies','720kb.socialshare', 'ngDialog', 'summernote', 'angular-cardflow','ngFileUpload']);

app.config(function($routeProvider, $authProvider, socialshareConfProvider)
{
  socialshareConfProvider.configure([{
      'provider': 'twitter',
      'conf': {
        'url': '',
        'text': '',
        'via': 'onWine',
        'hashtags': 'winepassion',
        'trigger': 'click',
        'popupHeight': 500,
        'popupWidth' : 400
      }
    },
    {
      'provider': 'facebook',
      'conf': {
        'url': '',
        'trigger': 'click',
        'popupHeight': 1300,
        'popupWidth' : 1000
      }
    }
  ]);

  $authProvider.signupUrl   = 'http://localhost:8080/auth/signup';
  $authProvider.loginUrl    = 'http://localhost:8080/auth/login';
  $authProvider.tokenName   = 'token';
  $authProvider.tokenPrefix = 'authenticationApp',

	$routeProvider
    .when('/',{
      controller: 'homeController',
      templateUrl: 'views/contentLogin.html',
      resolve: {
        authenticated: ["$location", '$auth', function($location, $auth){
          if($auth.isAuthenticated()){
            return $location.path('/home');
          }
        }]
      }
  })
    .when('/home',{
      controller: 'homeController',
      templateUrl: 'views/content.html',
      resolve: {
        authenticated: ["$location", '$auth', function($location, $auth){
          if(!$auth.isAuthenticated()){
            return $location.path('/');
          }
        }]
      }
  })
  	.when('/winesearcher',{
  		controller: 'wineSearcherController',
    	templateUrl: 'views/wines.html',
      resolve: {
        authenticated: ["$location", '$auth', function($location, $auth){
          if(!$auth.isAuthenticated()){
            return $location.path('/');
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
            return $location.path('/');
          }
        }]
      }
  })
  	.when('/product/:wineCode',{
  		controller: 'productSearcherController',
    	templateUrl: 'views/product.html',
      resolve: {
        authenticated: ["$location", '$auth', function($location, $auth){
          if(!$auth.isAuthenticated()){
            return $location.path('/');
          }
        }]
      }

  })
    .when('/topwines',{
      controller: 'topWinesController',
      templateUrl: 'views/topwines.html',
      resolve: {
        authenticated: ["$location", '$auth', function($location, $auth){
          if(!$auth.isAuthenticated()){
            return $location.path('/');
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
            return $location.path('/');
          }
        }]
      }
  })
    .when('/logout',{
      controller: 'LogoutController',
      templateUrl: 'views/contentLogin.html'
  })
    .when('/admin/perfiles',{
      controller: '',
      templateUrl: 'views/adminperfiles.html',
      resolve: {
        authenticated: ["$location", '$auth', function($location, $auth){
          if(!$auth.isAuthenticated()){
            return $location.path('/');
          }
        }]
      }
  })
    .when('/pageaddwine',{
      controller: 'addWineController',
      templateUrl: 'views/addwine.html',
      resolve: {
        authenticated: ["$location", '$auth', function($location, $auth){
          if(!$auth.isAuthenticated()){
            return $location.path('/');
          }
        }]
      }
  })
  	.otherwise({
  		redirectTo: '/'
    });
});
