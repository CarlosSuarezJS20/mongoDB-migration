const Sequilize = require("sequelize");

// creating the modal for product table
const sequilize = require("../util/database");
const User = sequilize.define("user", {
  id: {
    type: Sequilize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: Sequilize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequilize.STRING(400),
    allowNull: false,
  },
  role: {
    type: Sequilize.STRING,
  },
});

module.exports = User;
