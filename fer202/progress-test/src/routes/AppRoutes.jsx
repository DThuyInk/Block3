import { Route, Routes } from 'react-router-dom';
import ProductsPage from '../pages/ProductsPage';
import ProductDetails from '../pages/ProductDetails.jsx';
import LoginPage from '../pages/LoginPage.jsx';

export default function AppRoutes() {
  return (
    <Routes>
  <Route path="/products" element={<ProductsPage />} />
  <Route path="/view/:id" element={<ProductDetails />} />
  <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
