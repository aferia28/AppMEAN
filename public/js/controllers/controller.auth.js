app.controller('SignUpController', ['$auth','$location','$scope','$http', function($auth, $location, $scope, $http){

	var vm = this;
	console.log("Dentro de SignUp controller");
	//console.log(this);
	$scope.signup = function(isValid){

		console.log("h");
      	if(isValid)
      	{
      			$auth.signup($scope.persona)
					.then(function(){
						$http.get('/send/'+$scope.persona.email)
      						.success(function(data) {
      							console.log('Controller FrontEnd: Email enviado');
					            console.log("Uusiario creado satisfactoriamente");
      						});
      						//$location.path("/");
					})
					.catch(function(response){
						response.send(500);
						console.log('algun error en el registro.');
					});
      	}else{
        	alert("Las dos contraseñas deben ser iguales");
      	}
	}
	$scope.pageClass = 'page-signup';
}]);

app.controller('LoginController', ['$auth', '$location','$scope','$http','$cookies','serviceAdmin', function($auth, $location, $scope, $http, $cookies, serviceAdmin){

	var vm = this;
	console.log("Dentro LoginController Cliente");
	$scope.login = function(){

		$auth.login($scope.persona)
		.then(function(){

			// Si se ha logueado correctamente, lo tratamos aquí.
            // Podemos también redirigirle a una ruta
            $location.path("/home");
            console.log("Persona logeada: " + $scope.persona.email);

            var token = $auth.getToken();
            console.log("Token recuperado: " + token);
            $cookies.put('authenticationApp', token);

            $http.get('persona')
				.success(function(data) {
					$scope.persona = data;
					serviceAdmin.setProperty(data);
					serviceAdmin.setAdmin(data.isAdmin);
				});
		})
		.catch(function(response){
			response.send(500);
			console.log("Ha habido algun error en el login.");
		});
	}
	//$scope.pageClass = 'page-login';
}]);

app.controller('LogoutController',['$auth', '$location','$cookies','$scope','serviceAdmin', function($auth, $location, $cookies, $scope,serviceAdmin){

		$auth.logout();
		$scope.persona = {};
		serviceAdmin.setProperty('');
		serviceAdmin.setAdmin(false);
		$cookies.remove('authenticationApp');
		$location.path("/");



	/*$auth.logout()
        .then(function() {
            // Desconectamos al usuario y lo redirijimos
            $location.path("/");
        });*/
}]);
