exports.getOrders = (req, res) => {
  req.user
    .getUserOrders()
    .then((orders) => {
      res.render("shop/orders", {
        userOrders: orders,
        pageTitle: "User Orders",
        path: "/orders",
        isAuthenticated: true,
      });
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

exports.postOrder = (req, res) => {
  req.user
    .addOrder()
    .then((r) => {
      console.log(r);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};
