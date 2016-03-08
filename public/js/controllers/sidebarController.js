app.controller('sidebarController', ['$scope','$auth','$http','serviceAdmin','$location', function($scope, $auth, $http, serviceAdmin, $location) {

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

	$scope.clickLogin = function() {
		$location.path('/', clickToOpenSignIn);
	}
	$('.hamburger').click(userLogged);
}]);
