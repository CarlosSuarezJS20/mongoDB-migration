exports.getCart = async (req, res, next) => {
  try {
    const currentCart = await req.user.getCart();

    if (!currentCart) {
      try {
        // if new user will create a new cart
        const createCart = await req.user.createCart();

        res.render("shop/cart", {
          path: "/cart",
          pageTitle: "Your Cart",
          products: createCart,
          // isAuthenticated: req.cookies["loggedIn"],
          isAuthenticated: req.session.isLoggedIn,
        });
      } catch (error) {
        console.log(error);
      }
    }
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      products: currentCart,
      // isAuthenticated: req.cookies["loggedIn"],
      isAuthenticated: req.session.isLoggedIn,
    });
  } catch (error) {
    console.log(error);
  }
};
