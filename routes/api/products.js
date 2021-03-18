var express = require('express');
var router = express.Router();

const { getAllProducts, getByIdProduct, create, deleteById } = require('../../models/product');

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
router.post('/new', async (req, res) => {
  try {
    const result = await create(req.body);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message })
  }
});

router.put('/update', async (req, res) => {
  const result = await updateById(req.body)
  console.log(result);
  res.redirect('/products')
});


router.delete('/delete/:idProducto', async (req, res) => {
  try {
    const result = await deleteById(req.params.idProduct);
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});



module.exports = router;
