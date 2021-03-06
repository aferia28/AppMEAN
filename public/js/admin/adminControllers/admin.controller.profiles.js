
admin_app.controller('profilesController', ['$scope', '$http', '$stateParams','$location', function($scope, $http, $stateParams,$location) {


	$scope.showAllProfiles = function() {

		$http.get('/allprofiles')
			.success(function(data) {
				$scope.allProfiles = data
				console.log(data);
			});
	}

	$scope.getProfileById = function() {

		var userId;

		console.log($stateParams.id);

		userId = $stateParams.id

		$http.get('perfil/' + userId)
		.success(function(data){
			console.log(data);
			$scope.userProfile = data;
		})
	}

	$scope.deleteProfile = function() {

		var id = $stateParams.id;

		$http.delete('eliminarPersona/'+id)
		.success(function(){
			console.log('Persona eliminada');
			$location.path('/perfiles/allprofiles');
		})
	}

	$scope.updateProfile = function(newProfile) {

		var id = $stateParams.id;

		$http({
			url:'/modificarPersona/' + id,
			method:'PUT',
			data:{profile:$scope.userProfile}
		})
		.success(function(data) {
			console.log('Persona modificada correctamente');
			$scope.userProfile = data;
			$location.path('/perfiles/allprofiles');
		})
		.error(function(err) {
			console.log('Error' + err);
		})
	}

	$scope.latestLogin = function() {

		$http.get('/lastlogin')
		.success(function(data) {
			console.log(data);
			$scope.loginUsers = data;
		})
		.error(function(data){
			//handle error
		})
	}

	$scope.latestSignUp = function() {

		$http.get('/lastSignup')
		.success(function(data) {
			console.log(data);
			$scope.signupUsers = data;
		})
		.error(function(data){
			//handle error
		})
	}

	$scope.showAllWines = function() {

		$http.get('/adminallwines')
			.success(function(data) {
				$scope.allWines = data
				console.log(data);
			});
	}

	$scope.latestWines = function() {

		$http.get('/latestWines')
		.then(function(response) {

			console.log(response.data);
			$scope.latestWines = response.data;

		}, function(response){
			//handle error
		})
	}

	$scope.adminGetWineById = function() {

		var wineId = $stateParams.id;

		$http.get('/adminwineid/' + wineId)
		.success(function(data){
			console.log(data);
			$scope.wine = data;
		})
	}

	$scope.deleteWine = function() {

		var wineId = $stateParams.id;

		$http.delete('/eliminarVino/'+ wineId)
		.success(function(){
			console.log('Vino eliminado');
			$location.path('/vinos.all');
		})
	}

	$scope.types = {
	    	availableOptions: [
	      		{id: 'Negre', name: 'Negre'},
	      		{id: 'Blanc', name: 'Blanc'},
	      		{id: 'Rosat', name: 'Rosat'}
	    	],
	   };

	   $scope.DOs = {
	    	availableOptions: [
				{	id: 'alella', 			name: 'Alella'				},
				{	id: 'conca barbera', 	name: 'Conca de Barberà'	},
				{	id: 'costers segre',	name: 'Costers del Segre'	},
				{	id: 'emporda', 			name: 'Emporda'				},
				{	id: 'montsant', 		name: 'Montsant'			},
				{	id: 'penedes', 			name: 'Penedès'				},
				{	id: 'pla bages', 		name: 'Pla de Bages'		},
				{	id: 'priorat', 			name: 'Priorat'				},
				{	id: 'tarragona', 		name: 'Tarragona'			},
				{	id: 'terra+alta', 		name: 'Terra Alta'			}
	    	],
	   };

	$scope.updateWine = function(newProfile) {

		var id = $stateParams.id;

		$http({
			url:/modificarVino/ + id,
			method:'PUT',
			data:$scope.wine
		})
		.then(function(response) {
			console.log('Vino modificado correctamente: ', response.data);
			$scope.wine = response.data;
			$scope.updateMessage = 'Guardado con exito';
			$scope.updateShow = true;
			setTimeout(function(){
				$scope.$apply(function(){
					$scope.updateShow = false;
				})
			}, 3000);
		}, function(response) {
			console.log('Error' + err);
		})
	}

}]);
