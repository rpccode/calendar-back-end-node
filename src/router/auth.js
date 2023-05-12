const { Router } = require('express');
const { check } = require('express-validator')
const { newUser, Login, deleteUser, reNewUser } = require('../controller/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post(
    '/new',
    [
        check('name', 'El nombre es Obligatorio').not().isEmpty(),
        check('email', 'El Email es Obligatorio').isEmail(),
        check('password', 'El password es Obligatorio  y debe ser mayor a 6 caracteres ').isLength({ min: 6 }),
        validarCampos

    ]
    , newUser);

router.post('/login',
    [
        check('email', 'El Email es Obligatorio').isEmail(),
        check('password', 'El password es Obligatorio  y debe ser mayor a 6 caracteres ').isLength({ min: 6 }),
        validarCampos
    ], Login);
router.delete('/remove', deleteUser);
router.get('/re-new', validarJWT, reNewUser);



module.exports = router;
