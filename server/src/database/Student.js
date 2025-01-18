const { Sequelize } = require("sequelize");
const sequelizeDatabase = require("../config/db.js");

const Student = sequelizeDatabase.define("Student", {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nume_complet: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imagine_profil: {
    type: Sequelize.STRING,
  },
  serie: {
    type: Sequelize.STRING,
  },
  grupa: {
    type: Sequelize.STRING,
  },
  specializare: {
    type: Sequelize.STRING,
  },
  token_acces: {
    type: Sequelize.STRING,
  },
  id_lucrare: {
    type: Sequelize.INTEGER,
  },
});
