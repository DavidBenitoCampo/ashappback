const createUser = (pObject) => {
    console.log(pObject);
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO register_user (nombre, apellidos, fecha_nacimiento, email, contrasena, rol, foto, nickname) values (?, ?, ?, ?, ?, ?, ?,?)',
            [pObject.nombre, pObject.apellidos, pObject.fecha_nacimiento, pObject.email, pObject.contrasena, pObject.rol, pObject.foto, pObject.nickname],
            (err, result) => {
                if (err) reject(err);
                resolve(result)
            });
    });
};

const getByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM register_user WHERE email = ?',
            [email],
            (err, rows) => {
                if (err) return reject(err);
                if (rows.length === 0) return resolve(null);
                resolve(rows[0]);
            });
    });
};

module.exports = {
    createUser,
    getByEmail
}