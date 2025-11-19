import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { useToast } from '../hooks/use-toast';
import { X } from 'lucide-react';
import { categories } from '../data/mockProducts';

const AddProductModal = ({ product, onClose }) => {
  const { addProduct, updateProduct } = useShop();
  const { toast } = useToast();

  const [productData, setProductData] = useState({
    name: '',
    category: '',
    categoryTag: '',
    price: '',
    image: '',
    quantity: '',
    availability: true,
    color: '',
    priceRange: '',
    collection: '',
    tags: '',
    rating: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setProductData({
        name: product.name || '',
        category: product.category || '',
        categoryTag: product.categoryTag || '',
        price: product.price?.toString() || '',
        image: product.image || '',
        quantity: product.quantity ? product.quantity.join(', ') : '',
        availability: product.availability ?? true,
        color: product.color || '',
        priceRange: product.priceRange || '',
        collection: product.collection || '',
        tags: product.tags ? product.tags.join(', ') : '',
        rating: product.rating?.toString() || ''
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Parse quantities as array
      const quantityArray = productData.quantity.split(',').map(q => parseInt(q.trim())).filter(q => !isNaN(q));

      const processedData = {
        name: productData.name,
        category: productData.category,
        categoryTag: productData.categoryTag,
        price: parseFloat(productData.price),
        image: productData.image || "/images/products/placeholder.jpg",
        quantity: quantityArray,
        availability: productData.availability,
        color: productData.color,
        priceRange: productData.priceRange,
        collection: productData.collection,
        tags: productData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        rating: parseFloat(productData.rating) || 0
      };

      if (product) {
        // Update existing product
        updateProduct(product.id, processedData);
        toast({
          title: "Product Updated",
          description: `${processedData.name} has been updated successfully.`,
        });
      } else {
        // Add new product
        addProduct(processedData);
        toast({
          title: "Product Added",
          description: `${processedData.name} has been added to your store.`,
        });
      }

      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "Error",
        description: "Failed to save product. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={productData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
                placeholder="e.g., Chilli Powder - 50g"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={productData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
                placeholder="e.g., Masala Powder"
                required
              />
            </div>

            {/* Category Tag */}
            <div>
              <label htmlFor="categoryTag" className="block text-sm font-medium text-gray-700 mb-2">
                Category Tag *
              </label>
              <select
                id="categoryTag"
                name="categoryTag"
                value={productData.categoryTag}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
                required
              >
                <option value="">Select Category Tag</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={productData.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
                placeholder="99"
                step="0.01"
                required
              />
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={productData.image}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Quantity */}
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                Quantities (comma-separated) *
              </label>
              <input
                type="text"
                id="quantity"
                name="quantity"
                value={productData.quantity}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
                placeholder="50, 250, 500"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Enter sizes separated by commas</p>
            </div>

            {/* Color */}
            <div>
              <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-2">
                Color
              </label>
              <input
                type="text"
                id="color"
                name="color"
                value={productData.color}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
                placeholder="Red"
              />
            </div>

            {/* Collection */}
            <div>
              <label htmlFor="collection" className="block text-sm font-medium text-gray-700 mb-2">
                Collection
              </label>
              <input
                type="text"
                id="collection"
                name="collection"
                value={productData.collection}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
                placeholder="Masala Mix"
              />
            </div>

            {/* Rating */}
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                Rating (0-5)
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={productData.rating}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
                placeholder="4.5"
                step="0.1"
                min="0"
                max="5"
              />
            </div>

            {/* Tags */}
            <div className="md:col-span-2">
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={productData.tags}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600"
                placeholder="spicy, masala"
              />
            </div>

            {/* Availability */}
            <div className="md:col-span-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="availability"
                  checked={productData.availability}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">In Stock</span>
              </label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : (product ? 'Update Product' : 'Add Product')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
