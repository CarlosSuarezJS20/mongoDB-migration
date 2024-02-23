const getDb = require("../util/database").getDb;
const { ObjectId } = require("mongodb");
const { updateCartHandler } = require("../util/helperFunctions");

class User {
  constructor(userName, emailAddress, userCart, userId) {
    this.userName = userName;
    this.emailAddress = emailAddress;
    this.userCart = userCart;
    this.userId = userId;
  }

  getUserOrders() {
    const dataBase = getDb();

    const query = { "userDetails._id": this.userId };

    return dataBase.collection("orders").find(query).toArray();
  }

  addOrder() {
    const dataBase = getDb();
    return this.getCart()
      .then((cartProducts) => {
        const user = {
          _id: this.userId,
          userName: this.userName,
          userEmail: this.emailAddress,
        };
        const orderDocument = {
          products: [...cartProducts],
          userDetails: { ...user },
        };

        return dataBase.collection("orders").insertOne(orderDocument);
      })
      .then((res) => {
        const userIdOb = new ObjectId(this.userId);
        const filter = { _id: userIdOb };
        this.userCart = { products: [] };
        return dataBase
          .collection("users")
          .updateOne(filter, { $set: { cart: this.userCart } });
      })
      .catch((err) => err);
  }

  save() {
    const dataBase = getDb();
    const users = dataBase.collection("users");
    const userDoc = {
      userName: this.userName,
      emailAddress: this.emailAddress,
      cart: this.userCart,
    };
    return users.insertOne(userDoc);
  }

  getCart() {
    const dataBase = getDb();
    const products = dataBase.collection("products");

    const currentProductsInCart = this.userCart.products;

    const productIds = currentProductsInCart.map((prod) => prod.productId);
    const queryProductsById = { _id: { $in: [...productIds] } };

    return products
      .find(queryProductsById)
      .toArray()
      .then((products) => {
        const finalProducts = products.map((prod) => {
          return {
            ...prod,
            quantity: this.userCart.products.find((cartProd) => {
              return cartProd.productId.toString() === prod._id.toString();
            }).quantity,
          };
        });
        return finalProducts;
      })
      .catch((err) => err);
  }

  addToCart(product) {
    const userIdOb = new ObjectId(this.userId);
    const filter = { _id: userIdOb };
    const dataBase = getDb();
    const users = dataBase.collection("users");
    const currentCart = [...this.userCart.products];

    const productIsInCart = this.userCart.products.findIndex((prod) => {
      return prod.productId.toString() === product._id.toString();
    });

    if (productIsInCart >= 0) {
      currentCart[productIsInCart] = {
        ...currentCart[productIsInCart],
        quantity: currentCart[productIsInCart].quantity + 1,
      };
    } else {
      currentCart.push({ productId: new Object(product._id), quantity: 1 });
    }
    const cartDocument = {
      products: currentCart,
    };
    return users.updateOne(filter, { $set: { cart: cartDocument } });
  }

  postCartDeleteProduct(productId) {
    const userIdOb = new ObjectId(this.userId);
    const dataBase = getDb();
    const users = dataBase.collection("users");

    const newCart = updateCartHandler(this.userCart.products, productId);

    // handles update:

    const filter = { _id: userIdOb };

    return users.updateOne(filter, {
      $set: {
        cart: {
          products: newCart,
        },
      },
    });
  }

  static findUser(id) {
    const objectId = new ObjectId(id);
    const dataBase = getDb();
    const users = dataBase.collection("users");
    const query = { _id: objectId };
    return users.findOne(query);
  }
}

module.exports = User;
