// Importar las dependencias necesarias.
require("dotenv").config();
const axios = require("axios");
const URL = "https://api.rawg.io/api/genres";
const { API_KEY } = process.env;
const { Genre } = require("../db.js");

// CONTROLADOR PARA OBTENER LOS GENEROS DE LA BASE DE DATOS
const getDBGenres = async () => await Genre.findAll();

// FUNCION PARA CREAR LOS GENEROS EN LA BASE DE DATOS LOCAL
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
