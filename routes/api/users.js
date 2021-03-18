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


module.exports = router;