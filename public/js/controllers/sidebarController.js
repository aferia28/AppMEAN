app.controller('sidebarController', ['$scope','$auth','$http','serviceAdmin', function($scope, $auth, $http, serviceAdmin) {

	$scope.isAuthenticated = function() {

		return $auth.isAuthenticated();
	}
	userLogged = function() {

		if($auth.isAuthenticated()){
			$http.get('persona')
			.success(function(data) {
				$scope.user = data;
				console.log(data);
			})
		}
	}

	$('.hamburger').click(userLogged);
}]);
