import React, { useCallback, useEffect, useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import './App.css'
import Header from "./components/header/Header.js";
import AllProducts from "./routes/all-products/AllProducts.js";
import SingleProduct from "./routes/single-product/SingleProduct.js";
import Cart from "./routes/cart/Cart.js";
import Landing from "./routes/landing/Landing.js";
import Checkout from "./routes/checkout/Checkout";
import NotFound from "./routes/not-found/NotFound";
import Order from "./routes/order/Order";
import products_database from "./database/firebase.js";
import { collection, getDocs } from "firebase/firestore/lite";
import Footer from "./components/footer/Footer.js";

const App = () => {
  const [activeCategory, setActiveCategory] = useState("");
  const [allCurrencies, setAllCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("$");
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0);
  const [taxes, setTaxes] = useState(18);
  const [productsQuantity, setProductsQuantity] = useState(0);
  const [orderFormValue, setOrderFormValue] = useState({});
  const [cachedProducts, setCachedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const filterAndSetProducts = (products) => {
    if (!activeCategory || activeCategory === "all") {
      setAllProducts(products);
    } else {
      const filteredProducts = products.filter(
        (product) => product.category?.toLowerCase() === activeCategory.toLowerCase()
      );
      setAllProducts(filteredProducts);
    }
  };

  const retrieveProducts = useCallback(async (db) => {
    try {
      const all_products_col = collection(db, "all-products");
      const productsSnapshot = await getDocs(all_products_col);
      const all_products = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return all_products;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }, []);


  const GetProducts = useCallback(async () => {
    if (cachedProducts.length > 0) {
      filterAndSetProducts(cachedProducts);
      return;
    }

    setIsLoading(true);
    try {
      const products = await retrieveProducts(products_database);
      setCachedProducts(products);
      filterAndSetProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setIsLoading(false);
  }, [cachedProducts, activeCategory, retrieveProducts]);

  useEffect(() => {
    GetProducts();
  }, [GetProducts, activeCategory]);




  const clearCart = () => {
    setCartItems([]);
    setProductsQuantity(0);
    localStorage.removeItem("cartItems");
    localStorage.removeItem("productsQuantity");
  };

  const changeCategory = (newCategory) => {
    setActiveCategory(newCategory);
    localStorage.setItem("activeCategory", JSON.stringify(newCategory));
    GetProducts(); // Trigger re-fetch or filter logic after category change
  };

  useEffect(() => {
    const storedActiveCategory = JSON.parse(
      localStorage.getItem("activeCategory")
    );
    if (storedActiveCategory) {
      setActiveCategory(storedActiveCategory);
    }
  }, []);

  const changeCurrency = (newSelectedCurrency) => {
    setSelectedCurrency(newSelectedCurrency);
    localStorage.setItem("selectedCurrency", JSON.stringify(newSelectedCurrency));
  };

  const MatchingAttributes = (userSelectedAttributes, targetProduct) => {
    if (!userSelectedAttributes || !Array.isArray(userSelectedAttributes)) {
      return false; // or handle the case differently
    }

    const attributesMatch = (groupOne, groupTwo) => {
      if (!groupOne || !groupTwo) {
        return false;
      }
      return Object.values(groupOne)[1] === Object.values(groupTwo)[1];
    };

    let truthyValuesCounter = 0;
    let i = 0;
    while (i < userSelectedAttributes.length) {
      if (
        attributesMatch(
          userSelectedAttributes[i],
          targetProduct?.userSelectedAttributes[i]
        )
      ) {
        truthyValuesCounter += 1;
      }
      i += 1;
    }

    return truthyValuesCounter === userSelectedAttributes?.length;
  };


  const updateCartQuantity = (
    actionToPerform,
    productAlreadyInCart,
    userSelectedAttributes
  ) => {
    const repeatableProduct = CheckRepeatableProducts(
      cartItems,
      productAlreadyInCart,
      userSelectedAttributes
    );
    const indexOfRepeatableProduct = cartItems.indexOf(repeatableProduct);
    const currentProductList = [...cartItems];
    if (actionToPerform === "addProduct") {
      currentProductList[indexOfRepeatableProduct].quantity += 1;
    } else {
      currentProductList[indexOfRepeatableProduct].quantity -= 1;
    }

    return currentProductList;
  };

  const CheckRepeatableProducts = (cartItems, targetProduct, userSelectedAttributes) => {
    console.log('Product Prices:', targetProduct.price);

    let item;
    const productsById = cartItems.filter((item) => item.id === targetProduct.id);
    productsById.forEach((targetProduct) => {
      if (userSelectedAttributes && MatchingAttributes(userSelectedAttributes, targetProduct)) {
        item = targetProduct;
      }
    });
    return item;
  };


  const handleAddProduct = (targetProduct, userSelectedAttributes = null) => {
    let updatedProductList;
    const productAlreadyInCart = CheckRepeatableProducts(
      cartItems,
      targetProduct,
      userSelectedAttributes
    );


    if (productAlreadyInCart) {
      updatedProductList = updateCartQuantity(
        'addProduct',
        productAlreadyInCart,
        userSelectedAttributes
      );
    } else {
      let modifiedProduct = JSON.parse(JSON.stringify(targetProduct));
      let clone;

      for (let i = 0; i < targetProduct?.attributes?.length; i++) {
        for (let j = 0; j < targetProduct?.attributes[i]?.items?.length; j++) {
          if (
            targetProduct.attributes[i].items[j].value ===
            userSelectedAttributes?.[i]?.value
          ) {
            clone = {
              ...targetProduct.attributes[i].items[j],
            };
            clone.isSelected = true;

            modifiedProduct.attributes[i].items[j].isSelected = true;

            modifiedProduct.attributes[i].items[j] = {
              ...clone,
            };
          }
        }
      }

      updatedProductList = [
        ...cartItems,
        {
          ...modifiedProduct,
          userSelectedAttributes: userSelectedAttributes || [],
          quantity: 1,
        },
      ];
    }

    // Create unique id safely
    updatedProductList.map((updatedProduct) => {
      const firstValue = Object.values(
        updatedProduct.userSelectedAttributes?.[0] || {}
      );
      const secondValue = Object.values(
        updatedProduct.userSelectedAttributes?.[1] || {}
      );
      const thirdValue = Object.values(
        updatedProduct.userSelectedAttributes?.[2] || {}
      );

      const productId = updatedProduct.id;
      return (updatedProduct.uniqueId = `${productId}-${firstValue}-${secondValue}-${thirdValue}`);
    });

    // Update cart items
    setCartItems(updatedProductList);
    localStorage.setItem('cartItems', JSON.stringify(updatedProductList));

    // Update cart quantity
    if (updatedProductList.length <= 1) {
      updatedProductList.forEach((item) => {
        localStorage.setItem('productsQuantity', JSON.stringify(item.quantity));
        setProductsQuantity(item.quantity);
      });
    } else {
      const productListArray = updatedProductList.map((item) => item.quantity);
      const sum = productListArray.reduce((a, b) => a + b, 0);
      setProductsQuantity(sum);
      localStorage.setItem('productsQuantity', JSON.stringify(sum));
    }
  };

  useEffect(() => {
    if (localStorage.getItem('cartItems') !== null) {
      const jsonCartItems = localStorage.getItem('cartItems');
      const cartItems = JSON.parse(jsonCartItems);
      setCartItems(cartItems);
    } if (localStorage.getItem('productsQuantity') !== null) {
      const jsonProductsQuantity = localStorage.getItem('productsQuantity');
      const productsQuantity = JSON.parse(jsonProductsQuantity);
      setProductsQuantity(productsQuantity);
    }
  }, [])

  const alertMessageMain = () => {
    const alertMessage = document.querySelector('.success-alert');
    alertMessage.classList.add('visible');
    setTimeout(() => {
      alertMessage.classList.remove('visible');
    }, 1000);
  };

  const handleRemoveProduct = (targetProduct, userSelectedAttributes) => {
    let updatedProductList;
    const repeatableProduct = CheckRepeatableProducts(
      cartItems,
      targetProduct,
      userSelectedAttributes
    );
    if (repeatableProduct.quantity > 1) {
      updatedProductList = updateCartQuantity(
        'removeProduct',
        repeatableProduct,
        userSelectedAttributes
      );
    } else {
      const products = [...cartItems];
      const indexOfProduct = products.indexOf(repeatableProduct);
      products.splice(indexOfProduct, 1);
      updatedProductList = products;
    }

    // Update cart items
    setCartItems(updatedProductList);
    localStorage.setItem('cartItems', JSON.stringify(updatedProductList));

    // Update cart quantity
    if (updatedProductList.length <= 1) {
      updatedProductList.forEach((item) => {
        localStorage.setItem('productsQuantity', JSON.stringify(item.quantity));
        setProductsQuantity(item.quantity);
      });
    } else {
      const productListArray = updatedProductList.map((item) => item.quantity);
      const sum = productListArray.reduce((a, b) => a + b, 0);
      setProductsQuantity(sum);
      localStorage.setItem('productsQuantity', JSON.stringify(sum));
    }
    if (updatedProductList.length === 0) {
      setProductsQuantity(0);
      localStorage.setItem('productsQuantity', JSON.stringify(0));
    }
  };



  useEffect(() => {
    const calculateTotalPayment = () => {
      let total = 0;

      cartItems.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
      });

      // Round the total payment to the nearest whole number
      setTotalPayment(Math.round(total));
    };

    calculateTotalPayment();
  }, [cartItems, selectedCurrency]);




  return (
    <BrowserRouter>
      <Header
        productsQuantity={productsQuantity}
        activeCategory={activeCategory}
        selectedCurrency={selectedCurrency}
        allCurrencies={allCurrencies}
        changeCategory={changeCategory}
        changeCurrency={changeCurrency}
        totalPayment={totalPayment}
        cartItems={cartItems}
        handleRemoveProduct={handleRemoveProduct}
        handleAddProduct={handleAddProduct}
        clearCart={clearCart}
      />

      <Routes>
        <Route path="/" element={<Landing changeCategory={changeCategory} />} />
        <Route
          path={`/store/${activeCategory}`}
          element={
            <AllProducts
              allProducts={allProducts}
              activeCategory={activeCategory}
              selectedCurrency={selectedCurrency}
              handleAddProduct={handleAddProduct}
              alertMessageMain={alertMessageMain}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path={`/store/:id`}
          element={
            <SingleProduct
              selectedCurrency={selectedCurrency}
              handleAddProduct={handleAddProduct}
              alertMessageMain={alertMessageMain}
              allProducts={allProducts}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              productsQuantity={productsQuantity}
              cartItems={cartItems}
              selectedCurrency={selectedCurrency}
              totalPayment={totalPayment}
              taxes={taxes}
              handleRemoveProduct={handleRemoveProduct}
              handleAddProduct={handleAddProduct}
              clearCart={clearCart}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            cartItems.length > 0 ? (
              <Checkout
                cartItems={cartItems}
                selectedCurrency={selectedCurrency}
                setOrderFormValue={setOrderFormValue}
              />
            ) : (
              <NotFound />
            )
          }
        />
        <Route
          path="/order"
          element={
            cartItems.length > 0 && Object.keys(orderFormValue).length > 0 ? (
              <Order
                cartItems={cartItems}
                selectedCurrency={selectedCurrency}
                orderFormValue={orderFormValue}
                clearCart={clearCart}
              />
            ) : (
              <NotFound />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
