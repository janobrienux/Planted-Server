const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE_URL || `postfresql://postgres:${encodeURIComponent(process.env.PASS)}@localhost/cookies`,
  {
    dialect: "postgres",
  },
);
module.exports = sequelize;
