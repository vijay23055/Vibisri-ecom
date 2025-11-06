import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#E8E0D5] text-gray-800 mt-20 pt-12 pb-8 border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Logo and Info */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-extrabold mb-3 text-black">Vibishri.com</h2>
          <p className="text-sm text-gray-700 mb-4">
            🌶 Bringing you authentic, handpicked spices – fresh, pure, and full of flavour.
            Shop masalas that make every meal unforgettable.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-red-600">
              <Facebook size={18} />
            </a>
            <a href="#" className="hover:text-red-600">
              <Instagram size={18} />
            </a>
            <a href="#" className="hover:text-red-600">
              <Twitter size={18} />
            </a>
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-red-700">About</a></li>
            <li><a href="#" className="hover:text-red-700">Features</a></li>
            <li><a href="#" className="hover:text-red-700">Works</a></li>
            <li><a href="#" className="hover:text-red-700">Career</a></li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Help</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-red-700">Customer Support</a></li>
            <li><a href="#" className="hover:text-red-700">Delivery Details</a></li>
            <li><a href="#" className="hover:text-red-700">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-red-700">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-red-700">Free eBooks</a></li>
            <li><a href="#" className="hover:text-red-700">Development Tutorial</a></li>
            <li><a href="#" className="hover:text-red-700">How to - Blog</a></li>
            <li><a href="#" className="hover:text-red-700">YouTube Playlist</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm text-gray-600 mt-10 border-t border-gray-300 pt-6">
        © {new Date().getFullYear()} Vibishri. All Rights Reserved.
      </div>
    </footer>
  );
}
