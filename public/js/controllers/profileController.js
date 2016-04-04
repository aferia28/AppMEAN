app.controller('profileController', ['$scope', '$http','$rootScope','$routeParams', 'Upload', '$timeout','serviceRequestErrors', function($scope, $http, $rootScope,$routeParams, Upload, $timeout, serviceRequestErrors) {

	var userId = $routeParams.id;

	$http.get('perfil/' + userId)
	.success(function(data){
		//console.log(data);
		$scope.userProfile = data;
	});

	$scope.updateProfile = function(file) {

		var profile = $scope.userProfile;
		var id 		= $routeParams.id;

		console.log($scope.picFile);

		if ($scope.picFile === undefined || $scope.picFile === null) {

			$http({
				url: /modificarPersona/ + id,
				method: 'PUT',
				data: {profile:profile}
			})
			.then(function(response) {
				$scope.userProfile = response.data;
				$scope.updateMessage = 'Guardado con exito';
				$scope.updateShow = true;
				setTimeout(function(){
					$scope.$apply(function(){
						$scope.updateShow = false;
					})
				}, 3000);
				console.log('Perfil actualitzat! ', response.data);
			}, function(response) {
				serviceRequestErrors.popupError(response);
			});
		}else{

			console.log($scope.picFile);

			Upload.upload({
				url: /modificarPersona/ + id,
				method:'PUT',
				data: {file:$scope.picFile, profile: $scope.userProfile}
			})
			.then(function(response) {
					$scope.userProfile = response.data;
					console.log('Success ' + response.config.data.file.name + 'uploaded. Response: ', response.data);
			}, function(response) {
					console.log('Error status: ', response.status);
			}, function(evt) {
				var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
			});
		}
	}

	$scope.deleteFavorite = function(wineCode) {

		var id 		= $routeParams.id;
		console.log(wineCode)
		$http({
			url: '/eliminarfavorito/' + id,
			method: 'PUT',
			data: {code:wineCode}
		})
		.success(function(data) {
			$scope.userProfile = data;
			console.log('Vino eliminado de favoritos correctamente..', data)
		})
		.error(function(response) {

		})
	}
	//$scope.pageClass = 'page-weather';
}]);

