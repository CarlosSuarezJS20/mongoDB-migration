const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const { runServer, closeDataBase, uri } = require("./util/database");

// cookies:

const cookieParser = require("cookie-parser");
const session = require("express-session"); // session middleware
const MongoDBStore = require("connect-mongodb-session")(session);

const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");

const User = require("./models/user");
const store = new MongoDBStore({ uri: uri, collection: "sessions" });

const app = express();
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret to access mongodb",
    resave: false, // save session when it changes.
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    store: store,
    saveUninitialized: false,
  })
);

// adding user with and storing it:
app.use((req, res, next) => {
  User.findUser(req.session.user._id.toString())
    .then((userfound) => {
      // temporal user model creation
      if (!userfound) {
        next();
      } else {
        req.user = new User(
          userfound.userName,
          userfound.emailAddress,
          userfound.cart,
          userfound._id.toString()
        );

        next();
      }
    })
    .catch((err) => {
      console.log(err);
      next();
    });
});

// ROUTES
app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

runServer()
  .then(() => {
    app.listen(3000, () => {
      console.log("server is running");
      // creating a user for the time being
      const user = new User("sabina", "sabina@hotmail.com", { products: [] });

      User.findUser("65cceb1b455d6b406c396343")
        .then((returnedUser) => {
          if (!returnedUser) {
            user
              .save()
              .then((user) => {
                console.log("new user");
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            console.log("user exist!");
            return;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  })
  .catch((err) => {
    console.dir;
    console.log(err);
  })
  .finally(() => {
    closeDataBase()
      .then(() => {
        console.log("closing app!");
      })
      .catch((err) => console.log(err));
  });
