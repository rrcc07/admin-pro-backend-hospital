/*
    ruta. /api/hospitales
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getHospitales, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales');

const router = Router();

// req => lo que se solicita el cliente, res => la respuesta del servidor
router.get('/', getHospitales);

router.post('/', 
    [
        // inplementar middleware (para las validaciones (usando express-validators))
        validarJWT,
        check('nombre', 'el nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ], crearHospital
    );

router.put('/:id',
    [
    // inplementar middleware (para las validaciones (usando express-validators))

    ], actualizarHospital
);

router.delete('/:id', borrarHospital )

module.exports = router;