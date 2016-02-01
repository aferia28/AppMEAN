app.controller('SignUpController', ['$auth','$location','$scope', function($auth, $location, $scope){

	var vm = this;
	console.log("Dentro de SignUp controller");
	//console.log(this);
	$scope.signup = function(isValid){
		/*
		var user = {
			email 		: $scope.email,
			nombre		: $scope.nombre,
			apellidos	: $scope.apellidos,
			contraseña 	: $scope.contrasena,
			r_contraseña: $scope.r_contrasena
		}
		*/
		console.log("h");
      	if(isValid)
      	{
	        $auth.signup($scope.persona)
			.then(function(){
				//$auth.setToken(response);
				// Si se ha registrado correctamente,
	            // Podemos redirigirle a otra parte
	            $location.path("/");
	            console.log("Uusiario creado satisfactoriamente");
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

app.controller('LoginController', ['$auth', '$location','$scope', function($auth, $location, $scope){

	var vm = this;
	console.log("Dentro LoginController Cliente");
	$scope.login = function(){
		/*$auth.login({
			email 		: vm.email,
			password 	: vm.password
		})*/
		$auth.login($scope.persona)
		.then(function(){

			// Si se ha logueado correctamente, lo tratamos aquí.
            // Podemos también redirigirle a una ruta
            $location.path("/");
            console.log("Persona logeada: " + $scope.persona.email);
            console.log("Usuario logeado correctamente");
            var token = $auth.getToken();
            console.log("Token recuperado: " + token);

		})
		.catch(function(response){
			response.send(500);
			console.log("Ha habido algun error en el login.");
		})
	}
	$scope.pageClass = 'page-login';
}]);

app.controller('LogoutController',['$auth', '$location', function($auth, $location){


		$auth.logout();
		//localStorage.clear();
		$location.path("/login");



	/*$auth.logout()
        .then(function() {
            // Desconectamos al usuario y lo redirijimos
            $location.path("/");
        });*/
}]);
