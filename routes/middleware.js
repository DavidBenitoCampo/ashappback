const jwt = require('jsonwebtoken')
const dayjs = require('dayjs')


const checkToken = (req, res, next) => {

    //comprobar si el token está en las cabeceras.
    if (!req.headers['authorization']) {
        return res.json({ error: 'debes introducir la cabecera Authorization' })
    }
    //comprobar si el token es valido.
    const token = req.headers['authorization']

    let data;
    try {
        data = jwt.verify(token, 'lolita');
    } catch (error) {
        return res.json({ error: 'el token es incorrecto' })
    }


    //comprobar si el token está caducado.
    if (dayjs().unix() > data.caduca) {
        return res.json({ error: 'El token está caducado' });
    }

<<<<<<< HEAD
    req.userId = data.userId
=======
    req.userId = data.userId;
>>>>>>> 84c774c66b1e6c7e2709a85f083fa6d047eddc83

    next();

}

module.exports = {
    checkToken
}