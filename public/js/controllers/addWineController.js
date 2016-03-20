app.controller('addWineController', ['$scope', '$http','serviceAdmin','dataFactory','$location','Upload', '$timeout', function($scope, $http, serviceAdmin, dataFactory, $location, Upload, $timeout) {

	$scope.types = {
	    	availableOptions: [
	      		{id: 'Negre', name: 'Negre'},
	      		{id: 'Blanc', name: 'Blanc'},
	      		{id: 'Rosat', name: 'Rosat'}
	    	],
	   };

	$scope.addWine = function(file) {

		Upload.upload({
			url: '/addWine',
			data: {wine:$scope.wine, file:$scope.picFile}
		})
		.then(function(resp) {
				console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
		}, function(resp) {
				console.log('Error status: ' + resp.status);
		}, function(evt) {
			var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
		});
	}
		$scope.addWine2 = function() {

			dataFactory.addWine($scope.wine)
			.then(function(response) {
				console.log(response.data);
				$location.path('/');
			})
			.catch(function(response) {

			})
		}

}]);
