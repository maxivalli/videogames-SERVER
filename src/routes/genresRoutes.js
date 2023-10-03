// Importar la clase Router de Express.
const { Router } = require("express");

// Importar el handler relacionado con los géneros.
const { getGenres } = require("../handlers/genresHandler.js");

// Crear una instancia de Router.
const router = Router();

// Configurar la ruta para obtener los géneros.
router.get("/", getGenres); // Obtener los géneros.

// Exportar el router configurado para su uso en las rutas principales.
module.exports = router;
