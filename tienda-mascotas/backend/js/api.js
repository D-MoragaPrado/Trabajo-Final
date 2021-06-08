"use strict";
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var cors = require('cors');
var mysql = require('mysql');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
var Configuracion = {
    server: "127.0.0.1",
    port: 3000
};
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
    console.log('Connection Success in MySQL');
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
            res.status(404);
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
app.get('/formulario-registro/:correo', function (req, res) {
    var correo = req.params.correo;
    connection.query('SELECT * FROM `usuario` WHERE correo=?', correo, function (reqSQL, resSQL) {
        if (resSQL == '') {
            res.send("Correo sin usuario");
        }
        else {
            res.send("Correo ya utilizado! use otro porfis");
        }
    });
});
//END CRUD Usuarios
//!!CRUD Regiones
app.get('/regiones', function (req, res) {
    connection.query('SELECT * FROM `regiones`', function (reqSQL, resSQL) {
        res.status(200).send(resSQL);
    });
});
//END CRUD Regiones
//!!CRUD Comunas
app.get('/regiones/:id', function (req, res) {
    var id = req.params.id;
    connection.query('SELECT * FROM `comunas` WHERE region_id=?', id, function (reqSQL, resSQL) {
        res.status(200).send(resSQL);
    });
});
//END CRUD Comunas
app.listen(Configuracion, function () {
    console.log("App listening at http://" + Configuracion.server + ":" + Configuracion.port);
});
