import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Frontpage from "./component/Frontpage";  // adjust path

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Frontpage />} />
        <Route path="/home" element={<div>Home Page</div>} />
        <Route path="/product" element={<div>Product Page</div>} />
        <Route path="/contact" element={<div>Contact Page</div>} />
        <Route path="/blog" element={<div>Blog Page</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
