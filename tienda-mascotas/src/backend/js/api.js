"use strict";
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var mysql = require('mysql');
app.use(bodyParser.urlencoded({
    extended: false
}));
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'accesorios_mascotas'
});
connection.connect(function (err) {
    if (err) {
        console.log('Connection Error => ', err);
        return;
    }
    console.log('Connection Success in MySQL, connection hosted in port ', connection.port);
});
//!!CRUD Productos
app.get('/producto/:id', function (req, res) {
    var idProducto = req.params.id;
    connection.query('SELECT * FROM producto WHERE id=?', idProducto, function (reqSQL, resSQL) {
        if (res.status == 200) {
            console.log(resSQL);
            res.status(200).send(reqSQL);
        }
        else {
            console.log('Producto no existente'); //???
            res.status(401);
        }
    });
});
//END CRUD Productos
//!!CRUD Usuarios
app.get('/crearUsuario', function (req, res) {
    var correo = req.body.correo;
    var nombres = req.body.nombres;
    var apellidos = req.body.apellidos;
    var rut = req.body.rut;
    var region = req.body.region;
    var comuna = req.body.comuna;
    var password = req.body.password;
});
//END CRUD Usuarios
//!!CRUD Regiones
//END CRUD Regiones
//!!CRUD Comunas
//END CRUD Comunas
app.listen(connection, function () {
    console.log("App listening at http://" + connection.host + ":" + connection.port);
});
