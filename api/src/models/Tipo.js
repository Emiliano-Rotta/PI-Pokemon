// [ ] Tipo con las siguientes propiedades:
// ID
// Nombre
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   
    sequelize.define(
        "tipo",
        {            
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {timestamps: false}
    );
  };
