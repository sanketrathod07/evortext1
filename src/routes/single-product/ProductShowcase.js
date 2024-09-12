import React, { useState, useEffect } from "react";

const ProductShowcase = ({ singleProduct }) => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 750);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = singleProduct.gallery || [];

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 750);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="product-showcase">
      {images.length > 0 ? (
        isMobileView ? (
          <div className="carousel">
            <button className="arrow left-arrow" onClick={handlePrevImage}>
              &#8249;
            </button>
            <img
              src={images[currentImageIndex]}
              alt={`Product Image ${currentImageIndex + 1}`}
              className="product-image"
            />
            <button className="arrow right-arrow" onClick={handleNextImage}>
              &#8250;
            </button>
          </div>
        ) : (
          <div className="grid">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product Image ${index + 1}`}
                className="product-image"
              />
            ))}
          </div>
        )
      ) : (
        <p>No images available for this product.</p>
      )}
    </div>
  );
};

export default ProductShowcase;
