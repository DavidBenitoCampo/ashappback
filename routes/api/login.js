const express = require('express');
const bcrypt = require('bcrypt');
const dayjs = require('dayjs');
const jwt = require('jsonwebtoken')


const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'public/images' });
const fs = require('fs');

const router = express.Router();

const { createUser, getByEmail } = require('../../models/login')


//crear un usuario
router.post('/', upload.single('foto'), async (req, res) => {
    if (req.file) {
        // Antes de guardar el producto en la base de datos, modificamos la imagen para situarla donde nos interesa
        const extension = '.' + req.file.mimetype.split('/')[1];
        // Obtengo el nombre de la nueva imagen
        const newName = req.file.filename + extension;
        // Obtengo la ruta donde estará, adjuntándole la extensión
        const newPath = req.file.path + extension;
        // Muevo la imagen para que resiba la extensión
        fs.renameSync(req.file.path, newPath);

        // Modifico el BODY para poder incluir el nombre de la imagen en la BD
        req.body.foto = newName;
    }
    try {
        console.log(req.body)
        req.body.contrasena = bcrypt.hashSync(req.body.contrasena, 10);
        const result = await createUser(req.body);
        res.json(result);
    } catch (error) {
        console.log(error)
        res.status(422).json({ error: error.message })
    }
});















router.post('/enter', async (req, res) => {
    console.log(req.body);
    const usuario = await getByEmail(req.body.email)
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