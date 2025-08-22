import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const LoginPage = ({ onBack }) => {
  const { login, error, user, logout } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  if (user) {
    return (
      <div className="container py-5">
        <h2>Xin chào, {user.name}!</h2>
        <button className="btn btn-danger mt-3" onClick={logout}>Đăng xuất</button>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ maxWidth: 400 }}>
      <h2 className="mb-4">Đăng nhập</h2>
      <button className="btn btn-secondary mb-3" onClick={onBack}>Quay về trang chào mừng</button>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Tên đăng nhập</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mật khẩu</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary w-100">Đăng nhập</button>
      </form>
    </div>
  );
};

export default LoginPage;
