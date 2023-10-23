import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  let endOfList = 39;

  for (let i = 0; i < endOfList + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    const data = window.localStorage.getItem("CART_ITEMS");
    console.log("data: ", data);
    setCartItems(JSON.parse(data));
  }, []);

  useEffect(() => {
    console.log("useEffect cartItems: ", cartItems);
    window.localStorage.setItem("CART_ITEMS", JSON.stringify(cartItems));
  }, [cartItems]);

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    // console.log("foodData inside getTotalCartAmount >>: ", foodData);
    console.log("cartItems in getTotalCartAmount: ", cartItems);
    for (const item in cartItems) {
      // if (cartItems[item] > 0) {
      console.log("item: ", item);
      // let itemInfo = cartItems.find((product) => product.id === item);
      // console.log("itemInfo: ", itemInfo);
      //     totalAmount += cartItems[item] * itemInfo.price;
      // }
    }
    // console.log("totalAmount: ", totalAmount);
    return totalAmount;
  };

  const getCartCount = () => {
    let cartCount = 0;
    for (const item in cartItems) {
      cartCount = cartCount + cartItems[item];
    }
    console.log("cartCount: ", cartCount);
    return cartCount;
  };

  const addToCart = (itemId) => {
    console.log("cartItems: ", cartItems);
    setCartItems((prev) => ({ ...prev, [itemId]: prev[parseInt(itemId)] + 1 }));
    toast.success("Added item to cart", { position: "bottom-left" });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    console.log("cartItems: ", cartItems);
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const checkout = () => {
    setCartItems(getDefaultCart());
  };

  const contextValue = {
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    getCartCount,
    checkout,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};