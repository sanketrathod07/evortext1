import React, { useEffect, useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import ChangeCartItemQuantity from "../../components/ChangeCartItemQuantity.js";


const CartSingleItem = ({ singleProduct, handleAddProduct, handleRemoveProduct }) => {
    return (
        <section className="cart-products-single">
            <section className="cart-data">
                <h2 className="product-brand">{singleProduct.brand}</h2>
                <h2 className="product-name">{singleProduct.name}</h2>

                <div className="cart-item-pricing">
                    <p className="product-price">${singleProduct?.price}
                    </p>
                </div>
                {/* Size Selection */}
                <div className="size-section">
                    <div className="size-container">
                        <h3 className="size-title">SIZE</h3>
                    </div>
                    <div className="sizes">
                        <button className="size-btn size-btnActive">S</button>
                        <button className="size-btn">M</button>
                        <button className="size-btn">L</button>
                        <button className="size-btn">XL</button>
                        <button className="size-btn">XXL</button>
                    </div>
                </div>
            </section>
            <section className="cart-content">
                <ChangeCartItemQuantity
                    className="cart-product-interaction"
                    handleAddProduct={handleAddProduct}
                    handleRemoveProduct={handleRemoveProduct}
                    singleProduct={singleProduct}
                />
                <div className="CartImage-Container-Mobile">
                    {singleProduct.gallery.length === 1 ? (
                        <SimpleImageSlider
                            className="image-slider single-image-slider"
                            images={singleProduct.gallery}
                            showNavs={false}
                            width={190}
                            height={188}
                        />
                    ) : (
                        <SimpleImageSlider
                            className="image-slider multiple-image-slider"
                            images={singleProduct.gallery}
                            autoPlay={true}
                            autoPlayDelay={2.0}
                            width={130}
                            height={140}
                            navSize={10}
                            navStyle={2}
                            bgColor="#FFFF"
                        />
                    )}
                </div>
                <div className="CartImage-Container-Desktop">
                    {singleProduct.gallery.length === 1 ? (
                        <SimpleImageSlider
                            className="image-slider single-image-slider"
                            images={singleProduct.gallery}
                            showNavs={false}
                            width={190}
                            height={188}
                        />
                    ) : (
                        <SimpleImageSlider
                            className="image-slider multiple-image-slider"
                            images={singleProduct.gallery}
                            // showNavs={true}
                            width={200}
                            height={250}
                            autoPlay={true}
                            autoPlayDelay={2.0}
                            navSize={10}
                            navStyle={2}
                            bgColor="#FFFF"
                        />
                    )}
                </div>
            </section>
        </section>
    );
}

export default CartSingleItem;
