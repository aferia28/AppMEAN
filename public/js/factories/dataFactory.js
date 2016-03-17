app.factory('dataFactory', ['$http','$q', function($http, $q) {

    var dataFactory = {};

    dataFactory.getWine = function (inData) {

        return $http({
            url: '/getWine/',
            method: 'GET',
            params: inData
        })
        .success(function(response) {
            return response;
        })
        .error(function(error) {
            return error;
        });
    };

    dataFactory.insertRank = function (inData) {
        var codeWine = inData.codeWine;
        console.log(inData);
        return $http({
            url: '/vinosCode/'+codeWine,
            method: 'POST',
            params: inData
        })
        .success(function(response) {
            return response;
        })
        .error(function(error) {
            return error;
        })
    };

    dataFactory.addFavorite = function (inData) {

        var codeWine = inData.codeWine;
        return $http({
            url: '/addFavorite/'+codeWine,
            method: 'POST',
            params: inData
        }).success(function(response) {
            return response;
        })
        .error(function(error) {
            return error;
        })
    };

    dataFactory.addComment = function (inData) {

        var defer = $q.defer();
        var codeWine = inData.codeWine;

        $http({
            url: '/addCommentWine/' + codeWine,
            method: 'POST',
            params: inData
        }).success(function(response) {
            defer.resolve(response.comentarios)
        })
        .error(function(error) {
            defer.reject();
        })
        return defer.promise;
    };

    dataFactory.getTopWines = function() {

        return $http({
            url: '/topwines/',
            method: 'GET'
        }).success(function(response) {
            return response;
        })
        .error(function(error) {
            return error;
        })

    }
    return dataFactory;
}]);
