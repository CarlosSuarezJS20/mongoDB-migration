const getDb = require("../util/database").getDb;

class Product {
  constructor(title, imageUrl, description, price, userId) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.userId = userId;
  }

  static getDataBase() {
    const db = getDb();
    return db.collection("products");
  }

  save() {
    const db = getDb();
    const products = db.collection("products");
    const document = this;
    return products
      .insertOne(document)
      .then((result) => result)
      .catch((err) => err);
  }

  static fetchAllProducts() {
    const products = this.getDataBase();
    return products
      .find()
      .toArray()
      .then((products) => products)
      .catch((err) => err);
  }

  static fetchProductById(productId) {
    const products = this.getDataBase();
    const query = { _id: productId };
    return products.findOne(query);
  }

  static editProduct(productId, updatedDoc) {
    const filter = { _id: productId };
    const updateDoc = { $set: { ...updatedDoc } };
    const products = this.getDataBase();

    return products.updateOne(filter, updateDoc);
  }

  static postDeleteProduct(filter) {
    const products = this.getDataBase();
    return products.deleteOne(filter);
  }
}

module.exports = Product;
