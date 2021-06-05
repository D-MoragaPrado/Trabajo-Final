const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const mysql = require('mysql')

app.use(bodyParser.urlencoded({
    extended : false
}))

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
    console.log('Connection Success in MySQL, connection hosted in port ', connection.port)
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
            res.status(401)
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

//END CRUD Usuarios

//!!CRUD Regiones



//END CRUD Regiones



//!!CRUD Comunas



//END CRUD Comunas

app.listen(connection, () => {
    console.log(`App listening at http://${connection.host}:${connection.port}`)
})
