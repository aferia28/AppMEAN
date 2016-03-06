app.controller('productSearcherController', ['$scope', '$http','$rootScope','$routeParams','$route','$location','ngDialog', function($scope, $http, $rootScope,$routeParams, $route, $location, ngDialog) {

	$scope.pageClass = 'page-product';

	$("aside").fadeOut("slow", function() {
		$("#content").removeClass("col-sm-10").addClass("col-sm-12");
	});

	var codeWine;
	var wine;
	var usuario;
	var absUrl = $location.absUrl();

	$scope.absUrl = absUrl;

	console.log($routeParams.wineCode);

	codeWine = $routeParams.wineCode;

	$http.get('persona')
	.success(function(data) {

		usuario = data;

		$http.get('/getWine', {params: {codeWine:codeWine, usuario:usuario}})
		.success(function(data) {
			console.log(data);

			if(data.canrate == false)
			{
				$('.rating > span').css('opacity', 0.5);
				$scope.isDisabled = true;
			}else{
				$scope.isDisabled = false;
			}
			wine = data;
			$scope.product = wine;

			if(wine.type == 'Red Wine')
			{
				$scope.type = 'red';
				console.log('Red wine returend');
				$('#product-header').addClass('product-header-red');

			}else if(wine.type == 'White Wine'){
				$scope.type = 'white';
				console.log('White wine returend');
				$('#product-header').addClass('product-header-white');

			}else if(wine.type = 'Rose Wine'){
				$scope.type = 'rose';
				console.log('Rose wine returend');
				$('#product-header').addClass('product-header-rose');
			}
		})
	})

	$scope.addOwnWine = function(rank) {

		$http.get('/vinosCode/' + codeWine, {params: {rank: rank, wine:wine, usuario: usuario}})
		.success(function(data) {
			console.log(data);
			$scope.isDisabled = true;
		})
	}

	$scope.clickToOpen = function() {
		ngDialog.open({	template: 'popupTmpl',
			className: 'ngdialog-theme-default',
			controller: ['$scope', function($scope, summernote) {

				$scope.options = {
					height: 300,
					focus: true,
					toolbar: [
						['edit',['undo','redo']],
			            ['headline', ['style']],
			            ['style', ['bold', 'italic', 'underline']],
			            ['fontface', ['fontname']],
			            ['textsize', ['fontsize']],
			            ['fontclr', ['color']],
			            ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
			            ['insert', ['link']],
					]
				};

			    $scope.getComentario = function() {

			    	var comentario = $scope.comentario;
			    	comentario = comentario.replace(/<\/?[^>]+(>|$)/g, "");
			    	$http.get('/addCommentWine/' + codeWine, {params: {comentario: comentario, wine:wine, usuario: usuario}})
			    	.success(function(data) {
			    		console.log('Comentario Anadido', data);
				    	$scope.comentario = "";
						ngDialog.close();
			    	})
			    }
			}]
		});
	};

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
}]);
