const mysql = require('mysql');

//Conectar con la BBDD cuando se inicialice la aplicación.
const connect = () => {
    const pool = mysql.createPool({
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        port: '8889',
        database: 'aschapp'
    });
    global.db = pool;

}
module.exports = connect;