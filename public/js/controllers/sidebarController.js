app.controller('sidebarController', ['$scope','$auth','$http','serviceAdmin','$location','$rootScope', function($scope, $auth, $http, serviceAdmin, $location, $rootScope) {

	$scope.isAuthenticated = function() {

		return $auth.isAuthenticated();
	}
	$scope.userLogged = function() {
		//console.log(serviceAdmin.getProperty());
		return serviceAdmin.getProperty();
	}

	$scope.openSignIn = function() {
		$rootScope.$emit('clickToOpenSI', {});
	}

	$scope.openSignUp = function() {
		$rootScope.$emit('clickToOpenSU', {});
	}
}]);
