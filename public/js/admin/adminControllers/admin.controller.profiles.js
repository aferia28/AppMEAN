
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

	$scope.latestWines = function() {

		$http.get('/latestWines')
		.then(function(response) {

			console.log(response.data);
			$scope.latestWines = response.data;

		}, function(response){
			//handle error
		})
	}

}]);
