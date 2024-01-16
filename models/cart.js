const Sequilize = require("sequelize");
const sequilize = require("../util/database");

const Cart = sequilize.define("cart", {
  id: {
    type: Sequilize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
});

module.exports = Cart;
