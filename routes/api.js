const router = require('express').Router();
const { checkToken } = require('./middleware')

const usersRouter = require('./api/users');
const productsRouter = require('./api/products');
const loginRouter = require('./api/login');


router.use('/users', checkToken, usersRouter);
router.use('/products', checkToken, productsRouter);
router.use('/login', loginRouter);


module.exports = router;