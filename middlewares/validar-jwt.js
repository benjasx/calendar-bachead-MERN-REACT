const { response } = require('express')
const jwt = require('jsonwebtoken')

const validarJWT = (req, res = response, next) => {
    //* X-TOKEN HEADERS
    const token = req.header('x-token')
    if (!token) {
        return res.status(401).json({
            ok: false,
            message: 'No hay token en la peticion'
        })
    }

    try {
        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JTW_SEED
        )

        req.uid = uid
        req.name = name

    } catch (error) {
        return res.status(401).json({
            ok: false,
            message: 'Token no válido'
        })
    }
    next()


}

module.exports = {
    validarJWT,
}