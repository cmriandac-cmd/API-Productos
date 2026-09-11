const express = require('express');

const app = express();

const PORT = 3000;

// Permitir recibir datos JSON
app.use(express.json());

// Importar rutas de productos
const productosRoutes = require('./routes/productos.routes');

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        mensaje: 'API de Productos funcionando correctamente'
    });
});

// Rutas de productos
app.use('/api/productos', productosRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
