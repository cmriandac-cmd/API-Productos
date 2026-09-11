const express = require('express');
const router = express.Router();

const { obtenerProductos, guardarProductos } = require('../data/productos');

// GET - Obtener todos los productos
router.get('/', (req, res) => {
    const productos = obtenerProductos();

    res.status(200).json(productos);
});

// GET - Obtener un producto por ID
router.get('/:id', (req, res) => {
    const productos = obtenerProductos();

    const id = parseInt(req.params.id);

    const producto = productos.find(producto => producto.id === id);

    if (!producto) {
        return res.status(404).json({
            mensaje: 'Producto no encontrado'
        });
    }

    res.status(200).json(producto);
});

// POST - Crear un nuevo producto
router.post('/', (req, res) => {
    const productos = obtenerProductos();

    const { nombre, descripcion, precio, stock, categoria } = req.body;

    // Validar datos obligatorios
    if (!nombre || !descripcion || precio === undefined || stock === undefined || !categoria) {
        return res.status(400).json({
            mensaje: 'Todos los campos son obligatorios'
        });
    }

    // Validar precio
    if (typeof precio !== 'number' || precio < 0) {
        return res.status(400).json({
            mensaje: 'El precio debe ser un número mayor o igual a 0'
        });
    }

    // Validar stock
    if (!Number.isInteger(stock) || stock < 0) {
        return res.status(400).json({
            mensaje: 'El stock debe ser un número entero mayor o igual a 0'
        });
    }

    // Generar nuevo ID
    const nuevoId = productos.length > 0
        ? Math.max(...productos.map(producto => producto.id)) + 1
        : 1;

    const nuevoProducto = {
        id: nuevoId,
        nombre,
        descripcion,
        precio,
        stock,
        categoria
    };

    productos.push(nuevoProducto);

    guardarProductos(productos);

    res.status(201).json(nuevoProducto);
});

// PUT - Actualizar un producto
router.put('/:id', (req, res) => {
    const productos = obtenerProductos();

    const id = parseInt(req.params.id);

    const producto = productos.find(producto => producto.id === id);

    if (!producto) {
        return res.status(404).json({
            mensaje: 'Producto no encontrado'
        });
    }

    const { nombre, descripcion, precio, stock, categoria } = req.body;

    // Validar datos obligatorios
    if (!nombre || !descripcion || precio === undefined || stock === undefined || !categoria) {
        return res.status(400).json({
            mensaje: 'Todos los campos son obligatorios'
        });
    }

    // Validar precio
    if (typeof precio !== 'number' || precio < 0) {
        return res.status(400).json({
            mensaje: 'El precio debe ser un número mayor o igual a 0'
        });
    }

    // Validar stock
    if (!Number.isInteger(stock) || stock < 0) {
        return res.status(400).json({
            mensaje: 'El stock debe ser un número entero mayor o igual a 0'
        });
    }

    producto.nombre = nombre;
    producto.descripcion = descripcion;
    producto.precio = precio;
    producto.stock = stock;
    producto.categoria = categoria;

    guardarProductos(productos);

    res.status(200).json(producto);
});

// DELETE - Eliminar un producto
router.delete('/:id', (req, res) => {
    const productos = obtenerProductos();

    const id = parseInt(req.params.id);

    const indice = productos.findIndex(producto => producto.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensaje: 'Producto no encontrado'
        });
    }

    const productoEliminado = productos.splice(indice, 1);

    guardarProductos(productos);

    res.status(200).json({
        mensaje: 'Producto eliminado correctamente',
        producto: productoEliminado[0]
    });
});

module.exports = router;