const jwt = require('jsonwebtoken');

const validarJWT = ( req, res, next ) => {
    //leer token
    const token = req.header('x-token');
    console.log(token)
    //verificar si viene con el token
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la peticion"
        });
    }
    try {
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        req.uid = uid;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            nsg: "Token no valido"
        });
    }

    next();
}

module.exports = {
    validarJWT
}