
var admin_app = angular.module('adminApp', ['ui.router']);
admin_app.config(function($stateProvider, $urlRouterProvider)
{
	//
	$urlRouterProvider.otherwise('/admin');

	$stateProvider
  	.state('profiles',{
  		url: '/perfiles',
  		controller: '',
    	templateUrl: 'views/admin/admin_perfiles.html',
  })
  	.state('profiles.all', {
  		url: '/allprofiles',
  		controller: 'profilesController',
  		templateUrl: 'views/admin/partials/partials.allprofiles.html',
  })
  	.state('profiles.one', {
  		url: '/oneprofile',
  		controller: '',
  		templateUrl: 'views/admin/partials/partials.oneprofile.html',
  })
  	.state('profiles.profilesid', {
  		url: '/profiles/:id',
  		controller: 'profilesController',
  		templateUrl: 'views/admin/partials/partials.profileid.html',
  })
  	.state('vinos',{
  		url: '/vinos',
  		controller: '',
    	templateUrl: 'views/admin/admin_vinos.html',
  })
});
