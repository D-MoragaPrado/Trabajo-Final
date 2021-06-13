import {Md5} from "md5-typescript";
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql')


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
    let idProducto = req.params.id
    connection.query('SELECT * FROM producto WHERE id=?', idProducto, (reqSQL : any, resSQL : any) =>{
        if(res.status == 200){
            console.log(resSQL)
            res.status(200).send(reqSQL)
        }
        else{
            console.log('Producto no existente')        //???
            res.status(404)
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

app.get('/subcategorias', (req : any, res : any) => {
	connection.query('SELECT DISTINT `subcategoria_id` FROM `producto`', (reqSQL : any, resSQL : any) => {
		res.status(200).send(resSQL)
	})
})

app.get('/categorias/gatos/:id', (req : any, res : any) => {
    let idSubCategoria = req.params.id

})

app.get('/categorias/perros/:id', (req : any, res : any) => {
    let idSubCategoria = req.params.id

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
    connection.query("INSERT INTO `usuario`(`correo`, `nombres`, `apellidos`, `rut`, `password`, `region_id`, `comuna_id`)VALUES('"+correo+"','"+nombres+"','"+apellidos+"','"+rut+"','"+password+"','"+region+"','"+comuna+"')",(req1:any,resultados:any)=>{
        res.status(201).send("Usuario creado");
     });
})

app.post('/iniciar-sesion', (req : any, res : any) => {
    let correo=req.body.correo;
    let password = Md5.init(req.body.password);
    console.log(password);
    connection.query('SELECT * FROM `usuario` WHERE correo=? AND password=?',[correo,password], (reqSQL : any, resSQL : any) => {
        if(resSQL == ''){
            console.log("no existe");
            res.send(false);
        }
        else{
            console.log("Existee");
            res.send(true);
        }
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
