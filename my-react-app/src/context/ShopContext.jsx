import React, { createContext, useContext, useEffect, useState } from "react";
import { products as mockProducts } from "../data/mockProducts";

const ShopContext = createContext(null);

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState(mockProducts);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Load from localStorage once on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      const savedWishlist = localStorage.getItem("wishlist");
      const savedProducts = localStorage.getItem("products");
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      // Always prioritize saved products, fallback to mockProducts
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      } else {
        // Save mockProducts to localStorage on first load
        localStorage.setItem("products", JSON.stringify(mockProducts));
      }
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
    }
  }, []);

  // Persist to localStorage when cart changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [cart]);

  // Persist to localStorage when wishlist changes
  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch (error) {
      console.error("Failed to save wishlist to localStorage", error);
    }
  }, [wishlist]);

  // Persist to localStorage when products change
  useEffect(() => {
    try {
      localStorage.setItem("products", JSON.stringify(products));
    } catch (error) {
      console.error("Failed to save products to localStorage", error);
    }
  }, [products]);

  // Cart functions
  const addToCart = (product) => {
    if (!product.availability) {
      return { success: false, message: "Out of Stock" };
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
      return { success: true, message: "Added to Cart", action: "updated" };
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
      return { success: true, message: "Added to Cart" };
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
    return { success: true, message: "Removed from Cart" };
  };

  const updateCartQuantity = (productId, quantity) => {
    setCart(cart.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const updateCartSize = (productId, size) => {
    setCart(cart.map((item) =>
      item.id === productId ? { ...item, selectedSize: size } : item
    ));
  };

  // Wishlist functions
  const addToWishlist = (product) => {
    const isInWishlist = wishlist.some((item) => item.id === product.id);
    if (isInWishlist) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
      return { success: true, message: "Removed from Wishlist", action: "removed" };
    } else {
      setWishlist([...wishlist, product]);
      return { success: true, message: "Added to Wishlist", action: "added" };
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Product functions
  const addProduct = (newProduct) => {
    const id = Math.max(...products.map(p => p.id)) + 1;
    const productWithId = { ...newProduct, id };
    const newProducts = [...products, productWithId];
    setProducts(newProducts);
    autoSaveProductsToFile(newProducts);
  };

  const updateProduct = (productId, updatedProduct) => {
    const newProducts = products.map(product =>
      product.id === productId ? { ...product, ...updatedProduct } : product
    );
    setProducts(newProducts);
    autoSaveProductsToFile(newProducts);
  };

  const deleteProduct = (productId) => {
    const newProducts = products.filter(product => product.id !== productId);
    setProducts(newProducts);
    autoSaveProductsToFile(newProducts);
  };

  // Auto-save products to mockProducts.js file
  const autoSaveProductsToFile = async (currentProducts) => {
    try {
      // Create the complete export string
      const exportData = {
        products: currentProducts,
        categories: [
          { id: 1, name: "MASALA", active: true },
          { id: 2, name: "RICE MIX", active: false },
          { id: 3, name: "HEALTH MIX", active: false },
          { id: 4, name: "PICKLE", active: false },
          { id: 5, name: "POWDER", active: false }
        ],
        offers: [
          "🎉 Spice Up Your Kitchen! Buy 2, Get 1 FREE on Selected Masalas",
          "🚚 Free Delivery on Orders Above ₹499 - Shop Now!",
          "🔥 Festive Offer: Get Flat 20% OFF on All Masalas - Limited Time Only!",
          "🎁 Spice Up Your Kitchen! Buy 2, Get 1 FREE on Selected Masalas",
          "📦 Free Delivery on Orders Above ₹499"
        ]
      };

      // This will call our backend API or file system
      const response = await fetch('http://localhost:3001/api/update-products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exportData)
      });

      if (response.ok) {
        console.log('✅ mockProducts.js automatically updated!');
      } else {
        console.log('📝 To update mockProducts.js manually, run: npm run save-products');
      }
    } catch (error) {
      // Fallback: Just log the instruction for manual sync
      console.log('📝 To update mockProducts.js, run: npm run save-products');
    }
  };

  // Order functions
  const addOrder = (orderData) => {
    const orderId = Date.now().toString();
    const newOrder = {
      id: orderId,
      ...orderData,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    setOrders(prev => [...prev, newOrder]);
    return orderId;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status } : order
    ));
  };

  // Customer functions
  const addCustomer = (customerData) => {
    const customerId = Date.now().toString();
    const newCustomer = {
      id: customerId,
      ...customerData,
      joinedAt: new Date().toISOString(),
      totalOrders: 0,
      totalSpent: 0
    };
    setCustomers(prev => [...prev, newCustomer]);
    return customerId;
  };

  const updateCustomer = (customerId, customerData) => {
    setCustomers(customers.map(customer =>
      customer.id === customerId ? { ...customer, ...customerData } : customer
    ));
  };

  // Authentication functions
  const login = (username, password) => {
    if (username === 'admin' && password === 'admin') {
      const userData = { username: 'admin', name: 'Administrator', role: 'admin' };
      setIsLoggedIn(true);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isLoggedIn', 'true');
      return { success: true, message: 'Login successful' };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
  };

  // Load authentication state
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');
      const savedIsLoggedIn = localStorage.getItem('isLoggedIn');
      if (savedUser && savedIsLoggedIn === 'true') {
        setUser(JSON.parse(savedUser));
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Failed to load auth state from localStorage", error);
    }
  }, []);

  // Analytics functions
  const getTotalRevenue = () => {
    return orders.reduce((total, order) => total + order.totalAmount, 0);
  };

  const getTotalSales = () => {
    return orders.length;
  };

  const getTotalProducts = () => {
    return products.length;
  };

  const getTotalCustomers = () => {
    return customers.length;
  };

  // Computed values
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const value = {
    cart,
    setCart,
    wishlist,
    setWishlist,
    products,
    setProducts,
    orders,
    setOrders,
    customers,
    setCustomers,
    isLoggedIn,
    user,
    // Functions
    addToCart,
    removeFromCart,
    updateCartQuantity,
    updateCartSize,
    addToWishlist,
    addProduct,
    updateProduct,
    deleteProduct,
    addOrder,
    updateOrderStatus,
    addCustomer,
    updateCustomer,
    login,
    logout,
    isInWishlist,
    getTotalRevenue,
    getTotalSales,
    getTotalProducts,
    getTotalCustomers,
    // Computed values
    cartCount,
    wishlistCount,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
