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

			$('#oneStar').hover(
				function() {
					$(this).removeClass('fa-star-o').addClass('fa-star');
				},
				function() {
					$(this).removeClass('fa-star').addClass('fa-star-o');
				}
			);
			$('#twoStars').hover(
				function() {
					$('#oneStar').removeClass('fa-star-o').addClass('fa-star');
					$(this).removeClass('fa-star-o').addClass('fa-star');
				},
				function() {
					$('#oneStar').removeClass('fa-star').addClass('fa-star-o');
					$(this).removeClass('fa-star').addClass('fa-star-o');
				}
			);
			$('#threeStars').hover(
				function() {
					$('#oneStar').removeClass('fa-star-o').addClass('fa-star');
					$('#twoStars').removeClass('fa-star-o').addClass('fa-star');
					$(this).removeClass('fa-star-o').addClass('fa-star');
				},
				function() {
					$('#oneStar').removeClass('fa-star').addClass('fa-star-o');
					$('#twoStars').removeClass('fa-star').addClass('fa-star-o');
					$(this).removeClass('fa-star').addClass('fa-star-o');
				}
			);
			$('#fourStars').hover(
				function() {
					$('#oneStar').removeClass('fa-star-o').addClass('fa-star');
					$('#twoStars').removeClass('fa-star-o').addClass('fa-star');
					$('#threeStars').removeClass('fa-star-o').addClass('fa-star');
					$(this).removeClass('fa-star-o').addClass('fa-star');
				},
				function() {
					$('#oneStar').removeClass('fa-star').addClass('fa-star-o');
					$('#twoStars').removeClass('fa-star').addClass('fa-star-o');
					$('#threeStars').removeClass('fa-star').addClass('fa-star-o');
					$(this).removeClass('fa-star').addClass('fa-star-o');
				}
			);
			$('#fiveStars').hover(
				function() {
					$('#oneStar').removeClass('fa-star-o').addClass('fa-star');
					$('#twoStars').removeClass('fa-star-o').addClass('fa-star');
					$('#threeStars').removeClass('fa-star-o').addClass('fa-star');
					$('#fourStars').removeClass('fa-star-o').addClass('fa-star');
					$(this).removeClass('fa-star-o').addClass('fa-star');
				},
				function() {
					$('#oneStar').removeClass('fa-star').addClass('fa-star-o');
					$('#twoStars').removeClass('fa-star').addClass('fa-star-o');
					$('#threeStars').removeClass('fa-star').addClass('fa-star-o');
					$('#fourStars').removeClass('fa-star').addClass('fa-star-o');
					$(this).removeClass('fa-star').addClass('fa-star-o');
				}
			);
	//$scope.pageClass = 'page-weather';
}]);
