app.controller('homeController', ['$scope','$auth','$http', function($scope, $auth, $http) {

	$("aside").fadeIn("slow", function() {
		$("#content").removeClass("col-sm-12").addClass("col-sm-10");
	});

		var currenToken = $auth.getToken();
		if(!currenToken) {
			console.log("No hay persona autenticada");
		}else{
			console.log("Token: " + currenToken);
			//$scope.currenToken = currenToken;
			$http.get('persona')
				.success(function(data) {
					$scope.persona = data;

					if(data.isAdmin){

						console.log('El usuario ' + data.nombre + ' es administrador');

						var element = angular.element(document.querySelector('#listitem'));
						element.append('<li><a href="/admin">ADMIN</a></li>');

					}else{
						console.log('El usuario ' + data.nombre + ' no es administrador')
					}
					console.log(data);
				})
		}


	$scope.isAuthenticated = function() {

		var aut = $auth.isAuthenticated();
  		return $auth.isAuthenticated();
	};
}]);
