exports.postLogin = (req, res) => {
  const userEmail = req.body.email;
  const password = req.body.password;
  console.log({ userEmail: userEmail, password: password });
  req.session.isLoggedIn = true;
  //   setting cookie
  // res.cookie("loggedIn", "true", {
  //   maxAge: 900000,
  //   httpOnly: true, // not client side manipulation
  // });
  // initializing a session below
  res.redirect("/");
};

exports.getLogin = (req, res) => {
  //   console.log(req.cookies["loggedIn"]);
  res.render("auth/login", {
    pageTitle: "Login Page",
    path: "/login",
    // isAuthenticated: req.cookies["loggedIn"],
    isAuthenticated: req.session.isLoggedIn,
  });
};
