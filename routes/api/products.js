var express = require('express');
var router = express.Router();

<<<<<<< HEAD:routes/api/products.js
const { getAllProducts, getByIdProduct, create, deleteById, updateById } = require('../../models/product');
=======
const { getAllProducts, getByIdProduct, create, deleteById } = require('../../models/product');
>>>>>>> usuarios:routes/products.js

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
