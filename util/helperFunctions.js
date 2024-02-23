exports.updateCartHandler = (cart, productId) => {
  const currentCart = [...cart];
  const productIndex = currentCart.findIndex(
    (prod) => prod.productId.toString() === productId
  );

  if (currentCart[productIndex].quantity > 1) {
    const currentProduct = {
      ...currentCart[productIndex],
      quantity: currentCart[productIndex].quantity - 1,
    };
    currentCart[productIndex] = currentProduct;
    return currentCart;
  }

  if (currentCart[productIndex].quantity === 1) {
    const newCart = currentCart.filter(
      (prod) => prod.productId.toString() !== productId
    );

    return newCart;
  }
};
