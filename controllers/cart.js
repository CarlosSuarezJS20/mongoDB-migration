const { ObjectId } = require("mongodb");
const Product = require("../models/product");

exports.getCart = async (req, res) => {
  console.log(req.session.user);
  req.user
    .getCart()
    .then((products) => {
      const productsForCart = products.map((prod) => {
        return { ...prod, _id: prod._id.toString() };
      });

      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: productsForCart,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log("here", err));
};

exports.postCart = (req, res) => {
  const prodId = new ObjectId(req.body.productId);
  Product.fetchProductById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      res.redirect("/products");
    })
    .catch((err) => console.log(err));
};

exports.postCartDeleteProduct = (req, res) => {
  req.user
    .postCartDeleteProduct(req.body.productId)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};
