'use client';

import { useState } from 'react';
import { Product } from '@/types/product';

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: Omit<Product, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export default function ProductForm({ product, onSubmit, onCancel, isSubmitting }: ProductFormProps) {
  const [formData, setFormData] = useState({
    title: product?.title || '',
    author: product?.author || '',
    category: product?.category || 'book' as 'book' | 'bible',
    description: product?.description || '',
    price: product?.price || '',
    image: product?.image || '',
    inStock: product?.inStock ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: Number(formData.price),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Title *
        </label>
        <input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          required
          className="w-full px-3 md:px-4 py-2.5 md:py-3 border-2 border-rose-200 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-sm md:text-base"
        />
      </div>

      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
          Author *
        </label>
        <input
          id="author"
          value={formData.author}
          onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
          required
          className="w-full px-3 md:px-4 py-2.5 md:py-3 border-2 border-rose-200 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-sm md:text-base"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
          Category *
        </label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as 'book' | 'bible' }))}
          required
          className="w-full px-3 md:px-4 py-2.5 md:py-3 border-2 border-rose-200 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-sm md:text-base"
        >
          <option value="book">Book</option>
          <option value="bible">Bible</option>
        </select>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          required
          rows={4}
          className="w-full px-3 md:px-4 py-2.5 md:py-3 border-2 border-rose-200 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-sm md:text-base"
        />
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
          Price (KES) *
        </label>
        <input
          id="price"
          type="number"
          value={formData.price}
          onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
          required
          min="0"
          className="w-full px-3 md:px-4 py-2.5 md:py-3 border-2 border-rose-200 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-sm md:text-base"
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
          Product Image URL
        </label>
        <input
          id="image"
          type="url"
          value={formData.image}
          onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
          placeholder="https://images.unsplash.com/photo-xxx or similar"
          className="w-full px-3 md:px-4 py-2.5 md:py-3 border-2 border-rose-200 rounded-lg focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 text-sm md:text-base"
        />
        <p className="text-xs text-gray-500 mt-1.5">
          💡 Get free book images from{' '}
          <a
            href="https://unsplash.com/s/photos/books"
            target="_blank"
            rel="noopener noreferrer"
            className="text-rose-600 hover:underline font-medium"
          >
            Unsplash
          </a>
          {' '}|{' '}
          <a
            href="https://www.pexels.com/search/books/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-rose-600 hover:underline font-medium"
          >
            Pexels
          </a>
        </p>
        {formData.image && (
          <div className="mt-3">
            <p className="text-xs text-gray-500 mb-2">Preview:</p>
            <img
              src={formData.image}
              alt="Product preview"
              className="w-full max-w-xs md:max-w-sm h-40 object-cover rounded-lg border-2 border-rose-100 shadow-sm"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                alert('Image failed to load. Please check the URL is correct and accessible.');
              }}
            />
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="inStock"
          checked={formData.inStock}
          onChange={(e) => setFormData(prev => ({ ...prev, inStock: e.target.checked }))}
          className="rounded w-4 h-4"
        />
        <label htmlFor="inStock" className="text-sm font-medium text-gray-700">
          In Stock
        </label>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="w-full sm:w-auto border-2 border-rose-300 text-rose-700 hover:bg-rose-50 font-semibold py-2.5 px-6 rounded-lg transition-all duration-200 text-sm md:text-base"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 text-sm md:text-base"
        >
          {isSubmitting ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
        </button>
      </div>
    </form>
  );
}
