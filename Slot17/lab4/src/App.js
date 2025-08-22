import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartProvider } from "./CartContext";
import DishesList from "./components/DishesList";
import Cart from "./components/Cart";
import "./styles.css";
// Sample dishes array
const dishes = [
  {
    id: 0,
    name: "Uthappizza",
    image: "images/uthappizza.png",
    price: "4.99",
    description: "A unique combination of Indian Uthappam and Italian pizza.",
  },
  {
    id: 1,
    name: "Zucchipakoda",
    image: "images/zucchipakoda.png",
    price: "1.99",
    description: "Deep fried Zucchini with chickpea batter.",
  },
  {
    id: 2,
    name: "Vadonut",
    image: "images/vadonut.png",
    price: "1.99",
    description: "A combination of vada and donut.",
  },
  {
    id: 3,
    name: "ElaiCheese Cake",
    image: "images/elaicheesecake.png",
    price: "2.99",
    description: "New York Style Cheesecake with Indian cardamoms.",
  },
];

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const appStyle = {
    background: darkMode ? "#222" : "#f5f5f5",
    color: darkMode ? "#fff" : "#222",
    minHeight: "100vh",
    transition: "all 0.3s",
  };

  return (
    <CartProvider>
      <div className="App container py-4" style={appStyle}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold">Food Order App</h1>
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className={`btn ${darkMode ? "btn-info" : "btn-dark"}`}
          >
            {darkMode ? "Chuyển sang chế độ Sáng" : "Chuyển sang chế độ Tối"}
          </button>
        </div>
        <div className="row">
          <div className="col-md-8 mb-4">
            <DishesList dishes={dishes} />
          </div>
          <div className="col-md-4">
            <Cart />
          </div>
        </div>
      </div>
    </CartProvider>
  );
}

export default App;
