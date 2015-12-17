app.controller('controllerRegistro', ['$scope', '$http', function($scope, $http) {

	$scope.newPersona 	= {};
	$scope.personas 	= {};
	$scope.selected 	= false;


	//obtenemos todos los datos de las personas de la base de datos..
	$http.get('/api/persona')
		.success(function(data){
			$scope.personas = data;
		})
		.error(function(data){
			console.log("ERROR: " + data);
		});

	//funcion para registrar una persona..
	$scope.registrarPersona = function(){

		$http.post('/api/persona', $scope.newPersona) //enviamos petición al servidor.. (ver route.registro.api.js)..
			.success(function(data){
				//las siguientes lineas se ejecutan cuando el servidor devuelve "data"..
				//1. borramos los datos del formuario..
				//2. pasamos los valores devueltos por el servidor al front-end
				$scope.newPersona = {};	//borramos los datos del formulario..
				$scope.personas   = data;
				console.log("Persona creada:" + data.nombre);
			})
			.error(function(data){
				console.log('ERROR: ' + data);
			});
	}

	//funcion para modificar/editar los datos de una persona
	$scope.modificarPersona = function(newPersona){

		$http.put('api/persona/' + $scope.newPersona._id, $scope.newPersona)
			.success(function(data){
				$scope.newPersona = {}; //borramos los datos del formulario
				$scope.personas   = data;
				$scope.selected	  = false;
			})
			.error(function(data){
				console.log('ERROR: ' + data);
			})
	}

	//funciion para borrar un objecto mediante su id
	$scope.eliminarPersona = function(newPersona){

		$http.delete('api/persona/' + $scope.newPersona._id)
			.success(function(data){
				$scope.newPersona = {};
				$scope.personas	  = data;
				$scope.selected   = false;
			})
			.error(function(data){
				console.log("ERROR: " + data);
			});
	}

	$scope.selectPersona = function(persona){

		console.log(persona);
		$scope.newPersona = persona;
		$scope.selected = true;
		console.log($scope.newPersona, $scope.selected);
	}

}]);

