import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useShop } from "../../context/ShopContext";

const Header = ({ cartCount = 0, wishlistCount = 0, onCartClick, onLoginClick }) => {
  const location = useLocation();
  const { isLoggedIn, user, logout } = useShop();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
    { name: "Blog", path: "/blog" },
  ];

  // Define your right-side icons with optional routing
  const icons = [
    {
      src: "/images/icons/heart.png",
      alt: "Wishlist Icon",
      path: "/wishlist",
      count: wishlistCount,
      isWishlist: true,
    },
    {
      src: "/images/icons/cart.png",
      alt: "Cart Icon",
      path: "/cart",
      count: cartCount,
      isCart: true,
    },
  ];

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
    <nav className="grid grid-cols-[1fr_auto_1fr] items-center bg-[#f5efe3] border-b border-[#ddd4c2] px-10 py-2 sticky top-0 z-50">
      {/* Left: Logo */}
      <div className="flex items-center">
        <Link to="/">
          <img
            src="https://iili.io/KZb4n1t.png"
            alt="Vibishu Logo"
            className="h-[55px] w-auto hover:scale-105 transition-transform"
          />
        </Link>
      </div>

      {/* Center: Nav Links */}
      <div className="flex justify-center items-center">
        <ul className="flex gap-2 bg-[#dcd5c7] rounded-full py-1.5 px-3 list-none shadow-sm">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`px-5 py-2 rounded-full font-medium transition-all duration-200 ${
                  location.pathname === item.path
                    ? "bg-black text-white"
                    : "text-gray-800 hover:bg-black hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right: User Profile + Icons */}
      <div className="flex justify-end items-center gap-3">
        {/* User Profile/Icon */}
        <div className="relative">
          <button
            onClick={handleUserIconClick}
            className="w-12 h-12 bg-white rounded-full flex justify-center items-center hover:scale-110 transition-all duration-200 cursor-pointer relative"
          >
            {isLoggedIn ? (
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                </span>
              </div>
            ) : (
              <img
                src="/images/icons/user.png"
                alt="Login"
                className="w-6 h-6"
              />
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

        {/* Other Icons */}
        {icons.map((icon, i) => (
          <div key={i} className="relative">
            {icon.isCart ? (
              <button
                onClick={onCartClick}
                className="w-12 h-12 bg-white rounded-full flex justify-center items-center hover:scale-110 transition-transform cursor-pointer relative"
              >
                <img src={icon.src} alt={icon.alt} className={`w-6 h-6 ${icon.src.startsWith('/images/') ? '' : 'invert'}`} />
                {icon.count > 0 && (
                  <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                    {icon.count}
                  </span>
                )}
              </button>
            ) : (
              <Link
                to={icon.path}
                className="w-12 h-12 bg-white rounded-full flex justify-center items-center hover:scale-110 transition-transform cursor-pointer relative"
              >
                <img src={icon.src} alt={icon.alt} className={`w-6 h-6 ${icon.src.startsWith('/images/') ? '' : 'invert'}`} />
                {icon.count > 0 && (
                  <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                    {icon.count}
                  </span>
                )}
              </Link>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Header;
