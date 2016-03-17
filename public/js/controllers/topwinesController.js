app.controller('topWinesController', ['$scope', '$http','dataFactory', function($scope, $http, dataFactory) {

dataFactory.getTopWines()
.then(function(response) {
	console.log(response);
})
.catch(function(response) {

})

}]);
