
var admin_app = angular.module('adminApp', ['ngRoute']);
admin_app.config(function($routeProvider)
{
	$routeProvider
    .when('/admin',{
      controller: '',
      templateUrl: '',
  })
  	.when('/perfiles',{
  		controller: '',
    	templateUrl: 'views/admin/admin_perfiles.html',
  })
  	.when('/vinos',{
  		controller: '',
    	templateUrl: 'views/admin/admin_vinos.html',
  })
});
