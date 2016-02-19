app.controller('productSearcherController', ['$scope', '$http','$rootScope','$routeParams', function($scope, $http, $rootScope,$routeParams) {

			$scope.pageClass = 'page-product';
			$("aside").fadeOut("slow", function() {
				$("#content").removeClass("col-sm-10").addClass("col-sm-12");
			});


			var codeWine;
			console.log($routeParams.wineCode);

			codeWine = $routeParams.wineCode;

			$http.get('http://api.snooth.com/wine/?akey=mi24ey8gwq286zony5uw51ghphnjed0yz0h6hpjs6l7rrr17&id='+codeWine)
			.success(function(data){
				console.log(data);
				console.log();
				$scope.product = data.wines[0];
				if(data.wines[0].type == 'Red Wine')
				{
					$scope.type = 'red';
					console.log('Red wine returend');
					$('#product-header').addClass('product-header-red');

				}else if(data.wines[0].type == 'White Wine'){
					$scope.type = 'white';
					console.log('White wine returend');
					$('#product-header').addClass('product-header-white');

				}else if(data.wines[0].type = 'Rose Wine'){
					$scope.type = 'rose';
					console.log('Rose wine returend');
					$('#product-header').addClass('product-header-rose');

				}
			})



	//$scope.pageClass = 'page-weather';
}]);
