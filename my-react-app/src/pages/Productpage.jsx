import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/ProductPage/Header";
import ProductSpin360 from "../components/product360/Product360.jsx";
import { Skeleton } from "../components/ui/skeleton";
import { useShop } from "../context/ShopContext";

const ProductPageSkeleton = ({ onLoginClick }) => {
  return (
    <div className="w-full min-h-screen bg-[#E8E0D5] text-gray-800 font-sans">
      <Header cartCount={0} wishlistCount={0} onLoginClick={onLoginClick} />

      <div className="max-w-6xl mx-auto px-4 lg:px-0 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT SIDE – PRODUCT IMAGES Skeleton */}
          <div className="flex flex-col items-center lg:sticky lg:top-24">
            {/* MAIN IMAGE Skeleton */}
            <div className="w-full flex justify-center">
              <Skeleton className="w-72 sm:w-80 h-80 rounded-xl" />
            </div>

            {/* THUMBNAILS Skeleton */}
            <div className="flex gap-4 mt-6">
              <Skeleton className="w-14 h-20 rounded-lg" />
              <Skeleton className="w-14 h-20 rounded-lg" />
            </div>
          </div>

          {/* RIGHT SIDE – DETAILS Skeleton */}
          <div className="pr-4 overflow-y-auto no-scrollbar max-h-[80vh] pb-10">
            <Skeleton className="h-8 w-96 mb-4" />
            <Skeleton className="h-12 w-32 mb-2" />
            <Skeleton className="h-4 w-48 mb-6" />

            <div className="mb-8">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-5/6" />
            </div>

            {/* QUANTITY and BUTTON Skeleton */}
            <div className="flex items-center gap-4 mb-12">
              <Skeleton className="w-32 h-12 rounded-lg" />
              <Skeleton className="w-40 h-12 rounded-xl" />
            </div>

            {/* YOU MIGHT ALSO LIKE Skeleton */}
            <Skeleton className="h-8 w-48 mb-4" />
            <div className="space-y-5">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-4 border p-3 rounded-2xl shadow-sm bg-white">
                  <Skeleton className="w-20 h-20 rounded-lg" />
                  <div>
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>
              ))}
            </div>

            {/* REVIEWS Skeleton */}
            <Skeleton className="h-8 w-40 mt-14 mb-4" />
            <div className="space-y-6">
              {[1, 2].map((review) => (
                <div key={review} className="bg-white p-5 rounded-xl shadow border">
                  <Skeleton className="h-6 w-32 mb-3" />
                  <Skeleton className="h-5 w-24 mb-4" />
                  <div className="mb-3">
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useShop();
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  // Find the selected product based on the id in the URL
  const selectedProduct = products.find((p) => String(p.id) === id);

  // Get recommended products (exclude current product, take first 3)
  const recommendedProducts = products
    .filter((p) => String(p.id) !== id)
    .slice(0, 3);

  // All hooks must be declared before any conditional logic
  const [activeImage, setActiveImage] = useState("https://iili.io/KZDbFgp.md.png");
  const [show360, setShow360] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Main image + 360° trigger
  const productImages = [activeImage, "360"];

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [id]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedWishlist = localStorage.getItem("wishlist");

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  if (loading) {
    return <ProductPageSkeleton />;
  }

  const handleAddToCart = () => {
    const productId = selectedProduct ? selectedProduct.id : "chilli_50";
    const productName = selectedProduct
      ? selectedProduct.name
      : "Chilli Powder - 50g";
    const productPrice = selectedProduct ? selectedProduct.price : 99;

    const product = {
      id: productId,
      name: productName,
      price: productPrice,
      selectedSize: "50g",
      image: show360 ? null : activeImage,
      quantity: qty,
    };

    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        )
      );
    } else {
      setCart([...cart, product]);
    }

    setIsCartOpen(true);
    alert("Added to cart!");
  };

  const displayName = selectedProduct?.name || "Chilli Powder - 50g";
  const displayPrice = selectedProduct?.price ?? 99;

  return (
    <div className="w-full min-h-screen bg-[#E8E0D5] text-gray-800 font-sans">
      <Header
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onCartClick={() => setIsCartOpen(true)}
        onLoginClick={() => window.dispatchEvent(new CustomEvent('triggerLoginPopup'))}
      />

      <div className="max-w-6xl mx-auto px-4 lg:px-0 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT SIDE – PRODUCT IMAGES */}
          <div className="flex flex-col items-center lg:sticky lg:top-24">
            {/* MAIN IMAGE OR 360 VIEW */}
            <div className="w-full flex justify-center">
              {show360 ? (
                <ProductSpin360 />
              ) : (
                <img
                  src={activeImage}
                  className="w-72 sm:w-80 drop-shadow-xl transition-all duration-300"
                  alt={displayName}
                />
              )}
            </div>

            {/* THUMBNAILS */}
            <div className="flex gap-4 mt-6">
              {productImages.map((img, index) => (
                <div key={index}>
                  {img === "360" ? (
                    <div
                      onClick={() => {
                        setShow360(true);
                        setActiveImage(null);
                      }}
                      className={`w-14 h-20 flex items-center justify-center border rounded-lg cursor-pointer
                      ${show360 ? "border-black" : "border-gray-300"}`}
                    >
                      <span className="text-xs font-semibold">360°</span>
                    </div>
                  ) : (
                    <img
                      src={img}
                      onClick={() => {
                        setShow360(false);
                        setActiveImage(img);
                      }}
                      className={`w-14 h-20 object-cover rounded-lg cursor-pointer border 
                      ${
                        activeImage === img && !show360
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE – DETAILS */}
          <div className="pr-4 overflow-y-auto no-scrollbar max-h-[80vh] pb-10">
            <h2 className="text-2xl font-semibold">{displayName}</h2>
            <p className="text-3xl mt-1 font-bold">₹{displayPrice}</p>
            <p className="text-sm text-gray-600 mt-1">MRP incl. of all taxes</p>

            <p className="mt-5 text-sm leading-relaxed text-gray-700">
              Finely ground texture. Rich color and strong aroma.
              Enhances taste in curries, chutneys, and marinades.
            </p>

            {/* QUANTITY */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center border border-gray-500 rounded px-4 py-2">
                <button
                  onClick={() => qty > 1 && setQty(qty - 1)}
                  className="text-xl px-2 font-bold"
                >
                  -
                </button>
                <span className="px-4">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="text-xl px-2 font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="bg-black text-white px-10 py-3 rounded-xl shadow hover:bg-gray-900 transition font-medium"
              >
                ADD TO CART
              </button>
            </div>

            {/* YOU MIGHT ALSO LIKE */}
            <h3 className="mt-12 font-semibold text-xl">You Might Also Like</h3>

            <div className="mt-4 space-y-5">
              {recommendedProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/product-page/${product.id}`)}
                  className="flex items-center gap-4 border p-3 rounded-2xl shadow-sm bg-[#E9E2D6] hover:shadow-md transition cursor-pointer"
                >
                  <img
                    src={product.image}
                    className="w-20 h-20 rounded-lg object-contain"
                    alt={product.name}
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">₹{product.price} - {product.categoryTag}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* REVIEWS */}
            <h3 className="mt-14 text-xl font-semibold">Customer Reviews</h3>

            <div className="mt-4 space-y-6">
              {[1, 2].map((review) => (
                <div key={review} className="bg-white p-5 rounded-xl shadow border">
                  <div className="text-yellow-500 text-lg">★★★★☆</div>

                  <p className="font-semibold mt-2">Reviewer Name</p>

                  <p className="mt-3 text-sm text-gray-600">
                    The product is fresh and vibrant in color. Just the right
                    heat without being overpowering.
                  </p>

                  <p className="text-xs text-gray-500 mt-3">
                    Posted on August 14, 2025
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
