const { DataTypes } = require("sequelize");
const db = require("../db");

const Comments = db.define("comments", {
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  entry: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Comments;
