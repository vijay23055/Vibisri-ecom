import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import Home from "./pages/Home";
import { Toaster } from "./components/ui/toaster";
import CartPage from "./pages/CartPage";
import Blogpage from "./pages/Blogpage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Directly render ProductsPage on root ("/") */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/blog" element={<Blogpage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;



