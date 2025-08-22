import React from "react";

const ViewDetailPage = ({ dish, onBack }) => {
  if (!dish) return <div className="container py-5"><p>Không tìm thấy món ăn.</p></div>;
  return (
    <div className="container py-5">
      <button className="btn btn-secondary mb-4" onClick={onBack}>Quay lại thực đơn</button>
      <div className="card mx-auto" style={{ maxWidth: 500 }}>
        <img src={dish.image} alt={dish.name} className="card-img-top" style={{height: "300px", objectFit: "cover"}} />
        <div className="card-body">
          <h3 className="card-title mb-3">{dish.name}</h3>
          <p className="card-text mb-2">{dish.description}</p>
          <p className="card-text fw-bold">Giá: ${parseFloat(dish.price).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailPage;
