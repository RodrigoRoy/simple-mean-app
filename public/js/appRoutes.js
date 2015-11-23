/*
Manejo de rutas con Angular (front end)
*/
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	$routeProvider
		// HOME
		.when('/', {
			templateUrl: 'views/inicio.html',
			controller: 'MainController'
		})

		// EVENTOS
		.when('/eventos', {
			templateUrl: 'views/eventos.html',
			controller: 'EventosController'
		})

		// AGREGAR/EDITAR EVENTO
		.when('/eventos/nuevo', {
			templateUrl: 'views/formulario_evento.html',
			controller: 'AgregarEditarEventoController'
		})

		// RUTAS INVÁLIDAS (no descritas previamente)
		.otherwise({
			redirectTo: "/"
		});

	$locationProvider.html5Mode(true);
}]);