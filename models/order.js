const Sequilize = require("sequelize");
const sequilize = require("../util/database");

const Order = sequilize.define("order", {
  id: {
    type: Sequilize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
});

module.exports = Order;
