app.controller('productSearcherController', ['$scope', '$http','$rootScope','$routeParams', function($scope, $http, $rootScope,$routeParams) {


			var codeWine;

			console.log($routeParams.wineCode);

			codeWine = $routeParams.wineCode;

			$http.get('http://api.snooth.com/wine/?akey=mi24ey8gwq286zony5uw51ghphnjed0yz0h6hpjs6l7rrr17&id='+codeWine)
			.success(function(data){
				console.log(data);
				$scope.product = data.wines[0];
			})



	//$scope.pageClass = 'page-weather';
}]);
