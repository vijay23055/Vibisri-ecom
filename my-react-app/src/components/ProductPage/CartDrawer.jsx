import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useNavigate } from "react-router-dom"; // ✅ Imported correctly

const CartDrawer = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemove, onUpdateSize }) => {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const navigate = useNavigate(); // ✅ You forgot this line

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'april20') {
      setDiscount(20);
    } else {
      setDiscount(0);
    }
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmount = (subtotal * discount) / 100;
    return subtotal - discountAmount;
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full md:w-[500px] bg-[#E8E0D5] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-300">
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-6 w-6" />
              <h2 className="text-2xl font-bold text-gray-800">Cart</h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-gray-300 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingCart className="h-16 w-16 mb-4" />
                <p>Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/100?text=Product';
                          }}
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-gray-800">{item.name}</h3>
                          <button
                            onClick={() => onRemove(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="flex gap-2 mb-3">
                          {item.availableSizes?.map((size) => (
                            <button
                              key={size}
                              onClick={() => onUpdateSize(item.id, size)}
                              className={`px-3 py-1 text-xs rounded-md border transition-all ${
                                item.selectedSize === size
                                  ? 'border-gray-800 bg-gray-800 text-white'
                                  : 'border-gray-300 text-gray-600 hover:border-gray-400'
                              }`}
                            >
                              {size}g
                            </button>
                          ))}
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-400 line-through">
                              ₹{item.originalPrice || item.price + 20}
                            </span>
                            <span className="text-lg font-bold text-gray-900">
                              ₹{item.price}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-3 py-1">
                            <button
                              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="text-gray-600 hover:text-gray-900 transition-colors"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="text-gray-600 hover:text-gray-900 transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer - Total & Checkout */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-300 p-6 bg-white">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                <span className="text-lg text-gray-600">Total Payment</span>
                <div className="text-right">
                  {discount > 0 && (
                    <span className="text-sm text-gray-400 line-through block">₹{calculateSubtotal()}</span>
                  )}
                  <span className="text-2xl font-bold text-gray-900">₹{calculateTotal()}</span>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2">Promo Codes</label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="e.g APRIL20"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 bg-gray-50"
                  />
                  <Button
                    onClick={handleApplyPromo}
                    variant="outline"
                    className="px-6 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white"
                  >
                    Apply
                  </Button>
                </div>
                {discount > 0 && (
                  <p className="text-sm text-green-600 mt-2">✓ {discount}% discount applied!</p>
                )}
              </div>

              {/* ✅ Navigate to full cart page */}
              <Button
                className="w-full bg-black text-white py-6 text-lg font-medium hover:bg-gray-800 transition-colors"
                onClick={() => {
                  onClose();
                  navigate("/cart"); // ✅ Now this works
                }}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Go to Cart
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
