
const { DataTypes, BOOLEAN } = require("sequelize");


module.exports = (sequelize) => {
  sequelize.define(
    "Videogame",
    {
      id: {
        type: DataTypes.UUID, 
        primaryKey: true, 
        defaultValue: DataTypes.UUIDV4, 
      },
      name: {
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true, 
      },
      description: {
        type: DataTypes.TEXT, 
      },
      platforms: {
        type: DataTypes.ARRAY(DataTypes.STRING), 
        allowNull: false, 
      },
      image: {
        type: DataTypes.STRING, 
      },
      released: {
        type: DataTypes.DATEONLY, 
      },
      rating: {
        type: DataTypes.FLOAT, 
      },
      genres: {
        type: DataTypes.ARRAY(DataTypes.STRING), 
      },
      created: {
        type: DataTypes.BOOLEAN, 
        defaultValue: true, 
      },
    },
    {
      timestamps: false, 
    }
  );
};
