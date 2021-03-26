const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM register_product', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        })
    })
};

const create = (pObject) => {

    return new Promise((resolve, reject) => {
        //- Meto una interrogación de cierre por cada uno de los valores que quiero meter, como segundo parámetro:
        db.query('INSERT INTO register_product (tipo_producto, precio, producto) values (?, ?, ?)',
            [pObject.tipo_producto, pObject.precio, pObject.producto], (err, result) => {
                if (err) return reject(err);
                console.log(result);
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
    console.log(pId)
    return new Promise((resolve, reject) => {
        db.query('delete from register_product where id = ?', [pId], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    });
}

const updateById = ({ tipo_producto, precio, imagen, producto, id }) => {
    return new Promise((resolve, reject) => {
        db.query(
            'update register_product set tipo_producto = ?, precio = ?, imagen = ?, producto = ? where id = ?',
            [tipo_producto, precio, imagen, producto, id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            })
    });
}

const getProductsUserById = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM register_product where fk_user = ?', [pId], (err, rows) => {
            if (err) return reject(err)
            resolve(rows);
        });
    });

}

module.exports = {
    getAllProducts,
    create,
    getByIdProduct,
    deleteById,
    updateById,
    getProductsUserById
}