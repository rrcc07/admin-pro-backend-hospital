const { response } = require('express');
const Medico = require('../models/medico');

const getMedicos = async (req, res = response) => {
    
    const medicos = await Medico.find().populate('usuario', 'nombre img').populate('hospital', 'nombre');

    res.json({
        ok: true,
        medicos
    })
}

const crearMedico = async (req, res = response) => {
    const uid = req.uid;
    console.log("---------->",uid)
    const medico = new Medico( {
        usuario: uid,
        ...req.body
    });

    try {
        const medicoDB = await medico.save();
        
        res.json({
            ok: true,
            medico: medicoDB
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Hable con el adminstrador"
        })    
    }
}

const actualizarMedico = async (req, res = response) => {
    
    const id = req.params.id;
    const uid = req.uid;
    
    try {
        const medico = await Medico.findById( id );
        if( !medico ){
            return res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado por id',
            });
        }
 
        // funcion para actualizar varios campos
        const cambiosMedico = {
            ...req.body,             //todo lo que viene en el body para ser actualizado
            usuario: uid,          // añadimos al usuario que es requerido (es porque pasamos por JWT del usuario)
        }
        //actualizamos -->
        const medicoActualizado = await Medico.findByIdAndUpdate( id, cambiosMedico, { new: true });

        res.json({
            ok: true,
            msg: 'actualizarMedico',
            medico: medicoActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }
    
}

const borrarMedico = async (req, res = response) => {
    
    const id = req.params.id;
    
    try {
        const medico = await Medico.findById( id );
        if( !medico ){
            return res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado por id',
            });
        }
    
        await Medico.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Medico eliminado'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}