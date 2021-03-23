const jwt = require('jsonwebtoken')
const checkToken = (req, res, next) => {

    //comprobar si el token está en las cabeceras.
    if (!req.headers['authorization']) {
        return res.json({ error: 'debes introducir la cabecera Authorization' })
    }
    //comprobar si el token es valido.

    const token = req.headers['authorization']
    let data
    try {
        const data = jwt.verify(token, 'lolita');
    } catch (error) {
        return res.json({ error: 'el token es incorrecto' })
    }
    //comprobar si el token está caducado.
    next();
}

module.exports = {
    checkToken
}