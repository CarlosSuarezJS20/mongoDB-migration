// const mysql = require("mysql2");
const { Sequelize } = require("sequelize");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "shop-sql-complete",
//   password: "aliciasuarez83!",
// });

// pool.getConnection((error) => {
//   if (error) {
//     console.log("Could not connect to MySQL" + "error: " + error);
//   } else {
//     console.log("connected");
//   }
// });

const sequelize = new Sequelize(
  "shop-sql-complete",
  "root",
  "aliciasuarez83!",
  {
    host: "localhost",
    dialect: "mysql",
  }
);

const startDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startDatabase();

module.exports = sequelize;
