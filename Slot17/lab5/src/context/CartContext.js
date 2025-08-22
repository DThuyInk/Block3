import React, { createContext, useReducer, useEffect } from "react";

// Tạo context cho Cart
export const CartContext = createContext(null);

// CartProvider cung cấp các giá trị cho các component con

const initialState = {
  cartItems: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      // If item exists, increase quantity
      const existing = state.cartItems.find(item => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload),
      };
    case "UPDATE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [],
      };
    case "SET_CART":
      return {
        ...state,
        cartItems: action.payload,
      };
    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Save cartItems to localStorage to persist across page reloads
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems"));
    if (savedCart) {
      dispatch({ type: "SET_CART", payload: savedCart });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  const addToCart = (dish) => {
    dispatch({ type: "ADD_ITEM", payload: dish });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const updateCartItem = (id, quantity) => {
    dispatch({ type: "UPDATE_ITEM", payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const totalValue = state.cartItems
    .reduce((acc, item) => acc + parseFloat(item.price) * (item.quantity || 1), 0)
    .toFixed(2);

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        totalValue,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
