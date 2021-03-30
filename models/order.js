
const getAllCarrito = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM carrito c, register_product rp, register_user ru where c.fk_product = rp.id and ru.id = rp.fk_user and c.fk_user = ?', [pId], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        })
    })
};





module.exports = { getAllCarrito }