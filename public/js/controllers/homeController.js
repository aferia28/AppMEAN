app.controller('homeController', ['$scope','$auth','$http', function($scope, $auth, $http) {


	$("aside").fadeIn("slow", function() {
		$("#content").removeClass("col-sm-12").addClass("col-sm-10");
	});

	if(!$auth.getToken()){

		console.log('No hay persona logeada..');
	}else {

		$http.get('persona')
		.success(function(data) {
			$scope.persona = data;
		})
	}
/*
	$scope.isAuthenticated = function() {

		var aut = $auth.isAuthenticated();
  		return $auth.isAuthenticated();
	};*/
}]);
