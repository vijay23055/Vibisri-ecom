import React, { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import Header from "../components/ProductPage/Header";
import OfferBanner from "../components/ProductPage/OfferBanner";
import FilterSidebar from "../components/ProductPage/FilterSidebar";
import ProductCard from "../components/ProductPage/ProductCard";
import CartDrawer from "../components/ProductPage/CartDrawer";
import { products, categories } from "../data/mockProducts";
import { useToast } from "../hooks/use-toast";
import { useEffect as useLayoutEffect } from "react";



const ProductsPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("MASALA");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
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


  // Load cart & wishlist from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  // Persist data
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleAddToCart = (product) => {
    if (!product.availability) {
      toast({
        title: "Out of Stock",
        description: `${product.name} is currently out of stock.`,
        variant: "destructive",
      });
      return;
    }

    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
          selectedSize: product.quantity[0] || 50,
          availableSizes: product.quantity,
          originalPrice: product.price + 20,
        },
      ]);
    }

    setIsCartOpen(true);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
    toast({
      title: "Removed from Cart",
      description: "Item has been removed from your cart.",
    });
  };

  const handleAddToWishlist = (product) => {
    const isInWishlist = wishlist.some((item) => item.id === product.id);
    if (isInWishlist) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      setWishlist([...wishlist, product]);
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    }
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
      className={`min-h-screen bg-[#E8E0D5] transition-opacity duration-300 ${
        isCartOpen ? "opacity-50" : "opacity-100"
      }`}
      style={{ maxWidth: "1728px", margin: "0 auto" }}
    >
      {/* Header + Offer Section */}
      <Header
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onCartClick={() => setIsCartOpen(true)}
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
              <div className="relative w-64">
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
                        : "bg-white text-gray-700 hover:bg-gray-100"
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
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-[#FAF6EF] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.15)] transition-all duration-300 w-[250px] h-[320px] flex flex-col justify-between items-center overflow-hidden group"
                  >
                    <ProductCard
                      product={product}
                      onAddToCart={handleAddToCart}
                      onAddToWishlist={handleAddToWishlist}
                      isInWishlist={wishlist.some(
                        (item) => item.id === product.id
                      )}
                    />
                  </div>
                ))}
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
        onUpdateQuantity={(id, qty) =>
          setCart(cart.map((p) => (p.id === id ? { ...p, quantity: qty } : p)))
        }
        onUpdateSize={(id, size) =>
          setCart(
            cart.map((p) =>
              p.id === id ? { ...p, selectedSize: size } : p
            )
          )
        }
        onRemove={handleRemoveFromCart}
      />
    </div>
  );
};

export default ProductsPage;
