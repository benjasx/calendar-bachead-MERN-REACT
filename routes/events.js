/* 
    Rutas de eventos / events
    host + /api/events
*/

const { Router } = require('express')
const { check } = require('express-validator')

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const { getEventos, actualizarEvento, crearEvento, eliminarEvento } = require("../controllers/events");
const router = Router()

//* Todas tienen que pasar la validacion del token
router.use(validarJWT)

//* Obtener eventos
router.get('/', getEventos)

//* Crear Eventos
router.post('/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha inicio es obligatorio').custom(isDate),
        check('end', 'Fecha finalización es obligatorio').custom(isDate),
        validarCampos
    ],
    crearEvento)

//* Actualizar evento
router.put('/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha inicio es obligatorio').custom(isDate),
        check('end', 'Fecha finalización es obligatorio').custom(isDate),
        validarCampos
    ],
    actualizarEvento)

//* Eliminar evento
router.delete('/:id', eliminarEvento)


//* Exportar el router
module.exports = router