/**
 * ruta: api/uploads
 */
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload, retornarImagen } = require('../controllers/uploads')

//usando express-fileupload para subir archivos
const expressFileUpload = require('express-fileupload');

const router = Router();

router.use(expressFileUpload());

// req => lo que se solicita el cliente, res => la respuesta del servidor
router.put('/:tipo/:id', validarJWT, fileUpload );

router.get('/:tipo/:foto', retornarImagen );

module.exports = router;
