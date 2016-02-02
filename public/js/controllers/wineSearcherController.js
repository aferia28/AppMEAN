app.controller('wineSearcherController', ['$scope', '$http', function($scope, $http) {

	$("aside").fadeOut("slow", function() {
		$("#content").removeClass("col-sm-10").addClass("col-sm-12");
	});

	var tipo;
	var resultado;

		$scope.types = {
	    	availableOptions: [
	    		{id: '', name: 'Tots'},
	      		{id: 'red', name: 'Negre'},
	      		{id: 'white', name: 'Blanc'},
	      		{id: 'rose', name: 'Rosat'}
	    	],
	   };

	   $scope.years = {
	   		availableYears: [
	   			{id: '2015', name: '2015'},
	   			{id: '2014', name: '2014'},
	   			{id: '2013', name: '2013'},
	   			{id: '2012', name: '2012'},
	   			{id: '2011', name: '2011'},
	   			{id: '2010', name: '2010'}
	   		],
	   };

	   $scope.DOs = {
	   		availableDO: [
	   			{id: 'abona', name: 'Abona'},
	   			{id: 'alella', name: 'Alella'},
	   			{id: 'alicante', name: 'Alicante'},
	   			{id: 'almansa', name: 'Almansa'},
	   			{id: 'arlanza', name: 'Arlanza'},
	   			{id: 'arribes', name: 'Arribes'},
	   			{id: 'bierzo', name: 'Bierzo'},
	   			{id: 'binissalem', name: 'Binissalem'},
	   			{id: 'bullas', name: 'Bullas'},
	   			{id: 'calatayud', name: 'Calatayud'},
	   			{id: 'campodeborja', name: 'Campo de Borja'},
	   			{id: 'cariñena', name: 'Cariñena'},
	   			{id: 'cataluna', name: 'Cataluña'},
	   			{id: 'cava', name: 'Cava'},
	   			{id: 'chacolidealava', name: 'Chacoli de Álava'},
	   			{id: 'chacolidegetaria', name: 'Chacoli de Getaria'},
	   			{id: 'chacolidevizcaya', name: 'Chacoli de Vizcaya'},
	   			{id: 'cigales', name: 'Cigales'},
	   			{id: 'concadebarbera', name: 'Conca de Barberá'},
	   			{id: 'condadodehuelva', name: 'Condado de Huelva'},
	   			{id: 'costersdelsegre', name: 'Costers del Segre'},
	   			{id: 'elhierro', name: '2012'},
	   			{id: 'emporda', name: 'Emporda'},
	   			{id: 'grancanaria', name: 'Gran Canaria'},
	   			{id: 'jerez', name: 'Jerez'},
	   			{id: 'jumilla', name: 'Jumilla'},
	   			{id: 'lagomera', name: 'La Gomera'},
	   			{id: 'lamancha', name: 'La Mancha'},
	   			{id: 'lapalma', name: 'La Palma'},
	   			{id: 'lanzarote', name: 'Lanzarote'},
	   			{id: 'malaga', name: 'Málaga'},
	   			{id: 'manchuela', name: 'Manchuela'},
	   			{id: 'sanlucardebarrameda', name: 'San Lucar de Barrameda'},
	   			{id: 'mentrida', name: 'Mentrida'},
	   			{id: 'mondejar', name: 'Mondejar'},
	   			{id: 'monterrei', name: 'Monterrei'},
	   			{id: 'montilla', name: 'Montilla'},
	   			{id: 'montsant', name: 'Montsant'},
	   			{id: 'navarra', name: 'Navarra'},
	   			{id: 'penedes', name: 'Penedés'},
	   			{id: 'pladebages', name: 'Pla de Bages'},
	   			{id: 'pladellevant', name: 'Pla de Llevant'},
	   			{id: 'priorat', name: 'Priorat'},
	   			{id: 'riasbaixas', name: 'Rias Baixas'},
	   			{id: 'ribeirasacra', name: 'Ribeira Sacra'},
	   			{id: 'ribeiro', name: 'Ribeiro'},
	   			{id: 'riberadelduero', name: 'Ribera del Duero'},
	   			{id: 'riberadelguadiana', name: 'Ribera del Guadiana'},
	   			{id: 'riberadeljucar', name: 'Ribera del Jucar'},
	   			{id: 'rioja', name: 'Rioja'},
	   			{id: 'rueda', name: 'Rueda'},
	   			{id: 'sierrasdelmalaga', name: 'Sierras de Málaga'},
	   			{id: 'tacoronte', name: 'Tacoronte'},
	   			{id: 'tarragona', name: 'Tarragona'},
	   			{id: 'terralta', name: 'Terra Alta'},
	   			{id: 'tierradelleon', name: 'Tierra del León'},
	   			{id: 'tierradelvinozamora', name: 'Tierra del Vino de Zamora'},
	   			{id: 'toro', name: 'Toro'},
	   			{id: 'ucles', name: 'Ucles'},
	   			{id: 'requena', name: 'Requena'},
	   			{id: 'valdeorras', name: 'Valdeorras'},
	   			{id: 'valdepenas', name: 'Valdepenas'},
	   			{id: 'valencia', name: 'Valencia'},
	   			{id: 'valledeguimar', name: 'Valle de Güimar'},
	   			{id: 'valledelaorotava', name: 'Valle de la Ortolava'},
	   			{id: 'vinosdemadrid', name: 'Vinos de Madrid'},
	   			{id: 'ycoden', name: 'Ycoden'},
	   			{id: 'yecla', name: 'Yecla'}
	   		],
	   };

		$scope.buscar = function(){

			tipo = $scope.types.repeatSelect;

			console.log(tipo);

			$http.get('http://api.snooth.com/wines/?akey=mi24ey8gwq286zony5uw51ghphnjed0yz0h6hpjs6l7rrr17&a=0&t=wine&color=' + tipo + '&lang=es&c=ES&z=08360&s=qpr')
			.success(function(data){
	  			$scope.fiveDay = data;
	  			//console.log(resultado);
	  		})

	  		console.log($scope);
		}

	$scope.pageClass = 'page-weather';
}]);
