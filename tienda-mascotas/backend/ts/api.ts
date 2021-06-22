import {Md5} from "md5-typescript";
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql')
let sesionI:boolean=false
let usuarioSesion:any;


app.use(bodyParser.urlencoded({
    extended : false
}))
app.use(bodyParser.json({ extended: true }));

app.use(cors())

const Configuracion={
    server:"127.0.0.1",
    port : 3000
};


const connection = mysql.createConnection({
    host        : 'localhost',
    user        : 'root',
    port        : 3306,
    password    : '',
    database    : 'accesorios_mascotas'
})

connection.connect( function(err : any){
    if(err){
        console.log('Connection Error => ', err)
        return
    }
    console.log('Connection Success in MySQL')
})

//!!CRUD Productos

app.get('/producto/:id', (req : any, res : any) => {
    let idProducto = req.params.id;
    connection.query('SELECT * FROM `producto` WHERE id=?', idProducto, (reqSQL : any, resSQL : any) =>{
        //res.status(200).send(reqSQL); 
        if(resSQL == ''){
            console.log('Producto no existente');        //???
            res.status(404);
            
        }
        else{
            console.log(resSQL);
            res.status(200).send(resSQL);    
        } 
    })
})

app.get('/categorias/perros', (req : any, res : any) => {
	connection.query('SELECT * FROM `producto` WHERE `categoria_principal_id`=1', (reqSQL : any, resSQL : any) => {
		res.status(200).send(resSQL)
	})
})

app.get('/categorias/gatos', (req : any, res : any) => {
	connection.query('SELECT * FROM `producto` WHERE `categoria_principal_id`=2', (reqSQL : any, resSQL : any) => {
		res.status(200).send(resSQL)
	})
})

app.get('/subcategorias/:id', (req : any, res : any) => {
    let id_categoria = req.params.id;
	connection.query('SELECT * From `categorias` WHERE `categoria_id` IN (SELECT DISTINCT `subcategoria_id` FROM `producto` WHERE `categoria_principal_id`=?)',id_categoria, (reqSQL : any, resSQL : any) => {
		res.status(200).send(resSQL);    
	})
})

app.get('/subcategorias/:cat/:subcat', (req : any, res : any) => {
    let categoria = req.params.cat;
    let subCategoria = req.params.subcat;
    console.log(categoria,subCategoria,"1");
    connection.query('SELECT * FROM producto WHERE (categoria_principal_id=(SELECT categoria_id FROM categorias WHERE nombre_categoria=?) AND subcategoria_id=(SELECT categoria_id FROM categorias WHERE nombre_categoria=?))',[categoria,subCategoria], (reqSQL : any, resSQL : any) => {
		if(resSQL == ''){
            console.log('Product0 no existente');
            res.status(404);
            
        }
        else{
            console.log(resSQL);
            res.status(200).send(resSQL);    
        } 
	})

})
app.get('/comentarios/:idproducto', (req : any, res : any) => {
    let id_producto= req.params.idproducto;
    connection.query('SELECT * FROM comentarios WHERE id_producto=?',id_producto, (reqSQL : any, resSQL : any) => {
		if(resSQL == ''){
            console.log('Product0 no existente');
            res.status(404);
            
        }
        else{
            console.log(resSQL);
            res.status(200).send(resSQL);    
        } 
	})
})
//END CRUD Productos


//!!CRUD Usuarios

app.post('/crearUsuario', (req : any, res : any) => {
    let correo = req.body.correo;
    let nombres = req.body.nombres;
    let apellidos = req.body.apellidos;
    let rut = req.body.rut;
    let region = req.body.region;
    let comuna = req.body.comuna;
    let password = Md5.init(req.body.password);
    let pregunta = req.body.pregunta;
    let respuesta = Md5.init(req.body.respuesta);
    connection.query("INSERT INTO `usuario`(`correo`, `nombres`, `apellidos`, `rut`, `password`, `region_id`, `comuna_id`,`pregunta_secreta`,`respuesta_secreta`)VALUES('"+correo+"','"+nombres+"','"+apellidos+"','"+rut+"','"+password+"','"+region+"','"+comuna+"', '"+pregunta+"', '"+respuesta+"')",(req1:any,resultados:any)=>{
        res.status(201).send("Usuario creado");
     });
})

app.post('/iniciar-sesion', (req : any, res : any) => {
    let correo=req.body.correo;
    let password = Md5.init(req.body.password);
    connection.query('SELECT * FROM `usuario` WHERE correo=? AND password=?',[correo,password], (reqSQL : any, resSQL : any) => {
        if(resSQL == ''){
            console.log("no existe");
            res.send(false);
        }
        else{
            usuarioSesion=resSQL;
            console.log("Existee",usuarioSesion);
            res.send(true);
        }
    })
}) 
app.get('/obtener-pregunta/:correo', (req : any , res : any) => {
    let correo = req.params.correo
    connection.query('SELECT pregunta_secreta FROM `usuario` WHERE correo=?', correo, (reqSQL : any, resSQL : any) => {
        /*if(resSQL == ''){
            res.send(false);
        }
        else{*/
            res.status(200).send(resSQL);
        //}
    })
})
app.get('/obtener-usuario/:correo/:respuesta', (req : any , res : any) => {
    let correo = req.params.correo;
    let respuesta = Md5.init(req.params.respuesta);
    connection.query('SELECT * FROM `usuario` WHERE correo=? AND respuesta_secreta=?', [correo,respuesta], (reqSQL : any, resSQL : any) => {
        /*if(resSQL == ''){
            res.send(false);
        }
        else{*/
            res.status(200).send(resSQL);
        //}
    })
})

app.get('/obtener-usuario-activo', (req : any , res : any) => {
    console.log("usuario en sesion es:",usuarioSesion)
    res.status(200).send(usuarioSesion);
})

app.get('/cerrar-sesion', (req : any , res : any) => {
    usuarioSesion=null;
    res.status(200).send("sesion Cerrada");
})

app.put('/cambiar-clave', (req : any, res : any) => {
    let correo = req.body.correo;
    let password = Md5.init(req.body.password);
    connection.query('UPDATE `usuario` SET password=? WHERE correo=?', [password,correo], (reqSQL : any, resSQL : any) => {
        /*if(resSQL == ''){
            res.send(false);
        }
        else{*/
            res.status(200).send(resSQL);
        //}
    })

})
// Checkeo de correo existente en bd

app.get('/formulario-registro/:correo', (req : any , res : any) => {
    let correo = req.params.correo
    connection.query('SELECT * FROM `usuario` WHERE correo=?', correo, (reqSQL : any, resSQL : any) => {
        if(resSQL == ''){
            res.send(false);
        }
        else{
            res.send(true);
        }
    })
})

//END CRUD Usuarios

//!!CRUD Regiones

app.get('/regiones', (req : any, res : any) => {
    connection.query('SELECT * FROM `regiones`', (reqSQL : any, resSQL : any) => {
        res.status(200).send(resSQL)
        
    })
})

//END CRUD Regiones



//!!CRUD Comunas

app.get('/regiones/:id', (req : any, res : any) => {
    let id=req.params.id
    connection.query('SELECT * FROM `comunas` WHERE region_id=?', id, (reqSQL : any, resSQL : any) =>{
        res.status(200).send(resSQL)
    })
})

//END CRUD Comunas

app.listen(Configuracion, () => {
    console.log(`App listening at http://${Configuracion.server}:${Configuracion.port}`)
})
