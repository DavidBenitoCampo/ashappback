const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM register_product', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        })
    })
};

const create = ({ tipo_producto, precio, imagen, producto }) => {
    return new Promise((resolve, reject) => {
        //- Meto una interrogación de cierre por cada uno de los valores que quiero meter, como segundo parámetro:
        db.query('INSERT INTO register_product (tipo_producto, precio, imagen, producto) values (?, ?, ?, ?)',
            [tipo_producto, precio, imagen, producto], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            })
    });
}

const getByIdProduct = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM register_product WHERE id = ?', [pId], (err, rows) => {
            if (err) return reject(err);//Excepción ERROR
            if (rows.length === 0) return resolve(null);//No se encuentra.
            resolve(rows[0]); // 0 porque es un unico cliente.
        });
    });
}

const deleteById = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('delete from register_user where id = ?', [pId], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    });
}

const updateById = ({ tipo_producto, precio, imagen, producto }) => {
    return new Promise((resolve, reject) => {
        db.query(
            'update register_user set tipo_producto = ?, precio = ?, imagen = ?, producto = ? where id = ?',
            [tipo_producto, precio, imagen, producto],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            })
    });
}

module.exports = {
    getAllProducts,
    create,
    getByIdProduct,
    deleteById,
    updateById
}