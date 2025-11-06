import React from "react";
import { Heart, Plus } from "lucide-react";

const ProductCard = ({ product, onAddToWishlist, onAddToCart, isInWishlist }) => {
  return (
    <div
      className="group relative bg-[#E9E2D6] rounded-2xl shadow-[0_3px_10px_rgba(0,0,0,0.08)] border border-[#D8CFC2] transition-all duration-300 hover:shadow-[0_5px_15px_rgba(0,0,0,0.12)] flex flex-col justify-between"
      style={{ width: "270px", height: "345px" }}
    >
      {/* Wishlist + Add Icons */}
      <div className="absolute top-3 right-3 flex gap-2 z-10">
        <button
          onClick={() => onAddToWishlist(product)}
          className={`p-1.5 bg-white rounded-full shadow hover:scale-110 transition ${
            isInWishlist ? "text-red-500" : "text-gray-700 hover:text-red-500"
          }`}
        >
          <Heart
            className="w-4 h-4"
            fill={isInWishlist ? "currentColor" : "none"}
          />
        </button>
        <button
          onClick={() => onAddToCart(product)}
          className="p-1.5 bg-white rounded-full shadow text-gray-700 hover:text-green-600 hover:scale-110 transition"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Product Image */}
      <div className="flex items-center justify-center flex-1 px-4 pt-6 pb-1">
        <img
          src={product.image}
          alt={product.name}
          className="h-[250px] w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_6px_8px_rgba(0,0,0,0.25)]"
          onError={(e) => (e.target.src = "")}
        />
      </div>

      {/* Product Info */}
      <div className="px-4 pb-3 mt-auto">
        <p className="text-xs text-gray-600 mb-1">{product.category}</p>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900 leading-tight">
            {product.name}
          </h3>
          <p className="text-sm font-semibold text-gray-900">₹{product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
