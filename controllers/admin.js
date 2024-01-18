// const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    // isAuthenticated: req.cookies["loggedIn"],
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postAddProduct = async (req, res, next) => {
  try {
    const product = req.user.createProduct({
      title: req.body.title,
      imageUrl: req.body.imageUrl,
      description: req.body.description,
      price: +req.body.price,
    });
    console.log(product.title, "created");
    res.redirect("/admin/products");
  } catch (error) {
    console.log(error);
  }
};

exports.getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  try {
    const product = await req.user.getProducts({
      where: {
        id: prodId,
      },
    });
    const { title } = product[0];
    res.render("admin/edit-product", {
      pageTitle: `${title} Edit Product`,
      path: "/admin/products",
      editing: editMode,
      product: product[0],
      // isAuthenticated: req.cookies["loggedIn"],
      isAuthenticated: req.session.isLoggedIn,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postEditProduct = async (req, res) => {
  Product.update(
    {
      title: req.body.title,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      description: req.body.description,
    },
    {
      where: {
        id: req.body.productId,
      },
    }
  )
    .then(() => {
      console.log("Product Updated");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getAdminProducts = async (req, res, next) => {
  try {
    const currentProducts = await req.user.getProducts({ include: "user" });
    const user = currentProducts[0].user;
    res.render("admin/products", {
      prods: currentProducts,
      pageTitle: "Admin - Products",
      path: "/admin/products",
      user: user,
      // isAuthenticated: req.cookies["loggedIn"],
      isAuthenticated: req.session.isLoggedIn,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.destroy({
    where: {
      id: prodId,
    },
  })
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
