import React from "react";
import { offers } from "../../data/mockProducts";

const OfferBanner = () => {
  // Combine offers with separator for smooth looping
  const scrollingText = offers.join(" • ");

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-red-600 to-orange-500 py-2 group">
      <div className="whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
        <p className="inline-block text-sm font-semibold text-white tracking-wide px-2">
          {scrollingText} • {scrollingText} • {scrollingText}
        </p>
      </div>
    </div>
  );
};

export default OfferBanner;
