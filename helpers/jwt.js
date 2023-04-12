const jwt = require('jsonwebtoken');

const generarJWT = ( uid ) => {
    //transformar para retornar una promesa
    return new Promise( ( resolve, reject ) => {

        
        const payload = {
            uid
        };
        
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '24h'
        }, ( err, token ) => {
            if(err){
                console.log(err);
            } else {
                resolve( token );
            }
        });
    });
}

module.exports = {
    generarJWT
}