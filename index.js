require('dotenv').config();

const express = require('express');
const cors = require('cors')


const { dbConnection } = require('./database/config');


//crear el servidor express
const app = express();

//configurar CORS (use => se ejecuta siempre para las demas instrucciones) -middleware (son funciones que se ejecutan antes de llegar a otra)
app.use(cors())

//lectura y parseo del body -middleware 
app.use( express.json() );

//base de datos
dbConnection();


//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));






//servidor en puerto
app.listen( 3000 , () => {
    console.log('servidor corriendo en puerto' + 3000 );
})
