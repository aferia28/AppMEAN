app.service('serviceAdmin', function($http){
     this.isAdmin = function(){
     	return $http.get('persona')
	}
});
