import React from "react";

export default function SubscribeSection() {
  return (
    <section className="relative bg-[#FF6B57] text-white py-20 px-6 overflow-hidden rounded-3xl shadow-lg">
      {/* Background Curves */}
      <div className="absolute inset-0 flex justify-between opacity-30">
        <div className="w-1/2 bg-[#FF806A] rounded-[100%] blur-3xl scale-150 -translate-x-1/3"></div>
        <div className="w-1/2 bg-[#FF806A] rounded-[100%] blur-3xl scale-150 translate-x-1/3"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="uppercase tracking-widest text-sm font-semibold mb-2 opacity-90">
          Subscribe
        </p>

        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
          Join the Fun <br className="hidden md:block" />
          <span className="text-white">Subscribe Now!</span>
        </h2>

        <p className="text-lg opacity-90 mb-8">
          Subscribe to our newsletter for a weekly serving of recipes, cooking tips,
          and exclusive insights straight to your inbox.
        </p>

        {/* Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <input
            type="email"
            required
            placeholder="Email Address"
            className="w-full sm:w-auto sm:flex-1 px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-500"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-all duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
