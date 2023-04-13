const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {

    //paginacion
    const desde = Number(req.query.desde) || 0 ;
    //para ejecutar de manera simultanea, usamos Promise.all()
    const [ usuarios, total ] = await Promise.all([
        Usuario.find({}, 'nombre email role google img')
               .skip(desde)
               .limit(5),
        Usuario.countDocuments()
    ]);

    res.status(200).json({
        ok: true,
        usuarios,
        total
    });
}

const crearUsuario = async (req, res = response) => {
    
    const { email, password, nombre } = req.body;

    try {
        //validar correo unico
        const existeEmail = await Usuario.findOne({ email });
        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'el correo ya esta registrado'
            })
        }

        const usuario = new Usuario( req.body );

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt);

        //guardamos el usuario
        await usuario.save();
    
        //Generar el token - JWT
        const token = await generarJWT( usuario.id );
        
        //devolvemos respuesta
        res.status(202).json({
            ok: true,
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error insperado.. revisar logs'
        });
    }
    
    
}

const actualizarUsuario = async (req, res = response) =>{
    
    //TODO validar token y comprobar si es el usuario correcto
    const uid = req.params.id;
    
    try {
        const usuarioDB = await Usuario.findById( uid );
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese uid'
            });
        }
        
        //**********Actualizaciones*****/
        // sacamos password y google de los campos
        const { password, google, email, ...campos } = req.body;
        
        // si los email son diferentes se estan actualizando
        if( usuarioDB.email !== email ){
            const existeEmail = await Usuario.findOne({ email });
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: "ya existe un usuario con ese email"
                })
            }
        }
        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error insperado.. revisar logs'
        });
    }
}

const borrarUsuario = async (req, res = response) => {
    const uid = req.params.id;
    
    try {
        const usuarioDB = await Usuario.findById( uid );
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese uid'
            });
        }
        //eliminar usuario
        await Usuario.findByIdAndDelete( uid );

        res.status(200).json({
            ok: true,
            msg: "usuario eliminado"
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "error inesperado"
        });
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}