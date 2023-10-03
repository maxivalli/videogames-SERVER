// Importar las clases DataTypes y BOOLEAN de Sequelize.
const { DataTypes, BOOLEAN } = require("sequelize");

// Exportar una función que define el modelo Videogame en la base de datos.
module.exports = (sequelize) => {
  sequelize.define(
    "Videogame",
    {
      id: {
        type: DataTypes.UUID, // El tipo de dato es un UUID.
        primaryKey: true, // Es la clave primaria de la tabla.
        defaultValue: DataTypes.UUIDV4, // El valor por defecto es un UUID generado automáticamente.
      },
      name: {
        type: DataTypes.STRING, // El tipo de dato es una cadena de texto.
        allowNull: false, // No se permite un valor nulo.
        unique: true, // Debe ser único en la tabla.
      },
      description: {
        type: DataTypes.TEXT, // El tipo de dato es un texto largo.
      },
      platforms: {
        type: DataTypes.ARRAY(DataTypes.STRING), // El tipo de dato es un array de cadenas de texto.
        allowNull: false, // No se permite un valor nulo.
      },
      image: {
        type: DataTypes.STRING, // El tipo de dato es una cadena de texto.
      },
      released: {
        type: DataTypes.DATEONLY, // El tipo de dato es una fecha sin hora.
      },
      rating: {
        type: DataTypes.FLOAT, // El tipo de dato es un número decimal.
      },
      genres: {
        type: DataTypes.ARRAY(DataTypes.STRING), // El tipo de dato es un array de cadenas de texto.
      },
      created: {
        type: DataTypes.BOOLEAN, // El tipo de dato es un booleano.
        defaultValue: true, // El valor por defecto es true.
      },
    },
    {
      timestamps: false, // No se incluirán las columnas de timestamps (createdAt y updatedAt).
    }
  );
};
