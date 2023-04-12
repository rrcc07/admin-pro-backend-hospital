const mongoose = require('mongoose');
require('dotenv').config();

// async retorna una promesa
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, { });
        console.log('db online')
        
    } catch (error) {
        console.log(error)
        throw new Error('Error a la hora de iniciar la BD');
    }
}

module.exports = {
    dbConnection
}