app.controller('wineSearcherController', ['$scope', '$http', function ($scope, $http) {

	$("aside").fadeOut("slow", function() {
		$("#content").removeClass("col-sm-10").addClass("col-sm-12");
	});

	$scope.wineColor = {
		availableColors: [
	  		{	id: 'red', 		name: 'Negre'	},
	  		{	id: 'white',	name: 'Blanc'	},
	  		{	id: 'rose', 	name: 'Rosat'	}
    	],
    	selectedColor: {id: 'red', name: 'Negre'} // Sets the default value in the UI
    };

   	$scope.vintage = {
   		year: ''
   	};

   	$scope.DOs = [
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
   	];

   	$scope.selectedDOs = [];

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
    };

	$scope.search = function() {		

		// Wine search parameters from Snooth
		apiURl = 'http://api.snooth.com/wines/';
		apiKey = 'mi24ey8gwq286zony5uw51ghphnjed0yz0h6hpjs6l7rrr17';
		numberResults = 100; // 1-100
		available = 0; // 0 = all | 1 = in stock
		productType = 'wine';
		productColor = $scope.wineColor.selectedColor.id;
		country = 'ES'; // España
		// zipCode = '08360';
		sort = 'qpr'; // qpr = Quality Price Ratio
		// language = 'es'; // Español
		
		// Custom parameters
		region = 'Catalonia'; // + 'Catalunya'
		designationOrigin = $scope.selectedDOs.join("&q=");
		vintage = $scope.vintage.year;
		query = region + '+' + designationOrigin + '+' + vintage;

		var url = apiURl 
				+ '?akey=' + apiKey 
				+ '&n=' + numberResults 
				+ '&a=' + available 
				+ '&t=' + productType
				+ '&color=' + productColor
				// + '&c=' + country 
				// + '&z=' + zipCode
				+ '&s=' + sort
				+ '&q=' + query;

		// Angular method that makes the request
		$http.get(url).then(function(response) {
			// Handles success
			$scope.fiveDay = response.data.wines;  			
  		}, function(response) {
  			// Handles error
  			$scope.fiveDay = "Request failed";
  		});

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
