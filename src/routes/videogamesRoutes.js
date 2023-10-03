// Importar la clase Router de Express.
const { Router } = require("express");

// Importar los handlers relacionados con los videojuegos.
const {
  getVideogamesHandler,
  getVideogameHandler,
  createVideogameHandler,
} = require("../handlers/videogamesHandler.js");

// Crear una instancia de Router.
const router = Router();

// Middleware de validación para verificar los datos de entrada.
const validate = (req, res, next) => {
  const { name, platforms, rating } = req.body;
  
  // Verificar si los campos obligatorios están presentes.
  if (!name) res.status(400).json({ error: "Missing name" });
  if (!platforms) res.status(400).json({ error: "Missing platforms" });
  if (!rating) res.status(400).json({ error: "Missing rating" });

  // Si los campos obligatorios están presentes, pasar al siguiente middleware.
  next();
};

// Configurar las rutas y los controladores relacionados con los videojuegos.
router.get("/", getVideogamesHandler); // Obtener todos los videojuegos.
router.get("/:id", getVideogameHandler); // Obtener un videojuego por su ID.
router.post("/", validate, createVideogameHandler); // Crear un nuevo videojuego.

// Exportar el router configurado para su uso en las rutas principales.
module.exports = router;
