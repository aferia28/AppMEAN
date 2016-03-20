app.controller('addWineController', ['$scope', '$http','serviceAdmin','dataFactory','$location', function($scope, $http, serviceAdmin, dataFactory, $location) {

	$scope.types = {
	    	availableOptions: [
	      		{id: 'Negre', name: 'Negre'},
	      		{id: 'Blanc', name: 'Blanc'},
	      		{id: 'Rosat', name: 'Rosat'}
	    	],
	   };

		$scope.addWine = function() {
			console.log('>>>>>', $scope.wine)
			dataFactory.addWine($scope.wine)
			.then(function(response) {
				console.log(response.data);
				$location.path('/');
			})
			.catch(function(response) {

			})
		}

}]);
