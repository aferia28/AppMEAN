var app = angular.module('VistasApp', ['ngRoute']);
app.config(function($routeProvider)
{
	$routeProvider
  	.when('/', {
  		controller: '',
    	templateUrl: 'views/home.html'
  })
  	.when('/vista1',{
  		controller: 'MainController',
    	templateUrl: 'views/tiempo/tiempo.html'
  })
  	.when('/vista2',{
  		controller: '',
    	templateUrl: 'views/registro/registro.html'
  })
  	.otherwise({
  		redirectTo: '/'
  });
});
