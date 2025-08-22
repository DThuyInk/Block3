import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const CartPage = ({ onBack, onFavourite, onLogout, onGoToCart }) => {
  const { cartItems, removeFromCart, clearCart, totalValue } = useContext(CartContext);
  const { darkMode } = useTheme();

  return (
    <>
      <NavBar onFavourite={onFavourite} onLogout={onLogout} onGoToCart={onGoToCart} />
  <div className={`container py-5 cart-favourite-container${darkMode ? ' bg-dark' : ''}`}> 
        <button className="btn btn-secondary mb-4" onClick={onBack}>Quay lại thực đơn</button>
        <h2 className="mb-3">Giỏ hàng</h2>
        <div
          className={`card shadow-sm ${darkMode ? 'bg-dark text-light' : 'bg-white text-dark'}`}
          style={{ background: darkMode ? '#222' : '#fff', color: darkMode ? '#fff' : '#222', transition: 'background 0.3s, color 0.3s' }}
        >
          <div className="card-body">
            {cartItems.length === 0 ? (
              <p>Giỏ hàng của bạn đang trống.</p>
            ) : (
              <>
                <ul className="list-group mb-3">
                  {cartItems.map((item) => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <span>{item.name} - ${item.price}</span>
                      <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>Xóa</button>
                    </li>
                  ))}
                </ul>
                <p>{`Tổng số món: ${cartItems.length}`}</p>
                <p>{`Tổng giá trị: $${totalValue}`}</p>
                <button className="btn btn-warning me-2" onClick={clearCart}>Xóa tất cả</button>
                <button className="btn btn-success">Xác nhận đơn hàng</button>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
