const Product = require("../models/product");

exports.getCart = async (req, res) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts();
    })
    .then((products) => {
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
        // isAuthenticated: req.cookies["loggedIn"],
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;

  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      // if product exists already
      if (products[0]) {
        const oldQuantity = products[0].cartItem.quantity;
        newQuantity = newQuantity + oldQuantity;
        return products[0];
      }
      // add a brand new product to cart
      return Product.findByPk(prodId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((error) => console.log(error));
};

exports.postCartDeleteProduct = (req, res) => {
  const productIdToDelete = req.body.productId;
  req.user
    .getCart()
    .then((cart) => {
      return cart;
    })
    .then((cart) => {
      return cart.getProducts({ where: { id: productIdToDelete } });
    })
    .then((products) => {
      const product = products[0];
      product.cartItem.destroy();
      res.redirect("/cart");
    })
    .catch((error) => console.log(error));
};
