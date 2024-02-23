const Product = require("../models/product");
const { ObjectId } = require("mongodb");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postAddProduct = async (req, response) => {
  const product = new Product(
    req.body.title,
    req.body.imageUrl,
    req.body.description,
    req.body.price,
    req.session.user.userId
  );
  product
    .save()
    .then(() => {
      console.log(product.title, "created");
      response.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = async (req, res) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = new ObjectId(req.params.productId);
  try {
    const product = await Product.fetchProductById(prodId);
    const { title } = product;
    res.render("admin/edit-product", {
      pageTitle: `${title} Edit Product`,
      path: "/admin/products",
      editing: editMode,
      product: product,
      isAuthenticated: req.session.isLoggedIn,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postEditProduct = async (req, res) => {
  const id = new ObjectId(req.body.productId);
  console.log("this is the id", id);
  const updateDoc = {
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    description: req.body.description,
  };

  Product.editProduct(id, updateDoc)
    .then((response) => {
      console.log("Product Updated");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAdminProducts = async (req, res, next) => {
  try {
    const currentProducts = await Product.fetchAllProducts();
    const modifiedProductList = currentProducts.map((product) => {
      return { ...product, _id: product._id.toString() };
    });
    res.render("admin/products", {
      prods: modifiedProductList,
      pageTitle: "Admin - Products",
      path: "/admin/products",
      isAuthenticated: req.session.isLoggedIn,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postDeleteProduct = (req, res) => {
  const id = new ObjectId(req.body.productId);
  const filter = { _id: id };
  Product.postDeleteProduct(filter)
    .then(() => {
      console.log("deleted");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      throw err;
    });
};
