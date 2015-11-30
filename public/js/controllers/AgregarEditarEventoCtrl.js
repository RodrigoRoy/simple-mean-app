/*
Permite manipular la información del formulario de evento.
*/
angular.module('AgregarEditarEventoCtrl', []).controller('AgregarEditarEventoController', function($scope, $location, $cookies, Evento){
	$scope.eventoID = $cookies.get('eventoID'); // El cookie existe si se dió click en editar evento en la página de eventos

	// Inicialización de los campos si se desea editar
	if($scope.eventoID){ // modo de edición?
		Evento.get($scope.eventoID)
			.then(function(res){ // callback para petición exitosa
				$scope.titulo = res.data.titulo;
				$scope.descripcion = res.data.descripcion;
				$scope.contenidoHTML = res.data.contenidoHTML;
				$cookies.remove('eventoID'); // Eliminar cookie
			}, function(res){ // callback para cuando hay un error
				alert('Hubo un error de conexión. Serás redireccionado a la página de eventos.');
				$location.url('/eventos'); // Redirigir a la página de eventos
			});
	}

	// Envia la información del formulario a la base de datos mediante el servicio Evento
	$scope.enviar = function(){
		// Objeto con la información a enviar
		var newEvento = {
			'titulo': $scope.titulo,
			'descripcion': $scope.descripcion,
			'contenidoHTML': $scope.contenidoHTML
		};
		// Enviar información a través del factory Evento
		Evento.create(newEvento)
			.then(function(res){ // callback para petición exitosa
				alert('Evento agregado a la base de datos.');
				$location.url('/eventos'); // Redirigir a la página de eventos
			}, function(res){ // callback para cuando hay un error
				alert('Hubo un error de conexión. Por favor vuelve a intentarlo.');
			});
	};

	// Actualiza la información en el formulario con la de la base de datos mediante el servicio Evento
	$scope.editar = function(){
		var updateData = { // objeto con la información del formulario
			'titulo': $scope.titulo,
			'descripcion': $scope.descripcion,
			'contenidoHTML': $scope.contenidoHTML
		};
		Evento.update($scope.eventoID, updateData)
			.then(function(res){ // callback para petición exitosa
				alert('Evento actualizado en la base de datos.');
				$location.url('/eventos'); // Redirigir a la página de eventos
			}, function(res){ // callback para cuando hay un error
				alert('Hubo un error de conexión. Por favor vuelve a intentarlo.');
			});
	};
});