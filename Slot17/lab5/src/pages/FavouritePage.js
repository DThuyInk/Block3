import React from "react";
import { useFavourite } from "../context/FavouriteContext";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";

const FavouritePage = ({ onBack, onFavourite, onLogout, onGoToCart }) => {
  const { favourites, removeFromFavourite } = useFavourite();
  const { darkMode } = useTheme();

  return (
    <>
      <NavBar onFavourite={onFavourite} onLogout={onLogout} onGoToCart={onGoToCart} />
  <div className={`container py-5 cart-favourite-container${darkMode ? ' bg-dark' : ''}`}> 
        <button className="btn btn-secondary mb-4" onClick={onBack}>Quay lại trang chủ</button>
        {favourites.length === 0 ? (
          <h2>Chưa có món ăn ưa thích nào.</h2>
        ) : (
          <>
            <h2 className="mb-4">Món ăn ưa thích</h2>
            <div className="row">
              {favourites.map((dish) => (
                <div key={dish.id} className="col-md-6 col-lg-4 mb-4">
                  <div className="card h-100 shadow-sm">
                    <img src={dish.image} alt={dish.name} className="card-img-top" style={{height: "180px", objectFit: "cover"}} />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{dish.name}</h5>
                      <p className="card-text">{dish.description}</p>
                      <p className="card-text fw-bold">{`Giá: $${parseFloat(dish.price).toFixed(2)}`}</p>
                      <button className="btn btn-danger mt-auto" onClick={() => removeFromFavourite(dish.id)}>Bỏ khỏi ưa thích</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default FavouritePage;
