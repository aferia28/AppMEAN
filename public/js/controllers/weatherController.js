app.controller('weatherController', ['$scope', 'forecast', function($scope, forecast) {
	forecast.success(function(data){
  	$scope.fiveDay = data;
  })
}]);
