// Importar la clase Router de Express.
const { Router } = require("express");

// Importar las rutas de los módulos relacionados.
const videogamesRoutes = require("./videogamesRoutes");
const genresRoutes = require("./genresRoutes");

// Crear una instancia de Router.
const router = Router();

// Configurar las rutas para los módulos relacionados.
router.use("/videogames", videogamesRoutes); // Rutas relacionadas con videojuegos.
router.use("/genres", genresRoutes); // Rutas relacionadas con géneros de videojuegos.

// Exportar el router configurado para su uso en la aplicación principal.
module.exports = router;
