import React, { useEffect, useState } from "react";
import Product from "./Product.js";
import CategoryAllHero from '../../assets/images/product-listing-images/category-all-hero.webp';
import CategoryDressesHero from '../../assets/images/product-listing-images/category-dresses-hero.webp';
import CategoryMenHero from '../../assets/images/product-listing-images/men1Copy.jpg';
import CategoryShoesHero from '../../assets/images/product-listing-images/category-shoes-hero.webp';
import CategoryJeansHero from '../../assets/images/product-listing-images/category-jeans-hero.webp';
import "./all-products.css";

const AllProducts = ({ allProducts, activeCategory, selectedCurrency, handleAddProduct, alertMessageMain, productId, isLoading }) => {
  const [quickAddToCartVisible, setQuickAddToCartVisible] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    document.title = `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} | Shopping Time`;
  }, [activeCategory]);

  const toggleQuickCart = () => {
    setQuickAddToCartVisible(!quickAddToCartVisible);
  };
  const removeQuickAddToCart = () => {
    setQuickAddToCartVisible(false);
  };



  return (
    <article>
      <article className="products-hero">
        <h2>
          {activeCategory === 'all' ? "Boost your style sense!" :
            activeCategory === 'dresses' ? "Let's create your own style" :
              activeCategory === 'blouses' ? "The joy of dressing" :
                activeCategory === 'shoes' ? "Unlock your style" :
                  activeCategory === 'jeans' ? "Fashion never sleeps" :
                    "Boost your style sense!"}
        </h2>
        <img
          alt=""
          aria-hidden="true"
          src={activeCategory === 'all' ? CategoryAllHero :
            activeCategory === 'dresses' ? CategoryDressesHero :
              activeCategory === 'men' ? CategoryMenHero :
                activeCategory === 'shoes' ? CategoryShoesHero :
                  activeCategory === 'jeans' ? CategoryJeansHero :
                    CategoryAllHero}
        />
      </article>

      <article className="product-listing-page">
        <h3 className="active-category">
          {activeCategory}
          {activeCategory === 'all' && ' Products'}
        </h3>

        {/* Check if loading state is being set correctly */}
        <section className="store-products">
          {allProducts && allProducts.map((item) => (
            <Product
              key={item.id}
              item={item}
              productId={productId}
              selectedCurrency={selectedCurrency}
              handleAddProduct={handleAddProduct}
              alertMessageMain={alertMessageMain}
              toggleQuickCart={toggleQuickCart}
              quickAddToCartVisible={quickAddToCartVisible}
              removeQuickAddToCart={removeQuickAddToCart}
              activeCategory={activeCategory}
              setQuickAddToCartVisible={setQuickAddToCartVisible}
              setActiveItem={setActiveItem}
              activeItem={activeItem}
            />
          ))}
        </section>
      </article>
    </article>
  );
};

export default AllProducts;
