app.controller('sidebarController', ['$scope','$auth','$http','serviceAdmin','$location', function($scope, $auth, $http, serviceAdmin, $location) {

	$scope.isAuthenticated = function() {

		return $auth.isAuthenticated();
	}
	$scope.userLogged = function() {
		//console.log(serviceAdmin.getProperty());
		return serviceAdmin.getProperty();
	}
}]);
