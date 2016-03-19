app.controller('addWineController', ['$scope', '$http','serviceAdmin','dataFactory', function($scope, $http, serviceAdmin, dataFactory) {

	$scope.types = {
	    	availableOptions: [
	      		{id: 'red', name: 'Negre'},
	      		{id: 'white', name: 'Blanc'},
	      		{id: 'rose', name: 'Rosat'}
	    	],
	   };

}]);
