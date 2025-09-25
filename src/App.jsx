import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPepperHot,
  faLeaf,
  faCarrot,
  faSeedling
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Frontpage from "./component/Frontpage";  
import { useState, useEffect } from "react";


const iconVariants = {
  hidden: { opacity: 0, y: 60, scale: 1.0 },
  visible: (i) => ({
    opacity: 1.5,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.3,
      duration: 0.8,
      ease: "easeInOut"
    }
  })
};

const spiceIcons = [faPepperHot, faLeaf, faCarrot, faSeedling];


function App() {
  const [showFrontpage, setShowFrontpage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFrontpage(true);
    }, 2000); 
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="app-wrapper">
    {!showFrontpage && (
      <div className="spice-entrance">
        {spiceIcons.map((icon, index) => (
          <motion.div
            className="icon-box"
            custom={index}
            initial="hidden"
            animate="visible"
            variants={iconVariants}
            key={index}
          >
            <FontAwesomeIcon icon={icon} />
          </motion.div>
        ))}
      </div>
    )}

    {showFrontpage && (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Frontpage />} />
          <Route path="/home" element={<div>Home Page</div>} />
          <Route path="/product" element={<div>Product Page</div>} />
          <Route path="/contact" element={<div>Contact Page</div>} />
          <Route path="/blog" element={<div>Blog Page</div>} />
          <Route path="/wishlist" element={<div>Wishlist</div>} />
          <Route path="/add-to-cart" element={<div>Add Cart</div>} />
          <Route path="/account" element={<div>Account</div>} />
        </Routes>
      </BrowserRouter>
    )}
  </div>
  );
}

export default App;
