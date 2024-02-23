const Product = require("../models/product");
const { ObjectId } = require("mongodb");

exports.getProducts = async (req, res) => {
  Product.fetchAllProducts()
    .then((prods) => {
      // re-modeling
      const modifiedProductList = prods.map((product) => {
        return { ...product, _id: product._id.toString() };
      });
      res.render("shop/product-list", {
        prods: modifiedProductList,
        pageTitle: "Product List",
        path: "/products",
        isAuthenticated: true,
      });
    })
    .catch((err) => console.log(err));
};

exports.getProductById = async (req, res) => {
  const productId = new ObjectId(req.params.productId);
  Product.fetchProductById(productId)
    .then((prodDoc) => {
      res.render("shop/product-detail", {
        product: prodDoc,
        pageTitle: prodDoc.title,
        path: "/products",
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

exports.getIndex = async (req, res, next) => {
  try {
    const currentProducts = await Product.fetchAllProducts();
    // re-modeling
    const modifiedProductList = currentProducts.map((product) => {
      return { ...product, _id: product._id.toString() };
    });
    res.render("shop/index", {
      prods: modifiedProductList,
      pageTitle: "Shop",
      path: "/",
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
