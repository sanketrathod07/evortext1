import React from "react";

const AddToCartButton = ({ item, allAttributesAreSelected, selectedAttributes, handleAddProduct, className,
  alertMessageMain,
  setActiveItem }) => {

  // Ensure item and its properties are defined
  if (!item || !Array.isArray(item.gallery)) {
    return null; // or some fallback UI
  }

  return (
    <div className={className}>
      <button
        onClick={() => {
          if (item && allAttributesAreSelected) {
            handleAddProduct(item, selectedAttributes);
            alertMessageMain();
            if (className === 'quick-addtocart') {
              setActiveItem(null);
            }
          }
        }}
        className={
          item.inStock && allAttributesAreSelected
            ? "active-add-to-cart"
            : "inactive-add-to-cart"
        }
        disabled={!item.inStock || !allAttributesAreSelected}
      >
        {item.inStock ? "ADD TO CART" : "OUT OF STOCK"}
      </button>
    </div>
  );
}

export default AddToCartButton;
