import React from "react";
import SelectedAttributes from "../attributes/SelectedAttributes.js";
import ChangeCartItemQuantity from "../ChangeCartItemQuantity.js";

export default class CartOverlayItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pricing: null,
      pricingCurrencySymbol: "",
      priceAmount: "",
    };
    this.filterCurrency = this.filterCurrency.bind(this);
    this.getPrice = this.getPrice.bind(this);
  }

  GetPricing = () => {
    const { singleProduct, selectedCurrency } = this.props;
    const pricing = this.getPrice(singleProduct?.prices, selectedCurrency);
    this.setState({ pricing });
  };

  filterCurrency = (item, selectedCurrency) => {
    if (item?.prices) {
      const correctPrice = item.prices.find(
        (price) => price.currency.symbol === selectedCurrency
      );
      if (correctPrice) {
        this.setState({ priceAmount: correctPrice.amount.toFixed(2) });
        this.setState({ pricing: correctPrice });
      }
    }
  };

  getPrice = (prices = [], currency) => {
    const correctPrice = prices.find(
      (price) => price.currency.symbol === currency
    );
    if (correctPrice) {
      this.setState({ priceAmount: correctPrice.amount.toFixed(2) });
      return correctPrice;
    }
    return {}; // Return an empty object if no price is found
  };

  componentDidMount() {
    this.GetPricing();
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedCurrency !== prevProps.selectedCurrency) {
      this.filterCurrency(this.props.singleProduct, this.props.selectedCurrency);
    }
  }

  render() {
    const { singleProduct, handleAddProduct, handleRemoveProduct } = this.props;
    const { pricing, priceAmount } = this.state;

    return (
      <article className="cartoverlay-products-single">
        <section className="cart-overlay-item">
          <section className="cart-overlay-item-data">
            <section className="titles-block">
              <h4>{singleProduct.brand}</h4>
              <h4>{singleProduct.name}</h4>
              <div className="cartoverlay-item-pricing">
                <p className="product-price">
                  {pricing?.currency?.symbol}
                  {priceAmount}
                </p>
              </div>
            </section>

            {singleProduct?.attributes?.map((attribute) => (
              <SelectedAttributes
                className="cart-overlay-item-attr"
                key={attribute.id}
                attribute={attribute}
                userSelectedAttributes={singleProduct.userSelectedAttributes}
                singleProduct={singleProduct}
              />
            ))}
          </section>
        </section>
        <ChangeCartItemQuantity
          className="cartoverlay-product-interaction"
          handleAddProduct={handleAddProduct}
          handleRemoveProduct={handleRemoveProduct}
          singleProduct={singleProduct}
        />
        <img
          className="cart-overlay-image"
          src={singleProduct.gallery[0]}
          alt={singleProduct.name}
        />
      </article>
    );
  }
}
