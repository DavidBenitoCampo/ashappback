const express = require('express');
const bcrypt = require('bcrypt');
const dayjs = require('dayjs');
const jwt = require('jsonwebtoken')

const router = express.Router();

const { createUser, getByEmail } = require('../../models/login')


//crear un usuario
router.post('/', async (req, res) => {
    try {
        req.body.contrasena = bcrypt.hashSync(req.body.contrasena, 10);
        const result = await createUser(req.body);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message })
    }
});

router.post('/enter', async (req, res) => {
    const usuario = await getByEmail(req.body.email);
    if (usuario) {
        const iguales = bcrypt.compareSync(req.body.contrasena, usuario.contrasena);
        if (iguales) {
            res.json({
                success: 'acceso concedido',
                token: createToken(usuario)
            })
        } else {
            res.json({ error: 'contraseña y/o usuario incorrecto' })
        }
    } else {
        res.json({ error: 'contraseña y/o usuario incorrecto' })
    }
});

function createToken(pUser) {
    const data = {
        userId: pUser.id,
        caduca: dayjs().add(10000, 'minutes').unix()
    }

    return jwt.sign(data, 'lolita');
}


module.exports = router;