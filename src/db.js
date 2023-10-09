require("dotenv").config();

const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_DEPLOY } = process.env;

// Crea una instancia de squelize
const sequelize = new Sequelize(DB_DEPLOY, {
  logging: false, // Desactivar los registros de consultas SQL en la consola
  native: false, // Indicar que no utilizaremos la extensión pg-native para mayor velocidad
});

//-----------------------------------------------------------------------------------------

const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

//------------------------------------------------------------------------------------------

// En sequelize.models están todos los modelos importados como propiedades
// Utilizar destructuring para obtener los modelos específicos (Videogame, Genre)
const { Videogame, Genre } = sequelize.models;

// Definir relaciones entre los modelos (por ejemplo, Genre.belongsToMany(Videogame))
Videogame.belongsToMany(Genre, { through: "VideogameGenres" });

Genre.belongsToMany(Videogame, { through: "VideogameGenres" });

module.exports = {
  ...sequelize.models, 
  conn: sequelize, 
};
