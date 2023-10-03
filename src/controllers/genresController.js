// Importar las dependencias necesarias.
require("dotenv").config();
const axios = require("axios");
const URL = "https://api.rawg.io/api/genres";
const { API_KEY } = process.env;
const { Genre } = require("../db.js");

// Función para obtener géneros desde la base de datos local.
const getDBGenres = async () => await Genre.findAll();

// Función para crear géneros en la base de datos local desde una fuente externa (API).
const createGenres = async () => {
  // Realizar una solicitud a la API externa para obtener datos de géneros.
  const response = await axios.get(`${URL}?key=${API_KEY}`);
  
  // Obtener los datos de géneros desde la respuesta.
  const genresData = response.data.results;

  // Iterar a través de los datos de géneros y crear registros en la base de datos local.
  for (let i = 0; i < genresData.length; i++) {
    await Genre.create({ name: genresData[i].name });
  }
};

// Exportar las funciones `getDBGenres` y `createGenres` para su uso en el handler.
module.exports = { getDBGenres, createGenres };
