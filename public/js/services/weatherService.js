app.factory('forecast', ['$http', function($http) {

  return $http.get('http://api.snooth.com/wines/?akey=mi24ey8gwq286zony5uw51ghphnjed0yz0h6hpjs6l7rrr17&ip=66.28.234.115&q=rioja&xp=30&lang=es&c=ES')
            .success(function(data) {
              return data;
            })
            .error(function(err) {
              return err;
            });
}]);
