import React, { useState, useEffect, useLayoutEffect } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import Header from "@/components/ProductPage/Header";
import Footer from "@/components/ProductPage/Footer";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(20);
  const deliveryFee = 15;

  useLayoutEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      body, html {
        background-color: #E8E0D5 !important;
        overflow: hidden !important;
      }
      header {
        position: sticky !important;
        top: 0;
        z-index: 50;
      }
      .social-sidebar {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount + deliveryFee;

  const updateQuantity = (id, newQty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQty) } : item
      )
    );
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#E8E0D5] text-gray-900">
      {/* Header */}
      <Header />

      {/* Main Content Wrapper */}
      <div className="flex flex-1 flex-col lg:flex-row max-w-7xl mx-auto w-full px-6 gap-10 py-6 overflow-hidden">
        {/* Left: Scrollable Cart Items */}
        <div className="flex-1 bg-[#F7F2E9] rounded-2xl shadow-md p-6 overflow-y-auto max-h-[calc(100vh-270px)]">
          <h1 className="text-3xl font-bold mb-6 text-[#3E2B1F]">Your Cart</h1>

          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center mt-16">🛒 Your cart is empty.</p>
          ) : (
            <div className="space-y-6 pr-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white rounded-2xl shadow-sm p-4 border border-gray-200 hover:shadow-lg transition-all"
                >
                  {/* Product Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-[#3E2B1F]">{item.name}</h3>
                      <p className="text-sm text-gray-600">Size: {item.selectedSize || "50g"}</p>
                      <p className="text-lg font-semibold text-[#3E2B1F]">₹{item.price}</p>
                    </div>
                  </div>

                  {/* Quantity + Remove */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3 bg-[#F2EDE3] rounded-full px-3 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-gray-700 hover:text-black transition"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-6 text-center font-semibold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-gray-700 hover:text-black transition"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Sticky Order Summary */}
        <div className="w-full lg:w-[380px] bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg p-6 self-start sticky top-[100px]">
          <h2 className="text-2xl font-semibold mb-4 text-[#3E2B1F]">Order Summary</h2>

          <div className="space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-red-600">
              <span>Discount ({discount}%)</span>
              <span>-₹{discountAmount.toFixed(1)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </div>

            <hr className="my-3 border-gray-300" />
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>₹{total.toFixed(1)}</span>
            </div>
          </div>

          {/* Promo Code */}
          <div className="mt-6">
            <label className="block text-sm text-gray-600 mb-2">Add promo code</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. APRIL20"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300"
              />
              <button
                onClick={() => alert("Promo applied!")}
                className="px-6 bg-[#3E2B1F] text-white rounded-lg font-semibold hover:bg-[#2B1D15] transition"
              >
                Apply
              </button>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={() => alert("Proceeding to checkout...")}
            className="w-full mt-6 bg-[#3E2B1F] text-white py-4 rounded-full text-lg font-semibold hover:bg-[#2B1D15] transition"
          >
            Go to Checkout →
          </button>
        </div>
      </div>

      {/* Footer (always visible) */}
      <div className="flex-shrink-0 border-t border-gray-300">
        <Footer />
      </div>
    </div>
  );
}
