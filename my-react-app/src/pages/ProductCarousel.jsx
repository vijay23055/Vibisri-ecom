import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductCarousel({ products }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const currentProduct = products[currentIndex];

  return (
    <section className="min-h-screen bg-[#EAE0C7] flex items-center justify-center py-12 px-6">
      <div className="max-w-6xl w-full">
        <h2
          className="text-center text-[4rem] md:text-[6rem] font-[Veneer] text-orange-900 mb-10"
          style={{
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          Featured Products
        </h2>

        <div className="flex items-center gap-8 lg:gap-12">
          {/* Left Arrow */}
          <button
            onClick={goToPrevious}
            className="hidden lg:flex items-center justify-center w-14 h-14 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-orange-200 text-orange-700 hover:bg-white hover:shadow-2xl hover:scale-110 transition-all duration-300 flex-shrink-0"
            aria-label="Previous product"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Product Card */}
          <div className="flex-1 min-w-0">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Product Image */}
              <div className="relative">
                <div className="relative bg-white rounded-3xl shadow-2xl p-6 transform transition-all duration-500 hover:shadow-3xl">
                  <div className="absolute -top-8 -left-8 w-32 h-32 bg-orange-400 rounded-full opacity-10 blur-3xl"></div>
                  <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-amber-400 rounded-full opacity-10 blur-3xl"></div>

                  <div className="relative">
                    <div className="overflow-hidden rounded-2xl">
                      <img
                        src={currentProduct.image}
                        alt={currentProduct.name}
                        className="w-full h-[350px] object-contain transform transition-transform duration-700 hover:scale-105"
                      />
                    </div>

                    <div className="absolute -bottom-12 -right-12 w-40 h-40 rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                      <img
                        src={currentProduct.detailImage}
                        alt={`${currentProduct.name} detail`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-6 lg:pl-8">
                <div className="inline-block">
                  <span className="text-sm font-semibold text-orange-700 bg-orange-100 px-4 py-2 rounded-full">
                    {currentProduct.category}
                  </span>
                </div>

                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                  {currentProduct.name}
                </h1>

                <p className="text-lg text-slate-700 leading-relaxed">
                  {currentProduct.description}
                </p>

                <div className="flex items-baseline gap-4 pt-2">
                  <span className="text-4xl font-bold text-slate-900">
                    {currentProduct.price}
                  </span>
                </div>

                <div className="border-t border-orange-200 pt-4">
                  <div className="flex items-center gap-3 text-slate-600">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        Release Date
                      </p>
                      <p className="text-lg font-semibold text-slate-900">
                        {currentProduct.releaseDate}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-6">
                  <button className="flex-1 bg-orange-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-orange-800 hover:shadow-xl hover:-translate-y-1 active:translate-y-0">
                    Pre-Order Now
                  </button>
                  <button className="px-8 py-4 rounded-xl font-semibold border-2 border-orange-300 text-orange-700 transition-all duration-300 hover:border-orange-800 hover:bg-orange-50 hover:-translate-y-1 active:translate-y-0">
                    Learn More
                  </button>
                </div>

                {/* Features */}
                <div className="flex gap-8 pt-6 text-sm">
                  {["Free Shipping", "2-Year Warranty", "30-Day Returns"].map(
                    (feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-slate-600"
                      >
                        <svg
                          className="w-5 h-5 text-amber-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{feature}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={goToNext}
            className="hidden lg:flex items-center justify-center w-14 h-14 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-orange-200 text-orange-700 hover:bg-white hover:shadow-2xl hover:scale-110 transition-all duration-300 flex-shrink-0"
            aria-label="Next product"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex gap-4 justify-center mt-12 lg:hidden">
          <button
            onClick={goToPrevious}
            className="flex items-center justify-center px-6 py-3 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-orange-200 text-orange-700 hover:bg-white hover:shadow-xl transition-all duration-300 font-semibold"
          >
            <ChevronLeft size={20} className="mr-2" />
            Previous
          </button>
          <button
            onClick={goToNext}
            className="flex items-center justify-center px-6 py-3 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-orange-200 text-orange-700 hover:bg-white hover:shadow-xl transition-all duration-300 font-semibold"
          >
            Next
            <ChevronRight size={20} className="ml-2" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-orange-700 w-8"
                  : "bg-orange-300 w-3 hover:bg-orange-500"
              }`}
              aria-label={`Go to product ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
