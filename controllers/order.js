exports.getOrders = (req, res) => {
  req.user
    .getOrders({ include: "products" })
    .then((orders) => {
      console.log(orders);
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        userOrders: orders,
        // isAuthenticated: req.cookies["loggedIn"],
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res) => {
  const currentUser = req.user;
  let products;
  let currentCart;
  currentUser
    .getCart()
    .then((cart) => {
      return cart;
    })
    .then((cart) => {
      currentCart = cart;
      return cart.getProducts();
    })
    .then((cartProducts) => {
      return cartProducts;
    })
    .then((cartProducts) => {
      products = cartProducts;
      return currentUser.createOrder();
    })
    .then((order) => {
      // modified
      const currentModelledProducts = products.map((prod) => {
        prod.orderItem = { quantity: prod.cartItem.quantity };
        return prod;
      });
      return order.addProducts(currentModelledProducts);
    })
    .then(() => {
      return currentCart.setProducts(null);
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => console.log(error));
};
