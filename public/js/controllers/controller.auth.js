app.controller('SignUpController', ['$auth','$location','$scope','$http','ngDialog','serviceRequestErrors', function($auth, $location, $scope, $http,ngDialog,serviceRequestErrors){

	var vm = this;
	console.log("Dentro de SignUp controller");
	//console.log(this);
	$scope.signup = function(isValid){

		console.log("h");
      	if(isValid)
      	{
  			$auth.signup($scope.persona)
				.then(function(response){
					$http.get('/send/'+$scope.persona.email)
  						.then(function(data) {
  							console.log('Controller FrontEnd: Email enviado');
				            console.log("Usiario creado satisfactoriamente, revisar email");
				            ngDialog.close();

				            ngDialog.open({template: '<div class="modal-header"><h3 class="modal-title"></h3><p>Verifica email</p></div><div class="modal-body"><p>Revisa el teu email per tal de verificar la compta =)</p></div>',
								className: 'ngdialog-theme-default',
								controller: '',
								closeByNavigation: true,
								plain: true
							});

				            //verificationPopUp
  						}, function(response){
  							//error handler
  							console.log('SignUp status: ' + response.status);
  						});
				}, function(response){
					console.log('Signup status: ', response.status);
					console.log('Error message: ', response.data.message);

					serviceRequestErrors.popupError(response);
				});
      	}else{
        	alert("Las dos contraseñas deben ser iguales");
      	}
	}
	$scope.pageClass = 'page-signup';
}]);

app.controller('LoginController', ['$auth', '$location','$scope','$http','$cookies','serviceAdmin','ngDialog','serviceRequestErrors', function($auth, $location, $scope, $http, $cookies, serviceAdmin, ngDialog,serviceRequestErrors){

	var vm = this;
	console.log("Dentro LoginController Cliente");
	$scope.login = function(){

		$auth.login($scope.persona)
		.then(function(response){

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
		}, function(response){
			console.log('Signup status: ', response.status);
			console.log('Error message: ', response.data.message);

			serviceRequestErrors.popupError(response);
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
