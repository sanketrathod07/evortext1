import React, { useCallback, useEffect, useRef, useState } from "react";
import AddToCartButton from "../../components/AddToCartButton.js";
import ProductShowcase from "./ProductShowcase.js";
import ProductTitles from "./ProductTitles.js";
import { ResetLocation } from "../../helpers/ResetLocation.js";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { CiShare2 } from "react-icons/ci";
import './Collapsible.css';
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";


const CollapsibleSection = ({ title, children, defaultExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className={`collapsible-section ${isExpanded ? 'expanded' : ''}`}>
      <div className="collapsible-header" onClick={toggleExpand}>
        <h3>{title}</h3>
        <span>{isExpanded ? <IoIosArrowUp size={15} /> : <IoIosArrowDown size={15} />}</span>
      </div>
      {isExpanded && <div className="collapsible-content">{children}</div>}
    </div>
  );
};




const SingleProduct = ({ handleAddProduct, alertMessageMain, allProducts }) => {
  const [allAttributesAreSelected, setAllAttributesAreSelected] = useState(true);
  const [singleProduct, setSingleProduct] = useState({});
  const [priceAmount, setPriceAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const descriptionRef = useRef(null); // Ref for the description element

  useEffect(() => {
    document.title = `${singleProduct.name} | Shopping Time`;
    ResetLocation();
  }, [singleProduct]);

  const getProductById = useCallback(
    (uniqueId) => {
      const targetProduct = allProducts.find((item) => item.id === uniqueId);
      setIsLoading(true);
      if (targetProduct) {
        setSingleProduct(targetProduct);
        const productPrice = parseFloat(targetProduct.price);
        setPriceAmount(!isNaN(productPrice) ? productPrice.toFixed(2) : "0.00");
        setIsLoading(false);

        if (singleProduct.description && descriptionRef.current) {
          descriptionRef.current.innerHTML = singleProduct.description; // Use ref to set innerHTML
        }
      }
    },
    [allProducts, singleProduct.description]
  );

  useEffect(() => {
    const pathname = window.location.pathname.toString().substring(7);
    getProductById(pathname);
  }, [getProductById]);

  const handleSelectedAttributes = () => {
    // No attributes to select in this version
    setAllAttributesAreSelected(true);
  };

  return (
    <main>
      {isLoading ? (
        <section className="single-products__loader">
          <h3>The product is loading, please wait...</h3>
        </section>
      ) : (
        <React.Fragment>
          <ProductTitles singleProduct={singleProduct} />
          <section className="single-product">
            <ProductShowcase singleProduct={singleProduct} />
            <div className="product-detail">
              {/* Title Section */}
              <div className="product-header">
                <div className="title-sub-title">
                  <h3 className="brand-title">{singleProduct.brand}</h3>
                  <div className="actions">
                    <button className="action-btn">
                      <MdOutlineFavoriteBorder size={24} />
                    </button>
                    <button className="action-btn">
                      <CiShare2 size={24} />
                    </button>
                  </div>
                </div>
                <div className="title-sub-title">
                  <h1 className="product-title">{singleProduct.name}</h1>
                </div>
                {/* Price Section */}
                <div className="price-section">
                  <h2 className="price">₹ {priceAmount}</h2>
                  <p className="price-details">MRP incl. of all taxes</p>
                </div>
              </div>



              {/* Size Selection */}
              <div className="size-section">
                <div className="size-container">
                  <h3 className="size-title">SIZE</h3>
                  <button className="size-guide">SIZE GUIDE</button>
                </div>
                <div className="sizes">
                  <button className="size-btn size-btnActive">S</button>
                  <button className="size-btn">M</button>
                  <button className="size-btn">L</button>
                  <button className="size-btn">XL</button>
                  <button className="size-btn">XXL</button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <AddToCartButton
                className="addtocart"
                alertMessageMain={alertMessageMain}
                handleAddProduct={handleAddProduct}
                item={singleProduct}
                allAttributesAreSelected={allAttributesAreSelected}
                handleSelectedAttributes={handleSelectedAttributes}
              />


              {/* Icons Section */}
              <div className="features">
                <div className="feature-item">
                  <img src="https://cdn.shopify.com/s/files/1/0266/6276/4597/files/shipped.svg?v=1705641844" />
                  <p>Free Shipping</p>
                </div>
                <div className="feature-item">
                  <img src="https://cdn.shopify.com/s/files/1/0266/6276/4597/files/delivery-status.svg?v=1705641828" />
                  <p>Easy Returns</p>
                </div>
                <div className="feature-item">
                  <img src="	https://cdn.shopify.com/s/files/1/0266/6276/4597/files/clean-clothes_1.svg?v=1705641826" />
                  <p>Fresh Fashion</p>
                </div>
              </div>

              {/* Product Details */}
              <CollapsibleSection title="Product Details and Overview" defaultExpanded={true}>
                <p>SKU: 300988199011</p>
                <p>Description: Polo T-Shirt</p>
                <p>Dimensions: 39cm</p>
                <p>This tan polo t-shirt from Ascot is made from knit-textured fabric for exceptional comfort. With a relaxed fit, it features a spread collar and half sleeves.</p>
                <p>Net Quantity: 1N</p>
                <p>Fit: Relaxed Fit</p>
                <p>Care Instruction: Machine Wash</p>
                <p>Fabric Composition: 80% Acrylic, 20% Nylon</p>
                <p>Model Fit: Model is 6ft 1inch and wearing a size M</p>
              </CollapsibleSection>

              {/* Collapsible Sections */}

              <CollapsibleSection title="Delivery & Return">
                <p>TERMS & CONDITIONS</p>
                <p>PRIVACY POLICY</p>
                <p>RETURN POLICY</p>
              </CollapsibleSection>

              <CollapsibleSection title="Contact Us">
                <p>📞 7506401234, 18002099901</p>
                <p>Timings - 9 am to 8 pm (Operational all days)</p>
                <p>✉️ westside@trent-tata.com</p>
                <p>For Customer Complaints, write to: Incharge, Trent Limited, Bombay House, 24, Homi Mody Street, Fort, Mumbai - 400001</p>
              </CollapsibleSection>
            </div>
          </section>
        </React.Fragment>
      )}
    </main>
  );
};

export default SingleProduct;
