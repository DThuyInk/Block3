import React, { useState } from "react";
import usersData from '../data/users';

const RegisterPage = ({ onSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Kiểm tra trùng username
    if (usersData.find(u => u.username === username)) {
      setError("Tài khoản đã tồn tại!");
      setSuccess("");
      return;
    }
    // Thêm tài khoản mới vào usersData
    usersData.push({ username, password, name });
    setSuccess("Đăng ký thành công! Bạn có thể đăng nhập.");
    setError("");
    setUsername("");
    setPassword("");
    setName("");
    if (onSuccess) {
      setTimeout(() => onSuccess(), 1000);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 400 }}>
      <h2 className="mb-4">Đăng ký tài khoản</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Tên hiển thị</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tài khoản</label>
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
        {success && <div className="alert alert-success">{success}</div>}
        <button type="submit" className="btn btn-success w-100">Đăng ký</button>
      </form>
    </div>
  );
};

export default RegisterPage;
