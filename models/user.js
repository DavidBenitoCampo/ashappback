const createUser = ({ nombre, apellidos, fecha_nacimiento, email, contraseña, rol, foto, nickname }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO register_user(nombre, apellidos, fecha_nacimiento, email, contraseña, rol, foto, nickname) values (?, ?, ?, ?, ?, ?, ?, ?)',
            [nombre, apellidos, fecha_nacimiento, email, contraseña, rol, foto, nickname],
            (err, result) => {
                if (err) reject(err);
                resolve(result)
            });
    });
};

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM register_user', (err, rows) => {
            if (err) reject(err);
            resolve(rows)
        });
    });
};


const getByIdUser = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM register_user', (err, rows) => {
            if (err) return reject(err)
            if (rows.length === 0) return resolve(null)
            resolve(row[0]);
        });
    });
};


const deleteByIdUser = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM register_user WHERE id = ?', [pId], (err, result) => {
            if (err) return reject(err)
            resolve(result)
        });
    });
};

const updateByIdUser = ({ nombre, apellidos, fecha_nacimiento, email, contraseña, rol, foto, nickname }) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE register_user SET nombre = ?, apellidos = ?, fecha_nacimiento = ?, email = ?, contraseña = ?, rol = ?, foto = ?, nickname = ?',
            [nombre, apellidos, fecha_nacimiento, email, contraseña, rol, foto, nickname],
            (err, result) => {
                if (err) reject(err);
                resolve(result)
            });
    });

};


module.exports = {
    createUser,
    getAllUsers,
    getByIdUser,
    deleteByIdUser,
    updateByIdUser
}