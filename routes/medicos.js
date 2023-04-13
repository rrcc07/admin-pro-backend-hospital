/*
    ruta. /api/medicos
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// req => lo que se solicita el cliente, res => la respuesta del servidor
router.get('/', getMedicos);

router.post('/', 
    [
    // inplementar middleware (para las validaciones (usando express-validators))
        validarJWT,
        check('nombre', 'el nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'el id del hospital debe ser valido').isMongoId(),
        validarCampos
    ], crearMedico
    );

router.put('/:id',
    [
    // inplementar middleware (para las validaciones (usando express-validators))

    ], actualizarMedico
);

router.delete('/:id', borrarMedico )

module.exports = router;