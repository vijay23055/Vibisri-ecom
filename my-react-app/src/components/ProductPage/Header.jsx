import React from "react";

const Header = () => {
  return (
    <nav className="grid grid-cols-[1fr_auto_1fr] items-center bg-[#f5efe3] border-b border-[#ddd4c2] px-10 py-2">
      {/* Left: Logo */}
      <div className="flex items-center">
        <img
          src="https://iili.io/KZb4n1t.png"
          alt="Vibishu Logo"
          className="h-[55px] w-auto"
        />
      </div>

      {/* Center: Nav Links */}
      <div className="flex justify-center items-center">
        <ul className="flex gap-2 bg-[#dcd5c7] rounded-full py-1.5 px-3 list-none">
          <li className="px-5 py-2 rounded-full font-medium text-gray-800 hover:bg-black hover:text-white transition-colors cursor-pointer">
            Home
          </li>
          <li className="px-5 py-2 rounded-full font-medium text-white bg-black transition-colors cursor-pointer">
            Products
          </li>
          <li className="px-5 py-2 rounded-full font-medium text-gray-800 hover:bg-black hover:text-white transition-colors cursor-pointer">
            Contact
          </li>
          <li className="px-5 py-2 rounded-full font-medium text-gray-800 hover:bg-black hover:text-white transition-colors cursor-pointer">
            Blog
          </li>
        </ul>
      </div>

      {/* Right: Icons */}
      <div className="flex justify-end items-center gap-3">
        {["https://iili.io/KZb4z2n.png", "https://iili.io/KZb4I7s.png", "https://iili.io/KZb4CBI.png"].map(
          (icon, i) => (
            <div
              key={i}
              className="w-9 h-9 bg-black rounded-full flex justify-center items-center"
            >
              <img
                src={icon}
                alt="icon"
                className="w-[18px] h-[18px] invert"
              />
            </div>
          )
        )}
      </div>
    </nav>
  );
};

export default Header;
