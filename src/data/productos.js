const fs = require('fs');
const path = require('path');

const archivo = path.join(__dirname, 'productos.json');

// Leer productos desde el archivo JSON
function obtenerProductos() {
    const datos = fs.readFileSync(archivo, 'utf8');
    return JSON.parse(datos);
}

// Guardar productos en el archivo JSON
function guardarProductos(productos) {
    fs.writeFileSync(
        archivo,
        JSON.stringify(productos, null, 4)
    );
}

module.exports = {
    obtenerProductos,
    guardarProductos
};