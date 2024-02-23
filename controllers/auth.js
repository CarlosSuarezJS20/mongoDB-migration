const User = require("../models/user");

exports.postLogin = (req, res) => {
  const userEmail = req.body.email;
  const password = req.body.password;

  console.log({ userEmail: userEmail, password: password });

  User.findUser(req.session.user._id.toString())
    .then((userfound) => {
      req.session.isLoggedIn = true;

      req.session.user = userfound;
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getLogin = (req, res) => {
  //   console.log(req.cookies["loggedIn"]);
  res.render("auth/login", {
    pageTitle: "Login Page",
    path: "/login",
    isAuthenticated: req.session.isLoggedIn,
  });
};
