const express = require('express');
const router = express.Router();

const { createUser, getAllUsers, getByIdUser, deleteByIdUser, updateByIdUser } = require('../../models/user')

//obtener todos los productos
router.get('/', (req, res) => {
    getAllUsers()
        .then((rows) => { res.json(rows) })
        .catch((err) => { console.log(err) });
});

//obtener un usuario
router.get('/:idUser', async (req, res) => {
    try {
        const result = await getByIdUser(req.params.idUser)
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});

//crear un usuario
router.post('/', async (req, res) => {
    console.log('body', req.body);
    try {
        const result = await createUser(req.body);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message })
    }
});

//borrar un usuario
router.delete('/:idUser', async (req, res) => {
    try {
        const result = await deleteByIdUser(req.params.idUser)
        res.json(result)
    } catch (error) {
        res.status(422).json({ error: error.message })
    }
});

//editar??
router.put('/', async (req, res) => {
    const result = await updateByIdUser(req.body);
    res.json(result);
    console.log(result);//no tengo claro el motivo de por que ponemos un console log aquí
});





module.exports = router;