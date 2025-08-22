import React from "react";

function NavBar({ darkMode, setDarkMode }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="#home">Food Order App</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><a className="nav-link" href="#home">Trang chủ</a></li>
            <li className="nav-item"><a className="nav-link" href="#menu">Thực đơn</a></li>
            <li className="nav-item"><a className="nav-link" href="#cart">Giỏ hàng</a></li>
          </ul>
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className={`btn ${darkMode ? "btn-info" : "btn-dark"} ms-3`}
          >
            {darkMode ? "Chuyển sang chế độ Sáng" : "Chuyển sang chế độ Tối"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
