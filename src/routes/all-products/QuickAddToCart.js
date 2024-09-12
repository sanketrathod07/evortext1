import React from "react";
import Attribute from "../../components/attributes/Attributes.js";
import AddToCartButton from "../../components/AddToCartButton.js";

const QuickAddToCart = ({ item,
  handleAddProduct,
  handleSelectedAttributes,
  selectedAttributes,
  allAttributesAreSelected,
  alertMessageMain, toggleQuickCart, setActiveItem }) => {

  // Hardcoded attributes for demo purposes
  const attributes = [
    {
      id: 'Color',
      items: [
        { id: '1', value: 'red' },
        { id: '2', value: 'blue' }
      ]
    },
    {
      id: 'Size',
      items: [
        { id: '1', value: 'S' },
        { id: '2', value: 'M' },
        { id: '3', value: 'L' }
      ]
    }
  ];

  return (
    <section className="quick-addto-cart">
      {attributes.map((attribute) => (
        <Attribute
          className="quick-attribute"
          key={attribute.id}
          attribute={attribute}
          handleSelectedAttributes={handleSelectedAttributes}
          selectedAttributes={selectedAttributes}
        />
      ))}
      <AddToCartButton
        className="quick-addtocart"
        handleAddProduct={handleAddProduct}
        item={item}
        allAttributesAreSelected={allAttributesAreSelected}
        selectedAttributes={selectedAttributes}
        alertMessageMain={alertMessageMain}
        toggleQuickAddToCart={toggleQuickCart}
        setActiveItem={setActiveItem}
      />
      <p className="close-quickbuy" onClick={() => setActiveItem(null)}>
        close
      </p>
    </section>
  );
};

export default QuickAddToCart;
