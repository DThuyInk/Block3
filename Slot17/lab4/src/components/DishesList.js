import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import PropTypes from "prop-types";

// DishesList component renders the list of dishes and adds them to the cart
const DishesList = ({ dishes }) => {
  const { addToCart } = useContext(CartContext);
  const [search, setSearch] = useState("");

  // Lọc món ăn theo tên hoặc mô tả
  const filteredDishes = dishes.filter(
    (dish) =>
      dish.name.toLowerCase().includes(search.toLowerCase()) ||
      dish.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="mb-3">Danh sách món ăn</h2>
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Tìm kiếm món ăn..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="row">
        {filteredDishes.length > 0 ? (
          filteredDishes.map((dish) => (
            <div key={dish.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img src={dish.image} alt={dish.name} className="card-img-top" style={{height: "180px", objectFit: "cover"}} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{dish.name}</h5>
                  <p className="card-text">{dish.description}</p>
                  <p className="card-text fw-bold">{`Giá: $${parseFloat(dish.price).toFixed(2)}`}</p>
                  <button onClick={() => addToCart(dish)} className="btn btn-primary mt-auto">Thêm vào giỏ</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12"><p>Không tìm thấy món ăn phù hợp.</p></div>
        )}
      </div>
    </div>
  );
};

// Prop validation to ensure proper data structure
DishesList.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DishesList;
