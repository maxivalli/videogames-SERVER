// Importar las dependencias necesarias.
require("dotenv").config();
const URL = "https://api.rawg.io/api/games";
const { API_KEY } = process.env;
const axios = require("axios");
const { Op } = require("sequelize");
const { Videogame } = require("../db.js");

// Función para limpiar los datos de videojuegos obtenidos de la API.
const cleanArray = (videogames) =>
  videogames.map((videogame) => {
    return {
      id: videogame.id,
      name: videogame.name,
      description: videogame.description,
      image: videogame.background_image,
      genres: videogame.genres.map((genre) => genre.name),
      platforms: videogame.platforms
        ? videogame.platforms.map((platform) => platform.platform.name)
        : "",
      released: videogame.released,
      rating: videogame.rating,
      created: false,
    };
  });

// Función para obtener todos los videojuegos desde la API y la base de datos local.
const getAllVideogames = async () => {
  const databaseVideogames = await Videogame.findAll();

  const apiVideogames = [];
  let nextPage = `${URL}?key=${API_KEY}`;

  for (let i = 0; i < 5; i++) {
    const apiResponse = await axios.get(nextPage);
    const apiVideogamesRaw = apiResponse.data.results;
    const cleanedVideogames = cleanArray(apiVideogamesRaw);
    apiVideogames.push(...cleanedVideogames);
    nextPage = apiResponse.data.next;
  }

  return [...apiVideogames, ...databaseVideogames];
};

// Función para obtener un videojuego por su ID desde la API o la base de datos local.
const getVideogameById = async (id, source) => {
  let dbVideogame;
  if (source === "DB") dbVideogame = await Videogame.findByPk(id);
  const videogameRaw =
    source === "API"
      ? (await axios(`${URL}/${id}?key=${API_KEY}`)).data
      : dbVideogame.dataValues;
  const videogame =
    source === "API" ? cleanArray([videogameRaw]) : [videogameRaw];
  return [...videogame];
};

// Función para crear un nuevo videojuego.
const createVideogame = async (
  name,
  image,
  description,
  platforms,
  released,
  rating,
  genres
) =>
  await Videogame.create({
    name,
    image,
    description,
    platforms,
    released,
    rating,
    genres,
  });

// Función para buscar videojuegos por nombre en la API y la base de datos local.
const searchVideogameByName = async (name) => {
  if (!name) {
    return [];
  }
  const lowerCaseSearch = name.toLowerCase();

  const dbVideogames = await Videogame.findAll({
    where: {
      name: {
        [Op.iLike]: `%${lowerCaseSearch}%`,
      },
    },
  });

  const apiVideogamesRaw = await axios.get(URL, {
    params: {
      key: API_KEY,
      search: name,
    },
  });

  const apiVideogames = cleanArray(apiVideogamesRaw.data.results);

  return [...dbVideogames, ...apiVideogames];
};

// Función para obtener un videojuego por nombre en la API y la base de datos local.
const getVideogameByName = async (name) => {
  const allVideogames = await getAllVideogames();

  const filteredVideogames = allVideogames.filter(
    (videogame) => videogame.name.toLowerCase() === name.toLowerCase()
  );

  return filteredVideogames.length > 0 ? filteredVideogames : null;
};

// Exportar las funciones para su uso en el handler.
module.exports = {
  createVideogame,
  getVideogameById,
  getAllVideogames,
  searchVideogameByName,
  getVideogameByName,
};
