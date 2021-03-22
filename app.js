const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');


//Requiero la conexión con la base de datos a través del dbConfig
require('./dbConfig')();

/* PRUEBA DE CONEXIÓN A LA BASE DE DATOS */

// const mysql = require('mysql');
// const connection = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root',
//   password: '',
//   port: '3306', //8889 para mac.
//   database: 'aschapp' //Se modifica según el tipo de baso al que quieras acceder.
// });

// connection.connect((err) => {
//   console.log(err);
//   console.log('Estás conectado');
//   connection.query('SELECT * FROM register_product', (err, rows) => {
//     console.log(rows);
//   })
// });


/* FIN PRUBEA CONEXIÓN A LA BASE DE DATOS*/


const indexRouter = require('./routes/index');
const productsRouter = require('./routes/api/products');
const usersRouter = require('./routes/api/users');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
<<<<<<< HEAD


=======
>>>>>>> 8ad49b05fe9d089d9e25dc790e5ef672a52ff1ef


app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
