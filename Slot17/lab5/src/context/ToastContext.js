import React, { createContext, useReducer, useContext } from "react";

const ToastContext = createContext();

const toastReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_TOAST":
      return { ...state, message: action.message, visible: true };
    case "HIDE_TOAST":
      return { ...state, visible: false };
    default:
      return state;
  }
};

export const ToastProvider = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, { message: "", visible: false });

  const showToast = (message) => {
    dispatch({ type: "SHOW_TOAST", message });
    setTimeout(() => dispatch({ type: "HIDE_TOAST" }), 2000);
  };

  return (
    <ToastContext.Provider value={{ ...state, showToast }}>
      {children}
      {state.visible && (
        <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999 }} className="alert alert-success">
          {state.message}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
