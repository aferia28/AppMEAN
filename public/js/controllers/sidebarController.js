app.controller('sidebarController', ['$scope','$auth','$http', function($scope, $auth, $http) {

	$scope.isAuthenticated = function() {

		return $auth.isAuthenticated();
	}

	if($auth.isAuthenticated()){
		$http.get('persona')
		.success(function(data) {
			$scope.userAdmin = data.isAdmin;
			console.log(data.isAdmin);
		})
	}

}]);
