/*
    Ruta: /api/usuarios
*/

const { Router } = require('express');
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } =  require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// req => lo que se solicita el cliente, res => la respuesta del servidor
router.get('/', validarJWT, getUsuarios);

router.post('/', 
    [
    // inplementar middleware (para las validaciones (usando express-validators))
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ], crearUsuario
    );

router.put('/:id',
    [
    // inplementar middleware (para las validaciones (usando express-validators))
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El rol es obligatorio').not().isEmpty(),
        validarCampos
    ], actualizarUsuario
);

router.delete('/:id', validarJWT, borrarUsuario )

module.exports = router;