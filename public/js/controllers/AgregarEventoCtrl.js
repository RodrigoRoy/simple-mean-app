/*
Permite manipular la información del formulario de evento.
*/
angular.module('AgregarEventoCtrl', []).controller('AgregarEventoController', function($scope, $location, Evento){
	$scope.enviar = function(){
		// Objeto con la información a enviar
		var newEvento = {
			'titulo': $scope.titulo,
			'contenido': $scope.descripcion
		};
		// Enviar información a través del factory Evento
		Evento.create(newEvento)
			.then(function(res){ // callback para petición exitosa
				alert('Evento agregado a la base de datos.');
				$location.url('/eventos'); // Redirigir a la página de edición
			}, function(res){ // callback para cuando hay un error
				alert('Hubo un error de conexión. Por favor vuelve a intentarlo.');
			});
	};
});