import React, { useEffect } from "react";
import CartSingleItem from "./CartSingleItem.js";
import CartTotals from "./CartTotals.js";
import "./cart.css";
import CartHero from "../../assets/images/cart-hero2.png";

const Cart = ({
  selectedCurrency,
  totalPayment,
  taxes,
  handleRemoveProduct,
  cartItems,
  handleAddProduct,
  selectedAttributes,
  productsQuantity,
  clearCart,
}) => {
  useEffect(() => {
    document.title = "Cart | Shopping Time";
  }, []);

  return (
    <main>
      <article className="cart-hero">
        <h2>Cart</h2>
        <img src={CartHero} alt="" aria-hidden="true" />
      </article>
      <article className="cart">
        {cartItems.length === 0 ? (
          <section className="cart-item-section">
            <p className="empty-cart">
              Looks like you haven't added anything to your cart yet.
            </p>
          </section>
        ) : (
          <section className="cart-item-section">
            {Array.isArray(cartItems) &&
              cartItems.map((singleProduct) => (
                <CartSingleItem
                  selectedAttributes={selectedAttributes}
                  handleAddProduct={handleAddProduct}
                  key={singleProduct.uniqueId}
                  singleProduct={singleProduct}
                  selectedCurrency={selectedCurrency}
                  handleRemoveProduct={handleRemoveProduct}
                />
              ))}
            <CartTotals
              selectedCurrency={selectedCurrency}
              totalPayment={totalPayment}
              productsQuantity={productsQuantity}
              taxes={taxes}
              clearCart={clearCart}
            />
          </section>
        )}
      </article>
    </main>
  );
};

export default Cart;
