"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var md5_typescript_1 = require("md5-typescript");
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var cors = require('cors');
var mysql = require('mysql');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json({ extended: true }));
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
    connection.query('SELECT * FROM `producto` WHERE id=?', idProducto, function (reqSQL, resSQL) {
        //res.status(200).send(reqSQL); 
        if (resSQL == '') {
            console.log('Producto no existente'); //???
            res.status(404);
        }
        else {
            console.log(resSQL);
            res.status(200).send(resSQL);
        }
    });
});
app.get('/categorias/perros', function (req, res) {
    connection.query('SELECT * FROM `producto` WHERE `categoria_principal_id`=1', function (reqSQL, resSQL) {
        res.status(200).send(resSQL);
    });
});
app.get('/categorias/gatos', function (req, res) {
    connection.query('SELECT * FROM `producto` WHERE `categoria_principal_id`=2', function (reqSQL, resSQL) {
        res.status(200).send(resSQL);
    });
});
app.get('/subcategorias/:id', function (req, res) {
    var id_categoria = req.params.id;
    connection.query('SELECT * From `categorias` WHERE `categoria_id` IN (SELECT DISTINCT `subcategoria_id` FROM `producto` WHERE `categoria_principal_id`=?)', id_categoria, function (reqSQL, resSQL) {
        res.status(200).send(resSQL);
    });
});
app.get('/subcategorias/:cat/:subcat', function (req, res) {
    var categoria = req.params.cat;
    var subCategoria = req.params.subcat;
    console.log(categoria, subCategoria, "1");
    connection.query('SELECT * FROM producto WHERE (categoria_principal_id=(SELECT categoria_id FROM categorias WHERE nombre_categoria=?) AND subcategoria_id=(SELECT categoria_id FROM categorias WHERE nombre_categoria=?))', [categoria, subCategoria], function (reqSQL, resSQL) {
        if (resSQL == '') {
            console.log('Products no existente');
            res.status(404);
        }
        else {
            console.log(resSQL);
            res.status(200).send(resSQL);
        }
    });
});
//END CRUD Productos
//!!CRUD Usuarios
app.post('/crearUsuario', function (req, res) {
    var correo = req.body.correo;
    var nombres = req.body.nombres;
    var apellidos = req.body.apellidos;
    var rut = req.body.rut;
    var region = req.body.region;
    var comuna = req.body.comuna;
    var password = md5_typescript_1.Md5.init(req.body.password);
    var pregunta = req.body.pregunta;
    var respuesta = md5_typescript_1.Md5.init(req.body.respuesta);
    connection.query("INSERT INTO `usuario`(`correo`, `nombres`, `apellidos`, `rut`, `password`, `region_id`, `comuna_id`,`pregunta_secreta`,`respuesta_secreta`)VALUES('" + correo + "','" + nombres + "','" + apellidos + "','" + rut + "','" + password + "','" + region + "','" + comuna + "', '" + pregunta + "', '" + respuesta + "')", function (req1, resultados) {
        res.status(201).send("Usuario creado");
    });
});
app.post('/iniciar-sesion', function (req, res) {
    var correo = req.body.correo;
    var password = md5_typescript_1.Md5.init(req.body.password);
    connection.query('SELECT * FROM `usuario` WHERE correo=? AND password=?', [correo, password], function (reqSQL, resSQL) {
        if (resSQL == '') {
            console.log("no existe");
            res.send(false);
        }
        else {
            console.log("Existee");
            res.send(true);
        }
    });
});
app.get('/obtener-pregunta/:correo', function (req, res) {
    var correo = req.params.correo;
    connection.query('SELECT pregunta_secreta FROM `usuario` WHERE correo=?', correo, function (reqSQL, resSQL) {
        /*if(resSQL == ''){
            res.send(false);
        }
        else{*/
        res.status(200).send(resSQL);
        //}
    });
});
app.get('/obtener-usuario/:correo/:respuesta', function (req, res) {
    var correo = req.params.correo;
    var respuesta = md5_typescript_1.Md5.init(req.params.respuesta);
    connection.query('SELECT * FROM `usuario` WHERE correo=? AND respuesta_secreta=?', [correo, respuesta], function (reqSQL, resSQL) {
        /*if(resSQL == ''){
            res.send(false);
        }
        else{*/
        res.status(200).send(resSQL);
        //}
    });
});
app.put('/cambiar-clave', function (req, res) {
    var correo = req.body.correo;
    var password = md5_typescript_1.Md5.init(req.body.password);
    connection.query('UPDATE `usuario` SET password=? WHERE correo=?', [password, correo], function (reqSQL, resSQL) {
        /*if(resSQL == ''){
            res.send(false);
        }
        else{*/
        res.status(200).send(resSQL);
        //}
    });
});
// Checkeo de correo existente en bd
app.get('/formulario-registro/:correo', function (req, res) {
    var correo = req.params.correo;
    connection.query('SELECT * FROM `usuario` WHERE correo=?', correo, function (reqSQL, resSQL) {
        if (resSQL == '') {
            res.send(false);
        }
        else {
            res.send(true);
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
