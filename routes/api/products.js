const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'public/images' });
var router = express.Router();

const app = express();

const { getAllProducts, getByIdProduct, create, deleteById, updateById } = require('../../models/product');


app.listen(3000, () => {
  console.log(`Servidor escucha`)
})


// /products
router.get('/', (req, res) => {
  getAllProducts()
    .then((rows) => { res.json(rows) })
    .catch((err) => { console.log(err) });
});

// products/:idProduct
router.get('/:idProduct', async (req, res) => {
  try {
    const result = await getByIdProduct(req.params.idProduct)
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message })
  }
})

// //products/new
router.post('/', async (req, res) => {
  try {
    const result = await create(req.body);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message })
  }
});

router.put('/', async (req, res) => {
  const result = await updateById(req.body)
  res.json(result);
  console.log(result);
});


router.delete('/:idProduct', async (req, res) => {
  try {
    const result = await deleteById(req.params.idProduct);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});



module.exports = router;
