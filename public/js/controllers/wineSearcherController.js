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
   		selectedDO: '',
   		availableOptions: [
			{	id: 'alella', 			name: 'Alella'				},
			// {	id: 'catalunya', 		name: 'Cataluña'			},
			{	id: 'conca+barbera', 	name: 'Conca de Barberá'	},
			{	id: 'costers+segre',	name: 'Costers del Segre'	},
			{	id: 'emporda', 			name: 'Emporda'				},
			{	id: 'montsant', 		name: 'Montsant'			},
			{	id: 'penedes', 			name: 'Penedés'				},
			{	id: 'pla+bages', 		name: 'Pla de Bages'		},
			{	id: 'priorat', 			name: 'Priorat'				},
			{	id: 'tarragona', 		name: 'Tarragona'			},
			{	id: 'terra+alta', 		name: 'Terra Alta'			}
   		],
   	};

   	/*$scope.selectedDOs = [];

   	// Toggle selection for a given DO by name
	$scope.toggleSelection = function toggleSelection(DOname) {
		var index = $scope.selectedDOs.indexOf(DOname);
	 
	    // Currently selected
	    if (index > -1) {
			$scope.selectedDOs.splice(index, 1);
	    }
	 
	    // Newly selected
	    else {
	        $scope.selectedDOs.push(DOname);
	    }
    };*/

	$scope.keywords = '';

	/*
	** On clicking the button to submit the search
	*/
	$scope.search = function() {

		// Wine search parameters from Snooth
		apiURl = 'http://api.snooth.com/wines/';
		apiKey = 'mi24ey8gwq286zony5uw51ghphnjed0yz0h6hpjs6l7rrr17';
		numberResults = 100; // 1-100
		available = 0; // 0 = all | 1 = in stock
		productType = 'wine';
		productColor = $scope.cardflow.selectedCard.title;
		country = 'ES'; // España
		// zipCode = '08360';
		sort = 'qpr'; // qpr = Quality Price Ratio
		// language = 'es'; // Español

		// Custom parameters
		region = 'Catalunya'; // + 'Catalunya'
		// designationOrigin = $scope.selectedDOs.join("&q=");
		vintage = $scope.vintage.year;

		if (vintage === null || vintage === "") {
			query = region + '&q=' + $scope.DOs.selectedDO// + '+' + vintage// + '+' + $scope.keywords;	
		} else {
			query = region + '&q=' + $scope.DOs.selectedDO + '&q=' + vintage// + '+' + $scope.keywords;	
		} 
		
		console.log(query);
		console.log(vintage);

		var url = apiURl
				+ '?akey=' + apiKey
				+ '&n=' + numberResults
				+ '&a=' + available
				+ '&t=' + productType
				+ '&color=' + productColor
				+ '&c=' + country
				// + '&z=' + zipCode
				+ '&s=' + sort
				+ '&q=' + query;

		var params = {
			url: url,
			apiKey: apiKey,
			numResults: numberResults,
			type: productColor,
			do: $scope.DOs.selectedDO,
			vintage: vintage,
			keyword: $scope.keywords,
			query: query
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
