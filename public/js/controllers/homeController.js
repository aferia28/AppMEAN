app.controller('homeController', ['$scope','$auth','$http','ngDialog','$rootScope','serviceAdmin', function($scope, $auth, $http, ngDialog,$rootScope,serviceAdmin) {


	$("aside").fadeIn("slow", function() {
		$("#content").removeClass("col-sm-12").addClass("col-sm-10");
	});

	if(serviceAdmin.getProperty() !== undefined)
	{
		console.log('Persona Logueada: ', serviceAdmin.getProperty());
	}

	$scope.clickToOpenSignIn = function() {
		ngDialog.open({	template: 'popupSignIn',
			className: 'ngdialog-theme-default',
			controller: 'LoginController',
			closeByNavigation: true
		});
	};

	$rootScope.$on('clickToOpenSI', function() {
		$scope.clickToOpenSignIn();
	})

	$scope.clickToOpenSignUp = function() {
		ngDialog.open({	template: 'popupSignUp',
			className: 'ngdialog-theme-default',
			controller: 'SignUpController',
			closeByNavigation: true
		});
	};

	$rootScope.$on('clickToOpenSU', function() {
		$scope.clickToOpenSignUp();
	})
}]);
