
var admin_app = angular.module('adminApp', ['ui.router']);
admin_app.config(function($stateProvider, $urlRouterProvider)
{
	//
	$urlRouterProvider.otherwise('/admin');

	$stateProvider
    .state('home',{
      url: '/admin',
      controller: 'profilesController',
      templateUrl: 'views/admin/admin_home.html',
  })
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
  	.state('profiles.profilesid', {
  		url: '/profiles/:id',
  		controller: 'profilesController',
  		templateUrl: 'views/admin/partials/partials.profileid.html',
  })
  	.state('vinos',{
  		url: '/vinos',
  		controller: 'profilesController',
    	templateUrl: 'views/admin/admin_vinos.html',
  })
    .state('vinos.all', {
      url: '/allwines',
      controller: 'profilesController',
      templateUrl: 'views/admin/partials/partials.allwines.html',
  })
    .state('vinos.winesid', {
      url: '/wines/:id',
      controller: 'profilesController',
      templateUrl: 'views/admin/partials/partials.wineid.html',
  })
});
