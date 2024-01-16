const Sequilize = require("sequelize");

// creating the modal for product table
const sequilize = require("../util/database");
const Product = sequilize.define("product", {
  id: {
    type: Sequilize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  title: {
    type: Sequilize.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: Sequilize.STRING(400),
    allowNull: false,
  },
  price: {
    type: Sequilize.DOUBLE,
    allowNull: false,
  },
  description: {
    type: Sequilize.STRING(500),
    allowNull: false,
  },
});

module.exports = Product;
