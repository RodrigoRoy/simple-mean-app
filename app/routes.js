/*
Define las rutas a usar en el servidor

Para fines prácticos, cualquier petición al servidor responde con el archivo public/index.html
Este archivo tiene el manejo de rutas front-end desde public/js/app.js
y que hace uso de $routeProvider en public/js/appRoutes.js
*/
module.exports = function(app) {

    /* El siguiente código es válido para manejar más de una ruta y permanece solo en caso de ser requerido*/
    // frontend routes =========================================================
    // route to handle all angular requests
    // app.get('/', function(req, res) {
    //     res.sendfile('./public/index.html'); // load our public/index.html file
    // });

    // app.get('*', function(req, res) {
    //     res.sendfile('./public/views/404.html'); // load our public/404.html file
    // });

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // cargar el archivo public/index.html
    });

};