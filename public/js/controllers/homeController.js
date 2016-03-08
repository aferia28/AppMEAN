app.controller('homeController', ['$scope','$auth','$http','ngDialog', function($scope, $auth, $http, ngDialog) {


	$("aside").fadeIn("slow", function() {
		$("#content").removeClass("col-sm-12").addClass("col-sm-10");
	});

	if(!$auth.getToken()){
		console.log('No hay persona logeada..');
	}else {

		$http.get('persona')
		.success(function(data) {
			$scope.persona = data;
		})
	}

	$scope.clickToOpenSignIn = function() {
		ngDialog.open({	template: 'popupSignIn',
			className: 'ngdialog-theme-default',
			controller: 'LoginController',
			closeByNavigation: true
		});
	};

	$scope.clickToOpenSignUp = function() {
		ngDialog.open({	template: 'popupSignUp',
			className: 'ngdialog-theme-default',
			controller: 'SignUpController',
			closeByNavigation: true
		});
	};
}]);
