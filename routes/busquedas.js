/**
 * ruta: api/todo/:busqueda
 */
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas')

const router = Router();

// req => lo que se solicita el cliente, res => la respuesta del servidor
router.get('/:busqueda', validarJWT, getTodo);
router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion);

module.exports = router;
