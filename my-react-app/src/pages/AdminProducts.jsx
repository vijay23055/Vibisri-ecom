import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useToast } from '../hooks/use-toast';
import { Search, Plus, Edit, Trash2, Eye, Download } from 'lucide-react';
import AddProductModal from '../components/AddProductModal';

const AdminProducts = () => {
  const { products, updateProduct, deleteProduct } = useShop();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);

  // Filter products based on search
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.categoryTag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteProduct = (productId, productName) => {
    if (window.confirm(`Are you sure you want to delete "${productName}"?`)) {
      deleteProduct(productId);
      toast({
        title: "Product Deleted",
        description: `${productName} has been removed from your store.`,
        variant: "destructive"
      });
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowAddModal(true);
  };

  const getStockStatus = (product) => {
    if (!product.quantity || product.quantity.length === 0) return 'Out of Stock';
    const minQuantity = Math.min(...product.quantity);
    if (minQuantity <= 0) return 'Out of Stock';
    if (minQuantity <= 10) return 'Low Stock';
    return 'In Stock';
  };

  const getStockStatusColor = (status) => {
    switch (status) {
      case 'Out of Stock':
        return 'bg-red-100 text-red-800';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Stock':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl shadow-2xl p-8 border border-gray-200/60">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Products</h1>
            <p className="text-gray-600 mt-2 text-lg font-medium">Manage your complete product catalog</p>
            <div className="flex items-center mt-4 space-x-4">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-2 rounded-2xl border border-emerald-200/50">
                <span className="text-sm font-semibold text-emerald-700">{products.length} Total Products</span>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 px-4 py-2 rounded-2xl border border-amber-200/50">
                <span className="text-sm font-semibold text-amber-700">
                  {products.filter(p => p.quantity && p.quantity[0] <= 10).length} Low Stock
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-4">
            <button
              onClick={() => {
                setEditingProduct(null);
                setShowAddModal(true);
              }}
              className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-6 py-3 rounded-2xl hover:from-indigo-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold flex items-center"
            >
              <Plus className="w-5 h-5 mr-3" />
              Add Product
            </button>
            <div className="text-right">
              <p className="text-sm text-gray-500">Quick Actions</p>
              <div className="flex space-x-2 mt-2">
                <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors text-sm font-medium">
                  Import
                </button>
                <button
                  onClick={() => setShowExportModal(true)}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors text-sm font-medium flex items-center"
                >
                  <Download className="w-3 h-3 mr-1" />
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl shadow-2xl p-8 border border-gray-200/60">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center flex-1 max-w-lg">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products by name, category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 font-medium text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-5 py-3 rounded-2xl border border-indigo-200/50">
              <span className="text-sm font-bold text-indigo-700">
                {filteredProducts.length} of {products.length} products
              </span>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto bg-white rounded-2xl border border-gray-200/60">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200/80 bg-gradient-to-r from-gray-50 to-white">
                <th className="text-left py-5 px-6 font-bold text-gray-700 uppercase text-sm tracking-wider">Product</th>
                <th className="text-left py-5 px-6 font-bold text-gray-700 uppercase text-sm tracking-wider">Category</th>
                <th className="text-left py-5 px-6 font-bold text-gray-700 uppercase text-sm tracking-wider">Price</th>
                <th className="text-left py-5 px-6 font-bold text-gray-700 uppercase text-sm tracking-wider">Stock</th>
                <th className="text-left py-5 px-6 font-bold text-gray-700 uppercase text-sm tracking-wider">Rating</th>
                <th className="text-left py-5 px-6 font-bold text-gray-700 uppercase text-sm tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <tr key={product.id} className="border-b border-gray-100/80 hover:bg-gradient-to-r hover:from-indigo-50/30 hover:to-blue-50/30 transition-all duration-200">
                    <td className="py-6 px-6">
                      <div className="flex items-center">
                        <div className="relative">
                          <img
                            src={product.image || '/images/products/placeholder.jpg'}
                            alt={product.name}
                            className="w-16 h-16 rounded-2xl object-cover shadow-md"
                          />
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="ml-5">
                          <p className="font-bold text-gray-800 text-lg">{product.name}</p>
                          <p className="text-sm text-gray-500 font-medium">ID: {product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-6">
                      <span className="font-semibold text-gray-700">{product.category}</span>
                      <br />
                      <span className="text-sm text-gray-500 font-medium uppercase tracking-wide">{product.categoryTag}</span>
                    </td>
                    <td className="py-6 px-6">
                      <span className="text-2xl font-bold text-gray-800">₹{product.price}</span>
                    </td>
                    <td className="py-6 px-6">
                      <span className={`inline-flex items-center px-4 py-2 text-sm font-bold rounded-full ${
                        getStockStatus(product) === 'In Stock' ? 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200' :
                        getStockStatus(product) === 'Low Stock' ? 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200' :
                        'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200'
                      }`}>
                        {getStockStatus(product)}
                      </span>
                      {product.quantity && product.quantity.length > 0 && (
                        <div className="text-sm text-gray-500 font-medium mt-2">
                          {product.quantity.join(', ')} {product.quantity.length === 1 ? 'unit' : 'units'}
                        </div>
                      )}
                    </td>
                    <td className="py-6 px-6">
                      <div className="flex items-center">
                        <span className="text-xl font-bold text-gray-700 mr-3">{product.rating || 0}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-lg ${i < (product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}>
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-6">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 hover:from-blue-100 hover:to-indigo-100 rounded-2xl transition-all duration-200 transform hover:scale-110 border border-blue-200/50"
                          title="Edit Product"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id, product.name)}
                          className="p-3 bg-gradient-to-r from-red-50 to-pink-50 text-red-600 hover:from-red-100 hover:to-pink-100 rounded-2xl transition-all duration-200 transform hover:scale-110 border border-red-200/50"
                          title="Delete Product"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-20 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6 shadow-lg">
                        <Search className="w-10 h-10 text-gray-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
                      <p className="text-gray-500 max-w-md">
                        {searchTerm
                          ? 'We couldn\'t find any products matching your search. Try different keywords.'
                          : 'Your product catalog is empty. Start by adding your first amazing product!'
                        }
                      </p>
                      {!searchTerm && (
                        <button
                          onClick={() => setShowAddModal(true)}
                          className="mt-6 bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-6 py-3 rounded-2xl hover:from-indigo-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold flex items-center"
                        >
                          <Plus className="w-5 h-5 mr-3" />
                          Add Your First Product
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {showAddModal && (
        <AddProductModal
          product={editingProduct}
          onClose={() => {
            setShowAddModal(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Export Products</h2>
                <p className="text-gray-600 mt-1">Copy this JSON to update your mockProducts.js file</p>
              </div>
              <button
                onClick={() => setShowExportModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-6 h-0.5 bg-gray-500 transform rotate-45 -mb-0.5"></div>
                <div className="w-6 h-0.5 bg-gray-500 transform -rotate-45"></div>
              </button>
            </div>

            {/* JSON Content */}
            <div className="p-6 max-h-96 overflow-y-auto bg-gray-50">
              <pre className="text-sm bg-white p-4 rounded-2xl border border-gray-200 overflow-x-auto">
                <code className="text-gray-800">
{`export const products = ${JSON.stringify(products, null, 2)};

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
];`}
                </code>
              </pre>
            </div>

            {/* Footer */}
            <div className="flex justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `export const products = ${JSON.stringify(products, null, 2)};\n\nexport const categories = [\n  { id: 1, name: "MASALA", active: true },\n  { id: 2, name: "RICE MIX", active: false },\n  { id: 3, name: "HEALTH MIX", active: false },\n  { id: 4, name: "PICKLE", active: false },\n  { id: 5, name: "POWDER", active: false }\n];\n\nexport const offers = [\n  "🎉 Spice Up Your Kitchen! Buy 2, Get 1 FREE on Selected Masalas",\n  "🚚 Free Delivery on Orders Above ₹499 - Shop Now!",\n  "🔥 Festive Offer: Get Flat 20% OFF on All Masalas - Limited Time Only!",\n  "🎁 Spice Up Your Kitchen! Buy 2, Get 1 FREE on Selected Masalas",\n  "📦 Free Delivery on Orders Above ₹499"\n];`
                  ).then(() => {
                    toast({
                      title: "Copied to Clipboard",
                      description: "JSON exported successfully!",
                    });
                  });
                }}
                className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-indigo-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Copy to Clipboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
