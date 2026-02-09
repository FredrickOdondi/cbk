'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Search } from '@/components/icons';

interface ProductGridProps {
  initialProducts: Product[];
  categoryFilter?: 'book' | 'bible' | null;
}

export default function ProductGrid({ initialProducts, categoryFilter }: ProductGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState<'all' | 'book' | 'bible'>(categoryFilter || 'all');
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);

  useEffect(() => {
    let filtered = initialProducts;

    if (category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.author.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, category, initialProducts]);

  return (
    <div>
      <div className="mb-6 md:mb-8 flex flex-col sm:flex-row gap-3 md:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            type="text"
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-sm md:text-base"
          />
        </div>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value as 'all' | 'book' | 'bible')}
          className="w-full sm:w-40 md:w-48 text-sm md:text-base"
        >
          <option value="all">All Categories</option>
          <option value="book">Books</option>
          <option value="bible">Bibles</option>
        </Select>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
          {filteredProducts.map((product, index) => (
            <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 md:py-12 animate-fade-in px-4">
          <p className="text-gray-500 text-base md:text-lg">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
