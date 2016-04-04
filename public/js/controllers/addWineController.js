app.controller('addWineController', ['$scope', '$http','serviceAdmin','dataFactory','$location','Upload', '$timeout', function($scope, $http, serviceAdmin, dataFactory, $location, Upload, $timeout) {

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

	$scope.addWine = function(file) {

		var wine = $scope.wine;

		if ($scope.picFile === undefined || $scope.picFile === null) {
			$http({
				url: '/addWine',
				method: 'POST',
				data: {wine:wine}
			})
			.success(function(data) {
				$scope.wine = {};
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
					$scope.wine = {};
					$scope.picFile = {};
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
