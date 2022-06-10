const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo


  // ] Pokemon con las siguientes propiedades:
// ID (Número de Pokemon) * : No puede ser un ID de un pokemon ya existente en la API pokeapi
// Nombre *
// Vida
// Fuerza
// Defensa
// Velocidad
// Altura
// Peso


  sequelize.define(
    'pokemon',
    
    {
    id: {
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('name', value.toLowerCase());
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    life: {
      type: DataTypes.INTEGER,
    },
    attack: { //en vez de fuerza
      type: DataTypes.INTEGER,
    },
    defense: {
      type: DataTypes.INTEGER,
        },
    speed: {  //velocidad
      type: DataTypes.INTEGER,
    },
    height: { //altura
      type: DataTypes.INTEGER,
    },
    weight: { //peso
      type: DataTypes.INTEGER,
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },


  },{timestamps: false}
  );


  
};


