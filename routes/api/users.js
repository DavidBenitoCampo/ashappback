const express = require('express');


const router = express.Router();


const { getAllUsers, getByIdUser, deleteByIdUser, updateByIdUser, getProductsUserById } = require('../../models/user')

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

//Obtener los productos de un usuario determinado
router.get('/profile/:userId', async (req, res) => {
    try {
        const result = await getProductsUserById(req.userId);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});


//borrar un usuario
router.delete('/:idUser', async (req, res) => {
    try {
        const result = await deleteByIdUser(req.userId)
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