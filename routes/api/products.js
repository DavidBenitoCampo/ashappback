const express = require('express');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'public/images' });
const fs = require('fs');

var router = express.Router();


const { getAllProducts, getByIdProduct, create, deleteById, updateById, getProductsUserById } = require('../../models/product');



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
router.post('/', upload.single('imagen'), async (req, res) => {

  // Antes de guardar el producto en la base de datos, modificamos la imagen para situarla donde nos interesa
  const extension = '.' + req.file.mimetype.split('/')[1];
  // Obtengo el nombre de la nueva imagen
  const newName = req.file.filename + extension;
  // Obtengo la ruta donde estará, adjuntándole la extensión
  const newPath = req.file.path + extension;
  // Muevo la imagen para que resiba la extensión
  fs.renameSync(req.file.path, newPath);

  // Modifico el BODY para poder incluir el nombre de la imagen en la BD
  req.body.imagen = newName;

  try {
    const newProducto = await create(req.body);
    res.json(newProducto);
  } catch (err) {
    res.json(err);
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

//Obtener los productos de un usuario determinado
router.get('/user/:userId', async (req, res) => {
  try {
    console.log('rojo')
    const result = await getProductsUserById(req.params.userId);
    console.log(result)
    res.json(result);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
});



module.exports = router;
