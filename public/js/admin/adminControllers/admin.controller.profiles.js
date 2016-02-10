
admin_app.controller('profilesController', ['$scope', '$http', function($scope, $http) {


	$scope.showAllProfiles = function() {

		$http.get('/allprofiles')
			.success(function(data) {
				$scope.allProfiles = data
				console.log(data);
			});
	}

}]);
