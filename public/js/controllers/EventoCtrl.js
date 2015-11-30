angular.module('EventoCtrl', []).controller('EventoController', function($scope, $location, $routeParams, $cookies, Evento){
	
	// Obtener los eventos y asignarlos al arreglo $scope.eventos
	Evento.get($routeParams.eventoID) // objeto "promise"
		.then(function(res){ // callback para petición exitosa
			$scope.titulo = res.data.titulo;
			//$scope.descripcion = res.data.descripcion;
			$scope.contenidoHTML = res.data.contenidoHTML;
		}, function(res){ // callback para petición cuando hay error
			alert('Error de conexión con la base de datos.\n Revise la conexión a internet e intente nuevamente.');
		});

	$scope.editar = function(){
		$cookies.put('eventoID', $routeParams.eventoID);
		$location.url('/eventos/nuevo'); // Redirigir a la página de edición
	};
	
	$scope.eliminar = function(){
		Evento.delete($routeParams.eventoID)
			.then(function(res){
				alert('Evento eliminado de la base de datos.');
				$location.url('/eventos');
			}, function(res){
				alert('Error al eliminar de la base. Intenta nuevamente.');
			});
	};
});