import React, { createContext, useState, useContext } from "react";
import users from '../data/users';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const login = (username, password) => {
    const found = users.find(u => u.username === username && u.password === password);
    if (found) {
      setUser(found);
      setError("");
      return true;
    } else {
      setError("Sai tên đăng nhập hoặc mật khẩu!");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setError("");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
