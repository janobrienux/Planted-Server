const { DataTypes } = require("sequelize");
const db = require("../db");
  const User = db.define('user', {
      firstName: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: false
      },
      lastName: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      profileImg: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultImg: "",
          unique: false
      },
      admin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      }
  });
 module.exports = User;