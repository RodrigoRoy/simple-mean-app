/*
Archivo de configuración y manejo del servidor (mediante Node.js)
*/

// MÓDULOS =================================================
var express        = require('express'); // llamar a express
var app            = express(); // definir la aplicación usando express
var mongoose       = require('mongoose'); // para trabajar con la base de datos
var bodyParser     = require('body-parser'); // obtener body-parser
var methodOverride = require('method-override');
var morgan         = require('morgan'); // usado para ver peticiones (requests)

// CONFIGURACIÓN ===========================================
	
// archivos de configuración
var port = process.env.PORT || 8080; // establecer puerto

// base de datos
var db = require('./config/db'); // carga la ruta de la base de datos
mongoose.connect(db.url); // conectar a base de datos mongoDB

// permite obtener datos de los parámetros del cuerpo/body (POST)
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json como json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // sobreescribe con el encabezado X-HTTP-Method-Override en petición. Simula DELETE/PUT
app.use(express.static(__dirname + '/public')); // establece ubicación de archivos estáticos. /public/img será /img para los usuarios

// RUTAS ===================================================

// configurar la aplicación para manejar peticiones CORS (Cross-origin resource sharing requests)
app.use(function(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

// log de todas las peticiones (request) en consola
app.use(morgan('dev'));

// RUTAS PARA EL API

var usuarios = require('./app/usuarios_api'); // API para Usuarios de la base de datos
app.use('/api/usuarios', usuarios); // usar el API desde la ruta "/api/usuarios"

var eventos = require('./app/eventos_api'); // API para Eventos de la base de datos
app.use('/api/eventos', eventos); // usar el API desde la ruta "/api/eventos"

// REGISTRAR LAS DEMÁS RUTAS

require('./app/routes')(app); // pasar a la aplicación las demás rutas a utilizar

// INICIAR APP =============================================
app.listen(port);
console.log('Magic happens on port ' + port);
exports = module.exports = app; // exponer app