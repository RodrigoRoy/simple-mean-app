/*
Archivo de configuración y manejo del servidor (mediante Node.js)
*/

// MÓDULOS =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// CONFIGURACIÓN ===========================================
	
// archivos de configuración
var db = require('./config/db'); // carga la ruta de la base de datos

var port = process.env.PORT || 8080; // establecer puerto
mongoose.connect(db.url); // conectar a base de datos mongoDB

// permite obtener datos de los parámetros del cuerpo/body (POST)
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json como json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // sobreescribe con el encabezado X-HTTP-Method-Override en petición. Simula DELETE/PUT
app.use(express.static(__dirname + '/public')); // establece ubicación de archivos estáticos. /public/img será /img para los usuarios

// RUTAS ===================================================
var eventos = require('./app/eventos_api'); // API para Eventos de la base de datos
app.use('/api/eventos', eventos); // usar el API desde la ruta "/api/eventos"

require('./app/routes')(app); // pasar a la aplicación las demás rutas a utilizar

// INICIAR APP =============================================
app.listen(port);
console.log('Magic happens on port ' + port);
exports = module.exports = app; // exponer app