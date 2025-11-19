const fs = require('fs');
const path = require('path');

// This script automatically updates mockProducts.js when products change
// Run this with Node.js: node save-products.js
const saveProductsToMockFile = (currentProducts) => {
  try {
    const mockData = `export const products = ${JSON.stringify(currentProducts, null, 2)};

export const categories = [
  { id: 1, name: "MASALA", active: true },
  { id: 2, name: "RICE MIX", active: false },
  { id: 3, name: "HEALTH MIX", active: false },
  { id: 4, name: "PICKLE", active: false },
  { id: 5, name: "POWDER", active: false }
];

export const offers = [
  "🎉 Spice Up Your Kitchen! Buy 2, Get 1 FREE on Selected Masalas",
  "🚚 Free Delivery on Orders Above ₹499 - Shop Now!",
  "🔥 Festive Offer: Get Flat 20% OFF on All Masalas - Limited Time Only!",
  "🎁 Spice Up Your Kitchen! Buy 2, Get 1 FREE on Selected Masalas",
  "📦 Free Delivery on Orders Above ₹499"
];`;

    const filePath = path.join(__dirname, 'src', 'data', 'mockProducts.js');
    fs.writeFileSync(filePath, mockData, 'utf8');
    console.log('✅ mockProducts.js updated successfully with latest products!');
  } catch (error) {
    console.error('❌ Failed to update mockProducts.js:', error.message);
  }
};

// Example usage - replace with your actual products array
const sampleProducts = [
  {
    "id": 1,
    "name": "Chilli Powder - 50g",
    "category": "Masala Powder",
    "categoryTag": "MASALA",
    "price": 99,
    "image": "https://iili.io/KZDbFgp.png",
    "quantity": [50, 250, 500],
    "availability": true,
    "color": "Red",
    "priceRange": "0-100",
    "collection": "Spices",
    "tags": ["spicy", "masala"],
    "rating": 4.5
  }
];

// Uncomment the line below to test the script
// saveProductsToMockFile(sampleProducts);

module.exports = { saveProductsToMockFile };
