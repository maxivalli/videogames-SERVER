// Importar los controladores relacionados con los videojuegos desde videogamesController.js.
const {
  createVideogame,
  getVideogameById,
  getAllVideogames,
  searchVideogameByName,
  getVideogameByName,
} = require("../controllers/videogamesController");

// MANEJADOR PARA OBTENER VIDEOJUEGOS
const getVideogamesHandler = async (req, res) => {
  const { name } = req.query;

  // Determinar si se proporciona un nombre para la búsqueda.
  // Si se proporciona, buscar videojuegos por nombre, de lo contrario, obtener todos los videojuegos.
  const results = name
    ? await searchVideogameByName(name)
    : await getAllVideogames();

  try {
    // Responder con los resultados obtenidos.
    res.status(200).json(results);
  } catch (error) {
    // Manejar cualquier error y responder con un estado 500 (Error interno del servidor).
    res.status(500).json({ message: "Hubo un error al obtener los videojuegos" });
  }
};

// MANEJADOR PARA OBTENER VIDEOJUEGOS POR ID
const getVideogameHandler = async (req, res) => {
  const { id } = req.params;

  // Determinar si el ID es un número o no para determinar la fuente (DB o API).
  const source = isNaN(id) ? "DB" : "API";

  try {
    // Obtener el videojuego por su ID utilizando la fuente determinada.
    const videogame = await getVideogameById(id, source);

    // Responder con el videojuego obtenido.
    res.status(200).json(videogame);
  } catch (error) {
    // Manejar cualquier error y responder con un estado 400 (Solicitud incorrecta).
    res.status(400).json({ error: error.message });
  }
};

// MANEJADOR PARA CREAR UN VIDEOJUEGO
const createVideogameHandler = async (req, res) => {
  try {
    // Obtener los datos del nuevo videojuego desde la solicitud.
    const { name, image, description, platforms, released, rating, genres } = req.body;

    // Verificar si ya existe un videojuego con el mismo nombre.
    const existingVideogame = await getVideogameByName(name);
    if (existingVideogame !== null) {
      throw new Error("The videogame already exists");
    }

    // Crear el nuevo videojuego utilizando el controlador correspondiente.
    const newVideogame = await createVideogame(
      name,
      image,
      description,
      platforms,
      released,
      rating,
      genres
    );

    // Responder con el nuevo videojuego creado.
    res.status(201).json(newVideogame);
  } catch (error) {
    // Manejar cualquier error y responder con un estado 400 (Solicitud incorrecta).
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};


module.exports = {
  getVideogamesHandler,
  getVideogameHandler,
  createVideogameHandler,
};
