import React, { useState } from "react";
import './Collapsible.css'

// Collapsible Component
const CollapsibleSection = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="collapsible-section">
      <div className="collapsible-header" onClick={toggleExpand}>
        <h3>{title}</h3>
        <span>{isExpanded ? "▲" : "▼"}</span> {/* Replace with appropriate arrow icons */}
      </div>
      {isExpanded && <div className="collapsible-content">{children}</div>}
    </div>
  );
};

// Main Component
const SingleProduct = ({ handleAddProduct, alertMessageMain, allProducts }) => {
  // Your existing code...

  return (
    <main>
      {isLoading ? (
        <section className="single-products__loader">
          <h3>The product is loading, please wait...</h3>
        </section>
      ) : (
        <React.Fragment>
          {/* Your existing components... */}

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
        </React.Fragment>
      )}
    </main>
  );
};

export default SingleProduct;
