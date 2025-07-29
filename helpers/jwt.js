const jwt = require('jsonwebtoken')

const generarJwt = (uid, name) => {
    return new Promise((resolve, reject) => {
        const paylaod = { uid, name }
        jwt.sign(paylaod, process.env.SECRET_JTW_SEED, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                console.log(err)
                reject('No se pudo generar el token')
            }

            resolve(token)
        })
    })
}

module.exports = {
    generarJwt
}