import React, { useContext, useState } from "react";
import { CartContext } from "../CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, totalValue } = useContext(CartContext);
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
      <div className="card shadow-sm">
        <div className="card-body">
          {cartItems.length === 0 ? (
            <p>Giỏ hàng của bạn đang trống.</p>
          ) : (
            <>
              <ul className="list-group mb-3">
                {cartItems.map((item) => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{item.name} - ${item.price}</span>
                    <button onClick={() => removeFromCart(item.id)} className="btn btn-sm btn-danger">Xóa</button>
                  </li>
                ))}
              </ul>
              <p>{`Tổng số món: ${cartItems.length}`}</p>
              <p>{`Tổng giá trị: $${totalValue}`}</p>
              <button onClick={clearCart} className="btn btn-warning me-2">Xóa tất cả</button>
              <button onClick={handleCheckout} className="btn btn-success">Xác nhận đơn hàng</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
