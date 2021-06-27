"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var md5_typescript_1 = require("md5-typescript");
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var cors = require('cors');
var mysql = require('mysql');
var sesionI = false;
var usuarioSesion;
var usuarioAdmin;
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
        if (resSQL == '') {
            console.log('Sin subcategorias');
            res.status(404);
        }
        else {
            console.log(resSQL);
            res.status(200).send(resSQL);
        }
    });
});
app.get('/subcategorias/:cat/:subcat', function (req, res) {
    var categoria = req.params.cat;
    var subCategoria = req.params.subcat;
    console.log(categoria, subCategoria, "1");
    connection.query('SELECT * FROM producto WHERE (categoria_principal_id=(SELECT categoria_id FROM categorias WHERE nombre_categoria=?) AND subcategoria_id=(SELECT categoria_id FROM categorias WHERE nombre_categoria=?))', [categoria, subCategoria], function (reqSQL, resSQL) {
        if (resSQL == '') {
            console.log('Sin productos');
            res.status(404);
        }
        else {
            console.log(resSQL);
            res.status(200).send(resSQL);
        }
    });
});
app.get('/comentarios/:idproducto', function (req, res) {
    var id_producto = req.params.idproducto;
    connection.query('SELECT * FROM comentarios WHERE id_producto=?', id_producto, function (reqSQL, resSQL) {
        if (resSQL == '') {
            console.log('Sin comentarios');
            res.status(404);
        }
        else {
            console.log(resSQL);
            res.status(200).send(resSQL);
        }
    });
});
app.post('/agregar-comentario', function (req, res) {
    console.log(req.body);
    var id_producto = req.body.id_producto;
    var comment = req.body.comment;
    var nombre_usuario = req.body.nombre_usuario;
    var rating = req.body.rating;
    connection.query("INSERT INTO `comentarios`(`id_producto`, `nombre_usuario`, `comment`, `rating`)VALUES('" + id_producto + "','" + nombre_usuario + "','" + comment + "','" + rating + "')", function (req1, resultados) {
        res.status(201).send("Comentario Agregado");
    });
});
app.put('/cambiar-valoracion', function (req, res) {
    var id_producto = req.body.id;
    var newValoracion = req.body.calificacion;
    console.log("la nueva valoracion es ", newValoracion);
    connection.query('UPDATE `producto` SET calificacion=? WHERE id=?', [newValoracion, id_producto], function (reqSQL, resSQL) {
        res.status(200).send(resSQL);
    });
});
app.post('/realizar-compra', function (req, res) {
    console.log(req.body);
    var total_compra = 0;
    var comprador = usuarioSesion[0].correo;
    var fecha = "";
    var id;
    for (var i = 0; i < req.body.length; i++) {
        total_compra += req.body[i].producto.precio * req.body[i].cantidadProducto;
    }
    connection.query("INSERT INTO `pedidos`( `comprador`, `fecha_compra`, `total_compra`)VALUES('" + comprador + "','" + fecha + "','" + total_compra + "')", function (req1, resultados) {
        res.send("Pedido ingresado");
    });
    connection.query("SELECT MAX(id_pedido) AS id FROM pedidos", function (req1, resultados) {
        for (var i = 0; i < req.body.length; i++) {
            connection.query("INSERT INTO `compras`( `id_pedido`, `id_producto`, `cantidad_producto`)VALUES('" + resultados[0].id + "','" + req.body[i].producto.id + "','" + req.body[i].cantidadProducto + "')", function (req2, res2) {
                res.status(200);
            });
            connection.query('UPDATE `producto` SET stock=(stock-?) WHERE id=?', [req.body[i].cantidadProducto, req.body[i].producto.id], function (reqSQL, resSQL) {
                console.log("stock actualizado");
            });
        }
    });
});
app.get('/obtener-productos', function (req, res) {
    connection.query('SELECT DISTINCT id_parcial, comprador, nombre, total_compra, cantidad_producto  FROM compras LEFT JOIN pedidos ON compras.id_pedido = pedidos.id_pedido LEFT JOIN producto ON compras.id_producto = producto.id', function (reqSQL, resSQL) {
        res.status(200).send(resSQL);
    });
});
app.get('/filtro-total/:cat/:subcat/:pmin/:pmax/:rmin/:rmax', function (req, res) {
    var cat = req.params.cat;
    var subcat = req.params.subcat;
    var pmin = req.params.pmin;
    var pmax = req.params.pmax;
    var rmin = req.params.rmin;
    var rmax = req.params.rmax;
    console.log("filtro totall");
    if (subcat == "none") {
        console.log("solo categoriass");
        connection.query('SELECT * FROM producto WHERE (categoria_principal_id=(SELECT categoria_id FROM categorias WHERE nombre_categoria=?) AND (stock>0) AND (precio>=? AND precio<=?) AND (calificacion>=? AND calificacion<=?))  ', [cat, pmin, pmax, rmin, rmax], function (reqSQL, resSQL) {
            console.log(resSQL);
            res.status(200).send(resSQL);
        });
    }
    else {
        console.log("con sub");
        connection.query('SELECT * FROM producto WHERE (categoria_principal_id=(SELECT categoria_id FROM categorias WHERE nombre_categoria=?) AND subcategoria_id=(SELECT categoria_id FROM categorias WHERE nombre_categoria=?) AND (stock>0) AND (precio>=? AND precio<=?) AND (calificacion>=? AND calificacion<=?)) ', [cat, subcat, pmin, pmax, rmin, rmax], function (reqSQL, resSQL) {
            console.log(resSQL);
            res.status(200).send(resSQL);
        });
    }
});
app.get('/filtro-disponible/:cat/:subcat', function (req, res) {
    var cat = req.params.cat;
    var subcat = req.params.subcat;
    console.log(cat, subcat);
    if (subcat == "none") {
        console.log("solo categoriass y disponible");
        connection.query('SELECT * FROM  `producto` WHERE (categoria_principal_id=(SELECT categoria_id FROM categorias WHERE nombre_categoria=?) AND (stock>0))', cat, function (reqSQL, resSQL) {
            res.status(200).send(resSQL);
        });
    }
    else {
        console.log("con sub y disponible");
        connection.query('SELECT * FROM `producto` WHERE (categoria_principal_id=(SELECT categoria_id FROM categorias WHERE nombre_categoria=?) AND subcategoria_id=(SELECT categoria_id FROM categorias WHERE nombre_categoria=?) AND (stock>0))', [cat, subcat], function (reqSQL, resSQL) {
            res.status(200).send(resSQL);
        });
    }
});
app.get('/filtro-precio/:cat/:subcat/:pmin/:pmax', function (req, res) {
    var cat = req.params.cat;
    var subcat = req.params.subcat;
    var pmin = req.params.pmin;
    var pmax = req.params.pmax;
    console.log(cat, subcat);
    if (subcat == "none") {
        console.log("solo categoriass y por precio");
        connection.query('SELECT * FROM  `producto` WHERE (categoria_principal_id=(SELECT categoria_id FROM categorias WHERE nombre_categoria=?) AND (precio>=? AND precio<=?))', [cat, pmin, pmax], function (reqSQL, resSQL) {
            res.status(200).send(resSQL);
        });
    }
    else {
        console.log("con sub y por precio");
        connection.query('SELECT * FROM `producto` WHERE (categoria_principal_id=(SELECT categoria_id FROM categorias WHERE nombre_categoria=?) AND subcategoria_id=(SELECT categoria_id FROM categorias WHERE nombre_categoria=?) AND (precio>=? AND precio<=?))', [cat, subcat, pmin, pmax], function (reqSQL, resSQL) {
            res.status(200).send(resSQL);
        });
    }
});
app.get('/filtro-rating/:cat/:subcat/:rmin/:rmax', function (req, res) {
    var cat = req.params.cat;
    var subcat = req.params.subcat;
    var rmin = req.params.rmin;
    var rmax = req.params.rmax;
    console.log(cat, subcat);
    if (subcat == "none") {
        console.log("solo categoriass y por precio");
        connection.query('SELECT * FROM  `producto` WHERE (categoria_principal_id=(SELECT categoria_id FROM categorias WHERE nombre_categoria=?) AND (calificacion>=? AND calificacion<=?))', [cat, rmin, rmax], function (reqSQL, resSQL) {
            res.status(200).send(resSQL);
        });
    }
    else {
        console.log("con sub y por precio");
        connection.query('SELECT * FROM `producto` WHERE (categoria_principal_id=(SELECT categoria_id FROM categorias WHERE nombre_categoria=?) AND subcategoria_id=(SELECT categoria_id FROM categorias WHERE nombre_categoria=?) AND (calificacion>=? AND calificacion<=?))', [cat, subcat, rmin, rmax], function (reqSQL, resSQL) {
            res.status(200).send(resSQL);
        });
    }
});
app.get('/filtro-disponibilidad-precio/:cat/:subcat/:pmin/:pmax', function (req, res) {
    var cat = req.params.cat;
    var subcat = req.params.subcat;
    var pmin = req.params.pmin;
    var pmax = req.params.pmax;
    if (subcat == "none") {
        console.log("solo categoriass y disponibilidad con precio");
        connection.query('SELECT * FROM producto WHERE (categoria_principal_id=(SELECT categoria_id FROM categorias WHERE nombre_categoria=?) AND (stock>0) AND (precio>=? AND precio<=?) )  ', [cat, pmin, pmax], function (reqSQL, resSQL) {
            console.log(resSQL);
            res.status(200).send(resSQL);
        });
    }
    else {
        console.log("con sub y disponibilidad con precio");
        connection.query('SELECT * FROM producto WHERE (categoria_principal_id=(SELECT categoria_id FROM categorias WHERE nombre_categoria=?) AND subcategoria_id=(SELECT categoria_id FROM categorias WHERE nombre_categoria=?) AND (stock>0) AND (precio>=? AND precio<=?) ) ', [cat, subcat, pmin, pmax], function (reqSQL, resSQL) {
            console.log(resSQL);
            res.status(200).send(resSQL);
        });
    }
});
app.get('/filtro-disponibilidad-rating/:cat/:subcat/:rmin/:rmax', function (req, res) {
    var cat = req.params.cat;
    var subcat = req.params.subcat;
    var rmin = req.params.rmin;
    var rmax = req.params.rmax;
    if (subcat == "none") {
        console.log("solo categoriass y disponibilidad con rating");
        connection.query('SELECT * FROM producto WHERE (categoria_principal_id=(SELECT categoria_id FROM categorias WHERE nombre_categoria=?) AND (stock>0)  AND (calificacion>=? AND calificacion<=?))  ', [cat, rmin, rmax], function (reqSQL, resSQL) {
            console.log(resSQL);
            res.status(200).send(resSQL);
        });
    }
    else {
        console.log("con sub y disponibilidad con rating");
        connection.query('SELECT * FROM producto WHERE (categoria_principal_id=(SELECT categoria_id FROM categorias WHERE nombre_categoria=?) AND subcategoria_id=(SELECT categoria_id FROM categorias WHERE nombre_categoria=?) AND (stock>0) AND (calificacion>=? AND calificacion<=?)) ', [cat, subcat, rmin, rmax], function (reqSQL, resSQL) {
            console.log(resSQL);
            res.status(200).send(resSQL);
        });
    }
});
app.get('/filtro-precio-rating/:cat/:subcat/:pmin/:pmax/:rmin/:rmax', function (req, res) {
    var cat = req.params.cat;
    var subcat = req.params.subcat;
    var pmin = req.params.pmin;
    var pmax = req.params.pmax;
    var rmin = req.params.rmin;
    var rmax = req.params.rmax;
    if (subcat == "none") {
        console.log("solo categoriass y precio con rating");
        connection.query('SELECT * FROM producto WHERE (categoria_principal_id=(SELECT categoria_id FROM categorias WHERE nombre_categoria=?)  AND (precio>=? AND precio<=?) AND (calificacion>=? AND calificacion<=?))  ', [cat, pmin, pmax, rmin, rmax], function (reqSQL, resSQL) {
            console.log(resSQL);
            res.status(200).send(resSQL);
        });
    }
    else {
        console.log("con sub");
        connection.query('SELECT * FROM producto WHERE (categoria_principal_id=(SELECT categoria_id FROM categorias WHERE nombre_categoria=?) AND subcategoria_id=(SELECT categoria_id FROM categorias WHERE nombre_categoria=?) AND (precio>=? AND precio<=?) AND (calificacion>=? AND calificacion<=?)) ', [cat, subcat, pmin, pmax, rmin, rmax], function (reqSQL, resSQL) {
            console.log(resSQL);
            res.status(200).send(resSQL);
        });
    }
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
            res.send(false).status(200);
        }
        else {
            usuarioSesion = resSQL;
            console.log("Existee", usuarioSesion);
            res.send(true).status(200);
        }
    });
});
app.get('/obtener-pregunta/:correo', function (req, res) {
    var correo = req.params.correo;
    connection.query('SELECT pregunta_secreta FROM `usuario` WHERE correo=?', correo, function (reqSQL, resSQL) {
        res.status(200).send(resSQL);
    });
});
app.get('/obtener-usuario/:correo/:respuesta', function (req, res) {
    var correo = req.params.correo;
    var respuesta = md5_typescript_1.Md5.init(req.params.respuesta);
    connection.query('SELECT * FROM `usuario` WHERE correo=? AND respuesta_secreta=?', [correo, respuesta], function (reqSQL, resSQL) {
        res.status(200).send(resSQL);
    });
});
app.get('/obtener-usuarios', function (req, res) {
    connection.query('SELECT `rut`, `nombres`, `apellidos`, `correo` FROM `usuario`', function (reqSQL, resSQL) {
        res.status(200).send(resSQL);
    });
});
app.get('/obtener-usuario-activo', function (req, res) {
    console.log("usuario en sesion es:", usuarioSesion);
    res.status(200).send(usuarioSesion);
});
app.get('/cerrar-sesion', function (req, res) {
    usuarioSesion = null;
    res.status(200).send("sesion Cerrada");
});
app.put('/cambiar-clave', function (req, res) {
    var correo = req.body.correo;
    var password = md5_typescript_1.Md5.init(req.body.password);
    connection.query('UPDATE `usuario` SET password=? WHERE correo=?', [password, correo], function (reqSQL, resSQL) {
        res.status(200).send(resSQL);
    });
});
// Checkeo de correo existente en bd
app.get('/formulario-registro/:correo', function (req, res) {
    var correo = req.params.correo;
    connection.query('SELECT * FROM `usuario` WHERE correo=?', correo, function (reqSQL, resSQL) {
        if (resSQL == '') {
            res.send(false).status(200);
        }
        else {
            res.send(true).status(200);
        }
    });
});
//END CRUD Usuarios
//!!CRUD Usuarios Admin
app.post('/login/admin', function (req, res) {
    var nombreAdmin = req.body.nombre_admin;
    var passAdmin = md5_typescript_1.Md5.init(req.body.pass_admin);
    connection.query('SELECT * FROM `usuario_admin` WHERE nombre_admin=? AND pass_admin=?', [nombreAdmin, passAdmin], function (reqSQL, resSQL) {
        if (resSQL == '') {
            console.log("Nombre Administrador inexistente o incorrecto");
            console.log(nombreAdmin, " ", passAdmin);
            res.send(false);
        }
        else {
            usuarioAdmin = resSQL;
            console.log("Usuario Administrador ingresado", usuarioAdmin);
            res.send(true);
        }
    });
});
app.get('/obtener-administrador-activo', function (req, res) {
    console.log("Administrador activo es: ", usuarioAdmin);
    res.status(200).send(usuarioAdmin);
});
app.get('/cerrar-sesion-admin', function (req, res) {
    usuarioAdmin = null;
    res.status(200).send("Sesión Administrador Cerrada");
});
//END CRUD Usuarios Admin
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
