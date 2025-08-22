import React, { useContext, useState, useMemo } from "react";
import { useToast } from "../context/ToastContext";
import { CartContext } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { useFavourite } from "../context/FavouriteContext";
import PropTypes from "prop-types";

// DishesList component renders the list of dishes and adds them to the cart
const DishesList = ({ dishes, onGoToCart, onViewDetail }) => {
  const { addToCart, cartItems } = useContext(CartContext);
  const { showToast } = useToast();
  const { darkMode } = useTheme();
  const { toggleFavourite, favourites } = useFavourite();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");

  // Search, filter, sort sử dụng useMemo
  const processedDishes = useMemo(() => {
    let result = [...dishes];
    // Search
    if (search) {
      result = result.filter(
        (dish) =>
          dish.name.toLowerCase().includes(search.toLowerCase()) ||
          dish.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    // Filter theo loại (ví dụ: món chay, món mặn, món tráng miệng...)
    if (filter) {
      result = result.filter((dish) => dish.name.toLowerCase().includes(filter.toLowerCase()));
    }
    // Sort
    if (sort === "asc") {
      result = result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sort === "desc") {
      result = result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }
    return result;
  }, [dishes, search, filter, sort]);

  return (
    <div>
      <h2 className="mb-3">Danh sách món ăn</h2>
      <div className="row mb-3">
        <div className="col-md-4 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm món ăn..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-4 mb-2">
          <select className="form-select" value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="">Tất cả</option>
            <option value="bánh">Bánh</option>
            <option value="cà ri">Cà ri</option>
            <option value="mì">Mì</option>
            <option value="phô mai">Phô mai</option>
            <option value="xoài">Xoài</option>
          </select>
        </div>
        <div className="col-md-4 mb-2">
          <select className="form-select" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="">Sắp xếp</option>
            <option value="asc">Giá tăng dần</option>
            <option value="desc">Giá giảm dần</option>
          </select>
        </div>
      </div>
      <div className="row">
        {processedDishes.length > 0 ? (
          processedDishes.map((dish) => (
            <div key={dish.id} className="col-md-6 col-lg-4 mb-4">
              <div
                className={`card h-100 shadow-sm ${darkMode ? 'bg-dark text-light' : 'bg-white text-dark'}`}
                style={{
                  background: darkMode ? '#222' : '#fff',
                  color: darkMode ? '#fff' : '#222',
                  transition: 'background 0.3s, color 0.3s',
                }}
              >
                <img src={dish.image} alt={dish.name} className="card-img-top" style={{height: "180px", objectFit: "cover"}} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{dish.name}</h5>
                  <p className="card-text">{dish.description}</p>
                  <p className="card-text fw-bold">{`Giá: $${parseFloat(dish.price).toFixed(2)}`}</p>
                  <div className="d-flex gap-2 mt-auto">
                    {cartItems.find(item => item.id === dish.id) ? (
                      <button className="btn btn-success" onClick={onGoToCart}>Giỏ hàng</button>
                    ) : (
                      <button className="btn btn-primary" onClick={() => {
                        addToCart(dish);
                        showToast("Đã thêm vào giỏ hàng!");
                      }}>Thêm vào giỏ</button>
                    )}
                    <button
                      className={"btn " + (favourites.find(f => f.id === dish.id) ? "btn-warning" : "btn-outline-warning")}
                      onClick={() => {
                        toggleFavourite(dish);
                        showToast(favourites.find(f => f.id === dish.id) ? "Đã bỏ khỏi ưa thích!" : "Đã thêm vào ưa thích!");
                      }}
                    >
                      {favourites.find(f => f.id === dish.id) ? "Bỏ ưa thích" : "Ưa thích"}
                    </button>
                    <button className="btn btn-info" onClick={() => onViewDetail(dish)}>Xem chi tiết</button>
                  </div>
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
