import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import Button from 'react-bootstrap/Button';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, totalValue } = useContext(CartContext);
  const { darkMode } = useTheme();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCheckout = () => {
    // Xử lý thanh toán ở đây (có thể gọi API nếu cần)
    clearCart();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 10000); // Ẩn thông báo sau 10s
  };

  return (
    <div>
      <h2 className="mb-3">Giỏ hàng</h2>
      {showSuccess && (
        <div className="alert alert-success" role="alert">
          Thanh toán thành công! Cảm ơn bạn đã đặt hàng.
        </div>
      )}
      <div
        className={`card shadow-sm ${darkMode ? 'bg-dark text-light' : 'bg-white text-dark'}`}
        style={{
          background: darkMode ? '#222' : '#fff',
          color: darkMode ? '#fff' : '#222',
          transition: 'background 0.3s, color 0.3s',
        }}
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
              <Button className="btn btn-warning me-2" onClick={clearCart}>Xóa tất cả</Button>
              <Button className="btn btn-success" onClick={handleCheckout}>Xác nhận đơn hàng</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
