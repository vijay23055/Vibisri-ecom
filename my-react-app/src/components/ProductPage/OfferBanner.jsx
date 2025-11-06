import React, { useState, useEffect } from 'react';
import { offers } from '../../data/mockProducts';

const OfferBanner = () => {
  const [currentOffer, setCurrentOffer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden bg-gradient-to-r from-red-500 to-orange-500 py-2">
      <div className="animate-scroll">
        <p className="text-center text-xs font-medium text-white">
          {offers[currentOffer]}
        </p>
      </div>
    </div>
  );
};

export default OfferBanner;