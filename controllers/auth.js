const { response } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario')
const { generarJwt } = require('../helpers/jwt')

const crearUsuario = async (req, res = response) => {

    try {
        const { email, password } = req.body;

        let usuario = await Usuario.findOne({ email })

        if (usuario) {
            return res.status(400).json({
                ok: false,
                message: 'El correo ya esta registrado'
            })
        }

        usuario = new Usuario(req.body);

        //* Encriptar la contraseña
        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();
        //* Genear jsonWebToken
        const token = await generarJwt(usuario.id, usuario.name)

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
    } catch (error) {
        console.log('error');
        res.status(500).json({
            ok: false,
            message: 'por favor hable con el administrador'
        })
    }
}

const loginUsuario = async (req, res = response) => {

    const { email, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ email })

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                message: 'El usuario no existe con ese email'
            })
        }

        //* Confirmar ontraseña
        const validPassword = bcrypt.compareSync(password, usuario.password)

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                message: 'Contraseña incorrecta'
            })
        }

        //* Genear jsonWebToken
        const token = await generarJwt(usuario.id, usuario.name)

        res.status(200).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            message: 'Por favor hable con el administrador'
        })
    }
}

const revalidarToken = async (req, res = response) => {

    const uid = req.uid;
    const name = req.name;

    const token = await generarJwt(uid, name)
    res.json({
        ok: true,
        uid, name,
        token
    })

}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
}