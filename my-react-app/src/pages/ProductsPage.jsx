import React, { useState, useMemo, useEffect, useLayoutEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../components/ProductPage/Header";
import OfferBanner from "../components/ProductPage/OfferBanner";
import FilterSidebar from "../components/ProductPage/FilterSidebar";
import ProductCard from "../components/ProductPage/ProductCard";
import CartDrawer from "../components/ProductPage/CartDrawer";
import { categories } from "../data/mockProducts";
import { useToast } from "../hooks/use-toast";
import { useShop } from "../context/ShopContext";
import { ProductCardSkeleton } from "../components/ProductPage/ProductCard";

const ProductsPage = ({ onLoginClick }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { cart, wishlist, products, addToCart, removeFromCart, addToWishlist, isInWishlist, cartCount, wishlistCount, updateCartQuantity, updateCartSize } = useShop();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("MASALA");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filters, setFilters] = useState({
    quantity: null,
    availability: false,
    outOfStock: false,
    categories: [],
    colors: [],
    priceRanges: [],
    collections: [],
    tags: [],
    minRating: null,
  });
  useLayoutEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      body, main {
        display: block !important;
        padding: 0 !important;
        align-items: normal !important;
        justify-content: normal !important;
        background-color: #E8E0D5 !important;
      }

      .social-sidebar {
        display: none !important;
      }

      header {
        position: relative !important;
        top: 0 !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleAddToCart = (product) => {
    const result = addToCart(product);
    if (!result.success) {
      toast({
        title: "Out of Stock",
        description: `${product.name} is currently out of stock.`,
        variant: "destructive",
      });
      return;
    }

    setIsCartOpen(true);
    toast({
      title: result.message,
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
    toast({
      title: "Removed from Cart",
      description: "Item has been removed from your cart.",
    });
  };

  const handleAddToWishlist = (product) => {
    const result = addToWishlist(product);
    toast({
      title: result.message,
      description: `${product.name} has been ${result.action === 'added' ? 'added to' : 'removed from'} your wishlist.`,
    });
  };

  const handleViewProduct = (product) => {
    if (!product || !product.id) return;
    navigate(`/product-page/${product.id}`);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;
      if (activeCategory && product.categoryTag !== activeCategory)
        return false;
      return true;
    });
  }, [products, searchQuery, activeCategory, filters]);

  return (
    <div
      className="min-h-screen bg-[#E8E0D5]"
      style={{ maxWidth: "1728px", margin: "0 auto" }}
    >
      {/* Header + Offer Section */}
      <Header
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onCartClick={() => setIsCartOpen(true)}
        onLoginClick={onLoginClick}
      />
      <OfferBanner />

      <div className="px-4 py-3">
        {/* Breadcrumb */}
        <div className="mb-2">
          <p className="text-xs text-gray-600">
            Home / <span className="font-medium text-gray-800">Products</span>
          </p>
        </div>

        {/* Sidebar + Main Section */}
        <div className="grid grid-cols-[240px_1fr] gap-4">
          {/* Sidebar */}
          <div>
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Main Content */}
          <div className="flex flex-col h-[calc(100vh-160px)]">
            <h1 className="mb-3 text-2xl font-bold text-gray-800">PRODUCTS</h1>

            {/* Search + Category Tabs */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <div className="relative w-full max-w-[500px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-gray-200"
                />
              </div>

              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.name)}
                    className={`rounded-lg px-4 py-1.5 text-xs font-medium transition-all ${
                      activeCategory === category.name
                        ? "bg-red-500 text-white shadow-md"
                        : "bg-transparent border border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Product Grid */}
            <div className="flex-1 overflow-y-auto pr-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 justify-items-center px-6 pb-6">
                {loading ? (
                  // Skeleton Loading State
                  Array.from({ length: 8 }, (_, i) => (
                    <div
                      key={i}
                      className="bg-[#FAF6EF] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-300 w-[250px] h-[320px] flex flex-col justify-between items-center overflow-hidden"
                    >
                      <ProductCardSkeleton />
                    </div>
                  ))
                ) : (
                  // Real Products
                  filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-[#FAF6EF] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.15)] transition-all duration-300 w-[250px] h-[320px] flex flex-col justify-between items-center overflow-hidden group"
                    >
                      <ProductCard
                        product={product}
                        onAddToCart={handleAddToCart}
                        onAddToWishlist={handleAddToWishlist}
                        isInWishlist={isInWishlist(product.id)}
                        onViewProduct={handleViewProduct}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={updateCartQuantity}
        onUpdateSize={updateCartSize}
        onRemove={handleRemoveFromCart}
      />
    </div>
  );
};

export default ProductsPage;
