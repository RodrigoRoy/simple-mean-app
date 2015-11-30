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
	'ngAnimate', //Animaciones CSS
	'ngSanitize', // Mostrar HTML de manera segura
	
	'appRoutes', // Rutas y controladores

	'textAngular', // 3rd party WYSWYG HTML text editor

	'MainCtrl', // Controladores creados
	'EventosCtrl', 
	'EventoCtrl', 
	'AgregarEditarEventoCtrl', 

	'EventoService' // Peticiones a la base de datos (Factories)
]);