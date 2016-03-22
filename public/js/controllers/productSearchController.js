app.controller('productSearcherController', ['$scope', '$http','$rootScope','$routeParams','$route','$location','ngDialog','serviceAdmin','dataFactory', function($scope, $http, $rootScope,$routeParams, $route, $location, ngDialog,serviceAdmin, dataFactory) {

	$scope.pageClass = 'page-product';

	$("aside").fadeOut("slow", function() {
		$("#content").removeClass("col-sm-10").addClass("col-sm-12");
	});

	var wine;
	var usuario 	= serviceAdmin.getProperty();
	var codeWine 	= $routeParams.wineCode;

	var inData = {
		codeWine: codeWine,
		usuario: usuario,
		wine: null
	}

	getWineType = function(wineType) {
		return wineType.split(' ')[0].toLowerCase();
	}

	dataFactory.getWine(inData)
	.then(function(response) {

		console.log(response.data);

		wine = response.data;
		$scope.product = response.data;
		$scope.product.com = wine.comentarios;
		inData.wine = wine;

		if(wine.type == "")
		{
			$scope.type = getWineType(wine.color)
		}else if(wine.type != "")
		{
			$scope.type = getWineType(wine.type)
		}
		console.log($scope.type);

		if(response.data.canrate == false)
		{
			$('.rating > span').css('opacity', 0.5);
			$scope.isDisabled = true;
		}
		else
		{
			$scope.isDisabled = false;
		}
	})
	.catch(function() {
		//tratar error
	});

	$scope.addOwnWine = function(rank) {

		inData.rank = rank;

		dataFactory.insertRank(inData)
		.then(function(response) {
			console.log('Puntuación añadida', response.data)
			$scope.isDisabled = true;
		})
		.catch(function(response) {
			//tratar el error
		})
	}

	$scope.addFavorite = function() {

		dataFactory.addFavorite(inData)
		.then(function(response) {
			console.log('Vino añadido a favoritos', response.data);
		})
		.catch(function(response) {
			//error a tratar
		})
	}

	$scope.clickToOpen = function() {
		ngDialog.open({	template: 'popupTmpl',
			className: 'ngdialog-theme-default',
			scope: $scope,
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

			    $scope.addComentario = function() {

			    	var comentario = $scope.textComment;
			    	var Ok_comment = comentario.replace(/<\/?[^>]+(>|$)/g, "");

			    	inData.comentario = Ok_comment;

			    	dataFactory.addComment(inData)
			    	.then(function(response) {
			    		console.log('Comentario Anadido', response);
						$scope.product.com = response;
						ngDialog.close();
			    	})
			    	.catch(function(response) {
			    		//tratar
			    	})
			    }
			}]
		});
	};
}]);
