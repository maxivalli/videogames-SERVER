// Importar y configur la librería dotenv para cargar variables de entorno desde un archivo .env
require("dotenv").config();

// Importar las bibliotecas necesarias
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_DEPLOY } = process.env;

// Crear una instancia Sequelize para conectarnos a la base de datos PostgreSQL
/* const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`,
  {
    logging: false, // Desactivar los registros de consultas SQL en la consola
    native: false, // Indicar que no utilizaremos la extensión pg-native para mayor velocidad
  }
); */

const sequelize = new Sequelize(DB_DEPLOY, {
  logging: false, // Desactivar los registros de consultas SQL en la consola
  native: false, // Indicar que no utilizaremos la extensión pg-native para mayor velocidad
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leer y requerir los archivos de modelos en la carpeta "models"
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Inyectar la conexión (sequelize) en todos los modelos
modelDefiners.forEach((model) => model(sequelize));

// Capitalizar los nombres de los modelos (por ejemplo, models => Models)
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Utilizar destructuring para obtener los modelos específicos (Videogame, Genre)
const { Videogame, Genre } = sequelize.models;

// Definir relaciones entre los modelos (por ejemplo, Genre.belongsToMany(Videogame))
Videogame.belongsToMany(Genre, { through: "VideogameGenres" });

Genre.belongsToMany(Videogame, { through: "VideogameGenres" });

// Exportar modelos y conexión para su uso en otros lugares de la aplicación
module.exports = {
  ...sequelize.models, // Para importar modelos como: const { Product, User } = require('./db.js');
  conn: sequelize, // Para importar la conexión como: { conn } = require('./db.js');
};
