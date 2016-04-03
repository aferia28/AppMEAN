app.controller('topWinesController', ['$scope','dataFactory', function($scope, dataFactory) {

	dataFactory.getTopWines()
	.then(function(response) {
		$scope.topWines = response.data;
		console.log(response);
	}, function (response) {
		 console.log('Status: ' + response.status + ' - ' + response.statusText);
	})
}]);
