const Product = require("../models/product");
// this isn't necessary but it is good practice
const { QueryTypes } = require("sequelize");
const sequelize = require("../util/database");

exports.getProducts = async (req, res, next) => {
  console.log(req.isLoggedIn);
  // practicing raw queries
  sequelize
    .query("SELECT * FROM products", { type: QueryTypes.SELECT })
    .then((prods) => {
      res.render("shop/product-list", {
        prods: prods,
        pageTitle: "Product List",
        path: "/products",
        // isAuthenticated: req.cookies["loggedIn"],
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

exports.getProductById = async (req, res) => {
  const productId = req.params.productId;
  const selectedProd = await Product.findByPk(productId);
  res.render("shop/product-detail", {
    product: selectedProd,
    pageTitle: selectedProd.title,
    path: "/products",
    isAuthenticated: req.session.isLoggedIn,
  });
  try {
  } catch (error) {
    console.log(error);
    console.log("Product not found");
  }
};

exports.getIndex = async (req, res, next) => {
  console.log("authenticated ", req.session.isLoggedIn);
  try {
    const currentProducts = await Product.findAll();
    res.render("shop/index", {
      prods: currentProducts,
      pageTitle: "Shop",
      path: "/",
      // isAuthenticated: req.cookies["loggedIn"],
      isAuthenticated: req.session.isLoggedIn,
    });
  } catch (error) {
    console.log(error);
  }
};

// exports.getCheckout = (req, res, next) => {
//   res.render("shop/checkout", {
//     path: "/checkout",
//     pageTitle: "Checkout",
//   });
// };
