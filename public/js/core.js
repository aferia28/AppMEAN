var app = angular.module('VistasApp', ['ngRoute']);
app.config(function($routeProvider)
{
	$routeProvider
  	.when('/vista1',{
  		controller: 'weatherController',
    	templateUrl: 'views/tiempo/tiempo.html'
  })
  	.when('/vista2',{
  		controller: 'controllerRegistro',
    	templateUrl: 'views/registro/registro.html'
  })
  	.otherwise({
  		redirectTo: '/'
  });
});
