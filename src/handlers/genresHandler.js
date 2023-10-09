
const {
  getDBGenres,
  createGenres,
} = require("../controllers/genresController.js");

// MANEJADOR PARA OBTENER LOS GENEROS
const getGenres = async (req, res) => {
  try {
    // Obtener los géneros de la base de datos utilizando el controlador.
    const genres = await getDBGenres();

    // Si se encuentran géneros en la base de datos, responder con ellos.
    if (genres.length > 0) {
      return res.status(200).json(genres);
    } else {
      // Si no se encuentran géneros, crear géneros en la base de datos utilizando el controlador.
      await createGenres();

      // Obtener los géneros nuevamente después de la creación.
      const dbGenres = await getDBGenres();

      // Responder con los géneros recién creados.
      return res.status(200).json(dbGenres);
    }
  } catch (error) {
    // Manejar cualquier error y responder con un estado 500 (Error interno del servidor).
    return res.status(500).json({ error: error.message });
  }
};


module.exports = { getGenres };
