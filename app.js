const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

// const errorController = require("./controllers/error");

const mongoRunServer = require("./util/database");

const cookieParser = require("cookie-parser");
const session = require("express-session"); // session middleware

// const shopRoutes = require("./routes/shop");
// const adminRoutes = require("./routes/admin");
// const authRoutes = require("./routes/auth");

const app = express();
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
// app.use("/admin", adminRoutes);
// app.use("/auth", authRoutes);
// app.use(shopRoutes);
// app.use(errorController.get404);

mongoRunServer()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.dir;
    console.log(err);
  });
