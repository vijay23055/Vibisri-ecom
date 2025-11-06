import React from "react";

export default function FeaturedProduct({ product }) {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-8">
      <div className="max-w-7xl w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Product Image Section */}
          <div className="relative perspective-1000">
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform transition-all duration-500 hover:shadow-3xl">
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-emerald-500 rounded-full opacity-10 blur-3xl"></div>

              <div className="relative">
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[400px] object-cover transform transition-transform duration-700 hover:scale-110"
                  />
                </div>

                <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                  <img
                    src={product.image}
                    alt={`${product.name} detail`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="space-y-6 lg:pl-8">
            <div className="inline-block">
              <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
                {product.category}
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              {product.name}
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-baseline gap-4 pt-4">
              <span className="text-5xl font-bold text-slate-900">
                {product.price}
              </span>
            </div>

            <div className="border-t border-slate-200 pt-6">
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
                    {product.releaseDate}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button className="flex-1 bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-slate-800 hover:shadow-xl hover:-translate-y-1 active:translate-y-0">
                Pre-Order Now
              </button>
              <button className="px-8 py-4 rounded-xl font-semibold border-2 border-slate-300 text-slate-700 transition-all duration-300 hover:border-slate-900 hover:bg-slate-50 hover:-translate-y-1 active:translate-y-0">
                Learn More
              </button>
            </div>

            <div className="flex gap-8 pt-6 text-sm">
              {[
                "Free Shipping",
                "2-Year Warranty",
                "30-Day Returns"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-slate-600">
                  <svg
                    className="w-5 h-5 text-emerald-500"
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
