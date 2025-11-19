import React, { useState, forwardRef } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useShop } from "../context/ShopContext";

// Use forwardRef to allow the parent component (App.js) to attach a ref for GSAP
const Header = forwardRef(({ onLoginClick }, ref) => {
  const location = useLocation();
  const { isLoggedIn, user, logout } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

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

  const handleUserIconClick = () => {
    // Don't show login popup on admin pages
    if (location.pathname.startsWith('/admin/')) {
      return;
    }

    if (!isLoggedIn) {
      onLoginClick && onLoginClick();
    } else {
      setShowUserMenu(!showUserMenu);
    }
  };

  const handleLogoutClick = () => {
    logout();
    setShowUserMenu(false);
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

        <div className="header-actions relative">
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
            <Link to="/blog"> Blog</Link>
            <Link to="/contact">Contact</Link>
        </nav>


          <div className="relative">
            <button
              className="profile-btn"
              aria-label="Profile"
              onClick={handleUserIconClick}
            >
              {isLoggedIn ? (
                <div className="w-4 h-4 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">
                    {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                  </span>
                </div>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              )}
            </button>

            {/* User Dropdown Menu */}
            {showUserMenu && isLoggedIn && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{user?.name || 'Administrator'}</p>
                      <p className="text-sm text-gray-500">{user?.username || 'admin'}</p>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <span className="text-sm font-medium">Go to Admin Panel</span>
                  </Link>
                  <button
                    onClick={handleLogoutClick}
                    className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>

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
