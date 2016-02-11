
admin_app.controller('profilesController', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {


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
		})
	}

}]);
