import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductsPage from "./pages/ProductsPage";
import Home from "./pages/Home";
import { Toaster } from "./components/ui/toaster";
import CartPage from "./pages/CartPage";
import Blogpage from "./pages/Blogpage";
import Mainblog from "./pages/Mainblog";
import ProductPage from "./pages/Productpage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminCustomers from "./pages/AdminCustomers";
import AdminLayout from "./components/AdminLayout";
import AdminLoginPopup from "./components/AdminLoginPopup";
import { ShopProvider } from "./context/ShopContext";



function App() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [loginTimerActive, setLoginTimerActive] = useState(false);

  useEffect(() => {
    // Show login popup after 10 seconds if not logged in and not on admin pages
    const timer = setTimeout(() => {
      if (!loginTimerActive && !window.location.pathname.startsWith('/admin/')) {
        setShowLoginPopup(true);
        setLoginTimerActive(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [loginTimerActive]);

  const handleLoginClose = () => {
    setShowLoginPopup(false);
  };

  const handleLoginSuccess = () => {
    // Navigate to admin dashboard after successful login
    window.location.href = '/admin/dashboard';
  };

  const handleLoginClick = () => {
    setShowLoginPopup(true);
  };

  return (
    <ShopProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            {/* Pass login handler to Home component */}
            <Route path="/" element={<Home onLoginClick={handleLoginClick} />} />
            <Route path="/products" element={<ProductsPage onLoginClick={handleLoginClick} />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/blog" element={<Blogpage />} />
            <Route path="/recipe" element={<Blogpage />} />
            <Route path="/blog-page" element={<Mainblog />} />
            <Route path="/product-page/:id" element={<ProductPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="customers" element={<AdminCustomers />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <AdminLoginPopup
          isOpen={showLoginPopup}
          onClose={handleLoginClose}
          onLoginSuccess={handleLoginSuccess}
        />
        <Toaster />
      </div>
    </ShopProvider>
  );
}

export default App;
