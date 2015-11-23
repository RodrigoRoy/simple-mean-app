/*
Definición principal de la aplicación 'meanApp' (mediante Angular)
Debido a que cada componente que utiliza la aplicación está modularizado, este archivo sirve para cargar dichos componentes.
Los componentes principales de la aplicación son:
  - Dependencias de Angular, e.g. ngRoute
  - Controladores, e.g. EventosCtrl (creadas por el programador)
  - Services/Factories. e.g. EventoService (principalmente para el manejo del API de la base de datos)
*/
angular.module('meanApp', [
	'ngRoute', // Front end router
	'ngMessages',  // Mensaje de validación en formularios
	'ngCookies', // Manejo de cookies del navegador
	
	'appRoutes', // Rutas y controladores

	'MainCtrl', // Controladores creados
	'EventosCtrl', 
	'AgregarEditarEventoCtrl', 

	'EventoService' // Peticiones a la base de datos (Factories)
]);