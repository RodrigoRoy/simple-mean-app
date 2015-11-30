/*
API para manejo de la base de datos con la colección de "Eventos"
Permite obtener datos en formato JSON mediante verbos HTTP (GET, POST, PUT, DELETE)

Las rutas aqui definidas son un router que le antecede una ruta general de uso (ver server.js)
Por ejemplo:
GET    http://localhost:8080/api/eventos
POST   http://localhost:8080/api/eventos
GET    http://localhost:8080/api/eventos/1234567890
PUT    http://localhost:8080/api/eventos/1234567890
DELETE http://localhost:8080/api/eventos/1234567890
*/

// Dependencias
var express = require('express');
var router = express.Router(); // para modularizar las rutas
var Evento = require('./models/Evento'); // Modelo de la colección "Eventos"

// Función a realizar siempre que se utilize esta API
router.use(function(req, res, next){
    console.log('Usando el API de Eventos.');
    next(); // Pasar el control de las rutas a la siguiente coincidencia
});

// En peticiones a la raiz del API
router.route('/')
	// Obtener todos los eventos
	.get(function(req, res){
        Evento.find(function(err, evento){
            if(err)
                res.send(err);
            res.json(evento);
        })
    })

    // Agregar un nuevo evento
    .post(function(req, res){
        var evento = new Evento();
        evento.titulo = req.body.titulo;
        evento.descripcion = req.body.descripcion;
        evento.contenidoHTML = req.body.contenidoHTML;

        evento.save(function(err){
            if(err)
                res.send(err);
            res.json({message: 'Evento creado'});
        })
    })

// En peticiones con un ID
router.route('/:evento_id')
	// Obtener un evento particular (mediante el ID)
    .get(function(req, res){
        Evento.findById(req.params.evento_id, function(err, evento){
            if(err)
                res.send(err);
            res.json(evento);
        });
    })

    // Actualizar un evento en particular (mediante el ID)
    .put(function(req, res){
        Evento.findById(req.params.evento_id, function(err, evento){
            if(err)
                res.send(err);
            
            if(req.body.titulo)
                evento.titulo = req.body.titulo;
            if(req.body.descripcion)
                evento.descripcion = req.body.descripcion;
            if(req.body.contenidoHTML)
                evento.contenidoHTML = req.body.contenidoHTML;

            evento.save(function(err){
                if(err)
                    res.send(err);
                res.json({message: 'Evento actualizado'});
            })
        })
    })

    // Eliminar un evento en particular (mediante el ID)
    .delete(function(req, res){
        Evento.remove({
            _id: req.params.evento_id
        }, function(err, evento){
            if(err)
                res.send(err);
            res.json({message: 'Evento borrado exitosamente'})
        });
    })

module.exports = router; // Exportar el API para ser utilizado en server.js