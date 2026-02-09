import { getProducts } from '@/lib/products';
import ProductGrid from '@/components/products/ProductGrid';

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const products = await getProducts();
  const categoryFilter = params.category === 'book' || params.category === 'bible'
    ? params.category
    : null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">
            {categoryFilter === 'book' ? 'Books' : categoryFilter === 'bible' ? 'Bibles' : 'All Products'}
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Browse our collection of {categoryFilter ? categoryFilter + 's' : 'Christian literature and Bibles'}
          </p>
        </div>

        <ProductGrid initialProducts={products} categoryFilter={categoryFilter} />
      </div>
    </div>
  );
}
