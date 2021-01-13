const {DataTypes} = require('sequelize');
const db = require('../db');

const Plants = db.define('plants', {
  plantName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  plantImg: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ""
  },
  temperature: {
    type: DataTypes.STRING,
    allowNull: false
  },
  waterFrequency: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastWatering: {
    type: DataTypes.STRING,
    allowNull: false
  },
isThriving: {
  type: DataTypes.BOOLEAN,
  allowNull: false
}
})

module.exports = Plants;