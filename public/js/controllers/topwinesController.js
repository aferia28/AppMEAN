app.controller('topWinesController', ['$scope', '$http','dataFactory', function($scope, $http, dataFactory) {

dataFactory.getTopWines()
.then(function(response) {
	$scope.topWines = response.data;
	console.log(response);
})
.catch(function(response) {

})

}]);
