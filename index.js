require('dotenv').config();

const express = require('express');
const cors = require('cors')


const { dbConnection } = require('./database/config');


//crear el servidor express
const app = express();

//configurar CORS (use => se ejecuta siempre para las demas instrucciones)
app.use(cors())

//base de datos
dbConnection();

//Rutas
// req => lo que se solicita el cliente, res => la respuesta del servidor
app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        msg: "hola mundo"
    })
});

//servidor en puerto
app.listen( 3000 , () => {
    console.log('servidor corriendo en puerto' + 3000 );
})
