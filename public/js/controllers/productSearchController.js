app.controller('productSearcherController', ['$scope', '$http','$rootScope','$routeParams','$route','$location','ngDialog','serviceAdmin','dataFactory','serviceRequestErrors', function($scope, $http, $rootScope,$routeParams, $route, $location, ngDialog,serviceAdmin, dataFactory,serviceRequestErrors) {

	$scope.pageClass = 'page-product';

	$("aside").fadeOut("slow", function() {
		$("#content").removeClass("col-sm-10").addClass("col-sm-12");
	});

	var wine;
	var usuario 	= serviceAdmin.getProperty();
	$scope.user 	= usuario;
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
		console.log(response);
		//$scope.product.comentarios = wine.comentarios;
		inData.wine = wine;

		if(wine.type == "")
		{
			$scope.type = wine.color.toLowerCase();
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
		//console.log($scope.isDisabled);
	}, function(response) {
		serviceRequestErrors.popupError(response);
	})

	$scope.addOwnWine = function($event) {

		console.log($event.target.attributes['data-rate'].value);
		inData.rank = $event.target.attributes['data-rate'].value;

		dataFactory.insertRank(inData)
		.then(function(response) {
			console.log('Puntuación añadida', response.data)
			$scope.isDisabled = true;
		}, function(response) {
			console.log(response);
			//serviceRequestErrors.popupError(response);
		})
	}

	$scope.addFavorite = function() {

		dataFactory.addFavorite(inData)
		.then(function(response) {
			console.log('Vino añadido a favoritos', response.data);
		}, function(response) {
			serviceRequestErrors.popupError(response);
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
			    		console.log('Comentario Anadido', response.comentarios);
						$scope.product.comentarios = response.comentarios;
						ngDialog.close();
			    	}, function(response) {
			    		serviceRequestErrors.popupError(response);
			    	})
			    }
			}]
		});
	};

	$scope.deleteComment = function(id) {

		dataFactory.deleteComment(id, codeWine)
		.then(function(response) {
			console.log(response.data);
			$scope.product.comentarios = response.data.comentarios;
		}, function(response) {
			//serviceRequestErrors.popupError(response);
		})
	}
}]);
