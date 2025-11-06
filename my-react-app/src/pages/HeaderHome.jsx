import React, { useState, forwardRef } from 'react';
import { Link } from "react-router-dom";

// Use forwardRef to allow the parent component (App.js) to attach a ref for GSAP
const Header = forwardRef((props, ref) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Toggles mobile nav visibility on hamburger click
  const toggleMobileNav = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const toggleSearch = () => setSearchOpen(s => !s);
  const onSearchSubmit = (e) => {
    e.preventDefault();
    // place to wire search behavior - currently log
    console.log('Search for:', searchQuery);
    setSearchOpen(false);
  };

  return (
    <header ref={ref} style={{ '--border-width': '0' }}>
      <div className="header-inner">
        <div className="site-brand">
          <img src={"https://iili.io/KZb4n1t.png"} alt="Vibishri logo" className="logo-img" />
          <span className="site-name">Vibishri</span>
        </div>

        {/* intentionally leave search panel and button to the header-actions for grouped layout */}

        {/* desktop-nav removed from here and placed inside header-actions to keep header content right-aligned */}

        <div className="header-actions">
          <nav className="desktop-nav">
            <form className={`search-panel ${searchOpen ? 'open' : ''}`} onSubmit={onSearchSubmit} role="search">
                <input
                className="search-input"
                placeholder="Search products..."
                aria-label="Search products"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                />
                <button type="button" className="search-close" onClick={() => setSearchOpen(false)} aria-label="Close search">✕</button>
            </form>

            <button className="search-btn" aria-expanded={searchOpen} aria-label="Open search" onClick={toggleSearch}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6"/>
                </svg>
            </button>

            <Link to="/">Home</Link>
            <Link to="/features">Features</Link>
            <Link to="/products">Product</Link>
            <Link to="/contact">Contact</Link>
        </nav>


          <button className="profile-btn" aria-label="Profile">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>

          <button className="hamburger" onClick={toggleMobileNav} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Conditional class based on state */}
      <div className={`mobile-nav ${isMobileMenuOpen ? 'show' : ''}`} id="mobileMenu">
        <a href="#">Home</a>
        <a href="#">Features</a>
        <a href="#">Product</a>
        <a href="#">Contact</a>
      </div>
    </header>
  );
});

export default Header;