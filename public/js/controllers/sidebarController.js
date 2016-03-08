app.controller('sidebarController', ['$scope','$auth','$http','serviceAdmin', function($scope, $auth, $http, serviceAdmin) {

	$scope.isAuthenticated = function() {

		return $auth.isAuthenticated();
	}
	$scope.userLogged = function() {
		//console.log(serviceAdmin.getProperty());
		return serviceAdmin.getProperty();
	}

	//$('.hamburger').click(userLogged);
}]);
