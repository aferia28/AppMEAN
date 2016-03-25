app.controller('profileController', ['$scope', '$http','$rootScope','$routeParams', function($scope, $http, $rootScope,$routeParams) {

	var userId = $routeParams.id;

	$http.get('perfil/' + userId)
	.success(function(data){
		console.log(data);
		$scope.userProfile = data;
	});


	//$scope.pageClass = 'page-weather';
}]);
