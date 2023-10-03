// Importar la clase DataTypes de Sequelize.
const { DataTypes } = require("sequelize");

// Exportar una función que define el modelo Genre en la base de datos.
module.exports = (sequelize) => {
  sequelize.define(
    "Genre",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, // El campo se incrementa automáticamente.
        allowNull: false, // No se permite un valor nulo.
        primaryKey: true, // Es la clave primaria de la tabla.
      },
      name: {
        type: DataTypes.STRING, // El tipo de dato es una cadena de texto.
        allowNull: false, // No se permite un valor nulo.
      },
    },
    {
      timestamps: false, // No se incluirán las columnas de timestamps (createdAt y updatedAt).
    }
  );
};
