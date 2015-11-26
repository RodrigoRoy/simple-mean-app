// Dependencias
var express = require('express');
var router = express.Router(); // para modularizar las rutas
var Usuario = require('./models/Usuario'); // Modelo de la colección "Usuarios"

var jwt = require('jsonwebtoken'); // manejo de autentificación por JSON Web Token
var secret = require('../config/jwt');

// Ruta para autentificar un usuario (POST http://localhost:8080/api/authenticate)
router.post('/authenticate', function(req, res){
    Usuario.findOne({
        username: req.body.username
    }).select('name username password').exec(function(err, usuario){
        if(err)
            throw err;

        // no se encontró usuario con ese username
        if(!usuario){
            res.json({
                success: false,
                message: 'Autentificación fallida. Usuario no encontrado.'
            });
        }
        else if (usuario) {
            // revisar que el password coincida
            var validPassword = usuario.comparePassword(req.body.password);
            if(!validPassword){
                res.json({
                    success: false,
                    message: 'Autentificación fallida. Contraseña incorrecta.'
                });
            } else {
                // si existe el usuario y el password es correcto
                // crear token
                var token = jwt.sign({
                    name: usuario.name,
                    username: usuario.username
                }, secret, {
                    expiresInMinutes: 1440 // expira en 24 horas
                });

                // devolver la información del token como JSON
                res.json({
                    success: true,
                    message: 'Disfruta tu token!',
                    token: token
                });
            }
        }
    });
});

module.exports = router; // Exportar el API para ser utilizado en server.js