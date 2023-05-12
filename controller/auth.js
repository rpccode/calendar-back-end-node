const bcrypt = require('bcryptjs');
const { response, request } = require('express');
const { validationResult } = require('express-validator');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/userSchema');


const newUser = async (req = request, res = response) => {
    const { name, email, password } = req.body

    try {
        let usuario = await Usuario.findOne({ email })

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya Existe '
            });
        }
        usuario = new Usuario(req.body)


        //? Encriptar Contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt)

        //! Generar jwt 
        const token = await generarJWT(usuario.id, usuario.name)

        await usuario.save()

        res.status(201).json({
            ok: true,
            msg: 'Registro Agregadao correctamente',
            uid: usuario.id,
            name: usuario.name,
            token: token
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'No se pudo grabar en base de datos , Por favor contacte con el administrador'
        })
    }
}

const Login = async (req, res = response) => {
    const { email, password } = req.body

    try {
        const usuario = await Usuario.findOne({ email })

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no  Existe '
            });
        }
        const validPasword = bcrypt.compareSync(password, usuario.password)

        if (!validPasword) {
            return res.status(400).json({
                ok: false,
                msg: 'El Pasword o el Email son Incorrectos'
            })
        }

        //! Generar jwt 
        const token = await generarJWT(usuario.id, usuario.name)

        res.status(201).json({
            ok: true,
            msg: 'Login',
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'No se pudo verificar el usuario en la  base de datos , Por favor contacte con el administrador'
        })
    }

}

const deleteUser = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Registro'
    });
}

const reNewUser =async (req, res = response) => {

    const uid =  req.uid
    const name =  req.name

    const token = await  generarJWT(uid, name)
    res.json({
        ok: true,
        msg: 'reNew',
        token

    });
}



module.exports = {
    newUser,
    Login,
    deleteUser,
    reNewUser
}