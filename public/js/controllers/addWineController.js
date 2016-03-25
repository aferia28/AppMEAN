app.controller('addWineController', ['$scope', '$http','serviceAdmin','dataFactory','$location','Upload', '$timeout', function($scope, $http, serviceAdmin, dataFactory, $location, Upload, $timeout) {

	$scope.types = {
	    	availableOptions: [
	      		{id: 'Negre', name: 'Negre'},
	      		{id: 'Blanc', name: 'Blanc'},
	      		{id: 'Rosat', name: 'Rosat'}
	    	],
	   };

	$scope.addWine = function(file) {

		var wine = $scope.wine;

		if ($scope.picFile === undefined) {
			$http({
				url: '/addWine',
				method: 'POST',
				data: wine
			})
			.success(function(data) {
				console.log('Vino guardado: ', data)
			})
			.error(function(data) {
				 //handle
			})
		}else{
			Upload.upload({
				url: '/addWine',
				data: {wine:wine, file:$scope.picFile}
			})
			.then(function(response) {
					console.log('Success ' + response.config.data.file.name + 'uploaded. Response: ', response.data);
			}, function(response) {
					console.log('Error status: ' + response.status);
			}, function(evt) {
				var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
			});
		}
	}

}]);
