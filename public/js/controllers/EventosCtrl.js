/*
Se encarga de obtener y manipular los datos de todos los eventos existentes en la base de datos.
*/
angular.module('EventosCtrl', []).controller('EventosController', function($scope, Evento){
	$scope.texto = 'Hola eventos';
	$scope.eventos = [];
	
	// Obtener los eventos y asignarlos al arreglo $scope.eventos
	Evento.all() // objeto "promise"
		.then(function(res){ // callback para petición exitosa
			$scope.eventos = res.data;
		}, function(res){ // callback para petición cuando hay error
			console.log(res);
		});
		// También es válido usar la llamada asincrona "success":
		/*.success(function(data){ // manejo asincrono de la respuesta
			$scope.eventos = data; // asignación a variable del controlador
		});*/
});