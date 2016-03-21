app.controller('wineSearcherController', ['$scope', '$http', '$timeout','dataFactory', function ($scope, $http, $timeout,dataFactory) {
    /*
    ** Cardflow
    */
    $scope.cardflow={
    	selectedCard: {title: 'red'}
    };
    // Use a timeout to have access to all the elements
    $timeout(function() {
        $scope.$watch(function() { return $scope.cardflow.current; }, function() {
            console.log('Current wine color selected: ' + $scope.cardflow.cards[$scope.cardflow.current].title);
            $scope.cardflow.selectedCard.title = $scope.cardflow.cards[$scope.cardflow.current].title;
        });
    }, 100);

    // Generate the cards
    $scope.cardflow.cards = [];
    var types = ['red','white','rose'];
    for (indexCardflow = 0; indexCardflow < 3; indexCardflow++) {
        var t = types[indexCardflow % types.length];
        $scope.cardflow.cards.push({image:'../img/' + t + '-wine-cardflow.jpg', title: t});
    }

    /*
    ** Form for the wine custom query
    */
   	$scope.vintage = {
   		year: ''
   	};

   	$scope.DOs = {
   		avaiableOptions: [
   			{	id: 'catalonia', 		name: 'Tots'				},
			{	id: 'alella', 			name: 'Alella'				},
			{	id: 'cataluna', 		name: 'Cataluña'			},
			{	id: 'concadebarbera', 	name: 'Conca de Barberá'	},
			{	id: 'costersdelsegre',	name: 'Costers del Segre'	},
			{	id: 'emporda', 			name: 'Emporda'				},
			{	id: 'montsant', 		name: 'Montsant'			},
			{	id: 'penedes', 			name: 'Penedés'				},
			{	id: 'pladebages', 		name: 'Pla de Bages'		},
			{	id: 'priorato', 		name: 'Priorat'				},
			{	id: 'tarragona', 		name: 'Tarragona'			},
			{	id: 'terralta', 		name: 'Terra Alta'			}
   		]
   	}

	/*
	** On clicking the button to submit the search
	*/
	$scope.search = function() {

		// Wine search parameters from Snooth
		productColor = $scope.cardflow.selectedCard.title;
		sort = 'qpr'; // qpr = Quality Price Ratio
		//country = 'ES'; // España
		// zipCode = '08360';
		// language = 'es'; // Español

		// Custom parameters
		designationOrigin = $scope.search_.denominacioOrigen;
		vintage = $scope.search_.vintage;

		var params = {
			type: productColor,
			do: designationOrigin,
			vintage: vintage,
		}

		dataFactory.getAllWines(params)
		.then(function(response) {
			$scope.fiveDay = response.data;
		})
		.catch(function(response) {

		})
		// Angular method that makes the request
		/*$http.get(url).then(function(response) {
			// Handles success
			console.log(response);
			$scope.fiveDay = response.data.wines;
  		}, function(response) {
  			// Handles error
  			$scope.fiveDay = "Request failed";
  		});*/

		// jQuery method that doesn't trigger CORS problem, but $scope is 'undefined'
  		/*$.ajax(
		{
			url: url,
			dataType: 'json',
			error: function(jqXHR, textStatus, errorThrown)
			{
                $scope.fiveDay = "Request failed";
            },
            success: function(response)
            {
            	console.log(response);
            	$scope.fiveDay = response.wines;
            }
		});*/
	}

	$scope.pageClass = 'page-weather';
}]);
