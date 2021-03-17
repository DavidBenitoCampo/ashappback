var express = require('express');
var router = express.Router();

// /products
router.get('/', function (req, res, next) {
  res.send('Listado de users');
});

// //users/new
router.get('/new', function (req, res, next) {
  res.send('Formulario users');
});

// /users/create
router.post('/create', function (req, res, next) {
  res.send('Creación de products');
});

router.get('/edit', function (req, res, next) {
  res.send('Mostrar form edit');
});

router.post('/edit', function (req, res, next) {
  res.send('Recibe los datos del form anterior y edit products');
});

module.exports = router;
