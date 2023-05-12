const { Router } = require('express')
const { check } = require('express-validator')
const { getEvents, createEvents, updateEvents, deleteEvents } = require('../controller/events')
const { isDate } = require('../helpers/isDate')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router()

router.use(validarJWT)

//? Optener todos los eventos
router.get('/', getEvents)

//? Crear un Evento
router.post('/', [
    check('title', 'El Titulo  es Obligatorio').not().isEmpty(),
    check('start', 'La Fecha Inicial  es Obligatoria').custom(isDate),
    check('end', 'La Fecha Final es Obligatoria').custom(isDate),
    validarCampos
], createEvents)

//? Modificar un evento 
router.put('/:id', [
    check('title', 'El Titulo  es Obligatorio').not().isEmpty(),
    check('start', 'La Fecha Inicial  es Obligatoria').custom(isDate),
    check('end', 'La Fecha Final es Obligatoria').custom(isDate),
    validarCampos
], updateEvents)

//! eliminar un evento
router.delete('/:id', deleteEvents)



module.exports = router