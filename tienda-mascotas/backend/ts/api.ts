const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql')

app.use(bodyParser.urlencoded({
    extended : false
}))

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

//END CRUD Productos


//!!CRUD Usuarios

app.get('/crearUsuario', (req : any, res : any) => {
    let correo = req.body.correo
    let nombres = req.body.nombres
    let apellidos = req.body.apellidos
    let rut = req.body.rut
    let region = req.body.region
    let comuna = req.body.comuna
    let password = req.body.password
})

app.get('/formulario-registro/:correo', (req : any , res : any) => {
    let correo = req.params.correo
    connection.query('SELECT * FROM `usuario` WHERE correo=?', correo, (reqSQL : any, resSQL : any) => {
        if(resSQL == ''){
            res.send("Correo sin usuario")
        }
        else{
            res.send("Correo ya utilizado! use otro porfis")
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
