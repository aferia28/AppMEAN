app.factory('dataFactory', ['$http','$q', function($http, $q) {

    var urlBase = '';
    var dataFactory = {};

    dataFactory.getWine = function (codeWine) {

        var defered = $q.defer();
        var promise = defered.promise;

        $http.get('/persona')
        .success(function(user) {
            var user = user;
            $http.get('/getWine/'+ codeWine, {params: {usuario:user}})
            .success(function(wine) {
                defered.resolve(wine);
            })
            .error(function(error) {
                defered.reject(error);
            });
        })
        .error(function(error) {
            defered.reject(error);
        });

        return promise;
    };

    dataFactory.getWineById = function (codeWine) {
        return $http.get(urlBase + '/' + codeWine);
    };

    dataFactory.insertRank = function (rank) {
        return $http.post(urlBase, cust);
    };

    dataFactory.addFavorite = function (codeWine) {
        return $http.put(urlBase + '/' + cust.ID, cust)
    };
/*
    dataFactory.deleteCustomer = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    dataFactory.getOrders = function (id) {
        return $http.get(urlBase + '/' + id + '/orders');
    };
*/
    return dataFactory;
}]);
