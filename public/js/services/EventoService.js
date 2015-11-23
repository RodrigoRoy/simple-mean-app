/*
Factory (objeto) de Angular para las llamadas a la base de datos.
Este factory ('Evento') se inyecta como dependencia en otros controladores para obtener datos de la base.

Las llamadas son asíncronas y el resultado de cada función devuelve un objeto "promise".
Para obtener los datos de la base, usar las funciones "then" o "success" del objeto "promise" en el controlador.
*/

angular.module('EventoService', []).factory('Evento', ['$http', function($http){
	return {
		// Obtener todos los eventos
		all: function(){
			return $http.get('/api/eventos');
		},

		// Obtener un evento particular (mediante el ID)
		get: function(eventID){
			return $http.get('/api/eventos/' + eventID);
		},

		// Crear un nuevo evento
		// Recibe como parámetro la información del evento
		create: function(eventData){
			return $http.post('/api/eventos', eventData);
		},

		// Actualiza la información de un evento (mediante el ID)
		// Recibe el ID del evento a modificar y la nueva información del evento
		update: function(eventID, eventData){
			return $http.put('/api/eventos/' + eventID, eventData);
		},

		// Elimina un evento (mediante el ID)
		delete: function(eventID){
			return $http.delete('/api/eventos/' + eventID);
		}
	}
}]);